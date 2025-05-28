# `MlAdaptiveAllocationsSettings` [interface-MlAdaptiveAllocationsSettings]

| Name | Type | Description |
| - | - | - |
| `enabled` | boolean | If true, adaptive_allocations is enabled |
| `max_number_of_allocations` | [integer](./integer.md) | Specifies the maximum number of allocations to scale to. If set, it must be greater than or equal to min_number_of_allocations. |
| `min_number_of_allocations` | [integer](./integer.md) | Specifies the minimum number of allocations to scale to. If set, it must be greater than or equal to 0. If not defined, the deployment scales to 0. |
