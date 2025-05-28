# `TextSimilarityReranker` [interface-TextSimilarityReranker]

| Name | Type | Description |
| - | - | - |
| `field` | string | The document field to be used for text similarity comparisons. This field should contain the text that will be evaluated against the inference_text |
| `inference_id` | string | Unique identifier of the inference endpoint created using the inference API. |
| `inference_text` | string | The text snippet used as the basis for similarity comparison |
| `rank_window_size` | [integer](./integer.md) | This value determines how many documents we will consider from the nested retriever. |
| `retriever` | [RetrieverContainer](./RetrieverContainer.md) | The nested retriever which will produce the first-level results, that will later be used for reranking. |
