## Interface `MappingSemanticTextProperty`

| Name | Type | Description |
| - | - | - |
| `chunking_settings` | [MappingChunkingSettings](./MappingChunkingSettings.md) | Settings for chunking text into smaller passages. If specified, these will override the chunking settings sent in the inference endpoint associated with inference_id. If chunking settings are updated, they will not be applied to existing documents until they are reindexed. |
| `inference_id` | [Id](./Id.md) | Inference endpoint that will be used to generate embeddings for the field. This parameter cannot be updated. Use the Create inference API to create the endpoint. If `search_inference_id` is specified, the inference endpoint will only be used at index time. |
| `meta` | Record<string, string> | &nbsp; |
| `search_inference_id` | [Id](./Id.md) | Inference endpoint that will be used to generate embeddings at query time. You can update this parameter by using the Update mapping API. Use the Create inference API to create the endpoint. If not specified, the inference endpoint defined by inference_id will be used at both index and query time. |
| `type` | 'semantic_text' | &nbsp; |
