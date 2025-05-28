# `RetrieverBase` [interface-RetrieverBase]

| Name | Type | Description |
| - | - | - |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | Query to filter the documents that can match. |
| `min_score` | [float](./float.md) | Minimum _score for matching documents. Documents with a lower _score are not included in the top documents. |
