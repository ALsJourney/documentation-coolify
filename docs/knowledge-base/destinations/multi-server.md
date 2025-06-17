# Multi-Server Deployments

Deploy your applications to multiple destinations across different servers for high availability, load distribution, and geographic redundancy.

## Overview

Multi-server deployments allow you to run the same application on multiple destinations, providing:
- **High Availability**: If one server fails, others continue serving
- **Load Distribution**: Spread traffic across multiple servers
- **Geographic Distribution**: Serve users from closer locations
- **Zero-Downtime Deployments**: Update servers individually

## Prerequisites

Before setting up multi-server deployments:

### Docker Registry Required
- Configure a **Docker registry** (Docker Hub, GitHub Container Registry, etc.)
- Applications must be built into container images
- Images must be accessible from all target servers

### Multiple Destinations
- At least two destinations on different servers
- All servers must be online and accessible
- Proper network connectivity between servers

### Load Balancer (Recommended)
- External load balancer to distribute traffic
- DNS configuration to point to multiple servers
- Health checks to route traffic to healthy servers

## Setting Up Multi-Server Deployment

### Step 1: Configure Docker Registry

1. Go to your application's **General** tab
2. Set **Docker Registry Image Name**:
   ```
   registry.example.com/myapp:latest
   ```
3. Configure registry authentication if needed

<ZoomableImage src="/images/destinations/docker-registry-config.webp" />

### Step 2: Add Additional Destinations

1. Navigate to the application's **Destination** tab
2. Click **+ Add Server**
3. Select the destination and server
4. The application will be queued for deployment

<ZoomableImage src="/images/destinations/add-additional-server.webp" />

### Step 3: Deploy to Additional Servers

1. Click **Deploy** next to the new destination
2. Monitor the deployment progress
3. Verify the application is running on the new server

## Managing Multi-Server Deployments

### Primary vs Additional Destinations

#### Primary Destination
- The original deployment location
- Serves as the main reference point
- Cannot be removed without promoting another destination

#### Additional Destinations
- Secondary deployment targets
- Can be added/removed dynamically
- Independent deployment and management

### Deployment Operations

#### Individual Server Deployment
- Deploy to specific servers independently
- Useful for gradual rollouts
- Allows testing on specific servers first

#### Bulk Operations
- Deploy to all servers simultaneously
- Stop/start across all destinations
- Monitor status across all deployments

<ZoomableImage src="/images/destinations/multi-server-operations.webp" />

### Promoting Destinations

Change which destination is considered primary:

1. Go to **Destination** tab
2. Find the destination to promote
3. Click **Promote** 
4. The current primary becomes an additional destination

## Load Balancing Strategies

### External Load Balancer

#### HTTP Load Balancer
Configure your load balancer to distribute requests:
```nginx
upstream myapp {
    server server1.example.com;
    server server2.example.com;
    server server3.example.com;
}

server {
    listen 80;
    server_name myapp.example.com;
    
    location / {
        proxy_pass http://myapp;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### DNS Round Robin
Configure DNS to return multiple IP addresses:
```dns
myapp.example.com. IN A 192.168.1.10
myapp.example.com. IN A 192.168.1.11  
myapp.example.com. IN A 192.168.1.12
```

### Hetzner Load Balancer Example

For Hetzner Cloud users:

1. **Create Load Balancer** in Hetzner Console
2. **Add Targets**: Point to your Coolify servers
3. **Configure Health Checks**: Monitor application endpoints
4. **Update DNS**: Point domain to load balancer IP

<ZoomableImage src="/images/destinations/hetzner-load-balancer.webp" />

## Deployment Strategies

### Rolling Deployments

Deploy to servers one at a time:
1. Deploy to Server 1
2. Wait for health checks to pass
3. Deploy to Server 2
4. Repeat for all servers

### Blue-Green Deployments

Maintain two sets of servers:
1. Deploy new version to "green" servers
2. Test the new deployment
3. Switch traffic from "blue" to "green"
4. Keep "blue" as rollback option

### Canary Deployments

Gradually roll out to a subset:
1. Deploy to 10% of servers
2. Monitor metrics and errors
3. Gradually increase percentage
4. Full rollout if successful

## Data Considerations

### Stateless Applications
- **Recommended**: Applications without local state
- **Database**: Use external databases (managed or separate server)
- **File Storage**: Use object storage (S3, etc.) for files
- **Sessions**: Use Redis or database for session storage

### Database Replication
For applications with databases:
- **Master-Slave**: One write server, multiple read replicas
- **Master-Master**: Multiple write servers (complex)
- **External Database**: Managed database service

### File Synchronization
For applications that store files:
- **Object Storage**: S3, Cloudflare R2, etc.
- **Network File Systems**: NFS, GlusterFS
- **Synchronized Volumes**: Replicated storage solutions

## Monitoring and Health Checks

### Application Health
Monitor each deployment independently:
- **HTTP Health Checks**: Verify application responds
- **Database Connectivity**: Ensure database access
- **Resource Usage**: Monitor CPU, memory, disk

### Server Monitoring
Track server-level metrics:
- **System Resources**: CPU, RAM, disk space
- **Network Connectivity**: Inter-server communication
- **Docker Status**: Container and network health

### Alerting
Set up alerts for:
- Server failures or high resource usage
- Application deployment failures
- Health check failures
- Load balancer issues

## Troubleshooting

### Common Issues

#### Docker Registry Access
- Verify registry credentials on all servers
- Check network connectivity to registry
- Ensure image names are consistent

#### Network Connectivity
- Test connectivity between servers
- Verify firewall rules allow traffic
- Check DNS resolution

#### Load Balancer Issues
- Verify health check configuration
- Check server list in load balancer
- Monitor traffic distribution

### Recovery Procedures

#### Server Failure
1. Remove failed server from load balancer
2. Fix or replace the server
3. Re-deploy application to restored server
4. Add server back to load balancer

#### Deployment Rollback
1. Identify last known good deployment
2. Deploy previous version to affected servers
3. Verify application functionality
4. Update load balancer if needed

## Best Practices

1. **Use Container Registry**: Always configure Docker registry for multi-server
2. **Monitor Health**: Implement comprehensive health checks
3. **Gradual Rollouts**: Deploy to servers incrementally
4. **Database Strategy**: Plan database architecture carefully
5. **Load Balancer**: Use external load balancer for production
6. **Documentation**: Document your multi-server architecture
7. **Testing**: Test failover scenarios regularly
8. **Monitoring**: Monitor all servers and applications continuously