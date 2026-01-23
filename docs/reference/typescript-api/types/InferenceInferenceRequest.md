# InferenceInferenceRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type?` | [`InferenceTaskType`](InferenceTaskType.md) | The type of inference task that the model performs. |
| `inference_id` | [`Id`](Id.md) | The unique identifier for the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | The amount of time to wait for the inference request to complete. |
| `query?` | `string` | The query input, which is required only for the `rerank` task.
It is not required for other tasks. |
| `input` | `string | string[]` | The text on which you want to perform the inference task.
It can be a single string or an array.

> info
> Inference endpoints for the `completion` task type currently only support a single string as input. |
| `input_type?` | `string` | Specifies the input data type for the text embedding model. The `input_type` parameter only applies to Inference Endpoints with the `text_embedding` task type. Possible values include:
* `SEARCH`
* `INGEST`
* `CLASSIFICATION`
* `CLUSTERING`
Not all services support all values. Unsupported values will trigger a validation exception.
Accepted values depend on the configured inference service, refer to the relevant service-specific documentation for more info.

> info
> The `input_type` parameter specified on the root level of the request body will take precedence over the `input_type` parameter specified in `task_settings`. |
| `task_settings?` | [`InferenceTaskSettings`](InferenceTaskSettings.md) | Task settings for the individual inference request.
These settings are specific to the task type you specified and override the task settings specified when initializing the service. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, inference_id?: never, timeout?: never, query?: never, input?: never, input_type?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, inference_id?: never, timeout?: never, query?: never, input?: never, input_type?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
