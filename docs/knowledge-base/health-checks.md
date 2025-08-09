---
title: Healthchecks
description: Learn how to manage health checks in Coolify for your applications and services.
keywords: ["Healthchecks", "Not Found", "No available server", "404", "503"]
---

# Healthchecks

Health checks are a way to ensure that your applications and services are running correctly. They allow Coolify to monitor the health of your resources and ensure that traffic is only routed to healthy instances. This for example important for [Rolling Updates](/knowledge-base/rolling-updates) to work correctly.

## Traefik

When using Traefik as the reverse proxy, health checks are an integral part of how it routes traffic to your resources.

### Enabled

If your resource has healthchecks _enabled_, Traefik will only route traffic to it if the healthcheck passes. If the healthcheck fails, Traefik will not route traffic to the resource.

**It will cause the resource to return a `404 Not Found` or `No available server` error.**

### Disabled

If your resource has healthchecks _disabled_, Traefik will route traffic to it regardless of the healthcheck status.

## Configure Healthchecks

### Applications

There are two ways to configure health checks for your applications:

1. **Using the UI**: You can set up health checks directly in the Coolify UI when creating or editing an application. You can specify the path to check, the expected response code, and the interval for checking. It will be required that the container has either `curl` or `wget` installed to perform the health checks.

2. **Using the Dockerfile**: You can also define health checks in your Dockerfile using the [HEALTHCHECK](https://docs.docker.com/reference/dockerfile/#healthcheck) instruction. This allows you to specify how the health check should be performed, including the command to run and the expected response.

If there are healthchecks both in the UI and in the Dockerfile defined and enabled, the Dockerfile will take precedence.

### Service Stacks

Services or Applications that use the [Docker Compose Build Pack](/builds/packs/docker-compose) require their healthchecks to be defined in the `Dockerfile` of each service, or in their `docker-compose.y[a]ml` file using the [healthcheck](https://docs.docker.com/reference/compose-file/services/#healthcheck) attribute.

::: tip When to use health checks?
It is recommended to enable healthchecks for all your resources. This way, you can ensure that only healthy resources are receiving traffic.

But if you cannot set up healthchecks for some reason, you can disable them.

Just be aware that if the resource is unhealthy, it will still receive traffic.
:::
