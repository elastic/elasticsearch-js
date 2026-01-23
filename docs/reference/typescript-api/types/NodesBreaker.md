# NodesBreaker

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `estimated_size?` | `string` | Estimated memory used for the operation. |
| `estimated_size_in_bytes?` | `long` | Estimated memory used, in bytes, for the operation. |
| `limit_size?` | `string` | Memory limit for the circuit breaker. |
| `limit_size_in_bytes?` | `long` | Memory limit, in bytes, for the circuit breaker. |
| `overhead?` | `float` | A constant that all estimates for the circuit breaker are multiplied with to calculate a final estimate. |
| `tripped?` | `float` | Total number of times the circuit breaker has been triggered and prevented an out of memory error. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
