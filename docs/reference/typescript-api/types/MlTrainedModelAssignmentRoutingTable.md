# MlTrainedModelAssignmentRoutingTable

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `reason?` | `string` | The reason for the current state. It is usually populated only when the
`routing_state` is `failed`. |
| `routing_state` | [`MlRoutingState`](MlRoutingState.md) | The current routing state. |
| `current_allocations` | `integer` | Current number of allocations. |
| `target_allocations` | `integer` | Target number of allocations. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
