# ShardStatistics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `failed` | `uint` | The number of shards the operation or search attempted to run on but failed. |
| `successful` | `uint` | The number of shards the operation or search succeeded on. |
| `total` | `uint` | The number of shards the operation or search will run on overall. |
| `failures?` | `ShardFailure[]` | - |
| `skipped?` | `uint` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
