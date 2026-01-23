# InferencePutCustomRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceCustomTaskType`](InferenceCustomTaskType.md) | The type of the inference task that the model will perform. |
| `custom_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Applies only to the `sparse_embedding` or `text_embedding` task types.
Not applicable to the `rerank` or `completion` task types. |
| `service` | [`InferenceCustomServiceType`](InferenceCustomServiceType.md) | The type of service supported for the specified task type. In this case, `custom`. |
| `service_settings` | [`InferenceCustomServiceSettings`](InferenceCustomServiceSettings.md) | Settings used to install the inference model.
These settings are specific to the `custom` service. |
| `task_settings?` | [`InferenceCustomTaskSettings`](InferenceCustomTaskSettings.md) | Settings to configure the inference task.
These settings are specific to the task type you specified. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, custom_inference_id?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, custom_inference_id?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
