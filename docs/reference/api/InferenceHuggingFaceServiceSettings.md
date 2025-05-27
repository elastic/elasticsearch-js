## Interface `InferenceHuggingFaceServiceSettings`

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid access token for your HuggingFace account. You can create or find your access tokens on the HuggingFace settings page. IMPORTANT: You need to provide the API key only once, during the inference model creation. The get inference endpoint API does not retrieve your API key. After creating the inference model, you cannot change the associated API key. If you want to use a different API key, delete the inference model and recreate it with the same name and the updated API key. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Hugging Face. By default, the `hugging_face` service sets the number of requests allowed per minute to 3000. |
| `url` | string | The URL endpoint to use for the requests. |
