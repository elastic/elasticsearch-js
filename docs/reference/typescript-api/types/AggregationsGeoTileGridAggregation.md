# AggregationsGeoTileGridAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field?` | [`Field`](Field.md) | Field containing indexed `geo_point` or `geo_shape` values.
If the field contains an array, `geotile_grid` aggregates all array values. |
| `precision?` | [`GeoTilePrecision`](GeoTilePrecision.md) | Integer zoom of the key used to define cells/buckets in the results.
Values outside of the range [0,29] will be rejected. |
| `shard_size?` | [`integer`](integer.md) | Allows for more accurate counting of the top cells returned in the final result the aggregation.
Defaults to returning `max(10,(size x number-of-shards))` buckets from each shard. |
| `size?` | [`integer`](integer.md) | The maximum number of buckets to return. |
| `bounds?` | [`GeoBounds`](GeoBounds.md) | A bounding box to filter the geo-points or geo-shapes in each bucket. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
