# InferenceStreamCompletionRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `inference_id` | [`Id`](Id.md) | The unique identifier for the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | The amount of time to wait for the inference request to complete. |
| `input` | `string | string`[] | The text on which you want to perform the inference task.
It can be a single string or an array.

NOTE: Inference endpoints for the completion task type currently only support a single string as input. |
| `task_settings?` | [`InferenceTaskSettings`](InferenceTaskSettings.md) | Task settings for the individual inference request. These settings are specific to the <task_type> you specified and override the task settings specified when initializing the service. |
| `body?` | `string | { [key: string]: any } & { inference_id?: never, timeout?: never, input?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { inference_id?: never, timeout?: never, input?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
