# `InferenceInferenceRequest` [interface-InferenceInferenceRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; inference_id?: never; timeout?: never; query?: never; input?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `inference_id` | [Id](./Id.md) | The unique identifier for the inference endpoint. |
| `input` | string | string[] | The text on which you want to perform the inference task. It can be a single string or an array. > info > Inference endpoints for the `completion` task type currently only support a single string as input. |
| `query` | string | The query input, which is required only for the `rerank` task. It is not required for other tasks. |
| `querystring` | { [key: string]: any; } & { task_type?: never; inference_id?: never; timeout?: never; query?: never; input?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_settings` | [InferenceTaskSettings](./InferenceTaskSettings.md) | Task settings for the individual inference request. These settings are specific to the task type you specified and override the task settings specified when initializing the service. |
| `task_type` | [InferenceTaskType](./InferenceTaskType.md) | The type of inference task that the model performs. |
| `timeout` | [Duration](./Duration.md) | The amount of time to wait for the inference request to complete. |
