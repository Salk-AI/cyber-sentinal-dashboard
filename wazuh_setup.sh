#!/bin/bash


# CONSTANTS

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

readonly INDEXER_CONFIG_FILE="/etc/wazuh-indexer/opensearch.yml"
readonly FILEBEAT_CONFIG_FILE="/etc/filebeat/filebeat.yml"
readonly DASHBOARD_CONFIG_FILE="/etc/wazuh-dashboard/opensearch_dashboards.yml"
readonly WAZUH_CONFIG_FILE="/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml"



log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}


error() {
    echo -e "${RED}[ERROR] $1${NC}" >&2
    exit 1
}


warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}


# Check root privileges
check_root() {
    if [ "$EUID" -ne 0 ]; then
        error "This script must be run as root"
    fi
}


# Check required dependencies
check_dependencies() {
    local deps=("curl" "tar" "setcap" "gnupg")

    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            error "$dep is required but not installed"
        fi
    done
}


function delete_components() {
    local component="$1"
    local distro="$2"

    # Validate inputs
    if [[ ! "$distro" =~ ^(rpm|deb)$ ]]; then
        error "Invalid distro. Must be 'rpm' or 'deb'"
        return 1
    fi

    if [[ ! "$component" =~ ^(all|indexer|manager|dashboard|filebeat)$ ]]; then
        error "Invalid component. Must be one of: all, indexer, manager, dashboard, filebeat"
        return 1
    fi

    log "Removing $component component(s) for $distro distribution..."

    # Common cleanup function
    cleanup_component() {
        local name="$1"
        local paths=("$@")

        if [[ "$distro" == "rpm" ]]; then
            sudo yum remove "wazuh-$name" -y
        else
            sudo apt-get remove --purge "wazuh-$name" -y
        fi

        # Remove leftover directories
        for path in "${paths[@]:1}"; do
            if [[ -d "$path" ]]; then
                sudo rm -rf "$path"
            fi
        done
    }

    case "$component" in
        'all')
            log "Performing complete uninstallation..."
            sudo bash wazuh-install.sh --uninstall
            ;;

        'indexer')
            cleanup_component "indexer" \
                "/var/lib/wazuh-indexer" \
                "/usr/share/wazuh-indexer" \
                "/etc/wazuh-indexer"
            ;;

        'manager')
            cleanup_component "manager" "/var/ossec"
            sudo systemctl disable wazuh-manager
            sudo systemctl daemon-reload
            ;;

        'dashboard')
            cleanup_component "dashboard" \
                "/var/lib/wazuh-dashboard" \
                "/usr/share/wazuh-dashboard" \
                "/etc/wazuh-dashboard"
            ;;

        'filebeat')
            if [[ "$distro" == "rpm" ]]; then
                sudo yum remove filebeat -y
            else
                sudo apt-get remove --purge filebeat -y
            fi
            sudo rm -rf /var/{lib,share,etc}/filebeat/
            ;;
    esac

    log "Successfully removed $component component(s)"
    return 0
}


function generate_offline_files() {
    local distro="$1"
    local supported_distros=("deb" "rpm")

    # Validate input distribution
    if [[ ! " ${supported_distros[@]} " =~ " ${distro} " ]]; then
        error "Unsupported distribution '$distro'. Supported options are: ${supported_distros[*]}"
        return 1
    fi

    # Check if wazuh-install.sh exists and is executable
    if [[ ! -x "./wazuh-install.sh" ]]; then
        error "wazuh-install.sh not found or not executable"
        return 1
    fi

    log "Generating offline installation files for $distro distribution..."

    if ! sudo ./wazuh-install.sh -dw "$distro"; then
        error "Failed to generate offline files"
        return 1
    fi

    log "Successfully generated offline files for $distro distribution"
    sudo chmod 777 -R ./wazuh-offline/
    return 0
}



function generate_install_files() {
    local indexer_ip_address="$1"
    local manager_ip_address="$2"
    local dashboard_ip_address="$3"

    # Validate input
    if [[ -z "$ip_address" ]]; then
        error "IP address parameter is required"
        return 1
    fi

    log "Downloading config.yml file..."
    if ! curl -sO https://packages.wazuh.com/4.9/config.yml; then
        error "Failed to download config.yml"
        return 1
    fi

    log "Configuring installation files..."
    # Update all IP placeholders in one pass
    if ! sed -i \
        -e "s/<indexer-node-ip>/${indexer_ip_address}/g" \
        -e "s/<wazuh-manager-ip>/${manager_ip_address}/g" \
        -e "s/<dashboard-node-ip>/${dashboard_ip_address}/g" \
        config.yml; then
        error "Failed to update config.yml"
        return 1
    fi

    log "Generating certificates for offline mode..."
    if ! sudo ./wazuh-install.sh -g; then
        error "Failed to generate certificates"
        return 1
    fi

    # log "Successfully generated installation files"
    log "Extracting installation files.."
    if ! sudo tar xf wazuh-install-files.tar; then
        error "Error in extracting installation files"
        return 1
    fi

    log "Files extracted successfully.."
    return 0
}



