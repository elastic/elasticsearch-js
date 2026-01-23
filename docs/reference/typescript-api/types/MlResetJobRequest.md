# MlResetJobRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | The ID of the job to reset. |
| `wait_for_completion?` | `boolean` | Should this request wait until the operation has completed before
returning. |
| `delete_user_annotations?` | `boolean` | Specifies whether annotations that have been added by the
user should be deleted along with any auto-generated annotations when the job is
reset. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, wait_for_completion?: never, delete_user_annotations?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, wait_for_completion?: never, delete_user_annotations?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
