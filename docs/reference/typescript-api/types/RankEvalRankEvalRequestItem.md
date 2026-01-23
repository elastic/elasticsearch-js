# RankEvalRankEvalRequestItem

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The search request’s ID, used to group result details later. |
| `request?` | `RankEvalRankEvalQuery | QueryDslQueryContainer` | The query being evaluated. |
| `ratings` | `RankEvalDocumentRating[]` | List of document ratings |
| `template_id?` | [`Id`](Id.md) | The search template Id |
| `params?` | `Record<string, any>` | The search template parameters. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
