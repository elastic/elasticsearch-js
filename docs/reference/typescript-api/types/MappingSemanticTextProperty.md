# MappingSemanticTextProperty

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'semantic_text'` | - |
| `meta?` | `Record<string, string>` | - |
| `inference_id?` | [`Id`](Id.md) | Inference endpoint that will be used to generate embeddings for the field.
This parameter cannot be updated. Use the Create inference API to create the endpoint.
If `search_inference_id` is specified, the inference endpoint will only be used at index time. |
| `search_inference_id?` | [`Id`](Id.md) | Inference endpoint that will be used to generate embeddings at query time.
You can update this parameter by using the Update mapping API. Use the Create inference API to create the endpoint.
If not specified, the inference endpoint defined by inference_id will be used at both index and query time. |
| `index_options?` | [`MappingSemanticTextIndexOptions`](MappingSemanticTextIndexOptions.md) | Settings for index_options that override any defaults used by semantic_text, for example
specific quantization settings. |
| `chunking_settings?` | `MappingChunkingSettings | null` | Settings for chunking text into smaller passages. If specified, these will override the
chunking settings sent in the inference endpoint associated with inference_id. If chunking settings are updated,
they will not be applied to existing documents until they are reindexed. |
| `fields?` | `Record<PropertyName, MappingProperty>` | Multi-fields allow the same string value to be indexed in multiple ways for different purposes, such as one
field for search and a multi-field for sorting and aggregations, or the same string value analyzed by different analyzers. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
