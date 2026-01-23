# ClusterAllocationExplainResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `allocate_explanation?` | `string` | - |
| `allocation_delay?` | [`Duration`](Duration.md) | - |
| `allocation_delay_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `can_allocate?` | [`ClusterAllocationExplainDecision`](ClusterAllocationExplainDecision.md) | - |
| `can_move_to_other_node?` | [`ClusterAllocationExplainDecision`](ClusterAllocationExplainDecision.md) | - |
| `can_rebalance_cluster?` | [`ClusterAllocationExplainDecision`](ClusterAllocationExplainDecision.md) | - |
| `can_rebalance_cluster_decisions?` | [`ClusterAllocationExplainAllocationDecision`](ClusterAllocationExplainAllocationDecision.md)[] | - |
| `can_rebalance_to_other_node?` | [`ClusterAllocationExplainDecision`](ClusterAllocationExplainDecision.md) | - |
| `can_remain_decisions?` | [`ClusterAllocationExplainAllocationDecision`](ClusterAllocationExplainAllocationDecision.md)[] | - |
| `can_remain_on_current_node?` | [`ClusterAllocationExplainDecision`](ClusterAllocationExplainDecision.md) | - |
| `cluster_info?` | [`ClusterAllocationExplainClusterInfo`](ClusterAllocationExplainClusterInfo.md) | - |
| `configured_delay?` | [`Duration`](Duration.md) | - |
| `configured_delay_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `current_node?` | [`ClusterAllocationExplainCurrentNode`](ClusterAllocationExplainCurrentNode.md) | - |
| `current_state` | `string` | - |
| `index` | [`IndexName`](IndexName.md) | - |
| `move_explanation?` | `string` | - |
| `node_allocation_decisions?` | [`ClusterAllocationExplainNodeAllocationExplanation`](ClusterAllocationExplainNodeAllocationExplanation.md)[] | - |
| `primary` | `boolean` | - |
| `rebalance_explanation?` | `string` | - |
| `remaining_delay?` | [`Duration`](Duration.md) | - |
| `remaining_delay_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `shard` | [`integer`](integer.md) | - |
| `unassigned_info?` | [`ClusterAllocationExplainUnassignedInformation`](ClusterAllocationExplainUnassignedInformation.md) | - |
| `note?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
