## Interface `MlTrainedModelAssignmentRoutingStateAndReason`

| Name | Type | Description |
| - | - | - |
| `reason` | string | The reason for the current state. It is usually populated only when the `routing_state` is `failed`. |
| `routing_state` | [MlRoutingState](./MlRoutingState.md) | The current routing state. |
