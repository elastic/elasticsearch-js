# InferenceInferenceEndpoint

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `chunking_settings?` | [`InferenceInferenceChunkingSettings`](InferenceInferenceChunkingSettings.md) | The chunking configuration object.
Applies only to the `sparse_embedding` and `text_embedding` task types.
Not applicable to the `rerank`, `completion`, or `chat_completion` task types. |
| `service` | `string` | The service type |
| `service_settings` | [`InferenceServiceSettings`](InferenceServiceSettings.md) | Settings specific to the service |
| `task_settings?` | [`InferenceTaskSettings`](InferenceTaskSettings.md) | Task settings specific to the service and task type |

## See Also

- [All Types](./)
- [API Methods](../index.md)