function install_indexer() {
    local ip_address="$1"
    local distro="$2"
    local node_name="node-1"
    local certs_dir="/etc/wazuh-indexer/certs"

    # Validate input
    if [[ -z "$ip_address" ]]; then
        error "IP address parameter is required"
        return 1
    fi

    log "Installing Wazuh indexer..."
    if [[ "$distro" == "deb" ]]; then
        if ! sudo dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb; then
            error "Failed to install Wazuh indexer package"
            return 1
        fi
    elif [[ "$distro" == "rpm" ]]; then
        if ! sudo rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH; then
            error "Failed to import GPG key"
            return 1
        fi
        if ! sudo rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm; then
            error "Failed to install Wazuh indexer package"
            return 1
        fi
    fi

    # Create and configure certificates directory
    sudo mkdir -p "$certs_dir"

    # Move certificates to proper location
    local cert_files=(
        "$node_name.pem:indexer.pem"
        "$node_name-key.pem:indexer-key.pem"
        "admin-key.pem:admin-key.pem"
        "admin.pem:admin.pem"
    )

    for cert in "${cert_files[@]}"; do
        IFS=":" read -r src dst <<< "$cert"
        if ! sudo mv -n "wazuh-install-files/$src" "$certs_dir/$dst"; then
            error "Failed to move certificate: $src"
            return 1
        fi
    done

    # Copy root CA certificate
    if ! sudo cp wazuh-install-files/root-ca.pem "$certs_dir/"; then
        error "Failed to copy root CA certificate"
        return 1
    fi

    # Set proper permissions
    sudo chmod 500 "$certs_dir"
    sudo chmod 400 "$certs_dir"/indexer.pem
    sudo chmod 400 "$certs_dir"/indexer-key.pem
    sudo chmod 400 "$certs_dir"/admin.pem
    sudo chmod 400 "$certs_dir"/admin-key.pem
    sudo chmod 400 "$certs_dir"/root-ca.pem
    sudo chown -R wazuh-indexer:wazuh-indexer "$certs_dir"

    # Configure indexer
    if ! sudo sed -i 's/^network\.host: .*/network.host: "'$ip_address'"/' "$INDEXER_CONFIG_FILE"; then
        error "Failed to update indexer configuration"
        return 1
    fi

    # Start services
    log "Starting Wazuh indexer service..."
    sudo systemctl daemon-reload
    sudo systemctl enable wazuh-indexer
    sudo systemctl start wazuh-indexer

    log "Initializing security settings..."
    if ! sudo /usr/share/wazuh-indexer/bin/indexer-security-init.sh; then
        error "Failed to initialize security settings"
        return 1
    fi

    # Verify installation
    log "Verifying indexer installation..."
    if ! curl -XGET "https://$ip_address:9200" -u admin:admin -k --silent --fail; then
        error "Failed to verify indexer installation"
        return 1
    fi

    log "Wazuh indexer installed and configured successfully"
    return 0
}


function install_manager() {
    local distro="$1"
    log "Installing Wazuh manager..."

    if [ "$distro" = "rpm" ]; then
        if ! sudo rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH || ! rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-manager*.rpm; then
            error "Failed to install Wazuh manager package"
            return 1
        fi
    else
        if ! sudo dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb; then
            error "Failed to install Wazuh manager package"
            return 1
        fi
    fi

    if ! echo 'admin' | sudo /var/ossec/bin/wazuh-keystore -f indexer -k username; then
        error "Failed to set indexer username"
        return 1
    fi

    if ! echo 'admin' | sudo /var/ossec/bin/wazuh-keystore -f indexer -k password; then
        error "Failed to set indexer password"
        return 1
    fi

    log "Starting Wazuh manager service..."
    sudo systemctl daemon-reload
    if ! sudo systemctl enable wazuh-manager; then
        error "Failed to enable Wazuh manager service"
        return 1
    fi

    if ! sudo systemctl start wazuh-manager; then
        error "Failed to start Wazuh manager service"
        return 1
    fi

    log "Wazuh manager installed and configured successfully"
    return 0
}


