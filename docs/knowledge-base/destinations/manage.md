# Managing Destinations

Learn how to manage your existing destinations in Coolify, including editing, monitoring, and deleting them.

## Viewing Destinations

### Destinations Overview
Navigate to **Destinations** to see all your destinations across all servers:
- Destination name and server
- Resource count (applications, databases, services)
- Network status and health
- Quick actions for each destination

<ZoomableImage src="/images/destinations/destinations-overview.webp" />

### Server-Specific Destinations
From **Servers** → **[Server Name]** → **Destinations**:
- View destinations on a specific server
- See network details and configuration
- Monitor resource usage per destination

## Editing Destination Settings

Click on a destination to access its management page where you can:

### Basic Information
- **Name**: Update the destination display name
- **Network**: View the Docker network name (read-only)
- **Server IP**: View the server IP address

### Resource Management
View all resources deployed to this destination:
- **Applications**: Web apps and APIs
- **Databases**: All database types
- **Services**: One-click services

<ZoomableImage src="/images/destinations/destination-resources.webp" />

## Multi-Server Deployments

For applications deployed to multiple destinations:

### Primary Destination
- The main deployment target
- Where the application was originally deployed
- Cannot be removed while it remains primary

### Additional Destinations
- Secondary deployment targets
- Can be added or removed dynamically
- Useful for load distribution and redundancy

### Managing Additional Servers

#### Adding a Server
1. Go to the application's **Destination** tab
2. Click **+ Add Server** 
3. Select the destination and server
4. Deploy to the additional destination

#### Removing a Server
1. Navigate to **Destination** tab
2. Find the server to remove
3. Click **Remove Server**
4. Enter your password for confirmation
5. Confirm the removal

#### Promoting a Destination
- Make a secondary destination the primary one
- Useful for server migrations
- The old primary becomes a secondary destination

<ZoomableImage src="/images/destinations/multi-server-management.webp" />

## Monitoring and Status

### Resource Status
Each destination shows:
- **Running applications** and their health
- **Database status** and connectivity
- **Service availability** and performance
- **Network connectivity** status

### Container Management
From the destination page, you can:
- **View logs** for all containers
- **Execute commands** in running containers
- **Restart services** individually
- **Monitor resource usage**

### Network Operations
- **Refresh status** to update container states
- **Restart proxy connections** if needed
- **View network configuration** details

## Destination Limits and Quotas

### Resource Limits
- No hard limits on resources per destination
- Limited by server capacity and Docker constraints
- Monitor resource usage to prevent overloading

### Network Limits
- Each destination uses one Docker network
- Network names must be unique per server
- Consider network performance for high-traffic applications

## Troubleshooting

### Common Issues

#### Destination Not Showing Resources
- Refresh the destination status
- Check if containers are actually running
- Verify network connectivity

#### Network Connectivity Problems
- Restart the proxy connection
- Check firewall rules on the server
- Verify Docker network configuration

#### Resource Deployment Failures
- Check server disk space and memory
- Verify destination is accessible
- Review deployment logs for errors

### Recovery Operations
- **Refresh Networks**: Reconnect proxy to networks
- **Restart Containers**: Restart all destination resources
- **Network Recreation**: Advanced troubleshooting option

## Security Considerations

### Network Isolation
- Resources in different destinations cannot communicate by default
- Use environment variables for cross-destination communication
- Consider security implications of shared networks

### Access Control
- Destination access follows team permissions
- Only team members can manage destinations
- Server access controls apply to destination management

## Best Practices

1. **Naming Convention**: Use descriptive names for destinations
2. **Resource Organization**: Group related applications in the same destination
3. **Monitoring**: Regularly check destination health and resource usage
4. **Documentation**: Document purpose and configuration of each destination
5. **Cleanup**: Remove unused destinations to reduce server load