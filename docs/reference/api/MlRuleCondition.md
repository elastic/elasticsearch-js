## Interface `MlRuleCondition`

| Name | Type | Description |
| - | - | - |
| `applies_to` | [MlAppliesTo](./MlAppliesTo.md) | Specifies the result property to which the condition applies. If your detector uses `lat_long`, `metric`, `rare`, or `freq_rare` functions, you can only specify conditions that apply to time. |
| `operator` | [MlConditionOperator](./MlConditionOperator.md) | Specifies the condition operator. The available options are greater than, greater than or equals, less than, and less than or equals. |
| `value` | [double](./double.md) | The value that is compared against the `applies_to` field using the operator. |
