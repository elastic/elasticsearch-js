# `SynonymsDeleteSynonymRuleRequest` [interface-SynonymsDeleteSynonymRuleRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { set_id?: never; rule_id?: never; refresh?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { set_id?: never; rule_id?: never; refresh?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | boolean | If `true`, the request will refresh the analyzers with the deleted synonym rule and wait for the new synonyms to be available before returning. If `false`, analyzers will not be reloaded with the deleted synonym rule |
| `rule_id` | [Id](./Id.md) | The ID of the synonym rule to delete. |
| `set_id` | [Id](./Id.md) | The ID of the synonym set to update. |
