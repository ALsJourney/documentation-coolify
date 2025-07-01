# Destination Networking

Understanding how networking works in Coolify destinations and how to configure network settings for your deployments.

## External Access

#### Through Proxy

All external traffic goes through the proxy:

- **Domain Routing**: Proxy routes based on domain/subdomain
- **SSL Termination**: Proxy handles SSL certificates
- **Load Balancing**: Proxy can load balance to multiple containers

#### Direct Port Access (Advanced)

To bypass the proxy, you can expose ports directly:

- **Published Ports**: Map container ports to host ports by either adding them into the `Mapped Ports` field in Coolify or defining them in your `docker-compose.y[a]ml` file.
  Example:

```yaml
services:
  app:
    image: nginx:latest
    ports:
      - 8080:80
```

::: warning CAUTION
The first number represents the host port while the second number is the container port. Make sure to use unique host ports for each service to avoid conflicts.
:::

- **Firewall Rules**: Configure server firewall accordingly
- **Security**: Consider security implications

<ZoomableImage src="/images/destinations/network-architecture.webp" />

## Internal Communication

Resources within the same destination can communicate over the internal Docker network using the **Container Names**, **Network Alias** and **internal Ports** of your Resources.

### Example: Connection String Between Apps

Consider a Next.js and Express API deployed to the same destination. To connect Next.js to the Express API, we follow these steps:

1. **Find the Container Names**: There are multiple ways to find the container names. Here are two common methods:

- Go the terminal of your server and run `docker ps` to list all running containers. Look for the names of your applications in the **NAMES** column.
  Example output:

```
CONTAINER ID   IMAGE               COMMAND                  CREATED        STATUS        PORTS      NAMES
123456789abc   nextjs-app:latest   "docker-entrypoint.s…"   2 hours ago    Up 2 hours    80/tcp     my-nextjs-app
abcdef123456   express-api:latest  "docker-entrypoint.s…"   2 hours ago    Up 2 hours    3001/tcp   my-express-api
```

- Navigate to the `Logs` tab of each resource in the Coolify dashboard and copy the container names from the header.

2. **Determine the Internal Port**: Use the port Express listens on internally (e.g., port 3001), not the external published port

3. **Build the Connection String**: `http://[container-name]:[internal-port]`

   - Example: `http://my-express-api:3001`

4. **Use in Your App**: Configure your Next.js app to call the Express API using this internal URL instead of the external domain

This same pattern applies to any two applications (databases, APIs, microservices) within the same destination - always use the container name and internal port for communication.

::: info Service Stacks
If you have a Service Stack (deployments using Docker Compose), that needs to connect to a different resource outside of it's stack, you will have to first enable [Connect To Predefined Networks](knowledge-base/docker/compose#connect-to-predefined-networks) in the Service Stack settings.
:::

## Network Troubleshooting

### Common Network Issues

#### Container Cannot Reach External Services

```bash
# Test DNS resolution
docker exec container-name nslookup google.com

# Test network connectivity
docker exec container-name ping 8.8.8.8

# Check network configuration
docker network inspect network-name
```

::: info Note
Make sure to replace `container-name` with the actual name of your container and `network-name` with the docker network name of the destination.
:::

#### Containers Cannot Communicate

```bash
# Check if containers are on same network
docker inspect container1 | grep NetworkMode
docker inspect container2 | grep NetworkMode

# Test internal connectivity
docker exec container1 ping container2
```

::: info Note
Make sure to replace `container1` and `container2` with the actual names of your containers.
:::

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

::: info Note
Make sure to replace `network-name` with the actual name of your network and `container-name` with the actual name of your container.
:::
