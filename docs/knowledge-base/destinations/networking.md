# Destination Networking

Understanding how networking works in Coolify destinations and how to configure network settings for your deployments.

## Network Architecture

### Docker Networks
Each destination creates and manages a Docker network:
- **Network Type**: Bridge (Standalone) or Overlay (Swarm)
- **Network Name**: Unique identifier per destination
- **Isolation**: Resources in different destinations are network-isolated
- **Proxy Integration**: Automatic proxy connection for external access

### Network Flow
```
Internet → Proxy (Traefik/Caddy) → Destination Network → Application Container
```

## Network Types

### Standalone Docker Networks

#### Default Bridge Network
- **Type**: Docker bridge network
- **Scope**: Single server
- **Communication**: Containers can communicate within the network
- **External Access**: Through proxy only

#### Custom Bridge Networks
- **Creation**: Automatically created by Coolify
- **Naming**: Uses destination network identifier
- **Configuration**: Managed by Coolify
- **Connectivity**: Proxy automatically connected

### Docker Swarm Networks

#### Overlay Networks
- **Type**: Docker overlay network
- **Scope**: Across swarm cluster
- **Multi-Host**: Containers communicate across nodes
- **Encryption**: Built-in overlay network encryption

## Proxy Integration

### Automatic Proxy Connection
When a destination is created, Coolify automatically:

1. **Creates the Docker network**
2. **Connects the proxy** to the network
3. **Configures routing** for applications
4. **Manages SSL certificates** for domains

### Proxy Network Commands
Coolify runs these commands automatically:
```bash
# Create network
docker network create --driver bridge destination-network-name

# Connect proxy to network  
docker network connect destination-network-name coolify-proxy
```

## Network Configuration

### Application Networking

#### Internal Communication
Applications within the same destination can communicate:
```yaml
# docker-compose.yml example
services:
  app:
    image: myapp:latest
    networks:
      - coolify-network
  
  database:
    image: postgres:15
    networks:
      - coolify-network
    environment:
      - DATABASE_URL=postgresql://user:pass@database:5432/db
```

#### Service Discovery
- **Container Names**: Use container names for internal communication
- **DNS Resolution**: Docker provides automatic DNS resolution
- **Port Access**: Use internal ports (not published ports)

### External Access

#### Through Proxy
All external traffic goes through the proxy:
- **Domain Routing**: Proxy routes based on domain/subdomain
- **SSL Termination**: Proxy handles SSL certificates
- **Load Balancing**: Proxy can load balance to multiple containers

#### Direct Port Access (Advanced)
For non-HTTP services, you can expose ports directly:
- **Published Ports**: Map container ports to host ports
- **Firewall Rules**: Configure server firewall accordingly
- **Security**: Consider security implications

<ZoomableImage src="/images/destinations/network-architecture.webp" />

## Network Security

### Isolation Between Destinations
- **Default Behavior**: Destinations cannot communicate with each other
- **Network Separation**: Each destination has its own Docker network
- **Container Isolation**: Containers in different destinations are isolated

### Inter-Destination Communication
To enable communication between destinations:

#### Option 1: Shared Network
Create a shared network and connect multiple destinations:
```bash
# Create shared network
docker network create shared-network

# Connect destinations to shared network
docker network connect shared-network container1
docker network connect shared-network container2
```

#### Option 2: External Communication
Use external endpoints through the proxy:
```bash
# Application A calls Application B through external URL
curl https://app-b.example.com/api/endpoint
```

#### Option 3: Environment Variables
Pass connection details through environment variables:
```yaml
environment:
  - EXTERNAL_API_URL=https://api.example.com
  - INTERNAL_DB_HOST=database.internal
```

## Network Troubleshooting

### Common Network Issues

#### Container Cannot Reach External Services
```bash
# Test DNS resolution
docker exec container-name nslookup google.com

# Test network connectivity
docker exec container-name ping 8.8.8.8

# Check network configuration
docker network inspect destination-network
```

#### Containers Cannot Communicate
```bash
# Check if containers are on same network
docker inspect container1 | grep NetworkMode
docker inspect container2 | grep NetworkMode

# Test internal connectivity
docker exec container1 ping container2
```

#### Proxy Not Routing Traffic
```bash
# Check proxy network connections
docker network ls
docker network inspect coolify-proxy

# Verify proxy configuration
docker logs coolify-proxy
```

### Network Diagnostics

#### Inspect Network Configuration
```bash
# List all networks
docker network ls

# Inspect specific network
docker network inspect network-name

# Show container network settings
docker inspect container-name
```

#### Test Network Connectivity
```bash
# Test from container
docker exec -it container-name sh
ping target-container
curl http://target-container:port

# Test from host
curl http://localhost:published-port
```

## Advanced Network Configuration

### Custom Network Settings

#### Network Aliases
Add network aliases for service discovery:
```yaml
services:
  app:
    networks:
      coolify-network:
        aliases:
          - api
          - backend
```

#### Network Labels
Add labels for network management:
```yaml
networks:
  coolify-network:
    labels:
      - com.coolify.managed=true
      - environment=production
```

### Network Performance

#### Network Monitoring
Monitor network performance:
- **Bandwidth Usage**: Track network traffic
- **Latency**: Measure response times
- **Connection Counts**: Monitor active connections

#### Optimization Tips
1. **Minimize Cross-Network Traffic**: Keep related services in same destination
2. **Use Internal URLs**: Avoid external calls for internal services
3. **Connection Pooling**: Use connection pools for database access
4. **Caching**: Implement caching to reduce network calls

## Network Backup and Migration

### Network Configuration Backup
Network settings are preserved in:
- **Destination Configuration**: Stored in Coolify database
- **Docker Network State**: Recreated automatically
- **Proxy Configuration**: Managed by Coolify

### Migration Considerations
When migrating destinations:
1. **Network Names**: May change on new server
2. **IP Addresses**: Will be different on new server
3. **Proxy Configuration**: Automatically updated
4. **Inter-Service Communication**: Uses container names (portable)

## Best Practices

1. **Use Container Names**: For internal service communication
2. **Avoid Hard-Coded IPs**: Use DNS names instead
3. **Network Isolation**: Keep unrelated services in separate destinations
4. **Monitor Network Health**: Implement network health checks
5. **Document Network Architecture**: Maintain network diagrams
6. **Security First**: Follow network security best practices
7. **Test Connectivity**: Regularly test network connectivity
8. **Performance Monitoring**: Monitor network performance metrics