# RuleRetriever

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ruleset_ids` | `Id | Id[]` | The ruleset IDs containing the rules this retriever is evaluating against. |
| `match_criteria` | `any` | The match criteria that will determine if a rule in the provided rulesets should be applied. |
| `retriever` | [`RetrieverContainer`](RetrieverContainer.md) | The retriever whose results rules should be applied to. |
| `rank_window_size?` | `integer` | This value determines the size of the individual result set. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
