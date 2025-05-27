## Interface `NodeShard`

| Name | Type | Description |
| - | - | - |
| `allocation_id` | Record<string, [Id](./Id.md)> | &nbsp; |
| `index` | [IndexName](./IndexName.md) | &nbsp; |
| `node` | [NodeName](./NodeName.md) | &nbsp; |
| `primary` | boolean | &nbsp; |
| `recovery_source` | Record<string, [Id](./Id.md)> | &nbsp; |
| `relocating_node` | [NodeId](./NodeId.md) | null | &nbsp; |
| `relocation_failure_info` | [RelocationFailureInfo](./RelocationFailureInfo.md) | &nbsp; |
| `shard` | [integer](./integer.md) | &nbsp; |
| `state` | [IndicesStatsShardRoutingState](./IndicesStatsShardRoutingState.md) | &nbsp; |
| `unassigned_info` | [ClusterAllocationExplainUnassignedInformation](./ClusterAllocationExplainUnassignedInformation.md) | &nbsp; |
