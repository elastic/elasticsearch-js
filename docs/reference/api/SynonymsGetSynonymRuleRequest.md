## Interface `SynonymsGetSynonymRuleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { set_id?: never; rule_id?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { set_id?: never; rule_id?: never; } | All values in `querystring` will be added to the request querystring. |
| `rule_id` | [Id](./Id.md) | The ID of the synonym rule to retrieve. |
| `set_id` | [Id](./Id.md) | The ID of the synonym set to retrieve the synonym rule from. |
