---
title: Rolling updates
---

# Coolify Rolling Updates
Rolling updates enable Coolify to seamlessly update your application by starting a new container and gracefully stopping the currently running container. 

This approach minimizes downtime and ensures that your service remains available during updates.


## How Rolling Updates Work
When a new update is initiated, Coolify launches a new container instance while the existing container continues running. 

Once the new container is confirmed healthy, the old container is stopped. This process is referred to as a *rolling update* and helps reduce service interruptions.


## Conditions for Rolling Updates
For rolling updates to function properly, the following conditions must be met:

- **Health Check Configuration:** A valid health check must be configured and passing. 
    - The health check ensures that the new container is fully ready to handle traffic before the old container is terminated. 
    - Without a proper health check, the rolling update process cannot verify the container’s readiness, leading to potential failures.

- **Default Container Naming:** Rolling updates require the use of the default container naming convention. 
    - If you set a custom container name, the update process may not be able to correctly manage container instances, which can prevent the rolling update from executing as expected.


## Configuring Health Checks
To ensure successful rolling updates, please verify that your application includes a health check endpoint. 

This endpoint should return a successful response (e.g., HTTP 200) when the container is operating normally. For more details on configuring health checks for your application, please refer to our [Health Check Guide](/knowledge-base/health-checks).


## Troubleshooting Rolling Updates
If you encounter issues with rolling updates, consider the following steps:

1. **Verify Health Check Configuration:** Make sure that your health check endpoint is correctly implemented and returns a valid response. A failing or misconfigured health check will halt the update process.

2. **Review Container Naming:** Confirm that you are using the default container naming convention. If a custom container name is set, rolling updates will not function as intended.

3. **Check Logs:** Review `coolify-proxy` container or your application container logs for any error messages related to the update process. This may provide additional insights into what might be preventing the rolling update from completing successfully.
