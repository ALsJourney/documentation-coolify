# Deleting Destinations

Learn how to safely remove destinations from your Coolify setup when they're no longer needed.

## Before You Delete

### Check for Active Resources

Before deleting a destination, ensure it's not being used:

1. **Applications**: No applications deployed to this destination
2. **Databases**: No databases running in this destination
3. **Services**: No services configured for this destination

### Resource Dependencies

Verify that no other resources depend on this destination:

- **Environment Variables**: Check for hardcoded references
- **Network Dependencies**: Ensure no cross-destination communication
- **Proxies & Load Balancers**: Update load balancer and proxy configuration

### Backup Important Data

If you have any peristent storages in applications or databases that you want to keep, make sure to back them up before proceeding with deletion.

## Deletion Process

### Step 1: Stop All Resources

<ZoomableImage src="/images/destinations/stop-resource.webp" />

For each application, database, and service in the destination:

1. Go to the configuration page of the resource
2. Click **Stop** in the top right corner
3. Wait for the resource to stop completely

### Step 2: Remove Resources

For each application, database, and service in the destination:

<ZoomableImage src="/images/destinations/delete-resource.webp" />

1. Go to the configuration page of the resource
2. Click **Danger Zone** in the left menu
3. Click the red **Delete** button
4. Confirm the deletion

### Step 3: Delete the Destination

<ZoomableImage src="/images/destinations/delete-destination.webp" />

1. Navigate to the destination page
2. Click **Delete Destination**
3. Confirm you understand the consequences
4. Enter your password if required
5. Confirm the deletion

## What Happens During Deletion

### Network Cleanup

When you delete a destination, Coolify automatically:

1. **Disconnects Proxy**: Removes proxy connection to the network
2. **Removes Docker Network**: Deletes the underlying Docker network
3. **Cleans Up Routes**: Removes routing configuration
4. **Updates Database**: Removes destination records

### Network Commands

Coolify executes these commands during deletion:

```bash
# Disconnect proxy from network
docker network disconnect <destination> coolify-proxy

# Remove the Docker network
docker network rm <destination>
```

::: info Note
Replace `<destination>` with the docker network name of the destination being deleted.
:::

## Deletion Restrictions

### Active Resources

You cannot delete a destination if it has:

- Running applications
- Active databases
- Deployed services
- Connected containers

### Error Messages

#### "You must delete all resources before deleting this destination."

This error occurs when you try to delete a destination that still has active resources. Ensure all applications, databases, and services are stopped and removed before attempting deletion.

## Troubleshooting Deletion Issues

### Network Still Exists

If the Docker network persists after deletion:

```bash
# Check what's using the network
docker network inspect <destination>

# Force remove the network
docker network rm -f <destination>
```

::: info Note
Replace `<destination>` with the docker network name of the destination being deleted.
:::
