# InferencePutGroqRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceGroqTaskType`](InferenceGroqTaskType.md) | The type of the inference task that the model will perform. |
| `groq_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `service` | [`InferenceGroqServiceType`](InferenceGroqServiceType.md) | The type of service supported for the specified task type. In this case, `groq`. |
| `service_settings` | [`InferenceGroqServiceSettings`](InferenceGroqServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `groq` service. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, groq_inference_id?: never, timeout?: never, service?: never, service_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, groq_inference_id?: never, timeout?: never, service?: never, service_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
