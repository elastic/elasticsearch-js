# GetScriptRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The identifier for the stored script or search template. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for the master node.
If the master node is not available before the timeout expires, the request fails and returns an error.
It can also be set to `-1` to indicate that the request should never timeout. |
| `body?` | `string | { [key: string]: any } & { id?: never, master_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, master_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
