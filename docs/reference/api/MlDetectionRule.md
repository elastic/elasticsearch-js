## Interface `MlDetectionRule`

| Name | Type | Description |
| - | - | - |
| `actions` | [MlRuleAction](./MlRuleAction.md)[] | The set of actions to be triggered when the rule applies. If more than one action is specified the effects of all actions are combined. |
| `conditions` | [MlRuleCondition](./MlRuleCondition.md)[] | An array of numeric conditions when the rule applies. A rule must either have a non-empty scope or at least one condition. Multiple conditions are combined together with a logical AND. |
| `scope` | Record<[Field](./Field.md), [MlFilterRef](./MlFilterRef.md)> | A scope of series where the rule applies. A rule must either have a non-empty scope or at least one condition. By default, the scope includes all series. Scoping is allowed for any of the fields that are also specified in `by_field_name`, `over_field_name`, or `partition_field_name`. |
