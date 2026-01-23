# QueryDslDisMaxQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `queries` | `QueryDslQueryContainer[]` | One or more query clauses.
Returned documents must match one or more of these queries.
If a document matches multiple queries, Elasticsearch uses the highest relevance score. |
| `tie_breaker?` | `double` | Floating point number between 0 and 1.0 used to increase the relevance scores of documents matching multiple query clauses. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
