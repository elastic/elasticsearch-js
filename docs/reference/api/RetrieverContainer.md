# `RetrieverContainer` [interface-RetrieverContainer]

| Name | Type | Description |
| - | - | - |
| `knn` | [KnnRetriever](./KnnRetriever.md) | A retriever that replaces the functionality of a knn search. |
| `rrf` | [RRFRetriever](./RRFRetriever.md) | A retriever that produces top documents from reciprocal rank fusion (RRF). |
| `rule` | [RuleRetriever](./RuleRetriever.md) | A retriever that replaces the functionality of a rule query. |
| `standard` | [StandardRetriever](./StandardRetriever.md) | A retriever that replaces the functionality of a traditional query. |
| `text_similarity_reranker` | [TextSimilarityReranker](./TextSimilarityReranker.md) | A retriever that reranks the top documents based on a reranking model using the InferenceAPI |
