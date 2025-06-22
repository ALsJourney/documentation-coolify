# Managing Destinations

Learn how to manage your existing destinations in Coolify, including editing, monitoring, and deleting them.

## Viewing Destinations

### Destinations Overview

Navigate to **Destinations** to see all your destinations across all servers.
<ZoomableImage src="/docs/images/destinations/destinations-overview.webp" />

### Server-Specific Destinations

Navigate to **Servers** → **[Server Name]** → **Destinations** to view destinations specific to that server.
<ZoomableImage src="/docs/images/destinations/destinations-server-overview.webp" />

## Editing Destination Settings

<ZoomableImage src="/images/destinations/destinations-settings.webp" />

Click on a destination to access its management page where you can:

### Basic Information

- **Name**: Update the destination display name
- **Server IP**: View the server IP address where the destination is hosted (read-only)
- **Docker Network**: View the Docker network name (read-only)

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
