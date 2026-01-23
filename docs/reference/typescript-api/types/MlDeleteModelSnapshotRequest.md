# MlDeleteModelSnapshotRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `snapshot_id` | [`Id`](Id.md) | Identifier for the model snapshot. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, snapshot_id?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, snapshot_id?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
