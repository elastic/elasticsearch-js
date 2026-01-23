# IngestPutIpLocationDatabaseRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The database configuration identifier. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error.
A value of `-1` indicates that the request should never time out. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata.
If no response is received before the timeout expires, the cluster metadata update still applies but the response indicates that it was not completely acknowledged.
A value of `-1` indicates that the request should never time out. |
| `configuration?` | [`IngestDatabaseConfiguration`](IngestDatabaseConfiguration.md) | - |
| `body?` | `string | { [key: string]: any } & { id?: never, master_timeout?: never, timeout?: never, configuration?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, master_timeout?: never, timeout?: never, configuration?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
