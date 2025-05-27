## Interface `MappingDenseVectorProperty`

| Name | Type | Description |
| - | - | - |
| `dims` | [integer](./integer.md) | Number of vector dimensions. Can't exceed `4096`. If `dims` is not specified, it will be set to the length of the first vector added to the field. |
| `element_type` | [MappingDenseVectorElementType](./MappingDenseVectorElementType.md) | The data type used to encode vectors. The supported data types are `float` (default), `byte`, and `bit`. |
| `index_options` | [MappingDenseVectorIndexOptions](./MappingDenseVectorIndexOptions.md) | An optional section that configures the kNN indexing algorithm. The HNSW algorithm has two internal parameters that influence how the data structure is built. These can be adjusted to improve the accuracy of results, at the expense of slower indexing speed. This parameter can only be specified when `index` is `true`. |
| `index` | boolean | If `true`, you can search this field using the kNN search API. |
| `similarity` | [MappingDenseVectorSimilarity](./MappingDenseVectorSimilarity.md) | The vector similarity metric to use in kNN search. Documents are ranked by their vector field's similarity to the query vector. The `_score` of each document will be derived from the similarity, in a way that ensures scores are positive and that a larger score corresponds to a higher ranking. Defaults to `l2_norm` when `element_type` is `bit` otherwise defaults to `cosine`. `bit` vectors only support `l2_norm` as their similarity metric. This parameter can only be specified when `index` is `true`. |
| `type` | 'dense_vector' | &nbsp; |
