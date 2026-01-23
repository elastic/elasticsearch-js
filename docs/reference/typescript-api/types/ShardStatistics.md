# ShardStatistics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `failed` | [`uint`](uint.md) | The number of shards the operation or search attempted to run on but failed. |
| `successful` | [`uint`](uint.md) | The number of shards the operation or search succeeded on. |
| `total` | [`uint`](uint.md) | The number of shards the operation or search will run on overall. |
| `failures?` | [`ShardFailure`](ShardFailure.md)[] | - |
| `skipped?` | [`uint`](uint.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
