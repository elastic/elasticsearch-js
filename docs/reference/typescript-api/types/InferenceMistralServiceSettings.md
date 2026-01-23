# InferenceMistralServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid API key of your Mistral account.
You can find your Mistral API keys or you can create a new one on the API Keys page.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `max_input_tokens?` | `integer` | The maximum number of tokens per input before chunking occurs. |
| `model` | `string` | The name of the model to use for the inference task.
Refer to the Mistral models documentation for the list of available models. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from the Mistral API.
By default, the `mistral` service sets the number of requests allowed per minute to 240. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
