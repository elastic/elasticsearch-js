# SynonymsPutSynonymRuleRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `set_id` | [`Id`](Id.md) | The ID of the synonym set. |
| `rule_id` | [`Id`](Id.md) | The ID of the synonym rule to be updated or created. |
| `refresh?` | `boolean` | If `true`, the request will refresh the analyzers with the new synonym rule and wait for the new synonyms to be available before returning.
If `false`, analyzers will not be reloaded with the new synonym rule |
| `synonyms` | [`SynonymsSynonymString`](SynonymsSynonymString.md) | The synonym rule information definition, which must be in Solr format. |
| `body?` | `string | { [key: string]: any } & { set_id?: never, rule_id?: never, refresh?: never, synonyms?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { set_id?: never, rule_id?: never, refresh?: never, synonyms?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
