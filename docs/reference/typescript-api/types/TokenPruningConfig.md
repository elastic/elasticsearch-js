# TokenPruningConfig

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `tokens_freq_ratio_threshold?` | [`integer`](integer.md) | Tokens whose frequency is more than this threshold times the average frequency of all tokens in the specified field are considered outliers and pruned. |
| `tokens_weight_threshold?` | [`float`](float.md) | Tokens whose weight is less than this threshold are considered nonsignificant and pruned. |
| `only_score_pruned_tokens?` | `boolean` | Whether to only score pruned tokens, vs only scoring kept tokens. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
