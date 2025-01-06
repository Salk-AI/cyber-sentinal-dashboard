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
declare -g PATH_TO_SCRIPTS=""
declare -g INDEXER_IP_ADDR=""
declare -g MANAGER_IP_ADDR=""
declare -g DASHBOARD_IP_ADDR=""


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
    cd "${PATH_TO_SCRIPTS}"
    local distro="$1"
    local supported_distros=("deb" "rpm")

    # Validate input distribution
    if [[ ! " ${supported_distros[@]} " =~ " ${distro} " ]]; then
        error "Unsupported distribution '$distro'. Supported options are: ${supported_distros[*]}"
        return 1
    fi

    # Check if wazuh-install.sh exists and is executable
    if [[ ! -x "./wazuh-install.sh" ]]; then
        sudo chmod 744 wazuh-install.sh
    fi

    log "Generating offline installation files for $distro distribution..."

    if ! sudo ./wazuh-install.sh -dw "$distro"; then
        error "Failed to generate offline files"
        return 1
    fi

    log "Successfully generated offline files for $distro distribution"
    sudo tar xf wazuh-offline.tar.gz
    sudo chmod 777 -R ./wazuh-offline/
    return 0
}



function generate_install_files() {

    cd "${PATH_TO_SCRIPTS}"

    INDEXER_IP_ADDR="$1"
    MANAGER_IP_ADDR="$2"
    DASHBOARD_IP_ADDR="$3"

    log "Downloading config.yml file..."
    if ! curl -sO https://packages.wazuh.com/4.9/config.yml; then
        error "Failed to download config.yml"
        return 1
    fi

    log "Configuring installation files..."
    # Update all IP placeholders in one pass
    if ! sed -i \
        -e "s/<indexer-node-ip>/${INDEXER_IP_ADDR}/g" \
        -e "s/<wazuh-manager-ip>/${MANAGER_IP_ADDR}/g" \
        -e "s/<dashboard-node-ip>/${DASHBOARD_IP_ADDR}/g" \
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
    sudo chmod 777 -R ./wazuh-install-files

    log "Files extracted successfully.."
    return 0
}



function install_indexer() {
    cd "${PATH_TO_SCRIPTS}"
    INDEXER_IP_ADDR="$1"
    local distro="$2"
    local node_name="node-1"
    local certs_dir="/etc/wazuh-indexer/certs"

    # Validate input
    if [[ -z "$INDEXER_IP_ADDR" ]]; then
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
    sudo mkdir "$certs_dir"

    # Move certificates to proper location
    sudo mv -n wazuh-install-files/$node_name.pem /etc/wazuh-indexer/certs/indexer.pem
    sudo mv -n wazuh-install-files/$node_name-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
    sudo mv wazuh-install-files/admin-key.pem /etc/wazuh-indexer/certs/
    sudo mv wazuh-install-files/admin.pem /etc/wazuh-indexer/certs/
    sudo cp wazuh-install-files/root-ca.pem /etc/wazuh-indexer/certs/
    sudo chmod 500 /etc/wazuh-indexer/certs
    sudo chmod 400 /etc/wazuh-indexer/certs/indexer.pem
    sudo chmod 400 /etc/wazuh-indexer/certs/indexer-key.pem
    sudo chmod 400 /etc/wazuh-indexer/certs/admin-key.pem
    sudo chmod 400 /etc/wazuh-indexer/certs/admin.pem
    sudo chmod 400 /etc/wazuh-indexer/certs/root-ca.pem
    sudo chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

    # Configure indexer
    if ! sudo sed -i 's/^network\.host: .*/network.host: "'$INDEXER_IP_ADDR'"/' "$INDEXER_CONFIG_FILE"; then
        error "Failed to update indexer configuration"
        return 1
    fi

    # Start services
    log "Starting Wazuh indexer service..."
    sudo systemctl daemon-reload
    sudo systemctl enable wazuh-indexer
    sudo systemctl start wazuh-indexer

    log "Initializing security settings..."
    sudo /usr/share/wazuh-indexer/bin/indexer-security-init.sh

    # Verify installation
    log "Verifying indexer installation..."
    # if ! curl -XGET "https://$INDEXER_IP_ADDR:9200" -u admin:admin -k --silent --fail; then
    #     error "Failed to verify indexer installation"
    #     return 1
    # fi

    curl -XGET "https://$INDEXER_IP_ADDR:9200" -u admin:admin -k

    log "Wazuh indexer installed and configured successfully"
    return 0
}


