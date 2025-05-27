## Interface `InferenceGoogleAiStudioServiceSettings`

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key of your Google Gemini account. |
| `model_id` | string | The name of the model to use for the inference task. Refer to the Google documentation for the list of supported models. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Google AI Studio. By default, the `googleaistudio` service sets the number of requests allowed per minute to 360. |
