## Interface `QueryDslBoostingQuery`

| Name | Type | Description |
| - | - | - |
| `negative_boost` | [double](./double.md) | Floating point number between 0 and 1.0 used to decrease the relevance scores of documents matching the `negative` query. |
| `negative` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query used to decrease the relevance score of matching documents. |
| `positive` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Any returned documents must match this query. |
