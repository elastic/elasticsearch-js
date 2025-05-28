# `SecurityGetRoleRequest` [interface-SecurityGetRoleRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Names](./Names.md) | The name of the role. You can specify multiple roles as a comma-separated list. If you do not specify this parameter, the API returns information about all roles. |
| `querystring` | { [key: string]: any; } & { name?: never; } | All values in `querystring` will be added to the request querystring. |
