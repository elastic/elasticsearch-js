## Interface `QueryDslNestedQuery`

| Name | Type | Description |
| - | - | - |
| `ignore_unmapped` | boolean | Indicates whether to ignore an unmapped path and not return any documents instead of an error. |
| `inner_hits` | [SearchInnerHits](./SearchInnerHits.md) | If defined, each search hit will contain inner hits. |
| `path` | [Field](./Field.md) | Path to the nested object you wish to search. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query you wish to run on nested objects in the path. |
| `score_mode` | [QueryDslChildScoreMode](./QueryDslChildScoreMode.md) | How scores for matching child objects affect the root parent document’s relevance score. |
