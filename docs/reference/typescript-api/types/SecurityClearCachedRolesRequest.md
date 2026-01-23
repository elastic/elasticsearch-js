# SecurityClearCachedRolesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Names`](Names.md) | A comma-separated list of roles to evict from the role cache.
To evict all roles, use an asterisk (`*`).
It does not support other wildcard patterns. |
| `body?` | `string | { [key: string]: any } & { name?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
