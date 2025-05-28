# `SnapshotGetResponse` [interface-SnapshotGetResponse]

| Name | Type | Description |
| - | - | - |
| `next` | string | If the request contained a size limit and there might be more results, a `next` field will be added to the response. It can be used as the `after` query parameter to fetch additional results. |
| `remaining` | [integer](./integer.md) | The number of remaining snapshots that were not returned due to size limits and that can be fetched by additional requests using the `next` field value. |
| `responses` | [SnapshotGetSnapshotResponseItem](./SnapshotGetSnapshotResponseItem.md)[] | &nbsp; |
| `snapshots` | [SnapshotSnapshotInfo](./SnapshotSnapshotInfo.md)[] | &nbsp; |
| `total` | [integer](./integer.md) | The total number of snapshots that match the request when ignoring the size limit or `after` query parameter. |
