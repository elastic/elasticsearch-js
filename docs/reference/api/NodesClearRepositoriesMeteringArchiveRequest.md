## Interface `NodesClearRepositoriesMeteringArchiveRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; max_archive_version?: never; }) | All values in `body` will be added to the request body. |
| `max_archive_version` | [long](./long.md) | Specifies the maximum `archive_version` to be cleared from the archive. |
| `node_id` | [NodeIds](./NodeIds.md) | Comma-separated list of node IDs or names used to limit returned information. |
| `querystring` | { [key: string]: any; } & { node_id?: never; max_archive_version?: never; } | All values in `querystring` will be added to the request querystring. |
