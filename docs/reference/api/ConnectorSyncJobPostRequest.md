## Interface `ConnectorSyncJobPostRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; job_type?: never; trigger_method?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | The id of the associated connector |
| `job_type` | [ConnectorSyncJobType](./ConnectorSyncJobType.md) | &nbsp; |
| `querystring` | { [key: string]: any; } & { id?: never; job_type?: never; trigger_method?: never; } | All values in `querystring` will be added to the request querystring. |
| `trigger_method` | [ConnectorSyncJobTriggerMethod](./ConnectorSyncJobTriggerMethod.md) | &nbsp; |
