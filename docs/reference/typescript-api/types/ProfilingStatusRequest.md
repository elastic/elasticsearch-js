# ProfilingStatusRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_resources_created?` | `boolean` | Whether to return immediately or wait until resources have been created |
| `body?` | `string | { [key: string]: any } & { master_timeout?: never, timeout?: never, wait_for_resources_created?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { master_timeout?: never, timeout?: never, wait_for_resources_created?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
