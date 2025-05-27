## Interface `QueryDslScriptScoreQuery`

| Name | Type | Description |
| - | - | - |
| `min_score` | [float](./float.md) | Documents with a score lower than this floating point number are excluded from the search results. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query used to return documents. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | Script used to compute the score of documents returned by the query. Important: final relevance scores from the `script_score` query cannot be negative. |
