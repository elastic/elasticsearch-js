# InferenceGetRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type?` | [`InferenceTaskType`](InferenceTaskType.md) | The task type |
| `inference_id?` | [`Id`](Id.md) | The inference Id |
| `body?` | `string | { [key: string]: any } & { task_type?: never, inference_id?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, inference_id?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
