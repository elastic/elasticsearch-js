# `SecurityBulkDeleteRoleRequest` [interface-SecurityBulkDeleteRoleRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { refresh?: never; names?: never; }) | All values in `body` will be added to the request body. |
| `names` | string[] | An array of role names to delete |
| `querystring` | { [key: string]: any; } & { refresh?: never; names?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
