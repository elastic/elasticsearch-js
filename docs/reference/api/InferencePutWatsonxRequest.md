# `InferencePutWatsonxRequest` [interface-InferencePutWatsonxRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; watsonx_inference_id?: never; service?: never; service_settings?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { task_type?: never; watsonx_inference_id?: never; service?: never; service_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `service_settings` | [InferenceWatsonxServiceSettings](./InferenceWatsonxServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `watsonxai` service. |
| `service` | [InferenceWatsonxServiceType](./InferenceWatsonxServiceType.md) | The type of service supported for the specified task type. In this case, `watsonxai`. |
| `task_type` | [InferenceWatsonxTaskType](./InferenceWatsonxTaskType.md) | The task type. The only valid task type for the model to perform is `text_embedding`. |
| `watsonx_inference_id` | [Id](./Id.md) | The unique identifier of the inference endpoint. |
