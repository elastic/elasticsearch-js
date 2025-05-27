## Interface `NodesBreaker`

| Name | Type | Description |
| - | - | - |
| `estimated_size_in_bytes` | [long](./long.md) | Estimated memory used, in bytes, for the operation. |
| `estimated_size` | string | Estimated memory used for the operation. |
| `limit_size_in_bytes` | [long](./long.md) | Memory limit, in bytes, for the circuit breaker. |
| `limit_size` | string | Memory limit for the circuit breaker. |
| `overhead` | [float](./float.md) | A constant that all estimates for the circuit breaker are multiplied with to calculate a final estimate. |
| `tripped` | [float](./float.md) | Total number of times the circuit breaker has been triggered and prevented an out of memory error. |
