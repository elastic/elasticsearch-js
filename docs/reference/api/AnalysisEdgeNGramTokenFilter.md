## Interface `AnalysisEdgeNGramTokenFilter`

| Name | Type | Description |
| - | - | - |
| `max_gram` | [integer](./integer.md) | Maximum character length of a gram. For custom token filters, defaults to `2`. For the built-in edge_ngram filter, defaults to `1`. |
| `min_gram` | [integer](./integer.md) | Minimum character length of a gram. Defaults to `1`. |
| `preserve_original` | [SpecUtilsStringified](./SpecUtilsStringified.md)<boolean> | Emits original token when set to `true`. Defaults to `false`. |
| `side` | [AnalysisEdgeNGramSide](./AnalysisEdgeNGramSide.md) | Indicates whether to truncate tokens from the `front` or `back`. Defaults to `front`. |
| `type` | 'edge_ngram' | &nbsp; |
