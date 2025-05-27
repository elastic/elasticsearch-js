## Interface `MlPostDataRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; reset_end?: never; reset_start?: never; data?: never; }) | All values in `body` will be added to the request body. |
| `data` | TData[] | &nbsp; |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. The job must have a state of open to receive and process the data. |
| `querystring` | { [key: string]: any; } & { job_id?: never; reset_end?: never; reset_start?: never; data?: never; } | All values in `querystring` will be added to the request querystring. |
| `reset_end` | [DateTime](./DateTime.md) | Specifies the end of the bucket resetting range. |
| `reset_start` | [DateTime](./DateTime.md) | Specifies the start of the bucket resetting range. |
