# `RankEvalRankEvalMetricDetail` [interface-RankEvalRankEvalMetricDetail]

| Name | Type | Description |
| - | - | - |
| `hits` | [RankEvalRankEvalHitItem](./RankEvalRankEvalHitItem.md)[] | The hits section shows a grouping of the search results with their supplied ratings |
| `metric_details` | Record<string, Record<string, any>> | The metric_details give additional information about the calculated quality metric (e.g. how many of the retrieved documents were relevant). The content varies for each metric but allows for better interpretation of the results |
| `metric_score` | [double](./double.md) | The metric_score in the details section shows the contribution of this query to the global quality metric score |
| `unrated_docs` | [RankEvalUnratedDocument](./RankEvalUnratedDocument.md)[] | The unrated_docs section contains an _index and _id entry for each document in the search result for this query that didn’t have a ratings value. This can be used to ask the user to supply ratings for these documents |
