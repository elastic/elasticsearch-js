# InferenceAdaptiveAllocations

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enabled?` | `boolean` | Turn on `adaptive_allocations`. |
| `max_number_of_allocations?` | `integer` | The maximum number of allocations to scale to.
If set, it must be greater than or equal to `min_number_of_allocations`. |
| `min_number_of_allocations?` | `integer` | The minimum number of allocations to scale to.
If set, it must be greater than or equal to 0.
If not defined, the deployment scales to 0. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
