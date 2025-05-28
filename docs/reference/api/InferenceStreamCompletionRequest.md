# `InferenceStreamCompletionRequest` [interface-InferenceStreamCompletionRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { inference_id?: never; input?: never; task_settings?: never; }) | All values in `body` will be added to the request body. |
| `inference_id` | [Id](./Id.md) | The unique identifier for the inference endpoint. |
| `input` | string | string[] | The text on which you want to perform the inference task. It can be a single string or an array. NOTE: Inference endpoints for the completion task type currently only support a single string as input. |
| `querystring` | { [key: string]: any; } & { inference_id?: never; input?: never; task_settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_settings` | [InferenceTaskSettings](./InferenceTaskSettings.md) | Optional task settings |
