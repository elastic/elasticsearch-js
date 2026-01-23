# SecurityClearApiKeyCacheRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ids` | [`Ids`](Ids.md) | Comma-separated list of API key IDs to evict from the API key cache.
To evict all API keys, use `*`.
Does not support other wildcard patterns. |
| `body?` | `string | { [key: string]: any } & { ids?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { ids?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
