# `QueryRulesPutRulesetRequest` [interface-QueryRulesPutRulesetRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { ruleset_id?: never; rules?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { ruleset_id?: never; rules?: never; } | All values in `querystring` will be added to the request querystring. |
| `rules` | [QueryRulesQueryRule](./QueryRulesQueryRule.md) | [QueryRulesQueryRule](./QueryRulesQueryRule.md)[] | &nbsp; |
| `ruleset_id` | [Id](./Id.md) | The unique identifier of the query ruleset to be created or updated. |
