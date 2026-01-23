# SecurityDeleteRoleMappingRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | The distinct name that identifies the role mapping.
The name is used solely as an identifier to facilitate interaction via the API; it does not affect the behavior of the mapping in any way. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `body?` | `string | { [key: string]: any } & { name?: never, refresh?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, refresh?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
