## Interface `MlTrainedModelDeploymentNodesStats`

| Name | Type | Description |
| - | - | - |
| `average_inference_time_ms_excluding_cache_hits` | [DurationValue](./DurationValue.md)<[UnitFloatMillis](./UnitFloatMillis.md)> | The average time for each inference call to complete on this node, excluding cache |
| `average_inference_time_ms_last_minute` | [DurationValue](./DurationValue.md)<[UnitFloatMillis](./UnitFloatMillis.md)> | &nbsp; |
| `average_inference_time_ms` | [DurationValue](./DurationValue.md)<[UnitFloatMillis](./UnitFloatMillis.md)> | The average time for each inference call to complete on this node. |
| `error_count` | [integer](./integer.md) | The number of errors when evaluating the trained model. |
| `inference_cache_hit_count_last_minute` | [long](./long.md) | &nbsp; |
| `inference_cache_hit_count` | [long](./long.md) | &nbsp; |
| `inference_count` | [long](./long.md) | The total number of inference calls made against this node for this model. |
| `last_access` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The epoch time stamp of the last inference call for the model on this node. |
| `node` | [MlDiscoveryNode](./MlDiscoveryNode.md) | Information pertaining to the node. |
| `number_of_allocations` | [integer](./integer.md) | The number of allocations assigned to this node. |
| `number_of_pending_requests` | [integer](./integer.md) | The number of inference requests queued to be processed. |
| `peak_throughput_per_minute` | [long](./long.md) | &nbsp; |
| `rejected_execution_count` | [integer](./integer.md) | The number of inference requests that were not processed because the queue was full. |
| `routing_state` | [MlTrainedModelAssignmentRoutingStateAndReason](./MlTrainedModelAssignmentRoutingStateAndReason.md) | The current routing state and reason for the current routing state for this allocation. |
| `start_time` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The epoch timestamp when the allocation started. |
| `threads_per_allocation` | [integer](./integer.md) | The number of threads used by each allocation during inference. |
| `throughput_last_minute` | [integer](./integer.md) | &nbsp; |
| `timeout_count` | [integer](./integer.md) | The number of inference requests that timed out before being processed. |
