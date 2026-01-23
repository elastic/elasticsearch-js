# AggregationsVariableWidthHistogramAggregation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field?` | [`Field`](Field.md) | The name of the field. |
| `buckets?` | [`integer`](integer.md) | The target number of buckets. |
| `shard_size?` | [`integer`](integer.md) | The number of buckets that the coordinating node will request from each shard.
Defaults to `buckets * 50`. |
| `initial_buffer?` | [`integer`](integer.md) | Specifies the number of individual documents that will be stored in memory on a shard before the initial bucketing algorithm is run.
Defaults to `min(10 * shard_size, 50000)`. |
| `script?` | `Script | ScriptSource` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
