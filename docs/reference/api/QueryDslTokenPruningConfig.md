## Interface `QueryDslTokenPruningConfig`

| Name | Type | Description |
| - | - | - |
| `only_score_pruned_tokens` | boolean | Whether to only score pruned tokens, vs only scoring kept tokens. |
| `tokens_freq_ratio_threshold` | [integer](./integer.md) | Tokens whose frequency is more than this threshold times the average frequency of all tokens in the specified field are considered outliers and pruned. |
| `tokens_weight_threshold` | [float](./float.md) | Tokens whose weight is less than this threshold are considered nonsignificant and pruned. |
