# QueryRulesListRulesetsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `from?` | [`integer`](integer.md) | The offset from the first result to fetch. |
| `size?` | [`integer`](integer.md) | The maximum number of results to retrieve. |
| `body?` | `string | { [key: string]: any } & { from?: never, size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { from?: never, size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