function install_manager() {
    cd "${PATH_TO_SCRIPTS}"
    local distro="$1"
    log "Installing Wazuh manager..."

    if [ "$distro" = "rpm" ]; then
        if ! sudo rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH || ! sudo rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-manager*.rpm; then
            error "Failed to install Wazuh manager package"
            return 1
        fi
    else
        if ! sudo dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb; then
            error "Failed to install Wazuh manager package"
            return 1
        fi
    fi

    echo 'admin' | sudo /var/ossec/bin/wazuh-keystore -f indexer -k username
    echo 'admin' | sudo /var/ossec/bin/wazuh-keystore -f indexer -k password

    log "Starting Wazuh manager service..."
    sudo systemctl daemon-reload
    sudo systemctl enable wazuh-manager
    sudo systemctl start wazuh-manager

    log "Wazuh manager installed and configured successfully"
    return 0
}


function install_filebeat() {
    cd "${PATH_TO_SCRIPTS}"
    MANAGER_IP_ADDR="$1"
    local distro="$2"

    if [ -z "$MANAGER_IP_ADDR" ]; then
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
    if ! sudo sed -i 's|^  hosts: \[".*"\]|  hosts: ["'$MANAGER_IP_ADDR':9200"]|' "$FILEBEAT_CONFIG_FILE" || \
       ! sudo sed -i 's|^  username:.*|  username: admin|' "$FILEBEAT_CONFIG_FILE" || \
       ! sudo sed -i 's|^  password:.*|  password: admin|' "$FILEBEAT_CONFIG_FILE"; then
        error "Failed to configure Filebeat settings"
        return 1
    fi

    # Setup keystore
    sudo filebeat keystore create
    echo admin | sudo filebeat keystore add username --stdin --force
    echo admin | sudo filebeat keystore add password --stdin --force

    # Extract Wazuh module
    if ! sudo tar -xzf ./wazuh-offline/wazuh-files/wazuh-filebeat-0.4.tar.gz -C /usr/share/filebeat/module; then
        error "Failed to extract Wazuh module"
        return 1
    fi

    # Setup certificates
    local NODE_NAME="wazuh-1"
    sudo mkdir -p /etc/filebeat/certs

    sudo mv -n wazuh-install-files/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
    sudo mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
    sudo cp wazuh-install-files/root-ca.pem /etc/filebeat/certs/

    # Set proper permissions
    sudo chmod 500 /etc/filebeat/certs
    sudo chmod 400 /etc/filebeat/certs/filebeat-key.pem
    sudo chmod 400 /etc/filebeat/certs/filebeat.pem
    sudo chmod 400 /etc/filebeat/certs/root-ca.pem
    sudo chown -R root:root /etc/filebeat/certs

    # Start Filebeat service
    log "Starting Filebeat service..."
    sudo systemctl daemon-reload
    sudo systemctl enable filebeat
    sudo systemctl start filebeat

    # Test output
    sudo filebeat test output

    log "Filebeat installed and configured successfully"
    return 0
}


function change_indexer_name(){
    MANAGER_IP_ADDR="$1"
    cd "${PATH_TO_SCRIPTS}"
    log "Changing indexer names.."

    sudo systemctl stop filebeat

    curl -so template.json https://raw.githubusercontent.com/wazuh/wazuh/v4.9.2/extensions/elasticsearch/7.x/wazuh-template.json

    if ! sed -i 's/wazuh-alerts-4\.x-\*/cyberSentinal-alerts-4.x-*/g; s/wazuh-archives-4\.x-\*/cyberSentinal-archives-4.x-*/g' template.json; then
        error "Failed to update index patterns in template.json"
        return 1
    fi

    log "Successfully updated index patterns in template.json"

    curl -XPUT -k -u admin:admin "https://${MANAGER_IP_ADDR}:9200/_template/wazuh" -H 'Content-Type: application/json' -d @template.json


    log "Updating Filebeat manifest file..."
    
    if ! sudo sed -i 's/default: wazuh-alerts-4.x-/default: cyberSentinal-alerts-4.x-/' /usr/share/filebeat/module/wazuh/alerts/manifest.yml; then
        error "Failed to update Filebeat manifest file"
        return 1
    fi


    sudo systemctl restart filebeat
    sudo systemctl restart wazuh-manager
    sudo systemctl restart wazuh-indexer
    sudo systemctl restart wazuh-dashboard
}


