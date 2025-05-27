## Interface `InferenceGetRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; inference_id?: never; }) | All values in `body` will be added to the request body. |
| `inference_id` | [Id](./Id.md) | The inference Id |
| `querystring` | { [key: string]: any; } & { task_type?: never; inference_id?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_type` | [InferenceTaskType](./InferenceTaskType.md) | The task type |
