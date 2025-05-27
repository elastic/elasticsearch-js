## Interface `NodesScripting`

| Name | Type | Description |
| - | - | - |
| `cache_evictions` | [long](./long.md) | Total number of times the script cache has evicted old data. |
| `compilation_limit_triggered` | [long](./long.md) | Total number of times the script compilation circuit breaker has limited inline script compilations. |
| `compilations_history` | Record<string, [long](./long.md)> | Contains this recent history of script compilations. |
| `compilations` | [long](./long.md) | Total number of inline script compilations performed by the node. |
| `contexts` | [NodesContext](./NodesContext.md)[] | &nbsp; |