function install_filebeat() {
    local ip_address="$1"
    local distro="$2"

    if [ -z "$ip_address" ]; then
        error "IP address parameter is required"
        return 1
    fi

    log "Installing Filebeat..."
    if [ "$distro" = "deb" ]; then
        if ! sudo dpkg -i ./wazuh-offline/wazuh-packages/filebeat*.deb; then
            error "Failed to install Filebeat package"
            return 1
        fi
    else
        if ! sudo rpm -ivh ./wazuh-offline/wazuh-packages/filebeat*.rpm; then
            error "Failed to install Filebeat package"
            return 1
        fi
    fi

    # Copy configuration files
    if ! sudo cp ./wazuh-offline/wazuh-files/filebeat.yml /etc/filebeat/ || \
       ! sudo cp ./wazuh-offline/wazuh-files/wazuh-template.json /etc/filebeat/ || \
       ! sudo chmod go+r /etc/filebeat/wazuh-template.json; then
        error "Failed to copy Filebeat configuration files"
        return 1
    fi

    # Configure Filebeat settings
    if ! sudo sed -i 's|^  hosts: \[".*"\]|  hosts: ["'$ip_address':9200"]|' "$FILEBEAT_CONFIG_FILE" || \
       ! sudo sed -i 's|^  username:.*|  username: admin|' "$FILEBEAT_CONFIG_FILE" || \
       ! sudo sed -i 's|^  password:.*|  password: admin|' "$FILEBEAT_CONFIG_FILE"; then
        error "Failed to configure Filebeat settings"
        return 1
    fi

    # Setup keystore
    if ! sudo filebeat keystore create || \
       ! echo admin | sudo filebeat keystore add username --stdin --force || \
       ! echo admin | sudo filebeat keystore add password --stdin --force; then
        error "Failed to setup Filebeat keystore"
        return 1
    fi

    # Extract Wazuh module
    if ! sudo tar -xzf ./wazuh-offline/wazuh-files/wazuh-filebeat-0.4.tar.gz -C /usr/share/filebeat/module; then
        error "Failed to extract Wazuh module"
        return 1
    fi

    # Setup certificates
    local NODE_NAME="wazuh-1"
    sudo mkdir -p /etc/filebeat/certs

    if ! sudo mv -n wazuh-install-files/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem || \
       ! sudo mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem || \
       ! sudo cp wazuh-install-files/root-ca.pem /etc/filebeat/certs/; then
        error "Failed to setup certificates"
        return 1
    fi

    # Set proper permissions
    sudo chmod 500 /etc/filebeat/certs
    sudo chmod 400 /etc/filebeat/certs/filebeat-key.pem
    sudo chmod 400 /etc/filebeat/certs/filebeat.pem
    sudo chmod 400 /etc/filebeat/certs/root-ca.pem
    sudo chown -R root:root /etc/filebeat/certs

    # Start Filebeat service
    log "Starting Filebeat service..."
    sudo systemctl daemon-reload
    if ! sudo systemctl enable filebeat; then
        error "Failed to enable Filebeat service"
        return 1
    fi

    if ! sudo systemctl start filebeat; then
        error "Failed to start Filebeat service"
        return 1
    fi

    # Test output
    if ! sudo filebeat test output; then
        error "Filebeat output test failed"
        return 1
    fi

    log "Filebeat installed and configured successfully"
    return 0
}


