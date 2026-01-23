# InferencePutRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type?` | [`InferenceTaskType`](InferenceTaskType.md) | The task type. Refer to the integration list in the API description for the available task types. |
| `inference_id` | [`Id`](Id.md) | The inference Id |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `inference_config?` | [`InferenceInferenceEndpoint`](InferenceInferenceEndpoint.md) | - |
| `body?` | `string | { [key: string]: any } & { task_type?: never, inference_id?: never, timeout?: never, inference_config?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, inference_id?: never, timeout?: never, inference_config?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
