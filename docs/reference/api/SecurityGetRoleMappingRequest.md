## Interface `SecurityGetRoleMappingRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Names](./Names.md) | The distinct name that identifies the role mapping. The name is used solely as an identifier to facilitate interaction via the API; it does not affect the behavior of the mapping in any way. You can specify multiple mapping names as a comma-separated list. If you do not specify this parameter, the API returns information about all role mappings. |
| `querystring` | { [key: string]: any; } & { name?: never; } | All values in `querystring` will be added to the request querystring. |
