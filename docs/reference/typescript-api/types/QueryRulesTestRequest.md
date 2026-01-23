# QueryRulesTestRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ruleset_id` | [`Id`](Id.md) | The unique identifier of the query ruleset to be created or updated |
| `match_criteria` | `Record<string, any>` | The match criteria to apply to rules in the given query ruleset.
Match criteria should match the keys defined in the `criteria.metadata` field of the rule. |
| `body?` | `string | { [key: string]: any } & { ruleset_id?: never, match_criteria?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { ruleset_id?: never, match_criteria?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
