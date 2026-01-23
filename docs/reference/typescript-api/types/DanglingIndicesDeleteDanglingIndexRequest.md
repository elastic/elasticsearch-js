# DanglingIndicesDeleteDanglingIndexRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index_uuid` | [`Uuid`](Uuid.md) | The UUID of the index to delete. Use the get dangling indices API to find the UUID. |
| `accept_data_loss?` | `boolean` | This parameter must be set to true to acknowledge that it will no longer be possible to recove data from the dangling index. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response. |
| `body?` | `string | { [key: string]: any } & { index_uuid?: never, accept_data_loss?: never, master_timeout?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index_uuid?: never, accept_data_loss?: never, master_timeout?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
