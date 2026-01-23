# IndicesGetMigrateReindexStatusRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | The index or data stream name. |
| `body?` | `string | { [key: string]: any } & { index?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
