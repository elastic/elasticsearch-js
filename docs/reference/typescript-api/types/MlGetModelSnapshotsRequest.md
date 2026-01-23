# MlGetModelSnapshotsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `snapshot_id?` | [`Id`](Id.md) | A numerical character string that uniquely identifies the model snapshot. You can get information for multiple
snapshots by using a comma-separated list or a wildcard expression. You can get all snapshots by using `_all`,
by specifying `*` as the snapshot ID, or by omitting the snapshot ID. |
| `from?` | [`integer`](integer.md) | Skips the specified number of snapshots. |
| `size?` | [`integer`](integer.md) | Specifies the maximum number of snapshots to obtain. |
| `desc?` | `boolean` | Refer to the description for the `desc` query parameter. |
| `end?` | [`DateTime`](DateTime.md) | Refer to the description for the `end` query parameter. |
| `page?` | [`MlPage`](MlPage.md) | - |
| `sort?` | [`Field`](Field.md) | Refer to the description for the `sort` query parameter. |
| `start?` | [`DateTime`](DateTime.md) | Refer to the description for the `start` query parameter. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, snapshot_id?: never, from?: never, size?: never, desc?: never, end?: never, page?: never, sort?: never, start?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, snapshot_id?: never, from?: never, size?: never, desc?: never, end?: never, page?: never, sort?: never, start?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
