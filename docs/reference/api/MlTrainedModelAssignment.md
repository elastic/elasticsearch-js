## Interface `MlTrainedModelAssignment`

| Name | Type | Description |
| - | - | - |
| `adaptive_allocations` | [MlAdaptiveAllocationsSettings](./MlAdaptiveAllocationsSettings.md) | null | &nbsp; |
| `assignment_state` | [MlDeploymentAssignmentState](./MlDeploymentAssignmentState.md) | The overall assignment state. |
| `max_assigned_allocations` | [integer](./integer.md) | &nbsp; |
| `reason` | string | &nbsp; |
| `routing_table` | Record<string, [MlTrainedModelAssignmentRoutingTable](./MlTrainedModelAssignmentRoutingTable.md)> | The allocation state for each node. |
| `start_time` | [DateTime](./DateTime.md) | The timestamp when the deployment started. |
| `task_parameters` | [MlTrainedModelAssignmentTaskParameters](./MlTrainedModelAssignmentTaskParameters.md) | &nbsp; |