function install_dashboard() {
    cd "${PATH_TO_SCRIPTS}"
    DASHBOARD_IP_ADDR="$1"

    if [ -z "$DASHBOARD_IP_ADDR" ]; then
        error "IP address parameter is required"
        return 1
    fi

    log "Installing Wazuh dashboard..."
    if [ "$distro" = "rpm" ]; then
        if ! sudo rpm --import ./wazuh-offline/wazuh-files/GPG-KEY-WAZUH || \
           ! sudo rpm -ivh ../cyber-sentinal-dashboard/dev-tools/build-packages/output/rpm/wazuh-dashboard*.rpm; then
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
    local DASHBOARD_CERT_DIR="/etc/wazuh-dashboard/certs"

    sudo mkdir "$DASHBOARD_CERT_DIR"

    # Move certificates to proper location
    sudo mv -n "wazuh-install-files/$NODE_NAME.pem" "$DASHBOARD_CERT_DIR/dashboard.pem"
    sudo mv -n "wazuh-install-files/$NODE_NAME-key.pem" "$DASHBOARD_CERT_DIR/dashboard-key.pem"
    sudo cp "wazuh-install-files/root-ca.pem" "$DASHBOARD_CERT_DIR/"

    # Set proper permissions
    sudo chmod 500 "$DASHBOARD_CERT_DIR"
    sudo chmod 400 "$DASHBOARD_CERT_DIR"/dashboard.pem
    sudo chmod 400 "$DASHBOARD_CERT_DIR"/dashboard-key.pem
    sudo chmod 400 "$DASHBOARD_CERT_DIR"/root-ca.pem
    sudo chown -R wazuh-dashboard:wazuh-dashboard "$DASHBOARD_CERT_DIR"

    # Update configuration
    if ! sed -i 's|^server.host:.*|server.host: '"$DASHBOARD_IP_ADDR"'|' "$DASHBOARD_CONFIG_FILE" || \
       ! sed -i 's|^opensearch.hosts:.*|opensearch.hosts: https://'"$DASHBOARD_IP_ADDR"':9200|' "$DASHBOARD_CONFIG_FILE"; then
        error "Failed to update configuration files"
        return 1
    fi

    # Start service
    log "Starting Wazuh dashboard service..."
    sudo systemctl daemon-reload
    sudo systemctl enable wazuh-dashboard
    sudo systemctl start wazuh-dashboard

    if ! sudo sed -i 's|url: https://localhost|url: https://'"$DASHBOARD_IP_ADDR"'|' "$WAZUH_CONFIG_FILE"; then
        error "Failed to update ${WAZUH_CONFIG_FILE}"
        return 1
    fi

    # copy_assisted_plugins

    log "Wazuh dashboard installed and configured successfully"
    return 0
}

