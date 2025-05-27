## Interface `InferencePutElserRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; elser_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; }) | All values in `body` will be added to the request body. |
| `chunking_settings` | [InferenceInferenceChunkingSettings](./InferenceInferenceChunkingSettings.md) | The chunking configuration object. |
| `elser_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
| `querystring` | { [key: string]: any; } & { task_type?: never; elser_inference_id?: never; chunking_settings?: never; service?: never; service_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceElserServiceSettings](./InferenceElserServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `elser` service. |
| `service` | [InferenceElserServiceType](./InferenceElserServiceType.md) | The type of service supported for the specified task type. In this case, `elser`. |
| `task_type` | [InferenceElserTaskType](./InferenceElserTaskType.md) | The type of the inference task that the model will perform. |