function install_dashboard() {
    local ip_address="$1"

    if [ -z "$ip_address" ]; then
        error "IP address parameter is required"
        return 1
    fi

    log "Installing Wazuh dashboard..."
    if [ "$distro" = "rpm" ]; then
        if ! sudo rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH || \
           ! sudo rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm; then
            error "Failed to install Wazuh dashboard package"
            return 1
        fi
    else
        if ! sudo dpkg -i ../cyber-sentinal-dashboard/dev-tools/build-packages/output/deb/wazuh-dashboard_*.deb; then
            error "Failed to install Wazuh dashboard package"
            return 1
        fi
    fi

    # Setup certificates
    local NODE_NAME="dashboard"
    local CERT_DIR="/etc/wazuh-dashboard/certs"

    sudo mkdir -p "$CERT_DIR"

    # Move certificates to proper location
    if ! sudo mv -n "wazuh-install-files/$NODE_NAME.pem" "$CERT_DIR/dashboard.pem" || \
       ! sudo mv -n "wazuh-install-files/$NODE_NAME-key.pem" "$CERT_DIR/dashboard-key.pem" || \
       ! sudo cp "wazuh-install-files/root-ca.pem" "$CERT_DIR/"; then
        error "Failed to setup certificates"
        return 1
    fi

    # Set proper permissions
    sudo chmod 500 "$CERT_DIR"
    sudo chmod 400 "$CERT_DIR"/dashboard.pem
    sudo chmod 400 "$CERT_DIR"/dashboard-key.pem
    sudo chmod 400 "$CERT_DIR"/root-ca.pem
    sudo chown -R wazuh-dashboard:wazuh-dashboard "$CERT_DIR"

    # Update configuration
    if ! sed -i 's|^server.host:.*|server.host: '"$ip_address"'|' "$DASHBOARD_CONFIG_FILE" || \
       ! sed -i 's|^opensearch.hosts:.*|opensearch.hosts: https://'"$ip_address"':9200|' "$DASHBOARD_CONFIG_FILE" || \
       ! sudo sed -i 's|url: https://localhost|url: https://'"$ip_address"'|' "$WAZUH_CONFIG_FILE"; then
        error "Failed to update configuration files"
        return 1
    fi

    # Start service
    log "Starting Wazuh dashboard service..."
    sudo systemctl daemon-reload
    if ! sudo systemctl enable wazuh-dashboard; then
        error "Failed to enable Wazuh dashboard service"
        return 1
    fi

    if ! sudo systemctl start wazuh-dashboard; then
        error "Failed to start Wazuh dashboard service"
        return 1
    fi

    log "Wazuh dashboard installed and configured successfully"
    return 0
}


function generate_offline_files(){
    log "Generating offline files for offline installation."
    local distro="$1"
    if [ ! -f "wazuh-install.sh" ]; then
        curl -sO https://packages.wazuh.com/4.9/wazuh-install.sh
    fi
    sudo chmod 744 wazuh-install.sh

    if [ "$distro" = "rpm" ]; then
        sudo ./wazuh-install.sh -dw rpm
    elif [ "$distro" = "deb" ]; then
        sudo ./wazuh-install.sh -dw deb
    fi

    log "Extracting offline files.."
    if ! sudo tar xf wazuh-offline.tar.gz; then
        error "Error in extracting offline files.."
        exit 1
    fi

    log "Offline files extracted successfully..."
    return 1
}


