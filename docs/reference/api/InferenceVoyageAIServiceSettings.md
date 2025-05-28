# `InferenceVoyageAIServiceSettings` [interface-InferenceVoyageAIServiceSettings]

| Name | Type | Description |
| - | - | - |
| `dimensions` | [integer](./integer.md) | The number of dimensions for resulting output embeddings. This setting maps to `output_dimension` in the VoyageAI documentation. Only for the `text_embedding` task type. |
| `embedding_type` | [float](./float.md) | The data type for the embeddings to be returned. This setting maps to `output_dtype` in the VoyageAI documentation. Permitted values: float, int8, bit. `int8` is a synonym of `byte` in the VoyageAI documentation. `bit` is a synonym of `binary` in the VoyageAI documentation. Only for the `text_embedding` task type. |
| `model_id` | string | The name of the model to use for the inference task. Refer to the VoyageAI documentation for the list of available text embedding and rerank models. |
| `rate_limit` | [InferenceRateLimitSetting](./InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from VoyageAI. The `voyageai` service sets a default number of requests allowed per minute depending on the task type. For both `text_embedding` and `rerank`, it is set to `2000`. |
