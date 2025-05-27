## Interface `ShardStatistics`

| Name | Type | Description |
| - | - | - |
| `failed` | [uint](./uint.md) | The number of shards the operation or search attempted to run on but failed. |
| `failures` | [ShardFailure](./ShardFailure.md)[] | &nbsp; |
| `skipped` | [uint](./uint.md) | &nbsp; |
| `successful` | [uint](./uint.md) | The number of shards the operation or search succeeded on. |
| `total` | [uint](./uint.md) | The number of shards the operation or search will run on overall. |
