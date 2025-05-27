## Interface `SearchableSnapshotsMountRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { repository?: never; snapshot?: never; master_timeout?: never; wait_for_completion?: never; storage?: never; index?: never; renamed_index?: never; index_settings?: never; ignore_index_settings?: never; }) | All values in `body` will be added to the request body. |
| `ignore_index_settings` | string[] | The names of settings that should be removed from the index when it is mounted. |
| `index_settings` | Record<string, any> | The settings that should be added to the index when it is mounted. |
| `index` | [IndexName](./IndexName.md) | The name of the index contained in the snapshot whose data is to be mounted. If no `renamed_index` is specified, this name will also be used to create the new index. |
| `master_timeout` | [Duration](./Duration.md) | The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`. |
| `querystring` | { [key: string]: any; } & { repository?: never; snapshot?: never; master_timeout?: never; wait_for_completion?: never; storage?: never; index?: never; renamed_index?: never; index_settings?: never; ignore_index_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `renamed_index` | [IndexName](./IndexName.md) | The name of the index that will be created. |
| `repository` | [Name](./Name.md) | The name of the repository containing the snapshot of the index to mount. |
| `snapshot` | [Name](./Name.md) | The name of the snapshot of the index to mount. |
| `storage` | string | The mount option for the searchable snapshot index. |
| `wait_for_completion` | boolean | If true, the request blocks until the operation is complete. |
