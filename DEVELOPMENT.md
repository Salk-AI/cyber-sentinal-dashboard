
# Wazuh Dashboard Development Environment Setup

Wazuh is an open-source security platform designed for **threat detection**, **compliance management**, and **incident response**. It provides a unified platform for monitoring and securing diverse IT environments, including cloud, on-premises, and hybrid infrastructures.

This guide will walk you through setting up a local development environment for contributing to Wazuh's frontend and testing your changes.

---

## Prerequisites

Ensure the following requirements are met before proceeding:

- **Node.js**: Version >= 14 and < 19  
  *(Check your Node.js version using `node -v`.)*
- **Docker**: Installed and configured  
  *(Refer to the [official Docker installation guide](https://docs.docker.com/get-docker/) if needed.)*
- **Yarn**: Installed globally  
  *(Install using `npm install -g yarn`.)*

---

## Setting Up the Development Environment

The main frontend code for Wazuh is available in the following repository:  
[**Wazuh Dashboard Frontend Code**](https://github.com/Salk-AI/wazuh-dashboard-plugins)

Follow these steps to set up the development environment:

### Step 1: Clone the Repository
Clone the repository into the `plugins` folder of your parent directory:
```bash
cd plugins
git clone -b prathamesh_dev https://github.com/Salk-AI/wazuh-dashboard-plugins
cd wazuh-dashboard-plugins
```

### Step 2: Install Dependencies
Navigate through the required directories and install dependencies:
```bash
cd plugins/main
yarn
cd ../wazuh-core
yarn
cd ../wazuh-check-updates
yarn
```

### Step 3: Set Up the Development Environment with Docker
Run the provided setup script to initialize the Docker environment:
```bash
cd /path/to/wazuh-dashboard-plugins/
chmod +x docker-setup.sh
```

### Step 4: Use Docker Commands
The following commands can be used to manage the Docker environment:

- **Start the environment**:
  ```bash
  ./docker-setup.sh up
  ```

- **Stop the containers**:
  ```bash
  ./docker-setup.sh stop
  ```

- **Restart the containers**:
  ```bash
  ./docker-setup.sh restart
  ```

- **Clean all images, networks, and containers**:
  ```bash
  ./docker-setup.sh clean
  ```

---

## Accessing the Dashboard
Once the Docker environment is up and running, you can access the Wazuh Dashboard at:  
**[http://localhost:5601](http://localhost:5601)**

### Default Credentials:
- **Username**: `admin`
- **Password**: `admin`

---

## Contribution Guide

If you’re planning to contribute to the Wazuh frontend, ensure that:
- Your code is clean and well-documented.
- You follow the existing project structure and conventions.
- All changes are tested locally before submitting a pull request.

For further information, refer to the repository's contribution guidelines.

---

## Support

For any issues or questions, feel free to raise an issue in the repository or contact the maintainers directly.

---

> **Happy Developing!** 🎉
