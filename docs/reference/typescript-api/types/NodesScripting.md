# NodesScripting

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cache_evictions?` | [`long`](long.md) | Total number of times the script cache has evicted old data. |
| `compilations?` | [`long`](long.md) | Total number of inline script compilations performed by the node. |
| `compilations_history?` | `Record<string, long>` | Contains this recent history of script compilations. |
| `compilation_limit_triggered?` | [`long`](long.md) | Total number of times the script compilation circuit breaker has limited inline script compilations. |
| `contexts?` | [`NodesContext`](NodesContext.md)[] | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
