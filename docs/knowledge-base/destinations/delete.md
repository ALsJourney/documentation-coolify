# Deleting Destinations

Learn how to safely remove destinations from your Coolify setup when they're no longer needed.

## Before You Delete

### Check for Active Resources
Before deleting a destination, ensure it's not being used:

1. **Applications**: No applications deployed to this destination
2. **Databases**: No databases running in this destination  
3. **Services**: No services configured for this destination
4. **Volumes**: No persistent volumes attached

### Resource Dependencies
Verify that no other resources depend on this destination:
- **Environment Variables**: Check for hardcoded references
- **Network Dependencies**: Ensure no cross-destination communication
- **Load Balancers**: Update load balancer configuration
- **DNS Records**: Update any DNS records pointing to this destination

## Deletion Process

### Step 1: Stop All Resources

1. **Stop Applications**:
   - Go to each application's page
   - Click **Stop** to halt the application
   - Wait for containers to stop completely

2. **Stop Databases**:
   - Navigate to database configurations  
   - Stop all database instances
   - Create backups if needed

3. **Remove Services**:
   - Stop any running services
   - Remove service configurations

### Step 2: Remove Resources

1. **Delete Applications**:
   - Go to application settings
   - Click **Delete Application**
   - Confirm the deletion

2. **Delete Databases**:
   - Access database settings
   - Choose **Delete Database**
   - Backup data if necessary

3. **Clean Up Volumes**:
   - Remove any unused volumes
   - Check for orphaned storage

### Step 3: Delete the Destination

1. Navigate to the destination page
2. Click **Delete Destination**
3. Confirm you understand the consequences
4. Enter your password if required
5. Confirm the deletion

<ZoomableImage src="/images/destinations/delete-destination.webp" />

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
docker network disconnect destination-network coolify-proxy

# Remove the Docker network
docker network rm destination-network
```

## Deletion Restrictions

### Active Resources
You cannot delete a destination if it has:
- Running applications
- Active databases  
- Deployed services
- Connected containers

### Error Messages
Common deletion errors:
- **"Destination has active resources"**: Stop all resources first
- **"Network is in use"**: Some containers are still connected
- **"Permission denied"**: Insufficient server permissions
- **"Network not found"**: Network was manually removed

## Force Deletion (Advanced)

### When to Use Force Deletion
Only use force deletion when:
- Normal deletion fails due to orphaned resources
- Network is corrupted or inaccessible
- Server connectivity issues prevent normal cleanup

### Manual Network Cleanup
If automatic cleanup fails, manually remove the network:

```bash
# List all containers using the network
docker network inspect destination-network

# Stop containers using the network
docker stop container1 container2

# Disconnect containers from network
docker network disconnect destination-network container1
docker network disconnect destination-network container2

# Remove the network
docker network rm destination-network
```

## Post-Deletion Tasks

### Verify Cleanup
After deletion, verify:
1. **Network Removed**: `docker network ls` doesn't show the network
2. **No Orphaned Containers**: Check for containers still using the network
3. **Proxy Configuration**: Verify proxy routes are cleaned up
4. **DNS Records**: Update any DNS pointing to this destination

### Update Documentation
- Remove destination from documentation
- Update network diagrams
- Notify team members of the change

### Load Balancer Updates
If using external load balancing:
1. **Remove Servers**: Remove servers from load balancer pools
2. **Update Health Checks**: Remove health check targets
3. **DNS Changes**: Update DNS records if necessary

## Troubleshooting Deletion Issues

### Network Still Exists
If the Docker network persists after deletion:
```bash
# Check what's using the network
docker network inspect network-name

# Force remove the network
docker network rm -f network-name
```

### Proxy Connection Issues
If proxy loses connectivity after deletion:
```bash
# Restart the proxy
docker restart coolify-proxy

# Recreate proxy networks
# This will be done automatically by Coolify
```

### Database Connection Errors
If applications lose database connectivity:
1. **Check Database Status**: Ensure database wasn't accidentally deleted
2. **Verify Network Configuration**: Check if database moved to different destination
3. **Update Connection Strings**: Update application database URLs

## Recovery Options

### Accidental Deletion
If you accidentally delete a destination:

1. **Recreate Destination**: Create a new destination with the same name
2. **Redeploy Resources**: Deploy applications and databases again
3. **Restore Data**: Restore from backups if necessary
4. **Update Configuration**: Reconfigure any custom settings

### Data Recovery
For data recovery after accidental deletion:
1. **Volume Recovery**: Check if Docker volumes still exist
2. **Backup Restoration**: Restore from scheduled backups
3. **Database Recovery**: Use database-specific recovery tools

## Best Practices

### Before Deletion
1. **Create Backups**: Backup all important data
2. **Document Dependencies**: List all dependent resources
3. **Notify Team**: Inform team members of planned deletion
4. **Test Impact**: Verify what will be affected

### During Deletion
1. **Follow Order**: Stop resources before deleting destination
2. **Verify Each Step**: Confirm each deletion step completes
3. **Monitor Logs**: Watch for errors during deletion process
4. **Have Rollback Plan**: Be prepared to recreate if needed

### After Deletion
1. **Verify Cleanup**: Confirm all resources are removed
2. **Update Documentation**: Remove references to deleted destination
3. **Monitor Applications**: Check that remaining applications still work
4. **Clean Up External Resources**: Update load balancers, DNS, etc.

## Alternative to Deletion

### Destination Deactivation
Instead of deleting, consider:
1. **Stop All Resources**: Keep destination but stop all services
2. **Remove from Load Balancer**: Stop receiving traffic
3. **Maintain for Recovery**: Keep available for emergency use
4. **Document Status**: Mark as inactive in documentation

This approach allows for quick recovery if the destination is needed again.