# IndicesCreateFromRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `source` | [`IndexName`](IndexName.md) | The source index or data stream name |
| `dest` | [`IndexName`](IndexName.md) | The destination index or data stream name |
| `create_from?` | [`IndicesCreateFromCreateFrom`](IndicesCreateFromCreateFrom.md) | - |
| `body?` | `string | { [key: string]: any } & { source?: never, dest?: never, create_from?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { source?: never, dest?: never, create_from?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
