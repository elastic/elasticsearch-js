## Interface `QueryDslBoolQuery`

| Name | Type | Description |
| - | - | - |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | The clause (query) must appear in matching documents. However, unlike `must`, the score of the query will be ignored. |
| `minimum_should_match` | [MinimumShouldMatch](./MinimumShouldMatch.md) | Specifies the number or percentage of `should` clauses returned documents must match. |
| `must_not` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | The clause (query) must not appear in the matching documents. Because scoring is ignored, a score of `0` is returned for all documents. |
| `must` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | The clause (query) must appear in matching documents and will contribute to the score. |
| `should` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | The clause (query) should appear in the matching document. |
