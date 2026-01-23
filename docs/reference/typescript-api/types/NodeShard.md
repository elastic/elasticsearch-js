# NodeShard

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `state` | [`IndicesStatsShardRoutingState`](IndicesStatsShardRoutingState.md) | - |
| `primary` | `boolean` | - |
| `node?` | [`NodeName`](NodeName.md) | - |
| `shard` | `integer` | - |
| `index` | [`IndexName`](IndexName.md) | - |
| `allocation_id?` | `Record<string, Id>` | - |
| `recovery_source?` | `Record<string, Id>` | - |
| `unassigned_info?` | [`ClusterAllocationExplainUnassignedInformation`](ClusterAllocationExplainUnassignedInformation.md) | - |
| `relocating_node?` | `NodeId | null` | - |
| `relocation_failure_info?` | [`RelocationFailureInfo`](RelocationFailureInfo.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
