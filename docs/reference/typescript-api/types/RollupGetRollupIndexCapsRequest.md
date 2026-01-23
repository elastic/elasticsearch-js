# RollupGetRollupIndexCapsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Ids`](Ids.md) | Data stream or index to check for rollup capabilities.
Wildcard (`*`) expressions are supported. |
| `body?` | `string | { [key: string]: any } & { index?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
