# InferencePutOpenaiRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceOpenAITaskType`](InferenceOpenAITaskType.md) | The type of the inference task that the model will perform.
NOTE: The `chat_completion` task type only supports streaming and only through the _stream API. |
| `openai_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Applies only to the `text_embedding` task type.
Not applicable to the `completion` or `chat_completion` task types. |
| `service` | [`InferenceOpenAIServiceType`](InferenceOpenAIServiceType.md) | The type of service supported for the specified task type. In this case, `openai`. |
| `service_settings` | [`InferenceOpenAIServiceSettings`](InferenceOpenAIServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `openai` service. |
| `task_settings?` | [`InferenceOpenAITaskSettings`](InferenceOpenAITaskSettings.md) | Settings to configure the inference task.
These settings are specific to the task type you specified. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, openai_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, openai_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
