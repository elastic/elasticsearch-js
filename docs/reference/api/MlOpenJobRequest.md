# `MlOpenJobRequest` [interface-MlOpenJobRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Refer to the description for the `timeout` query parameter. |
