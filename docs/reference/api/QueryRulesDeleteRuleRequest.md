## Interface `QueryRulesDeleteRuleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { ruleset_id?: never; rule_id?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { ruleset_id?: never; rule_id?: never; } | All values in `querystring` will be added to the request querystring. |
| `rule_id` | [Id](./Id.md) | The unique identifier of the query rule within the specified ruleset to delete |
| `ruleset_id` | [Id](./Id.md) | The unique identifier of the query ruleset containing the rule to delete |
