# InternalPrevalidateNodeRemovalRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `names?` | `string[]` | A comma-separated list of node names to prevalidate |
| `ids?` | `string[]` | A comma-separated list of node IDs to prevalidate |
| `external_ids?` | `string[]` | A comma-separated list of node external IDs to prevalidate |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { names?: never, ids?: never, external_ids?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { names?: never, ids?: never, external_ids?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
