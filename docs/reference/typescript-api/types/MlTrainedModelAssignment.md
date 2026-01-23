# MlTrainedModelAssignment

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adaptive_allocations?` | `MlAdaptiveAllocationsSettings | null` | - |
| `assignment_state` | [`MlDeploymentAssignmentState`](MlDeploymentAssignmentState.md) | The overall assignment state. |
| `max_assigned_allocations?` | [`integer`](integer.md) | - |
| `reason?` | `string` | - |
| `routing_table` | `Record<string, MlTrainedModelAssignmentRoutingTable>` | The allocation state for each node. |
| `start_time` | [`DateTime`](DateTime.md) | The timestamp when the deployment started. |
| `task_parameters` | [`MlTrainedModelAssignmentTaskParameters`](MlTrainedModelAssignmentTaskParameters.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
