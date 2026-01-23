# MlTrainedModelDeploymentStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adaptive_allocations?` | [`MlAdaptiveAllocationsSettings`](MlAdaptiveAllocationsSettings.md) | - |
| `allocation_status?` | [`MlTrainedModelDeploymentAllocationStatus`](MlTrainedModelDeploymentAllocationStatus.md) | The detailed allocation status for the deployment. |
| `cache_size?` | [`ByteSize`](ByteSize.md) | - |
| `deployment_id` | [`Id`](Id.md) | The unique identifier for the trained model deployment. |
| `error_count?` | `integer` | The sum of `error_count` for all nodes in the deployment. |
| `inference_count?` | `integer` | The sum of `inference_count` for all nodes in the deployment. |
| `model_id` | [`Id`](Id.md) | The unique identifier for the trained model. |
| `nodes` | `MlTrainedModelDeploymentNodesStats[]` | The deployment stats for each node that currently has the model allocated.
In serverless, stats are reported for a single unnamed virtual node. |
| `number_of_allocations?` | `integer` | The number of allocations requested. |
| `peak_throughput_per_minute` | `long` | - |
| `priority` | [`MlTrainingPriority`](MlTrainingPriority.md) | - |
| `queue_capacity?` | `integer` | The number of inference requests that can be queued before new requests are rejected. |
| `rejected_execution_count?` | `integer` | The sum of `rejected_execution_count` for all nodes in the deployment.
Individual nodes reject an inference request if the inference queue is full.
The queue size is controlled by the `queue_capacity` setting in the start
trained model deployment API. |
| `reason?` | `string` | The reason for the current deployment state. Usually only populated when
the model is not deployed to a node. |
| `start_time` | `EpochTime<UnitMillis>` | The epoch timestamp when the deployment started. |
| `state?` | [`MlDeploymentAssignmentState`](MlDeploymentAssignmentState.md) | The overall state of the deployment. |
| `threads_per_allocation?` | `integer` | The number of threads used be each allocation during inference. |
| `timeout_count?` | `integer` | The sum of `timeout_count` for all nodes in the deployment. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
