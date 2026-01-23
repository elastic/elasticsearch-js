# MlCloseJobRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. It can be a job identifier, a group name, or a wildcard expression. You can close multiple anomaly detection jobs in a single API request by using a group name, a comma-separated list of jobs, or a wildcard expression. You can close all jobs by using `_all` or by specifying `*` as the job identifier. |
| `allow_no_match?` | `boolean` | Refer to the description for the `allow_no_match` query parameter. |
| `force?` | `boolean` | Refer to the descriptiion for the `force` query parameter. |
| `timeout?` | [`Duration`](Duration.md) | Refer to the description for the `timeout` query parameter. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, allow_no_match?: never, force?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, allow_no_match?: never, force?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
