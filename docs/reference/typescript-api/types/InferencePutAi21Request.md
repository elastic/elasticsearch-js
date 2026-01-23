# InferencePutAi21Request

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceAi21TaskType`](InferenceAi21TaskType.md) | The type of the inference task that the model will perform. |
| `ai21_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `service` | [`InferenceAi21ServiceType`](InferenceAi21ServiceType.md) | The type of service supported for the specified task type. In this case, `ai21`. |
| `service_settings` | [`InferenceAi21ServiceSettings`](InferenceAi21ServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `ai21` service. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, ai21_inference_id?: never, timeout?: never, service?: never, service_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, ai21_inference_id?: never, timeout?: never, service?: never, service_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
