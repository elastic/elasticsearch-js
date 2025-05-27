## Interface `QueryDslSparseVectorQuery`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The name of the field that contains the token-weight pairs to be searched against. This field must be a mapped sparse_vector field. |
| `inference_id` | [Id](./Id.md) | The inference ID to use to convert the query text into token-weight pairs. It must be the same inference ID that was used to create the tokens from the input text. Only one of inference_id and query_vector is allowed. If inference_id is specified, query must also be specified. Only one of inference_id or query_vector may be supplied in a request. |
| `prune` | boolean | Whether to perform pruning, omitting the non-significant tokens from the query to improve query performance. If prune is true but the pruning_config is not specified, pruning will occur but default values will be used. Default: false |
| `pruning_config` | [QueryDslTokenPruningConfig](./QueryDslTokenPruningConfig.md) | Optional pruning configuration. If enabled, this will omit non-significant tokens from the query in order to improve query performance. This is only used if prune is set to true. If prune is set to true but pruning_config is not specified, default values will be used. |
| `query_vector` | Record<string, [float](./float.md)> | Dictionary of precomputed sparse vectors and their associated weights. Only one of inference_id or query_vector may be supplied in a request. |
| `query` | string | The query text you want to use for search. If inference_id is specified, query must also be specified. |
