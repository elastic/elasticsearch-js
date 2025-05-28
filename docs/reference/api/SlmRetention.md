# `SlmRetention` [interface-SlmRetention]

| Name | Type | Description |
| - | - | - |
| `expire_after` | [Duration](./Duration.md) | Time period after which a snapshot is considered expired and eligible for deletion. SLM deletes expired snapshots based on the slm.retention_schedule. |
| `max_count` | [integer](./integer.md) | Maximum number of snapshots to retain, even if the snapshots have not yet expired. If the number of snapshots in the repository exceeds this limit, the policy retains the most recent snapshots and deletes older snapshots. |
| `min_count` | [integer](./integer.md) | Minimum number of snapshots to retain, even if the snapshots have expired. |
