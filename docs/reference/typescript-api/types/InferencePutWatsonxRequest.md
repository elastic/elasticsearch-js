# InferencePutWatsonxRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceWatsonxTaskType`](InferenceWatsonxTaskType.md) | The type of the inference task that the model will perform. |
| `watsonx_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Applies only to the `text_embedding` task type.
Not applicable to the `rerank`, `completion` or `chat_completion` task types. |
| `service` | [`InferenceWatsonxServiceType`](InferenceWatsonxServiceType.md) | The type of service supported for the specified task type. In this case, `watsonxai`. |
| `service_settings` | [`InferenceWatsonxServiceSettings`](InferenceWatsonxServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `watsonxai` service. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, watsonx_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, watsonx_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
