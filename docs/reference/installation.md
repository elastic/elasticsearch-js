---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/installation.html
---

# Installation [installation]

This page guides you through the installation process of the client.

To install the latest version of the client, run the following command:

```sh
npm install @elastic/elasticsearch
```

To install a specific major version of the client, run the following command:

```sh
npm install @elastic/elasticsearch@<major>
```

To learn more about the supported major versions, please refer to the [Compatibility matrix](#js-compatibility-matrix).


## Node.js support [nodejs-support]

::::{note}
The minimum supported version of Node.js is `v18`.
::::


The client versioning follows the {{stack}} versioning, this means that major, minor, and patch releases are done following a precise schedule that often does not coincide with the [Node.js release](https://nodejs.org/en/about/releases/) times.

To avoid support insecure and unsupported versions of Node.js, the client **will drop the support of EOL versions of Node.js between minor releases**. Typically, as soon as a Node.js version goes into EOL, the client will continue to support that version for at least another minor release. If you are using the client with a version of Node.js that will be unsupported soon, you will see a warning in your logs (the client will start logging the warning with two minors in advance).

Unless you are **always** using a supported version of Node.js, we recommend defining the client dependency in your `package.json` with the `~` instead of `^`. In this way, you will lock the dependency on the minor release and not the major. (for example, `~7.10.0` instead of `^7.10.0`).

| Node.js Version | Node.js EOL date | End of support |
| --- | --- | --- |
| `8.x` | December 2019 | `7.11` (early 2021) |
| `10.x` | April 2021 | `7.12` (mid 2021) |
| `12.x` | April 2022 | `8.2` (early 2022) |
| `14.x` | April 2023 | `8.8` (early 2023) |
| `16.x` | September 2023 | `8.11` (late 2023) |


## Compatibility matrix [js-compatibility-matrix]

Language clients are forward compatible; meaning that clients support communicating with greater or equal minor versions of {{es}} without breaking. It does not mean that the client automatically supports new features of newer {{es}} versions; it is only possible after a release of a new client version. For example, a 8.12 client version won’t automatically support the new features of the 8.13 version of {{es}}, the 8.13 client version is required for that. {{es}} language clients are only backwards compatible with default distributions and without guarantees made.

| {{es}} Version | Client Version | Supported |
| --- | --- | --- |
| `8.x` | `8.x` | `8.x` |
| `7.x` | `7.x` | `7.17` |
| `6.x` | `6.x` |  |
| `5.x` | `5.x` |  |


### Browser [_browser]

::::{warning}
There is no official support for the browser environment. It exposes your {{es}} instance to everyone, which could lead to security issues. We recommend you to write a lightweight proxy that uses this client instead, you can see a proxy example [here](https://github.com/elastic/elasticsearch-js/tree/master/docs/examples/proxy).
::::


