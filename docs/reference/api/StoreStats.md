## Interface `StoreStats`

| Name | Type | Description |
| - | - | - |
| `reserved_in_bytes` | [long](./long.md) | A prediction, in bytes, of how much larger the shard stores will eventually grow due to ongoing peer recoveries, restoring snapshots, and similar activities. |
| `reserved` | [ByteSize](./ByteSize.md) | A prediction of how much larger the shard stores will eventually grow due to ongoing peer recoveries, restoring snapshots, and similar activities. |
| `size_in_bytes` | [long](./long.md) | Total size, in bytes, of all shards assigned to selected nodes. |
| `size` | [ByteSize](./ByteSize.md) | Total size of all shards assigned to selected nodes. |
| `total_data_set_size_in_bytes` | [long](./long.md) | Total data set size, in bytes, of all shards assigned to selected nodes. This includes the size of shards not stored fully on the nodes, such as the cache for partially mounted indices. |
| `total_data_set_size` | [ByteSize](./ByteSize.md) | Total data set size of all shards assigned to selected nodes. This includes the size of shards not stored fully on the nodes, such as the cache for partially mounted indices. |
