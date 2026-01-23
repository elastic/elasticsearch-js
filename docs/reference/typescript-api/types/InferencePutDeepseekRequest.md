# InferencePutDeepseekRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceTaskTypeDeepSeek`](InferenceTaskTypeDeepSeek.md) | The type of the inference task that the model will perform. |
| `deepseek_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `service` | [`InferenceDeepSeekServiceType`](InferenceDeepSeekServiceType.md) | The type of service supported for the specified task type. In this case, `deepseek`. |
| `service_settings` | [`InferenceDeepSeekServiceSettings`](InferenceDeepSeekServiceSettings.md) | Settings used to install the inference model.
These settings are specific to the `deepseek` service. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, deepseek_inference_id?: never, timeout?: never, service?: never, service_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, deepseek_inference_id?: never, timeout?: never, service?: never, service_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
