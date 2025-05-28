# `MlRevertModelSnapshotRequest` [interface-MlRevertModelSnapshotRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; snapshot_id?: never; delete_intervening_results?: never; }) | All values in `body` will be added to the request body. |
| `delete_intervening_results` | boolean | Refer to the description for the `delete_intervening_results` query parameter. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; snapshot_id?: never; delete_intervening_results?: never; } | All values in `querystring` will be added to the request querystring. |
| `snapshot_id` | [Id](./Id.md) | You can specify `empty` as the < snapshot_id > . Reverting to the empty snapshot means the anomaly detection job starts learning a new model from scratch when it is started. |
