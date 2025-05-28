# `SecurityDeleteServiceTokenRequest` [interface-SecurityDeleteServiceTokenRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { namespace?: never; service?: never; name?: never; refresh?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Name](./Name.md) | The name of the service account token. |
| `namespace` | [Namespace](./Namespace.md) | The namespace, which is a top-level grouping of service accounts. |
| `querystring` | { [key: string]: any; } & { namespace?: never; service?: never; name?: never; refresh?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If `true` then refresh the affected shards to make this operation visible to search, if `wait_for` (the default) then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `service` | [Service](./Service.md) | The service name. |
