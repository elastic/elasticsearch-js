## Interface `MlDeleteCalendarJobRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { calendar_id?: never; job_id?: never; }) | All values in `body` will be added to the request body. |
| `calendar_id` | [Id](./Id.md) | A string that uniquely identifies a calendar. |
| `job_id` | [Ids](./Ids.md) | An identifier for the anomaly detection jobs. It can be a job identifier, a group name, or a comma-separated list of jobs or groups. |
| `querystring` | { [key: string]: any; } & { calendar_id?: never; job_id?: never; } | All values in `querystring` will be added to the request querystring. |
