# `MlDeleteModelSnapshotRequest` [interface-MlDeleteModelSnapshotRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; snapshot_id?: never; }) | All values in `body` will be added to the request body. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; snapshot_id?: never; } | All values in `querystring` will be added to the request querystring. |
| `snapshot_id` | [Id](./Id.md) | Identifier for the model snapshot. |
