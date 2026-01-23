# InferenceElasticsearchServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adaptive_allocations?` | [`InferenceAdaptiveAllocations`](InferenceAdaptiveAllocations.md) | Adaptive allocations configuration details.
If `enabled` is true, the number of allocations of the model is set based on the current load the process gets.
When the load is high, a new model allocation is automatically created, respecting the value of `max_number_of_allocations` if it's set.
When the load is low, a model allocation is automatically removed, respecting the value of `min_number_of_allocations` if it's set.
If `enabled` is true, do not set the number of allocations manually. |
| `deployment_id?` | `string` | The deployment identifier for a trained model deployment.
When `deployment_id` is used the `model_id` is optional. |
| `model_id` | `string` | The name of the model to use for the inference task.
It can be the ID of a built-in model (for example, `.multilingual-e5-small` for E5) or a text embedding model that was uploaded by using the Eland client. |
| `num_allocations?` | `integer` | The total number of allocations that are assigned to the model across machine learning nodes.
Increasing this value generally increases the throughput.
If adaptive allocations are enabled, do not set this value because it's automatically set. |
| `num_threads` | `integer` | The number of threads used by each model allocation during inference.
This setting generally increases the speed per inference request.
The inference process is a compute-bound process; `threads_per_allocations` must not exceed the number of available allocated processors per node.
The value must be a power of 2.
The maximum value is 32. |
| `long_document_strategy?` | `string` | Available only for the `rerank` task type using the Elastic reranker model.
Controls the strategy used for processing long documents during inference.

Possible values:
- `truncate` (default): Processes only the beginning of each document.
- `chunk`: Splits long documents into smaller parts (chunks) before inference.

When `long_document_strategy` is set to `chunk`, Elasticsearch splits each document into smaller parts but still returns a single score per document.
That score reflects the highest relevance score among all chunks. |
| `max_chunks_per_doc?` | `integer` | Only for the `rerank` task type.
Limits the number of chunks per document that are sent for inference when chunking is enabled.
If not set, all chunks generated for the document are processed. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
