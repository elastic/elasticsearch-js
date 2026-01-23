# QueryRulesPutRuleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ruleset_id` | [`Id`](Id.md) | The unique identifier of the query ruleset containing the rule to be created or updated. |
| `rule_id` | [`Id`](Id.md) | The unique identifier of the query rule within the specified ruleset to be created or updated. |
| `type` | [`QueryRulesQueryRuleType`](QueryRulesQueryRuleType.md) | The type of rule. |
| `criteria` | `QueryRulesQueryRuleCriteria | QueryRulesQueryRuleCriteria[]` | The criteria that must be met for the rule to be applied.
If multiple criteria are specified for a rule, all criteria must be met for the rule to be applied. |
| `actions` | [`QueryRulesQueryRuleActions`](QueryRulesQueryRuleActions.md) | The actions to take when the rule is matched.
The format of this action depends on the rule type. |
| `priority?` | `integer` | - |
| `body?` | `string | { [key: string]: any } & { ruleset_id?: never, rule_id?: never, type?: never, criteria?: never, actions?: never, priority?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { ruleset_id?: never, rule_id?: never, type?: never, criteria?: never, actions?: never, priority?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
