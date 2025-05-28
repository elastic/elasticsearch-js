# `DanglingIndicesDeleteDanglingIndexRequest` [interface-DanglingIndicesDeleteDanglingIndexRequest]

| Name | Type | Description |
| - | - | - |
| `accept_data_loss` | boolean | This parameter must be set to true to acknowledge that it will no longer be possible to recove data from the dangling index. |
| `body` | string | ({ [key: string]: any; } & { index_uuid?: never; accept_data_loss?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `index_uuid` | [Uuid](./Uuid.md) | The UUID of the index to delete. Use the get dangling indices API to find the UUID. |
| `master_timeout` | [Duration](./Duration.md) | Specify timeout for connection to master |
| `querystring` | { [key: string]: any; } & { index_uuid?: never; accept_data_loss?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Explicit operation timeout |
