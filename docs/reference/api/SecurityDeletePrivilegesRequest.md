## Interface `SecurityDeletePrivilegesRequest`

| Name | Type | Description |
| - | - | - |
| `application` | [Name](./Name.md) | The name of the application. Application privileges are always associated with exactly one application. |
| `body` | string | ({ [key: string]: any; } & { application?: never; name?: never; refresh?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Names](./Names.md) | The name of the privilege. |
| `querystring` | { [key: string]: any; } & { application?: never; name?: never; refresh?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
