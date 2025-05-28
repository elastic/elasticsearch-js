# `MlDeleteJobRequest` [interface-MlDeleteJobRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; force?: never; delete_user_annotations?: never; wait_for_completion?: never; }) | All values in `body` will be added to the request body. |
| `delete_user_annotations` | boolean | Specifies whether annotations that have been added by the user should be deleted along with any auto-generated annotations when the job is reset. |
| `force` | boolean | Use to forcefully delete an opened job; this method is quicker than closing and deleting the job. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; force?: never; delete_user_annotations?: never; wait_for_completion?: never; } | All values in `querystring` will be added to the request querystring. |
| `wait_for_completion` | boolean | Specifies whether the request should return immediately or wait until the job deletion completes. |
