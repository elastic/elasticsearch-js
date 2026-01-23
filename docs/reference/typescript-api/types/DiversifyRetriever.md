# DiversifyRetriever

## Interface

### Extends

- [`RetrieverBase`](RetrieverBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | [`DiversifyRetrieverTypes`](DiversifyRetrieverTypes.md) | The diversification strategy to apply. |
| `field` | `string` | The document field on which to diversify results on. |
| `retriever` | [`RetrieverContainer`](RetrieverContainer.md) | The nested retriever whose results will be diversified. |
| `size?` | [`integer`](integer.md) | The number of top documents to return after diversification. |
| `rank_window_size?` | [`integer`](integer.md) | The number of top documents from the nested retriever to consider for diversification. |
| `query_vector?` | [`QueryVector`](QueryVector.md) | The query vector used for diversification. |
| `query_vector_builder?` | [`QueryVectorBuilder`](QueryVectorBuilder.md) | a dense vector query vector builder to use instead of a static query_vector |
| `lambda?` | [`float`](float.md) | Controls the trade-off between relevance and diversity for MMR. A value of 0.0 focuses solely on diversity, while a value of 1.0 focuses solely on relevance. Required for MMR |

## See Also

- [All Types](./)
- [API Methods](../index.md)
