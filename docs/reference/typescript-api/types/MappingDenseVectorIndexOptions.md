# MappingDenseVectorIndexOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `confidence_interval?` | `float` | The confidence interval to use when quantizing the vectors. Can be any value between and including `0.90` and
`1.0` or exactly `0`. When the value is `0`, this indicates that dynamic quantiles should be calculated for
optimized quantization. When between `0.90` and `1.0`, this value restricts the values used when calculating
the quantization thresholds.

For example, a value of `0.95` will only use the middle `95%` of the values when calculating the quantization
thresholds (e.g. the highest and lowest `2.5%` of values will be ignored).

Defaults to `1/(dims + 1)` for `int8` quantized vectors and `0` for `int4` for dynamic quantile calculation.

Only applicable to `int8_hnsw`, `int4_hnsw`, `int8_flat`, and `int4_flat` index types. |
| `ef_construction?` | `integer` | The number of candidates to track while assembling the list of nearest neighbors for each new node.

Only applicable to `hnsw`, `int8_hnsw`, `bbq_hnsw`, and `int4_hnsw` index types. |
| `m?` | `integer` | The number of neighbors each node will be connected to in the HNSW graph.

Only applicable to `hnsw`, `int8_hnsw`, `bbq_hnsw`, and `int4_hnsw` index types. |
| `type` | [`MappingDenseVectorIndexOptionsType`](MappingDenseVectorIndexOptionsType.md) | The type of kNN algorithm to use. |
| `rescore_vector?` | [`MappingDenseVectorIndexOptionsRescoreVector`](MappingDenseVectorIndexOptionsRescoreVector.md) | The rescore vector options. This is only applicable to `bbq_disk`, `bbq_hnsw`, `int4_hnsw`, `int8_hnsw`, `bbq_flat`, `int4_flat`, and `int8_flat` index types. |
| `on_disk_rescore?` | `boolean` | `true` if vector rescoring should be done on-disk

Only applicable to `bbq_disk`, `bbq_hnsw`, `int4_hnsw`, `int8_hnsw` |

## See Also

- [All Types](./)
- [API Methods](../index.md)
