# MlTrainedModelDeploymentNodesStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `average_inference_time_ms?` | `DurationValue<UnitFloatMillis>` | The average time for each inference call to complete on this node. |
| `average_inference_time_ms_last_minute?` | `DurationValue<UnitFloatMillis>` | - |
| `average_inference_time_ms_excluding_cache_hits?` | `DurationValue<UnitFloatMillis>` | The average time for each inference call to complete on this node, excluding cache |
| `error_count?` | `integer` | The number of errors when evaluating the trained model. |
| `inference_count?` | `long` | The total number of inference calls made against this node for this model. |
| `inference_cache_hit_count?` | `long` | - |
| `inference_cache_hit_count_last_minute?` | `long` | - |
| `last_access?` | `EpochTime<UnitMillis>` | The epoch time stamp of the last inference call for the model on this node. |
| `node?` | [`MlDiscoveryNode`](MlDiscoveryNode.md) | Information pertaining to the node. |
| `number_of_allocations?` | `integer` | The number of allocations assigned to this node. |
| `number_of_pending_requests?` | `integer` | The number of inference requests queued to be processed. |
| `peak_throughput_per_minute` | `long` | - |
| `rejected_execution_count?` | `integer` | The number of inference requests that were not processed because the queue was full. |
| `routing_state` | [`MlTrainedModelAssignmentRoutingStateAndReason`](MlTrainedModelAssignmentRoutingStateAndReason.md) | The current routing state and reason for the current routing state for this allocation. |
| `start_time?` | `EpochTime<UnitMillis>` | The epoch timestamp when the allocation started. |
| `threads_per_allocation?` | `integer` | The number of threads used by each allocation during inference. |
| `throughput_last_minute` | `integer` | - |
| `timeout_count?` | `integer` | The number of inference requests that timed out before being processed. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
