# SnapshotGetResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `remaining` | [`integer`](integer.md) | The number of remaining snapshots that were not returned due to size limits and that can be fetched by additional requests using the `next` field value. |
| `total` | [`integer`](integer.md) | The total number of snapshots that match the request when ignoring the size limit or `after` query parameter. |
| `next?` | `string` | If the request contained a size limit and there might be more results, a `next` field will be added to the response.
It can be used as the `after` query parameter to fetch additional results. |
| `responses?` | [`SnapshotGetSnapshotResponseItem`](SnapshotGetSnapshotResponseItem.md)[] | - |
| `snapshots?` | [`SnapshotSnapshotInfo`](SnapshotSnapshotInfo.md)[] | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
