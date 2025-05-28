# `InferenceAnthropicServiceSettings` [interface-InferenceAnthropicServiceSettings]

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key for the Anthropic API. |
| `model_id` | string | The name of the model to use for the inference task. Refer to the Anthropic documentation for the list of supported models. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Anthropic. By default, the `anthropic` service sets the number of requests allowed per minute to 50. |
