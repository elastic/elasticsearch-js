## Interface `QueryDslFunctionScoreQuery`

| Name | Type | Description |
| - | - | - |
| `boost_mode` | [QueryDslFunctionBoostMode](./QueryDslFunctionBoostMode.md) | Defines how he newly computed score is combined with the score of the query |
| `functions` | [QueryDslFunctionScoreContainer](./QueryDslFunctionScoreContainer.md)[] | One or more functions that compute a new score for each document returned by the query. |
| `max_boost` | [double](./double.md) | Restricts the new score to not exceed the provided limit. |
| `min_score` | [double](./double.md) | Excludes documents that do not meet the provided score threshold. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | A query that determines the documents for which a new score is computed. |
| `score_mode` | [QueryDslFunctionScoreMode](./QueryDslFunctionScoreMode.md) | Specifies how the computed scores are combined |
