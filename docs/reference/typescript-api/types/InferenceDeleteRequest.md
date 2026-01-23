# InferenceDeleteRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_type?` | [`InferenceTaskType`](InferenceTaskType.md) | The task type |
| `inference_id` | [`Id`](Id.md) | The inference identifier. |
| `dry_run?` | `boolean` | When true, checks the semantic_text fields and inference processors that reference the endpoint and returns them in a list, but does not delete the endpoint. |
| `force?` | `boolean` | When true, the inference endpoint is forcefully deleted even if it is still being used by ingest processors or semantic text fields. |
| `body?` | `string | { [key: string]: any } & { task_type?: never, inference_id?: never, dry_run?: never, force?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_type?: never, inference_id?: never, dry_run?: never, force?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
