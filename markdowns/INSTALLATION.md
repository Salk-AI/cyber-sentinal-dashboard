
# Wazuh Installation and Management Script

This guide provides comprehensive instructions for installing, managing, and understanding Wazuh. It includes a detailed explanation of the bash script functionalities, Wazuh architecture, and step-by-step usage for both individual and full installations.

---

## Table of Contents

1. [Understanding Wazuh](#understanding-wazuh)
   - [How It Works](#how-it-works)
   - [Architecture](#architecture)
2. [Script Overview](#script-overview)
   - [Features](#features)
   - [Requirements](#requirements)
   - [General Usage](#general-usage)
3. [Commands and Examples](#commands-and-examples)
   - [Building Packages](#building-packages)
   - [Generating Files](#generating-files)
   - [Installing All Components](#installing-all-components)
   - [Installing Individual Components](#installing-individual-components)
   - [Uninstalling Components](#uninstalling-components)
4. [Accessing the Dashboard](#accessing-the-dashboard)
5. [Support and Contribution](#support-and-contribution)

---

## Understanding Wazuh

Wazuh is a powerful open-source security platform providing **threat detection**, **compliance management**, and **incident response** capabilities.

### How It Works

Wazuh operates through three main components:

1. **Indexer**: Stores and indexes data for analysis and search.
2. **Manager**: Handles agent communications, log analysis, and event correlation.
3. **Dashboard**: Offers a user-friendly interface for monitoring and managing Wazuh.

---

### Architecture

The following visual representation explains the interaction between Wazuh components:

![Wazuh Architecture](assets/deployment-architecture1.png)

---

## Script Overview

### Features

- Build packages for specific distributions and versions.
- Generate offline installation files.
- Generate installation files using specified IP addresses.
- Install Wazuh components: **Indexer**, **Manager**, **Filebeat**, and **Dashboard**.
- Uninstall specific components.

### Requirements

- **Root Privileges**: Run the script with `sudo` or as the root user.

### General Usage

Make the script executable and run it:

```bash
chmod +x wazuh_setup.sh
sudo ./wazuh_setup.sh [OPTIONS]
```

---

## Commands and Examples

Step 1. move up a directory and make a new folder, name:= "scripts" and cp "wazuh_setup.sh" in "scripts" folder.

### Building Packages

Build a package for a specific distribution and version:

```bash
sudo ./wazuh_setup.sh --build-package <distro> <version>
```

### Generating Files

#### Generate Offline Installation Files
```bash
sudo ./wazuh_setup.sh --offline-files <distro>
```

#### Generate Installation Files with IPs
```bash
sudo ./wazuh_setup.sh --generate-install-files <indexer-ip> <manager-ip> <dashboard-ip>
```


### Installing All Components

To install all components with their respective IP addresses:

```bash
sudo ./wazuh_setup.sh --distro <distro> --action install --component all --indexer-ip <indexer-ip> --manager-ip <manager-ip> --dashboard-ip <dashboard-ip> --filebeat-ip <filebeat-ip>
```

### Installing Individual Components

Install components individually as follows:

#### Install Indexer
```bash
sudo ./wazuh_setup.sh --distro <distro> --action install --component indexer --indexer-ip <indexer-ip>
```

#### Install Manager
```bash
sudo ./wazuh_setup.sh --distro <distro> --action install --component manager
```

#### Install Filebeat
```bash
sudo ./wazuh_setup.sh --distro <distro> --action install --component filebeat --filebeat-ip <filebeat-ip>
```

#### Install Dashboard
```bash
sudo ./wazuh_setup.sh --distro <distro> --action install --component dashboard --dashboard-ip <dashboard-ip>
```

### Uninstalling Components

To uninstall any component:

```bash
sudo ./wazuh_setup.sh --distro <distro> --action uninstall --component <component>
```

Replace `<component>` with one of: `all`, `indexer`, `manager`, `filebeat`, or `dashboard`.



---

## Accessing the Dashboard

After installation, access the Wazuh Dashboard using:

**[http://localhost](http://localhost)**

### Default Credentials:
- **Username**: `admin`
- **Password**: `admin`

---

## Support and Contribution

For any issues during installation or setup, refer to:

- [Official Wazuh Documentation](https://documentation.wazuh.com/)
- Raise an issue in this repository.

If you wish to contribute:
- Ensure your code adheres to existing standards.
- Test your changes before submitting a pull request.

> **Secure your systems with Wazuh! 🚀**
