## Interface `MlGetModelSnapshotUpgradeStatsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: - Contains wildcard expressions and there are no jobs that match. - Contains the _all string or no identifiers and there are no matches. - Contains wildcard expressions and there are only partial matches. The default value is true, which returns an empty jobs array when there are no matches and the subset of results when there are partial matches. If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; snapshot_id?: never; allow_no_match?: never; }) | All values in `body` will be added to the request body. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `querystring` | { [key: string]: any; } & { job_id?: never; snapshot_id?: never; allow_no_match?: never; } | All values in `querystring` will be added to the request querystring. |
| `snapshot_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the model snapshot. You can get information for multiple snapshots by using a comma-separated list or a wildcard expression. You can get all snapshots by using `_all`, by specifying `*` as the snapshot ID, or by omitting the snapshot ID. |
