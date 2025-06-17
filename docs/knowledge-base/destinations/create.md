# Creating Destinations

This guide shows you how to create new destinations in Coolify for deploying your applications and databases.

## Prerequisites

Before creating a destination, ensure you have:
- At least one server connected to Coolify
- Appropriate permissions to manage destinations
- Basic understanding of Docker networks

## Creating a New Destination

### Method 1: From Destinations Page

1. Navigate to **Destinations** in the main navigation
2. Click the **+ Add** button
3. Fill in the destination details:
   - **Server**: Select the target server
   - **Name**: A descriptive name for the destination
   - **Network**: Docker network name (auto-generated)
   - **Type**: Choose between Standalone Docker or Docker Swarm

<ZoomableImage src="/images/destinations/create-destination.webp" />

### Method 2: From Server Management

1. Go to **Servers** and select your server
2. Navigate to the **Destinations** tab
3. Click **+ Add Destination**
4. Configure the destination settings

## Configuration Options

### Destination Name
- Must be unique per server
- Auto-generated based on server name and network ID
- Can be customized to be more descriptive
- Format: `server-name-network-id`

### Network Name
- Automatically generated unique identifier
- Uses CUID2 format for uniqueness
- Cannot be changed after creation
- Used as the actual Docker network name

### Server Selection
- Choose from available servers in your team
- Server must be online and accessible
- Determines where the Docker network will be created

### Destination Type

#### Standalone Docker
- **Default choice** for most users
- Creates a standard Docker network
- Suitable for single-server deployments
- Supports bridge and custom networks

#### Docker Swarm
- For cluster environments only
- Creates overlay networks for multi-node communication
- Requires Docker Swarm mode to be enabled
- Advanced feature for clustered deployments

## Automatic Network Creation

When you create a destination, Coolify automatically:

1. **Creates the Docker network** on the target server
2. **Connects the proxy** (Traefik/Caddy) to the network
3. **Configures network settings** for proper isolation
4. **Enables inter-container communication** within the network

## Network Scanning

You can also scan existing Docker networks on a server and add them as destinations:

1. Go to **Server** → **Destinations**
2. Click **Scan Networks**
3. Select existing networks to import
4. Coolify will create destination entries for them

<ZoomableImage src="/images/destinations/scan-networks.webp" />

## Validation and Errors

Common errors when creating destinations:

- **Network already exists**: The network name conflicts with an existing one
- **Server unavailable**: The target server is offline or unreachable
- **Permission denied**: Insufficient Docker permissions on the server
- **Invalid network name**: Network name contains invalid characters

## After Creation

Once created, your destination will:
- Appear in the destinations list
- Be available for deploying applications and databases
- Have network connectivity configured automatically
- Be ready to host your containerized resources

## Next Steps

- [Deploy an application](../applications/) to your new destination
- [Create a database](../databases/) in the destination
- [Configure multiple destinations](./multi-server.md) for high availability