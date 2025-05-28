# `ReindexRemoteSource` [interface-ReindexRemoteSource]

| Name | Type | Description |
| - | - | - |
| `connect_timeout` | [Duration](./Duration.md) | The remote connection timeout. |
| `headers` | Record<string, string> | An object containing the headers of the request. |
| `host` | [Host](./Host.md) | The URL for the remote instance of Elasticsearch that you want to index from. This information is required when you're indexing from remote. |
| `password` | [Password](./Password.md) | The password to use for authentication with the remote host. |
| `socket_timeout` | [Duration](./Duration.md) | The remote socket read timeout. |
| `username` | [Username](./Username.md) | The username to use for authentication with the remote host. |
