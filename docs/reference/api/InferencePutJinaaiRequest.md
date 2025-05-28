# `InferencePutJinaaiRequest` [interface-InferencePutJinaaiRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; jinaai_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `jinaai_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `querystring` | { [key: string]: any; } & { task_type?: never; jinaai_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceJinaAIServiceSettings](./InferenceJinaAIServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `jinaai` service. |
| `service` | [InferenceJinaAIServiceType](./InferenceJinaAIServiceType.md) | The type of service supported for the specified task type. In this case, `jinaai`. |
| `task_settings` | [InferenceJinaAITaskSettings](./InferenceJinaAITaskSettings.md) | Settings to configure the inference task. These settings are specific to the task type you specified. |
| `task_type` | [InferenceJinaAITaskType](./InferenceJinaAITaskType.md) | The type of the inference task that the model will perform. |
