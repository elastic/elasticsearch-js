## Interface `MlTrainedModelAssignmentRoutingTable`

| Name | Type | Description |
| - | - | - |
| `current_allocations` | [integer](./integer.md) | Current number of allocations. |
| `reason` | string | The reason for the current state. It is usually populated only when the `routing_state` is `failed`. |
| `routing_state` | [MlRoutingState](./MlRoutingState.md) | The current routing state. |
| `target_allocations` | [integer](./integer.md) | Target number of allocations. |
