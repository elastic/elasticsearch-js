## Interface `InferencePutMistralRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; mistral_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `mistral_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `querystring` | { [key: string]: any; } & { task_type?: never; mistral_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceMistralServiceSettings](./InferenceMistralServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `mistral` service. |
| `service` | [InferenceMistralServiceType](./InferenceMistralServiceType.md) | The type of service supported for the specified task type. In this case, `mistral`. |
| `task_type` | [InferenceMistralTaskType](./InferenceMistralTaskType.md) | The task type. The only valid task type for the model to perform is `text_embedding`. |
