# InferenceAi21ServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `model_id` | `string` | The name of the model to use for the inference task.
Refer to the AI21 models documentation for the list of supported models and versions.
Service has been tested and confirmed to be working for `completion` and `chat_completion` tasks with the following models:
* `jamba-mini`
* `jamba-large` |
| `api_key?` | `string` | A valid API key for accessing AI21 API.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from the AI21 API.
By default, the `ai21` service sets the number of requests allowed per minute to 200. Please refer to AI21 documentation for more details. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
