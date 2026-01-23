# InferenceJinaAITaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `return_documents?` | `boolean` | For a `rerank` task, return the doc text within the results. |
| `task?` | [`InferenceJinaAITextEmbeddingTask`](InferenceJinaAITextEmbeddingTask.md) | For a `text_embedding` task, the task passed to the model.
Valid values are:

* `classification`: Use it for embeddings passed through a text classifier.
* `clustering`: Use it for the embeddings run through a clustering algorithm.
* `ingest`: Use it for storing document embeddings in a vector database.
* `search`: Use it for storing embeddings of search queries run against a vector database to find relevant documents. |
| `late_chunking?` | `boolean` | For a `text_embedding` task, controls when text is split into chunks.
When set to `true`, a request from Elasticsearch contains only chunks related to a single document. Instead of batching chunks across documents, Elasticsearch sends them in separate requests. This ensures that chunk embeddings retain context from the entire document, improving semantic quality.

If a document exceeds the model's context limits, late chunking is automatically disabled for that document only and standard chunking is used instead.

If not specified, defaults to `false`. |
| `top_n?` | [`integer`](integer.md) | For a `rerank` task, the number of most relevant documents to return.
It defaults to the number of the documents.
If this inference endpoint is used in a `text_similarity_reranker` retriever query and `top_n` is set, it must be greater than or equal to `rank_window_size` in the query. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
