# InferenceDeepSeekServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid API key for your DeepSeek account.
You can find or create your DeepSeek API keys on the DeepSeek API key page.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `model_id` | `string` | For a `completion` or `chat_completion` task, the name of the model to use for the inference task.

For the available `completion` and `chat_completion` models, refer to the [DeepSeek Models & Pricing docs](https://api-docs.deepseek.com/quick_start/pricing). |
| `url?` | `string` | The URL endpoint to use for the requests. Defaults to `https://api.deepseek.com/chat/completions`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
