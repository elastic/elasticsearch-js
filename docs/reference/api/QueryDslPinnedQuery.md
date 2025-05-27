## Interface `QueryDslPinnedQuery`

| Name | Type | Description |
| - | - | - |
| `docs` | [QueryDslPinnedDoc](./QueryDslPinnedDoc.md)[] | Documents listed in the order they are to appear in results. Required if `ids` is not specified. |
| `ids` | [Id](./Id.md)[] | Document IDs listed in the order they are to appear in results. Required if `docs` is not specified. |
| `organic` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Any choice of query used to rank documents which will be ranked below the "pinned" documents. |
