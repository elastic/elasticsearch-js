# SearchApplicationListRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `q?` | `string` | Query in the Lucene query string syntax. |
| `from?` | `integer` | Starting offset. |
| `size?` | `integer` | Specifies a max number of results to get. |
| `body?` | `string | { [key: string]: any } & { q?: never, from?: never, size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { q?: never, from?: never, size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
