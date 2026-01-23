# InferenceHuggingFaceServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid access token for your HuggingFace account.
You can create or find your access tokens on the HuggingFace settings page.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Hugging Face.
By default, the `hugging_face` service sets the number of requests allowed per minute to 3000 for all supported tasks.
Hugging Face does not publish a universal rate limit — actual limits may vary.
It is recommended to adjust this value based on the capacity and limits of your specific deployment environment. |
| `url` | `string` | The URL endpoint to use for the requests.
For `completion` and `chat_completion` tasks, the deployed model must be compatible with the Hugging Face Chat Completion interface (see the linked external documentation for details). The endpoint URL for the request must include `/v1/chat/completions`.
If the model supports the OpenAI Chat Completion schema, a toggle should appear in the interface. Enabling this toggle doesn't change any model behavior, it reveals the full endpoint URL needed (which should include `/v1/chat/completions`) when configuring the inference endpoint in Elasticsearch. If the model doesn't support this schema, the toggle may not be shown. |
| `model_id?` | `string` | The name of the HuggingFace model to use for the inference task.
For `completion` and `chat_completion` tasks, this field is optional but may be required for certain models — particularly when using serverless inference endpoints.
For the `text_embedding` task, this field should not be included. Otherwise, the request will fail. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
