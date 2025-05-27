## Interface `RuleRetriever`

| Name | Type | Description |
| - | - | - |
| `match_criteria` | any | The match criteria that will determine if a rule in the provided rulesets should be applied. |
| `rank_window_size` | [integer](./integer.md) | This value determines the size of the individual result set. |
| `retriever` | [RetrieverContainer](./RetrieverContainer.md) | The retriever whose results rules should be applied to. |
| `ruleset_ids` | [Id](./Id.md)[] | The ruleset IDs containing the rules this retriever is evaluating against. |
