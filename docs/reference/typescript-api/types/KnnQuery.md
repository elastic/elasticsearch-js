# KnnQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The name of the vector field to search against |
| `query_vector?` | [`QueryVector`](QueryVector.md) | The query vector |
| `query_vector_builder?` | [`QueryVectorBuilder`](QueryVectorBuilder.md) | The query vector builder. You must provide a query_vector_builder or query_vector, but not both. |
| `num_candidates?` | `integer` | The number of nearest neighbor candidates to consider per shard |
| `visit_percentage?` | `float` | The percentage of vectors to explore per shard while doing knn search with bbq_disk |
| `k?` | `integer` | The final number of nearest neighbors to return as top hits |
| `filter?` | `QueryDslQueryContainer | QueryDslQueryContainer[]` | Filters for the kNN search query |
| `similarity?` | `float` | The minimum similarity for a vector to be considered a match |
| `rescore_vector?` | [`RescoreVector`](RescoreVector.md) | Apply oversampling and rescoring to quantized vectors |

## See Also

- [All Types](./)
- [API Methods](../index.md)
