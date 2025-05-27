## Interface `InferenceAzureOpenAIServiceSettings`

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key for your Azure OpenAI account. You must specify either `api_key` or `entra_id`. If you do not provide either or you provide both, you will receive an error when you try to create your model. IMPORTANT: You need to provide the API key only once, during the inference model creation. The get inference endpoint API does not retrieve your API key. After creating the inference model, you cannot change the associated API key. If you want to use a different API key, delete the inference model and recreate it with the same name and the updated API key. |
| `api_version` | string | The Azure API version ID to use. It is recommended to use the latest supported non-preview version. |
| `deployment_id` | string | The deployment name of your deployed models. Your Azure OpenAI deployments can be found though the Azure OpenAI Studio portal that is linked to your subscription. |
| `entra_id` | string | A valid Microsoft Entra token. You must specify either `api_key` or `entra_id`. If you do not provide either or you provide both, you will receive an error when you try to create your model. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from Azure. The `azureopenai` service sets a default number of requests allowed per minute depending on the task type. For `text_embedding`, it is set to `1440`. For `completion`, it is set to `120`. |
| `resource_name` | string | The name of your Azure OpenAI resource. You can find this from the list of resources in the Azure Portal for your subscription. |
