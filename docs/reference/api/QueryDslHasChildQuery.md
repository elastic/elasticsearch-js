## Interface `QueryDslHasChildQuery`

| Name | Type | Description |
| - | - | - |
| `ignore_unmapped` | boolean | Indicates whether to ignore an unmapped `type` and not return any documents instead of an error. |
| `inner_hits` | [SearchInnerHits](./SearchInnerHits.md) | If defined, each search hit will contain inner hits. |
| `max_children` | [integer](./integer.md) | Maximum number of child documents that match the query allowed for a returned parent document. If the parent document exceeds this limit, it is excluded from the search results. |
| `min_children` | [integer](./integer.md) | Minimum number of child documents that match the query required to match the query for a returned parent document. If the parent document does not meet this limit, it is excluded from the search results. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query you wish to run on child documents of the `type` field. If a child document matches the search, the query returns the parent document. |
| `score_mode` | [QueryDslChildScoreMode](./QueryDslChildScoreMode.md) | Indicates how scores for matching child documents affect the root parent document’s relevance score. |
| `type` | [RelationName](./RelationName.md) | Name of the child relationship mapped for the `join` field. |
