# SynonymsPutSynonymRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The ID of the synonyms set to be created or updated. |
| `refresh?` | `boolean` | If `true`, the request will refresh the analyzers with the new synonyms set and wait for the new synonyms to be available before returning.
If `false`, analyzers will not be reloaded with the new synonym set |
| `synonyms_set` | `SynonymsSynonymRule | SynonymsSynonymRule[]` | The synonym rules definitions for the synonyms set. |
| `body?` | `string | { [key: string]: any } & { id?: never, refresh?: never, synonyms_set?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, refresh?: never, synonyms_set?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
