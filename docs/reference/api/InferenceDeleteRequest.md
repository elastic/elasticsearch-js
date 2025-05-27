## Interface `InferenceDeleteRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_type?: never; inference_id?: never; dry_run?: never; force?: never; }) | All values in `body` will be added to the request body. |
| `dry_run` | boolean | When true, the endpoint is not deleted and a list of ingest processors which reference this endpoint is returned. |
| `force` | boolean | When true, the inference endpoint is forcefully deleted even if it is still being used by ingest processors or semantic text fields. |
| `inference_id` | [Id](./Id.md) | The inference identifier. |
| `querystring` | { [key: string]: any; } & { task_type?: never; inference_id?: never; dry_run?: never; force?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_type` | [InferenceTaskType](./InferenceTaskType.md) | The task type |
