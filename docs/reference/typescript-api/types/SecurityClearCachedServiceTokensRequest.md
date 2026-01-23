# SecurityClearCachedServiceTokensRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `namespace` | [`Namespace`](Namespace.md) | The namespace, which is a top-level grouping of service accounts. |
| `service` | [`Service`](Service.md) | The name of the service, which must be unique within its namespace. |
| `name` | [`Names`](Names.md) | A comma-separated list of token names to evict from the service account token caches.
Use a wildcard (`*`) to evict all tokens that belong to a service account.
It does not support other wildcard patterns. |
| `body?` | `string | { [key: string]: any } & { namespace?: never, service?: never, name?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { namespace?: never, service?: never, name?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
