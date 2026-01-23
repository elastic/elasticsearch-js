# MlUpgradeJobSnapshotRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `snapshot_id` | [`Id`](Id.md) | A numerical character string that uniquely identifies the model snapshot. |
| `wait_for_completion?` | `boolean` | When true, the API won’t respond until the upgrade is complete.
Otherwise, it responds as soon as the upgrade task is assigned to a node. |
| `timeout?` | [`Duration`](Duration.md) | Controls the time to wait for the request to complete. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, snapshot_id?: never, wait_for_completion?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, snapshot_id?: never, wait_for_completion?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
