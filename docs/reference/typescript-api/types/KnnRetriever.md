# KnnRetriever

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | `string` | The name of the vector field to search against. |
| `query_vector?` | [`QueryVector`](QueryVector.md) | Query vector. Must have the same number of dimensions as the vector field you are searching against. You must provide a query_vector_builder or query_vector, but not both. |
| `query_vector_builder?` | [`QueryVectorBuilder`](QueryVectorBuilder.md) | Defines a model to build a query vector. |
| `k` | `integer` | Number of nearest neighbors to return as top hits. |
| `num_candidates` | `integer` | Number of nearest neighbor candidates to consider per shard. |
| `visit_percentage?` | `float` | The percentage of vectors to explore per shard while doing knn search with bbq_disk |
| `similarity?` | `float` | The minimum similarity required for a document to be considered a match. |
| `rescore_vector?` | [`RescoreVector`](RescoreVector.md) | Apply oversampling and rescoring to quantized vectors |

## See Also

- [All Types](./)
- [API Methods](../index.md)
