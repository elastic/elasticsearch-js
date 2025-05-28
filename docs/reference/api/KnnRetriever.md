# `KnnRetriever` [interface-KnnRetriever]

| Name | Type | Description |
| - | - | - |
| `field` | string | The name of the vector field to search against. |
| `k` | [integer](./integer.md) | Number of nearest neighbors to return as top hits. |
| `num_candidates` | [integer](./integer.md) | Number of nearest neighbor candidates to consider per shard. |
| `query_vector_builder` | [QueryVectorBuilder](./QueryVectorBuilder.md) | Defines a model to build a query vector. |
| `query_vector` | [QueryVector](./QueryVector.md) | Query vector. Must have the same number of dimensions as the vector field you are searching against. You must provide a query_vector_builder or query_vector, but not both. |
| `rescore_vector` | [RescoreVector](./RescoreVector.md) | Apply oversampling and rescoring to quantized vectors |
| `similarity` | [float](./float.md) | The minimum similarity required for a document to be considered a match. |
