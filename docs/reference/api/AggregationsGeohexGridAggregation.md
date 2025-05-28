# `AggregationsGeohexGridAggregation` [interface-AggregationsGeohexGridAggregation]

| Name | Type | Description |
| - | - | - |
| `bounds` | [GeoBounds](./GeoBounds.md) | Bounding box used to filter the geo-points in each bucket. |
| `field` | [Field](./Field.md) | Field containing indexed `geo_point` or `geo_shape` values. If the field contains an array, `geohex_grid` aggregates all array values. |
| `precision` | [integer](./integer.md) | Integer zoom of the key used to defined cells or buckets in the results. Value should be between 0-15. |
| `shard_size` | [integer](./integer.md) | Number of buckets returned from each shard. |
| `size` | [integer](./integer.md) | Maximum number of buckets to return. |
