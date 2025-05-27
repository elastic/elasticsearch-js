## Interface `InferencePutAnthropicRequest`

| Name | Type | Description |
| - | - | - |
| `anthropic_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; anthropic_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `querystring` | { [key: string]: any; } & { task_type?: never; anthropic_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceAnthropicServiceSettings](./InferenceAnthropicServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `watsonxai` service. |
| `service` | [InferenceAnthropicServiceType](./InferenceAnthropicServiceType.md) | The type of service supported for the specified task type. In this case, `anthropic`. |
| `task_settings` | [InferenceAnthropicTaskSettings](./InferenceAnthropicTaskSettings.md) | Settings to configure the inference task. These settings are specific to the task type you specified. |
| `task_type` | [InferenceAnthropicTaskType](./InferenceAnthropicTaskType.md) | The task type. The only valid task type for the model to perform is `completion`. |
