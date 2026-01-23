# InferencePutElserRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type` | [`InferenceElserTaskType`](InferenceElserTaskType.md) | The type of the inference task that the model will perform. |
| `elser_inference_id` | [`Id`](Id.md) | The unique identifier of the inference endpoint. |
| `timeout?` | [`Duration`](Duration.md) | Specifies the amount of time to wait for the inference endpoint to be created. |
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Note that for ELSER endpoints, the max_chunk_size may not exceed `300`. |
| `service` | [`InferenceElserServiceType`](InferenceElserServiceType.md) | The type of service supported for the specified task type. In this case, `elser`. |
| `service_settings` | [`InferenceElserServiceSettings`](InferenceElserServiceSettings.md) | Settings used to install the inference model. These settings are specific to the `elser` service. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, elser_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, elser_inference_id?: never, timeout?: never, chunking_settings?: never, service?: never, service_settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