function build_package(){

    local distro="$1"
    local version="$2"
    log "Started building package..."

    echo -e "${YELLOW}Cleaning up plugins folder..${NC}"
    rm -rf plugins/*
    rm -rf target/
    rm -rf node_modules/

    yarn osd clean
    yarn osd bootstrap
    yarn build --linux --skip-os-packages --release


    log "Cloning wazuh-security-dashboards-plugin...."
    cd plugins/
    git clone -b v4.9.2 https://github.com/Salk-AI/cyber-sentinal-security-dashboards-plugin.git
    cd cyber-sentinal-security-dashboards-plugin/
    yarn
    yarn build

    log "Wazuh security dashboard plugin installation completed..."

    log "Cloning wazuh dashboard plugins..."
    cd ../
    git clone -b prathamesh_dev https://github.com/Salk-AI/cyber-sentinal-dashboard-plugins.git
    cd cyber-sentinal-dashboard-plugins/

    cp -r plugins/* ../
    cd ../main
    yarn
    echo "2.13.0" | yarn build
    cd ../wazuh-core/
    yarn
    echo "2.13.0" | yarn build
    cd ../wazuh-check-updates/
    yarn
    echo "2.13.0" | yarn build

    log "Wazuh dashboard plugin installation completed..."

    log "Zipping the packages..."
    cd ../../../
    if [ -d "packages" ]; then
        rm -rf packages/
    fi

    mkdir packages
    cd packages
    local path_to_zip=$(pwd)
    zip -r -j ./dashboard-package.zip ../cyber-sentinal-dashboard/target/opensearch-dashboards-2.13.0-linux-x64.tar.gz
    zip -r -j ./security-package.zip ../cyber-sentinal-dashboard/plugins/wazuh-security-dashboards-plugin/build/security-dashboards-2.13.0.0.zip
    zip -r -j ./wazuh-package.zip ../cyber-sentinal-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-2.13.0.zip ../cyber-sentinal-dashboard/plugins/main/build/wazuh-2.13.0.zip ../cyber-sentinal-dashboard/plugins/wazuh-core/build/wazuhCore-2.13.0.zip

    log "Started building package..."
    cd ../wazuh-dashboard/dev-tools/build-packages/
    ./build-packages.sh -v $version -r 1 --$distro -a file://$path_to_zip/wazuh-package.zip -s file://$path_to_zip/security-package.zip -b file://$path_to_zip/dashboard-package.zip
}

function move_to_working_dir(){
    cd ../scripts
}

main() {
    # Define variables
    cd ../
    if [ ! -d "scripts" ]; then
        mkdir scripts
    fi

    move_to_working_dir

    local distro=""
    local to_do=""
    local component=""
    local indexer_ip=""
    local manager_ip=""
    local dashboard_ip=""
    local filebeat_ip=""
    curl -sO https://packages.wazuh.com/4.9/wazuh-install.sh

    # Parse named arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --build-package)
                distro="$2"
                version="$3"
                build_package "$distro" "$version"
                exit 0
                ;;
            --offline-files)
                distro="$2"
                generate_offline_files "$distro"
                exit 0
                ;;
            --generate-install-files)
                indexer_ip="$2"
                manager_ip="$3"
                dashboard_ip="$4"
                generate_install_files "$indexer_ip" "$manager_ip" "$dashboard_ip"
                exit 0
                ;;
            --distro)
                distro="$2"
                shift 2
                ;;
            --indexer-ip)
                indexer_ip="$2"
                shift 2
                ;;
            --manager-ip)
                manager_ip="$2"
                shift 2
                ;;
            --dashboard-ip)
                dashboard_ip="$2"
                shift 2
                ;;
            --filebeat-ip)
                filebeat_ip="$2"
                shift 2
                ;;
            --action)
                to_do="$2"
                shift 2
                ;;
            --component)
                component="$2"
                shift 2
                ;;
            *)
                echo -e "${RED}Unknown option: $1${NC}"
                exit 1
                ;;
        esac
    done

    # Validate required arguments
    if [[ -z "$distro" ]]; then
        echo -e "${RED}Error: --distro is required.${NC}"
        exit 1
    fi

    # Check prerequisites
    check_root
    # check_dependencies

    # Handle uninstall case
    if [[ "$to_do" == "uninstall" ]]; then
        echo -e "${YELLOW}Uninstalling Wazuh components...${NC}"
        delete_components "$component" "$distro"
        echo -e "${GREEN}Uninstallation completed successfully.${NC}"
        exit 0
    fi

    # Install components based on selection
    echo -e "${GREEN}Starting installation process...${NC}"
    case "$component" in
        all)
            if [[ -z "$indexer_ip" || -z "$manager_ip" || -z "$dashboard_ip" || -z "$filebeat_ip" ]]; then
                echo -e "${RED}Error: All IP addresses required for full installation.${NC}"
                exit 1
            fi
            echo -e "${YELLOW}Installing all Wazuh components...${NC}"
            install_indexer "$indexer_ip" "$distro" && \
            install_manager "$distro" && \
            install_filebeat "$filebeat_ip" "$distro" && \
            install_dashboard "$dashboard_ip" "$distro"
            ;;
        indexer)
            if [[ -z "$indexer_ip" ]]; then
                echo -e "${RED}Error: --indexer-ip required for indexer installation.${NC}"
                exit 1
            fi
            echo -e "${YELLOW}Installing Wazuh indexer...${NC}"
            install_indexer "$indexer_ip" "$distro"
            ;;
        manager)
            echo -e "${YELLOW}Installing Wazuh manager...${NC}"
            install_manager "$distro"
            ;;
        filebeat)
            if [[ -z "$filebeat_ip" ]]; then
                echo -e "${RED}Error: --filebeat-ip required for filebeat installation.${NC}"
                exit 1
            fi
            echo -e "${YELLOW}Installing Filebeat...${NC}"
            install_filebeat "$filebeat_ip" "$distro"
            ;;
        dashboard)
            if [[ -z "$dashboard_ip" ]]; then
                echo -e "${RED}Error: --dashboard-ip required for dashboard installation.${NC}"
                exit 1
            fi
            echo -e "${YELLOW}Installing Wazuh dashboard...${NC}"
            install_dashboard "$dashboard_ip" "$distro"
            ;;
        *)
            echo -e "${RED}Error: Invalid component. Use one of: all, indexer, manager, filebeat, dashboard.${NC}"
            exit 1
            ;;
    esac

    rm -rf wazuh-install.sh
    cd ../
    rm -rf scripts/


    echo -e "${GREEN}Installation completed successfully.${NC}"
    return 0
}



main "$@"

