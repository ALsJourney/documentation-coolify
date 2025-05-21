---
title: "Superset"
description: "Here you can find the documentation for hosting Superset with Coolify."
---

[![Superset](https://camo.githubusercontent.com/f6f25227203811335bbfc181e6dded66b57cbdbeafe346c0f4e5773bae157aeb/68747470733a2f2f73757065727365742e6170616368652e6f72672f696d672f73757065727365742d6c6f676f2d686f72697a2d6170616368652e737667)](https://superset.apache.org)

## What is Superset?

Superset is a modern data exploration and data visualization platform. Superset can replace or augment proprietary business intelligence tools for many teams. Superset integrates well with a variety of data sources.

## Unofficial Docker Image

By default, superset [does not support the use of docker-compose in production](https://github.com/amancevice/docker-superset). Coolify's superset template uses a [third-party, unofficial docker image created by amancevice](https://github.com/amancevice/docker-superset).

## Usage

### Initial Setup

After deploying the template, you will need to initialise the database and create your admin user. This can be done as follows:

1. Open a termianal session to the superset docker container

2. Run one of the commands below, noting the `-` symbol:

    ```bash
    # Basic initialisation
    superset-init

    # Alternatively, to also load demo data, use
    superset-demo
    ```

    the source code for these scripts are available [here](https://github.com/amancevice/docker-superset/tree/main/bin).


3. Answer all questions in the prompts

You can find the video instructions for this process in [Coolify's GitHub repository's pull request #4891](https://github.com/coollabsio/coolify/pull/4891).

### Connecting to other Databases on Coolify Network

If you wish to connect to databases hosted on Coolify, but external to the Superset service template, you will need to turn on the option: [Connect to Predefined Networks](https://coolify.io/docs/knowledge-base/docker/compose#connect-to-predefined-networks).

## Links

- [Official Website ›](https://superset.apache.org)
- [GitHub ›](https://github.com/apache/superset)
- [Github Unofficial Docker Image >](https://github.com/amancevice/docker-superset)
