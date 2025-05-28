# `InferencePutAzureaistudioRequest` [interface-InferencePutAzureaistudioRequest]

| Name | Type | Description |
| - | - | - |
| `azureaistudio_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; azureaistudio_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `querystring` | { [key: string]: any; } & { task_type?: never; azureaistudio_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceAzureAiStudioServiceSettings](./InferenceAzureAiStudioServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `openai` service. |
| `service` | [InferenceAzureAiStudioServiceType](./InferenceAzureAiStudioServiceType.md) | The type of service supported for the specified task type. In this case, `azureaistudio`. |
| `task_settings` | [InferenceAzureAiStudioTaskSettings](./InferenceAzureAiStudioTaskSettings.md) | Settings to configure the inference task. These settings are specific to the task type you specified. |
| `task_type` | [InferenceAzureAiStudioTaskType](./InferenceAzureAiStudioTaskType.md) | The type of the inference task that the model will perform. |
