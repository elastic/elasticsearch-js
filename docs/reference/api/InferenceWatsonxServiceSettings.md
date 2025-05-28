# `InferenceWatsonxServiceSettings` [interface-InferenceWatsonxServiceSettings]

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key of your Watsonx account. You can find your Watsonx API keys or you can create a new one on the API keys page. IMPORTANT: You need to provide the API key only once, during the inference model creation. The get inference endpoint API does not retrieve your API key. After creating the inference model, you cannot change the associated API key. If you want to use a different API key, delete the inference model and recreate it with the same name and the updated API key. |
| `api_version` | string | A version parameter that takes a version date in the format of `YYYY-MM-DD`. For the active version data parameters, refer to the Wastonx documentation. |
| `model_id` | string | The name of the model to use for the inference task. Refer to the IBM Embedding Models section in the Watsonx documentation for the list of available text embedding models. |
| `project_id` | string | The identifier of the IBM Cloud project to use for the inference task. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Watsonx. By default, the `watsonxai` service sets the number of requests allowed per minute to 120. |
| `url` | string | The URL of the inference endpoint that you created on Watsonx. |
