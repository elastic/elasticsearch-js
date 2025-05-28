# `InferencePutHuggingFaceRequest` [interface-InferencePutHuggingFaceRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; huggingface_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `huggingface_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `querystring` | { [key: string]: any; } & { task_type?: never; huggingface_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceHuggingFaceServiceSettings](./InferenceHuggingFaceServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `hugging_face` service. |
| `service` | [InferenceHuggingFaceServiceType](./InferenceHuggingFaceServiceType.md) | The type of service supported for the specified task type. In this case, `hugging_face`. |
| `task_type` | [InferenceHuggingFaceTaskType](./InferenceHuggingFaceTaskType.md) | The type of the inference task that the model will perform. |
