# MlAdaptiveAllocationsSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | `boolean` | If true, adaptive_allocations is enabled |
| `min_number_of_allocations?` | `integer` | Specifies the minimum number of allocations to scale to.
If set, it must be greater than or equal to 0.
If not defined, the deployment scales to 0. |
| `max_number_of_allocations?` | `integer` | Specifies the maximum number of allocations to scale to.
If set, it must be greater than or equal to min_number_of_allocations. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
