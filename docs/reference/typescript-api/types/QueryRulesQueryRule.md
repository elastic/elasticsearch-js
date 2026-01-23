# QueryRulesQueryRule

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `rule_id` | [`Id`](Id.md) | A unique identifier for the rule. |
| `type` | [`QueryRulesQueryRuleType`](QueryRulesQueryRuleType.md) | The type of rule.
`pinned` will identify and pin specific documents to the top of search results.
`exclude` will exclude specific documents from search results. |
| `criteria` | `QueryRulesQueryRuleCriteria | QueryRulesQueryRuleCriteria[]` | The criteria that must be met for the rule to be applied.
If multiple criteria are specified for a rule, all criteria must be met for the rule to be applied. |
| `actions` | [`QueryRulesQueryRuleActions`](QueryRulesQueryRuleActions.md) | The actions to take when the rule is matched.
The format of this action depends on the rule type. |
| `priority?` | [`integer`](integer.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
