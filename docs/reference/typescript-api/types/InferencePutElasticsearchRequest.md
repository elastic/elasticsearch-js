# InferencePutElasticsearchRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceElasticsearchTaskType`](InferenceElasticsearchTaskType.md) | The type of the inference task that the model will perform. |
| `elasticsearch_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint.
The must not match the `model_id`. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Applies only to the `sparse_embedding` and `text_embedding` task types.
Not applicable to the `rerank` task type. |
| `service` | [`InferenceElasticsearchServiceType`](InferenceElasticsearchServiceType.md) | The type of service supported for the specified task type. In this case, `elasticsearch`. |
| `service_settings` | [`InferenceElasticsearchServiceSettings`](InferenceElasticsearchServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `elasticsearch` service. |
| `task_settings?` | [`InferenceElasticsearchTaskSettings`](InferenceElasticsearchTaskSettings.md) | Settings to configure the inference task.
These settings are specific to the task type you specified. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, elasticsearch_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, elasticsearch_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never, task_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
