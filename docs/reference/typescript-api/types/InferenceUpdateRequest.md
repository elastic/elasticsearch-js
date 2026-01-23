# InferenceUpdateRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `task_type?` | [`InferenceTaskType`](InferenceTaskType.md) | The type of inference task that the model performs. |
| `inference_config?` | [`InferenceInferenceEndpoint`](InferenceInferenceEndpoint.md) | - |
| `body?` | `string | { [key: string]: any } & { inference_id?: never, task_type?: never, inference_config?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { inference_id?: never, task_type?: never, inference_config?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
