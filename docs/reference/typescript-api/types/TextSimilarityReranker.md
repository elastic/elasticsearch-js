# TextSimilarityReranker

## Interface

### Extends

- [`RetrieverBase`](RetrieverBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `retriever` | [`RetrieverContainer`](RetrieverContainer.md) | The nested retriever which will produce the first-level results, that will later be used for reranking. |
| `rank_window_size?` | [`integer`](integer.md) | This value determines how many documents we will consider from the nested retriever. |
| `inference_id?` | `string` | Unique identifier of the inference endpoint created using the inference API. |
| `inference_text` | `string` | The text snippet used as the basis for similarity comparison. |
| `field` | `string` | The document field to be used for text similarity comparisons. This field should contain the text that will be evaluated against the inference_text. |
| `chunk_rescorer?` | [`ChunkRescorer`](ChunkRescorer.md) | Whether to rescore on only the best matching chunks. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
