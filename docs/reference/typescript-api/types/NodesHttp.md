# NodesHttp

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `current_open?` | [`integer`](integer.md) | Current number of open HTTP connections for the node. |
| `total_opened?` | [`long`](long.md) | Total number of HTTP connections opened for the node. |
| `clients?` | [`NodesClient`](NodesClient.md)[] | Information on current and recently-closed HTTP client connections.
Clients that have been closed longer than the `http.client_stats.closed_channels.max_age` setting will not be represented here. |
| `routes` | `Record<string, NodesHttpRoute>` | Detailed HTTP stats broken down by route |

## See Also

- [All Types](./)
- [API Methods](../index.md)
