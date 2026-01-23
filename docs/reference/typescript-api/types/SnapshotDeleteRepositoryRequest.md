# SnapshotDeleteRepositoryRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Names`](Names.md) | The ame of the snapshot repositories to unregister.
Wildcard (`*`) patterns are supported. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
To indicate that the request should never timeout, set it to `-1`. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata.
If no response is received before the timeout expires, the cluster metadata update still applies but the response will indicate that it was not completely acknowledged.
To indicate that the request should never timeout, set it to `-1`. |
| `body?` | `string | { [key: string]: any } & { name?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
