## Interface `QueryDslConstantScoreQuery`

| Name | Type | Description |
| - | - | - |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Filter query you wish to run. Any returned documents must match this query. Filter queries do not calculate relevance scores. To speed up performance, Elasticsearch automatically caches frequently used filter queries. |
