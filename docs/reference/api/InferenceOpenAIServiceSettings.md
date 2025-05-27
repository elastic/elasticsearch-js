## Interface `InferenceOpenAIServiceSettings`

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key of your OpenAI account. You can find your OpenAI API keys in your OpenAI account under the API keys section. IMPORTANT: You need to provide the API key only once, during the inference model creation. The get inference endpoint API does not retrieve your API key. After creating the inference model, you cannot change the associated API key. If you want to use a different API key, delete the inference model and recreate it with the same name and the updated API key. |
| `dimensions` | [integer](./integer.md) | The number of dimensions the resulting output embeddings should have. It is supported only in `text-embedding-3` and later models. If it is not set, the OpenAI defined default for the model is used. |
| `model_id` | string | The name of the model to use for the inference task. Refer to the OpenAI documentation for the list of available text embedding models. |
| `organization_id` | string | The unique identifier for your organization. You can find the Organization ID in your OpenAI account under *Settings > Organizations*. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from OpenAI. The `openai` service sets a default number of requests allowed per minute depending on the task type. For `text_embedding`, it is set to `3000`. For `completion`, it is set to `500`. |
| `url` | string | The URL endpoint to use for the requests. It can be changed for testing purposes. |
