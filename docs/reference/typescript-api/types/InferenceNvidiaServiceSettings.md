# InferenceNvidiaServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid API key for your Nvidia endpoint.
Can be found in `API Keys` section of Nvidia account settings. |
| `url?` | `string` | The URL of the Nvidia model endpoint. If not provided, the default endpoint URL is used depending on the task type:

* For `text_embedding` task - `https://integrate.api.nvidia.com/v1/embeddings`.
* For `completion` and `chat_completion` tasks - `https://integrate.api.nvidia.com/v1/chat/completions`.
* For `rerank` task - `https://ai.api.nvidia.com/v1/retrieval/nvidia/reranking`. |
| `model_id` | `string` | The name of the model to use for the inference task.
Refer to the model's documentation for the name if needed.
Service has been tested and confirmed to be working with the following models:

* For `text_embedding` task - `nvidia/llama-3.2-nv-embedqa-1b-v2`.
* For `completion` and `chat_completion` tasks - `microsoft/phi-3-mini-128k-instruct`.
* For `rerank` task - `nv-rerank-qa-mistral-4b:1`.
Service doesn't support `text_embedding` task `baai/bge-m3` and `nvidia/nvclip` models due to them not recognizing the `input_type` parameter. |
| `max_input_tokens?` | [`integer`](integer.md) | For a `text_embedding` task, the maximum number of tokens per input. Inputs exceeding this value are truncated prior to sending to the Nvidia API. |
| `similarity?` | [`InferenceNvidiaSimilarityType`](InferenceNvidiaSimilarityType.md) | For a `text_embedding` task, the similarity measure. One of cosine, dot_product, l2_norm. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from the Nvidia API.
By default, the `nvidia` service sets the number of requests allowed per minute to 3000. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
