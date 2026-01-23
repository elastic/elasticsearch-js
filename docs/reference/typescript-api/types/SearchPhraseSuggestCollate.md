# SearchPhraseSuggestCollate

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `params?` | `Record<string, any>` | Parameters to use if the query is templated. |
| `prune?` | `boolean` | Returns all suggestions with an extra `collate_match` option indicating whether the generated phrase matched any document. |
| `query` | [`SearchPhraseSuggestCollateQuery`](SearchPhraseSuggestCollateQuery.md) | A collate query that is run once for every suggestion. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
