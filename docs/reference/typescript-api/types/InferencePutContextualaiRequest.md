# InferencePutContextualaiRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceTaskTypeContextualAI`](InferenceTaskTypeContextualAI.md) | The type of the inference task that the model will perform. |
| `contextualai_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `service` | [`InferenceContextualAIServiceType`](InferenceContextualAIServiceType.md) | The type of service supported for the specified task type. In this case, `contextualai`. |
| `service_settings` | [`InferenceContextualAIServiceSettings`](InferenceContextualAIServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `contextualai` service. |
| `task_settings?` | [`InferenceContextualAITaskSettings`](InferenceContextualAITaskSettings.md) | Settings to configure the inference task.
These settings are specific to the task type you specified. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, contextualai_inference_id?: never, timeout?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, contextualai_inference_id?: never, timeout?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
