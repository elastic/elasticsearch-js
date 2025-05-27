## Interface `InferenceTextEmbeddingRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { inference_id?: never; timeout?: never; input?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `inference_id` | [Id](./Id.md) | The inference Id |
| `input` | string | string[] | Inference input. Either a string or an array of strings. |
| `querystring` | { [key: string]: any; } & { inference_id?: never; timeout?: never; input?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_settings` | [InferenceTaskSettings](./InferenceTaskSettings.md) | Optional task settings |
| `timeout` | [Duration](./Duration.md) | Specifies the amount of time to wait for the inference request to complete. |
