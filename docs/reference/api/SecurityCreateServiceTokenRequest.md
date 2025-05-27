## Interface `SecurityCreateServiceTokenRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { namespace?: never; service?: never; name?: never; refresh?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Name](./Name.md) | The name for the service account token. If omitted, a random name will be generated. Token names must be at least one and no more than 256 characters. They can contain alphanumeric characters (a-z, A-Z, 0-9), dashes ( `-`), and underscores ( `_`), but cannot begin with an underscore. NOTE: Token names must be unique in the context of the associated service account. They must also be globally unique with their fully qualified names, which are comprised of the service account principal and token name, such as `<namespace>/<service>/<token-name>`. |
| `namespace` | [Namespace](./Namespace.md) | The name of the namespace, which is a top-level grouping of service accounts. |
| `querystring` | { [key: string]: any; } & { namespace?: never; service?: never; name?: never; refresh?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If `true` then refresh the affected shards to make this operation visible to search, if `wait_for` (the default) then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `service` | [Service](./Service.md) | The name of the service. |
