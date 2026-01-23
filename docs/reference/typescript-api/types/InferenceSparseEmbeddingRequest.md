# InferenceSparseEmbeddingRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `inference_id` | [`Id`](Id.md) | The inference Id |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference request to complete. |
| `input` | `string | string[]` | Inference input.
Either a string or an array of strings. |
| `task_settings?` | [`InferenceTaskSettings`](InferenceTaskSettings.md) | Task settings for the individual inference request. These settings are specific to the <task_type> you specified and override the task settings specified when initializing the service. |
| `body?` | `string | { [key: string]: any } & { inference_id?: never, timeout?: never, input?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { inference_id?: never, timeout?: never, input?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
