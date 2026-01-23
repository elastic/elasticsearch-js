# NodesInfoRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_id?` | [`NodeIds`](NodeIds.md) | Comma-separated list of node IDs or names used to limit returned information. |
| `metric?` | [`NodesInfoNodesInfoMetrics`](NodesInfoNodesInfoMetrics.md) | Limits the information returned to the specific metrics. Supports a comma-separated list, such as http,ingest. |
| `flat_settings?` | `boolean` | If true, returns settings in flat format. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { node_id?: never, metric?: never, flat_settings?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { node_id?: never, metric?: never, flat_settings?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
