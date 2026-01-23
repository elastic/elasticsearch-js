# SecurityDeleteServiceTokenRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `namespace` | [`Namespace`](Namespace.md) | The namespace, which is a top-level grouping of service accounts. |
| `service` | [`Service`](Service.md) | The service name. |
| `name` | [`Name`](Name.md) | The name of the service account token. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `body?` | `string | { [key: string]: any } & { namespace?: never, service?: never, name?: never, refresh?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { namespace?: never, service?: never, name?: never, refresh?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
