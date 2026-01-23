# InferenceLlamaServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `url` | `string` | The URL endpoint of the Llama stack endpoint.
URL must contain:
* For `text_embedding` task - `/v1/inference/embeddings`.
* For `completion` and `chat_completion` tasks - `/v1/openai/v1/chat/completions`. |
| `model_id` | `string` | The name of the model to use for the inference task.
Refer to the Llama downloading models documentation for different ways of getting a list of available models and downloading them.
Service has been tested and confirmed to be working with the following models:
* For `text_embedding` task - `all-MiniLM-L6-v2`.
* For `completion` and `chat_completion` tasks - `llama3.2:3b`. |
| `max_input_tokens?` | `integer` | For a `text_embedding` task, the maximum number of tokens per input before chunking occurs. |
| `similarity?` | [`InferenceLlamaSimilarityType`](InferenceLlamaSimilarityType.md) | For a `text_embedding` task, the similarity measure. One of cosine, dot_product, l2_norm. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from the Llama API.
By default, the `llama` service sets the number of requests allowed per minute to 3000. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
