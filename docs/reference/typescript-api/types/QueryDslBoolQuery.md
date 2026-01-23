# QueryDslBoolQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `filter?` | `QueryDslQueryContainer | QueryDslQueryContainer[]` | The clause (query) must appear in matching documents.
However, unlike `must`, the score of the query will be ignored. |
| `minimum_should_match?` | [`MinimumShouldMatch`](MinimumShouldMatch.md) | Specifies the number or percentage of `should` clauses returned documents must match. |
| `must?` | `QueryDslQueryContainer | QueryDslQueryContainer[]` | The clause (query) must appear in matching documents and will contribute to the score. |
| `must_not?` | `QueryDslQueryContainer | QueryDslQueryContainer[]` | The clause (query) must not appear in the matching documents.
Because scoring is ignored, a score of `0` is returned for all documents. |
| `should?` | `QueryDslQueryContainer | QueryDslQueryContainer[]` | The clause (query) should appear in the matching document. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
