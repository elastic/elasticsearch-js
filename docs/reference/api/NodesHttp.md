# `NodesHttp` [interface-NodesHttp]

| Name | Type | Description |
| - | - | - |
| `clients` | [NodesClient](./NodesClient.md)[] | Information on current and recently-closed HTTP client connections. Clients that have been closed longer than the `http.client_stats.closed_channels.max_age` setting will not be represented here. |
| `current_open` | [integer](./integer.md) | Current number of open HTTP connections for the node. |
| `routes` | Record<string, [NodesHttpRoute](./NodesHttpRoute.md)> | Detailed HTTP stats broken down by route |
| `total_opened` | [long](./long.md) | Total number of HTTP connections opened for the node. |