function install_dashboard_with_assisted_installation()
{
    log "Setting up initial setup for cyber-sentinal..."
    cd "${PATH_TO_SCRIPTS}"
    sudo bash wazuh-install.sh --offline-installation --wazuh-indexer node-1
    sudo bash wazuh-install.sh --offline-installation --start-cluster
    sudo tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -P "\'admin\'" -A 1
    sudo bash wazuh-install.sh --offline-installation --wazuh-server wazuh-1
    sudo bash wazuh-install.sh --offline-installation --wazuh-dashboard dashboard

    sudo chmod 777 -R /usr/share/wazuh-dashboard
    cd "${PATH_SCRIPTS}"
    mkdir assisted_plugins
    cd assisted_plugins
    sudo cp -r /usr/share/wazuh-dashboard/plugins/* ./
}


function copy_assisted_plugins()
{
    cd "${PATH_TO_SCRIPTS}/assisted_plugins/"

    # Set permissions on destination
    sudo chmod 777 -R /usr/share/wazuh-dashboard
    cd /usr/share/wazuh-dashboard/plugins || return 1

    # Remove existing plugins
    local plugins=(
        "alertingDashboards"
        "ganttChartDashboards" 
        "notificationsDashboards"
        "securityDashboards"
        "customImportMapDashboards"
        "indexManagementDashboards"
        "reportsDashboards"
    )

    for plugin in "${plugins[@]}"; do
        sudo rm -rf "/usr/share/wazuh-dashboard/plugins/$plugin"
        sudo cp -r "$PATH_TO_SCRIPTS/assisted_plugins/$plugin" /usr/share/wazuh-dashboard/plugins/
    done


    sudo rm -rf "/usr/share/wazuh-dashboard/plugins/alertingDashboards"
    sudo cp -r "$PATH_TO_SCRIPTS/assisted_plugins/alertingDashboards" /usr/share/wazuh-dashboard/plugins/

    # Restart dashboard service
    sudo systemctl daemon-reload
    sudo systemctl enable wazuh-dashboard
    sudo systemctl start wazuh-dashboard

    log "Successfully copied and configured assisted plugins"
    return 0
}


function setup_dashboard()
{
    local distro="$1"
    INDEXER_IP_ADDR="$2"
    MANAGER_IP_ADDR="$3"
    DASHBOARD_IP_ADDR="$4"

    generate_offline_files "$distro"
    generate_install_files "$INDEXER_IP_ADDR" "$MANAGER_IP_ADDR" "$DASHBOARD_IP_ADDR"
    install_dashboard_with_assisted_installation
    delete_components "all" "$distro"
    cd "${PATH_TO_SCRIPTS}"
    sudo rm -rf wazuh-offline/ wazuh-install-files/
    sudo tar xf wazuh-offline.tar.gz
    sudo tar xf wazuh-install-files.tar
    install_indexer "$INDEXER_IP_ADDR" "$distro"
    install_manager "$distro"
    install_filebeat "$MANAGER_IP_ADDR" "$distro"
    install_dashboard "$DASHBOARD_IP_ADDR"
    copy_assisted_plugins
    change_indexer_name "$MANAGER_IP_ADDR"
}

function build_package(){

    local distro="$1"
    # we are in scripts directory
    # move out and clone dashboard
    cd "${PATH_TO_SCRIPTS}"
    cd ../
    if [ -d "cyber-sentinal-dashboard" ]; then
        rm -rf cyber-sentinal-dashboard
    fi

    log "Cloning cyber-sentinal-dashboard..."
    git clone -b prathamesh_dev https://github.com/Salk-AI/cyber-sentinal-dashboard.git
    cd cyber-sentinal-dashboard

    log "Started building package..."

    # echo -e "${YELLOW}Cleaning up plugins folder..${NC}"
    # rm -rf plugins/*
    # rm -rf target/
    # rm -rf node_modules/

    # yarn osd clean

    # step 1
    yarn osd bootstrap
    yarn build --linux --skip-os-packages --release

    # step 2
    log "Cloning cyber-sentinal-security-dashboards-plugin...."
    cd plugins/
    git clone -b v4.9.2 https://github.com/Salk-AI/cyber-sentinal-security-dashboards-plugin.git
    cd cyber-sentinal-security-dashboards-plugin/
    yarn
    yarn build

    log "Wazuh security dashboard plugin installation completed..."

    log "Cloning cyber-sentinal dashboard plugins..."
    cd ../

    # step 3
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
    zip -r -j ./security-package.zip ../cyber-sentinal-dashboard/plugins/cyber-sentinal-security-dashboards-plugin/build/security-dashboards-2.13.0.0.zip
    zip -r -j ./wazuh-package.zip ../cyber-sentinal-dashboard/plugins/wazuh-check-updates/build/wazuhCheckUpdates-2.13.0.zip ../cyber-sentinal-dashboard/plugins/main/build/wazuh-2.13.0.zip ../cyber-sentinal-dashboard/plugins/wazuh-core/build/wazuhCore-2.13.0.zip

    log "Started building package..."
    cd ../cyber-sentinal-dashboard/dev-tools/build-packages/
    ./build-packages.sh -v 4.9.2 -r 1 --$distro -a file://$path_to_zip/wazuh-package.zip -s file://$path_to_zip/security-package.zip -b file://$path_to_zip/dashboard-package.zip
    cd "${PATH_TO_SCRIPTS}"
}

function move_to_working_dir(){
    cd ../
    if [ ! -d "scripts" ]; then
        mkdir scripts
    fi
    cd scripts
    PATH_TO_SCRIPTS=$(pwd)
}

main() {
    # Define variables
    # move_to_working_dir
    PATH_TO_SCRIPTS=$(pwd)

    local distro=""
    local to_do=""
    local component=""
    local indexer_ip=""
    local manager_ip=""
    local dashboard_ip=""
    local filebeat_ip=""
    curl -sO https://packages.wazuh.com/4.9/wazuh-install.sh
    sudo chmod 744 wazuh-install.sh

    # Parse named arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --build-package)
                distro="$2"
                version="$3"
                build_package "$distro"
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
            if [[ -z "$indexer_ip" || -z "$manager_ip" || -z "$dashboard_ip" ]]; then
                echo -e "${RED}Error: All IP addresses required for full installation.${NC}"
                exit 1
            fi
            # echo -e "${YELLOW}Installing all Wazuh components...${NC}"
            # install_indexer "$indexer_ip" "$distro" && \
            # install_manager "$distro" && \
            # install_filebeat "$manager_ip" "$distro" && \
            # install_dashboard "$dashboard_ip" "$distro"
            setup_dashboard "$distro" "$indexer_ip" "$manager_ip" "$dashboard_ip"
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

    
    cd cyber-sentinal-dashboard
    copy_assisted_plugins

    change_indexer_name

    rm -rf wazuh-install.sh
    cd ../
    rm -rf scripts/

    echo -e "${GREEN}Installation completed successfully.${NC}"
    return 0
}



main "$@"

