## Interface `ConnectorSyncJobListRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { from?: never; size?: never; status?: never; connector_id?: never; job_type?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | A connector id to fetch connector sync jobs for |
| `from` | [integer](./integer.md) | Starting offset (default: 0) |
| `job_type` | [ConnectorSyncJobType](./ConnectorSyncJobType.md) | [ConnectorSyncJobType](./ConnectorSyncJobType.md)[] | A comma-separated list of job types to fetch the sync jobs for |
| `querystring` | { [key: string]: any; } & { from?: never; size?: never; status?: never; connector_id?: never; job_type?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies a max number of results to get |
| `status` | [ConnectorSyncStatus](./ConnectorSyncStatus.md) | A sync job status to fetch connector sync jobs for |
