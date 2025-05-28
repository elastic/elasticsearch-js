# `InferencePutAzureopenaiRequest` [interface-InferencePutAzureopenaiRequest]

| Name | Type | Description |
| - | - | - |
| `azureopenai_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; azureopenai_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `querystring` | { [key: string]: any; } & { task_type?: never; azureopenai_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceAzureOpenAIServiceSettings](./InferenceAzureOpenAIServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `azureopenai` service. |
| `service` | [InferenceAzureOpenAIServiceType](./InferenceAzureOpenAIServiceType.md) | The type of service supported for the specified task type. In this case, `azureopenai`. |
| `task_settings` | [InferenceAzureOpenAITaskSettings](./InferenceAzureOpenAITaskSettings.md) | Settings to configure the inference task. These settings are specific to the task type you specified. |
| `task_type` | [InferenceAzureOpenAITaskType](./InferenceAzureOpenAITaskType.md) | The type of the inference task that the model will perform. NOTE: The `chat_completion` task type only supports streaming and only through the _stream API. |
