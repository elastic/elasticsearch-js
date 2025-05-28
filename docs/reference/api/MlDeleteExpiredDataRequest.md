# `MlDeleteExpiredDataRequest` [interface-MlDeleteExpiredDataRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; requests_per_second?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `job_id` | [Id](./Id.md) | Identifier for an anomaly detection job. It can be a job identifier, a group name, or a wildcard expression. |
| `querystring` | { [key: string]: any; } & { job_id?: never; requests_per_second?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `requests_per_second` | [float](./float.md) | The desired requests per second for the deletion processes. The default behavior is no throttling. |
| `timeout` | [Duration](./Duration.md) | How long can the underlying delete processes run until they are canceled. |
