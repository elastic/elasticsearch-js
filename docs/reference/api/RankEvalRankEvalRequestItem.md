# `RankEvalRankEvalRequestItem` [interface-RankEvalRankEvalRequestItem]

| Name | Type | Description |
| - | - | - |
| `id` | [Id](./Id.md) | The search request’s ID, used to group result details later. |
| `params` | Record<string, any> | The search template parameters. |
| `ratings` | [RankEvalDocumentRating](./RankEvalDocumentRating.md)[] | List of document ratings |
| `request` | [RankEvalRankEvalQuery](./RankEvalRankEvalQuery.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | The query being evaluated. |
| `template_id` | [Id](./Id.md) | The search template Id |
