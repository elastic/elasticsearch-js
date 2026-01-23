# SynonymsGetSynonymRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The synonyms set identifier to retrieve. |
| `from?` | `integer` | The starting offset for query rules to retrieve. |
| `size?` | `integer` | The max number of query rules to retrieve. |
| `body?` | `string | { [key: string]: any } & { id?: never, from?: never, size?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, from?: never, size?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
