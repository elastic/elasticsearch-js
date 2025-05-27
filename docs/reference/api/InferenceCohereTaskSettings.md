## Interface `InferenceCohereTaskSettings`

| Name | Type | Description |
| - | - | - |
| `input_type` | [InferenceCohereInputType](./InferenceCohereInputType.md) | For a `text_embedding` task, the type of input passed to the model. Valid values are: * `classification`: Use it for embeddings passed through a text classifier. * `clustering`: Use it for the embeddings run through a clustering algorithm. * `ingest`: Use it for storing document embeddings in a vector database. * `search`: Use it for storing embeddings of search queries run against a vector database to find relevant documents. IMPORTANT: The `input_type` field is required when using embedding models `v3` and higher. |
| `return_documents` | boolean | For a `rerank` task, return doc text within the results. |
| `top_n` | [integer](./integer.md) | For a `rerank` task, the number of most relevant documents to return. It defaults to the number of the documents. If this inference endpoint is used in a `text_similarity_reranker` retriever query and `top_n` is set, it must be greater than or equal to `rank_window_size` in the query. |
| `truncate` | [InferenceCohereTruncateType](./InferenceCohereTruncateType.md) | For a `text_embedding` task, the method to handle inputs longer than the maximum token length. Valid values are: * `END`: When the input exceeds the maximum input token length, the end of the input is discarded. * `NONE`: When the input exceeds the maximum input token length, an error is returned. * `START`: When the input exceeds the maximum input token length, the start of the input is discarded. |
