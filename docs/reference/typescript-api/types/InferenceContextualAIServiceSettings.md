# InferenceContextualAIServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid API key for your Contexutual AI account.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `model_id` | `string` | The name of the model to use for the inference task.
Refer to the Contextual AI documentation for the list of available rerank models. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Contextual AI.
The `contextualai` service sets a default number of requests allowed per minute depending on the task type.
For `rerank`, it is set to `1000`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
