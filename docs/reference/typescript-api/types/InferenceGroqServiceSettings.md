# InferenceGroqServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | `string` | The name of the model to use for the inference task.
Refer to the Groq model documentation for the list of supported models and versions.
Service has been tested and confirmed to be working for `completion` and `chat_completion` tasks with the following models:
* `llama-3.3-70b-versatile` |
| `api_key?` | `string` | A valid API key for accessing Groq API.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from the Groq API.
By default, the `groq` service sets the number of requests allowed per minute to 1000. Refer to Groq documentation for more details. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
