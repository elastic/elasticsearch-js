## Interface `SearchRescoreQuery`

| Name | Type | Description |
| - | - | - |
| `query_weight` | [double](./double.md) | Relative importance of the original query versus the rescore query. |
| `rescore_query_weight` | [double](./double.md) | Relative importance of the rescore query versus the original query. |
| `rescore_query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | The query to use for rescoring. This query is only run on the Top-K results returned by the `query` and `post_filter` phases. |
| `score_mode` | [SearchScoreMode](./SearchScoreMode.md) | Determines how scores are combined. |
