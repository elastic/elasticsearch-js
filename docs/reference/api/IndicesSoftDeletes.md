# `IndicesSoftDeletes` [interface-IndicesSoftDeletes]

| Name | Type | Description |
| - | - | - |
| `enabled` | boolean | Indicates whether soft deletes are enabled on the index. |
| `retention_lease` | [IndicesRetentionLease](./IndicesRetentionLease.md) | The maximum period to retain a shard history retention lease before it is considered expired. Shard history retention leases ensure that soft deletes are retained during merges on the Lucene index. If a soft delete is merged away before it can be replicated to a follower the following process will fail due to incomplete history on the leader. |
