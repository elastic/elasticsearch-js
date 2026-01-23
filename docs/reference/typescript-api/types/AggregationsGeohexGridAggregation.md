# AggregationsGeohexGridAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | Field containing indexed `geo_point` or `geo_shape` values.
If the field contains an array, `geohex_grid` aggregates all array values. |
| `precision?` | [`integer`](integer.md) | Integer zoom of the key used to defined cells or buckets
in the results. Value should be between 0-15. |
| `bounds?` | [`GeoBounds`](GeoBounds.md) | Bounding box used to filter the geo-points in each bucket. |
| `size?` | [`integer`](integer.md) | Maximum number of buckets to return. |
| `shard_size?` | [`integer`](integer.md) | Number of buckets returned from each shard. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
