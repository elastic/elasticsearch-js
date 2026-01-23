# InferenceOpenShiftAiServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid API key for your OpenShift AI endpoint.
Can be found in `Token authentication` section of model related information. |
| `url` | `string` | The URL of the OpenShift AI hosted model endpoint. |
| `model_id?` | `string` | The name of the model to use for the inference task.
Refer to the hosted model's documentation for the name if needed.
Service has been tested and confirmed to be working with the following models:
* For `text_embedding` task - `gritlm-7b`.
* For `completion` and `chat_completion` tasks - `llama-31-8b-instruct`.
* For `rerank` task - `bge-reranker-v2-m3`. |
| `max_input_tokens?` | [`integer`](integer.md) | For a `text_embedding` task, the maximum number of tokens per input before chunking occurs. |
| `similarity?` | [`InferenceOpenShiftAiSimilarityType`](InferenceOpenShiftAiSimilarityType.md) | For a `text_embedding` task, the similarity measure. One of cosine, dot_product, l2_norm.
If not specified, the default dot_product value is used. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from the OpenShift AI API.
By default, the `openshift_ai` service sets the number of requests allowed per minute to 3000. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
