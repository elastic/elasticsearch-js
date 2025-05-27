## Interface `MlUpdateModelSnapshotRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; snapshot_id?: never; description?: never; retain?: never; }) | All values in `body` will be added to the request body. |
| `description` | string | A description of the model snapshot. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; snapshot_id?: never; description?: never; retain?: never; } | All values in `querystring` will be added to the request querystring. |
| `retain` | boolean | If `true`, this snapshot will not be deleted during automatic cleanup of snapshots older than `model_snapshot_retention_days`. However, this snapshot will be deleted when the job is deleted. |
| `snapshot_id` | [Id](./Id.md) | Identifier for the model snapshot. |
