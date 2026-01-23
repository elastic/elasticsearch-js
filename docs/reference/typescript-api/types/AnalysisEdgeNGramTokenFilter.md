# AnalysisEdgeNGramTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'edge_ngram'` | - |
| `max_gram?` | `integer` | Maximum character length of a gram. For custom token filters, defaults to `2`. For the built-in edge_ngram filter, defaults to `1`. |
| `min_gram?` | `integer` | Minimum character length of a gram. Defaults to `1`. |
| `side?` | [`AnalysisEdgeNGramSide`](AnalysisEdgeNGramSide.md) | Indicates whether to truncate tokens from the `front` or `back`. Defaults to `front`. |
| `preserve_original?` | `SpecUtilsStringified<boolean>` | Emits original token when set to `true`. Defaults to `false`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
