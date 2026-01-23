# InferenceContextualAITaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `instruction?` | `string` | Instructions for the reranking model. Refer to <https://docs.contextual.ai/api-reference/rerank/rerank#body-instruction>
Only for the `rerank` task type. |
| `return_documents?` | `boolean` | Whether to return the source documents in the response.
Only for the `rerank` task type. |
| `top_k?` | `integer` | The number of most relevant documents to return.
If not specified, the reranking results of all documents will be returned.
Only for the `rerank` task type. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
