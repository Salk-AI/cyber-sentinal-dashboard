#!/bin/bash

function build_package(){

    current_path="$(pwd)"

    local distro="$1"
    # we are in scripts directory
    # move out and clone dashboard
    if [ -d "cyber-sentinal-dashboard" ]; then
        rm -rf cyber-sentinal-dashboard
    fi

    log "Cloning cyber-sentinal-dashboard..."
    git clone -b prathamesh_dev https://github.com/Salk-AI/cyber-sentinal-dashboard.git
    cd cyber-sentinal-dashboard

    log "Started building package..."

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

    cd current_path

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


build_package "$1"