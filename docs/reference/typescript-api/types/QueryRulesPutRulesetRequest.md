# QueryRulesPutRulesetRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ruleset_id` | [`Id`](Id.md) | The unique identifier of the query ruleset to be created or updated. |
| `rules` | `QueryRulesQueryRule | QueryRulesQueryRule[]` | - |
| `body?` | `string | { [key: string]: any } & { ruleset_id?: never, rules?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { ruleset_id?: never, rules?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
