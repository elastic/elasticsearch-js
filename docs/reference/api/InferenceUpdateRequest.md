# `InferenceUpdateRequest` [interface-InferenceUpdateRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { inference_id?: never; task_type?: never; inference_config?: never; }) | All values in `body` will be added to the request body. |
| `inference_config` | [InferenceInferenceEndpoint](./InferenceInferenceEndpoint.md) | &nbsp; |
| `inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `querystring` | { [key: string]: any; } & { inference_id?: never; task_type?: never; inference_config?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_type` | [InferenceTaskType](./InferenceTaskType.md) | The type of inference task that the model performs. |
