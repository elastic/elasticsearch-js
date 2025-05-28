# `InferenceVoyageAITaskSettings` [interface-InferenceVoyageAITaskSettings]

| Name | Type | Description |
| - | - | - |
| `input_type` | string | Type of the input text. Permitted values: `ingest` (maps to `document` in the VoyageAI documentation), `search` (maps to `query` in the VoyageAI documentation). Only for the `text_embedding` task type. |
| `return_documents` | boolean | Whether to return the source documents in the response. Only for the `rerank` task type. |
| `top_k` | [integer](./integer.md) | The number of most relevant documents to return. If not specified, the reranking results of all documents will be returned. Only for the `rerank` task type. |
| `truncation` | boolean | Whether to truncate the input texts to fit within the context length. |
