# WatcherUpdateSettingsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `'index.auto_expand_replicas'?` | `string` | - |
| `'index.number_of_replicas'?` | [`integer`](integer.md) | - |
| `body?` | `string | { [key: string]: any } & { master_timeout?: never, timeout?: never, 'index.auto_expand_replicas'?: never, 'index.number_of_replicas'?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { master_timeout?: never, timeout?: never, 'index.auto_expand_replicas'?: never, 'index.number_of_replicas'?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
