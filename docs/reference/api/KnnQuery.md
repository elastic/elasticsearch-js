## Interface `KnnQuery`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The name of the vector field to search against |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | Filters for the kNN search query |
| `k` | [integer](./integer.md) | The final number of nearest neighbors to return as top hits |
| `num_candidates` | [integer](./integer.md) | The number of nearest neighbor candidates to consider per shard |
| `query_vector_builder` | [QueryVectorBuilder](./QueryVectorBuilder.md) | The query vector builder. You must provide a query_vector_builder or query_vector, but not both. |
| `query_vector` | [QueryVector](./QueryVector.md) | The query vector |
| `rescore_vector` | [RescoreVector](./RescoreVector.md) | Apply oversampling and rescoring to quantized vectors |
| `similarity` | [float](./float.md) | The minimum similarity for a vector to be considered a match |
