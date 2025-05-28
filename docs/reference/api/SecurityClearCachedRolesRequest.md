# `SecurityClearCachedRolesRequest` [interface-SecurityClearCachedRolesRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Names](./Names.md) | A comma-separated list of roles to evict from the role cache. To evict all roles, use an asterisk ( `*`). It does not support other wildcard patterns. |
| `querystring` | { [key: string]: any; } & { name?: never; } | All values in `querystring` will be added to the request querystring. |
