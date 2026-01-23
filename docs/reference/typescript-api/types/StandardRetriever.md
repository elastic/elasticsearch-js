# StandardRetriever

## Interface

### Extends

- [`RetrieverBase`](RetrieverBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Defines a query to retrieve a set of top documents. |
| `search_after?` | [`SortResults`](SortResults.md) | Defines a search after object parameter used for pagination. |
| `terminate_after?` | [`integer`](integer.md) | Maximum number of documents to collect for each shard. |
| `sort?` | [`Sort`](Sort.md) | A sort object that that specifies the order of matching documents. |
| `collapse?` | [`SearchFieldCollapse`](SearchFieldCollapse.md) | Collapses the top documents by a specified key into a single top document per key. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
