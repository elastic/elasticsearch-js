# `InferenceJinaAIServiceSettings` [interface-InferenceJinaAIServiceSettings]

| Name | Type | Description |
| - | - | - |
| `api_key` | string | A valid API key of your JinaAI account. IMPORTANT: You need to provide the API key only once, during the inference model creation. The get inference endpoint API does not retrieve your API key. After creating the inference model, you cannot change the associated API key. If you want to use a different API key, delete the inference model and recreate it with the same name and the updated API key. |
| `model_id` | string | The name of the model to use for the inference task. For a `rerank` task, it is required. For a `text_embedding` task, it is optional. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from JinaAI. By default, the `jinaai` service sets the number of requests allowed per minute to 2000 for all task types. |
| `similarity` | [InferenceJinaAISimilarityType](./InferenceJinaAISimilarityType.md) | For a `text_embedding` task, the similarity measure. One of cosine, dot_product, l2_norm. The default values varies with the embedding type. For example, a float embedding type uses a `dot_product` similarity measure by default. |
