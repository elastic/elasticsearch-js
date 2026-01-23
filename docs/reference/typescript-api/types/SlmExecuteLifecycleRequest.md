# SlmExecuteLifecycleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `policy_id` | [`Name`](Name.md) | The id of the snapshot lifecycle policy to be executed |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `body?` | `string | { [key: string]: any } & { policy_id?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { policy_id?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
