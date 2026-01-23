# QueryRulesListRulesetsQueryRulesetListItem

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ruleset_id` | [`Id`](Id.md) | A unique identifier for the ruleset. |
| `rule_total_count` | `integer` | The number of rules associated with the ruleset. |
| `rule_criteria_types_counts` | `Record<string, integer>` | A map of criteria type (for example, `exact`) to the number of rules of that type.

NOTE: The counts in `rule_criteria_types_counts` may be larger than the value of `rule_total_count` because a rule may have multiple criteria. |
| `rule_type_counts` | `Record<string, integer>` | A map of rule type (for example, `pinned`) to the number of rules of that type. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
