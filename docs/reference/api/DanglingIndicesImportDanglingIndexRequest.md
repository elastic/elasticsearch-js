# `DanglingIndicesImportDanglingIndexRequest` [interface-DanglingIndicesImportDanglingIndexRequest]

| Name | Type | Description |
| - | - | - |
| `accept_data_loss` | boolean | This parameter must be set to true to import a dangling index. Because Elasticsearch cannot know where the dangling index data came from or determine which shard copies are fresh and which are stale, it cannot guarantee that the imported data represents the latest state of the index when it was last in the cluster. |
| `body` | string | ({ [key: string]: any; } & { index_uuid?: never; accept_data_loss?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `index_uuid` | [Uuid](./Uuid.md) | The UUID of the index to import. Use the get dangling indices API to locate the UUID. |
| `master_timeout` | [Duration](./Duration.md) | Specify timeout for connection to master |
| `querystring` | { [key: string]: any; } & { index_uuid?: never; accept_data_loss?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Explicit operation timeout |
