# AggregationsGeoHashGridAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `bounds?` | [`GeoBounds`](GeoBounds.md) | The bounding box to filter the points in each bucket. |
| `field?` | [`Field`](Field.md) | Field containing indexed `geo_point` or `geo_shape` values.
If the field contains an array, `geohash_grid` aggregates all array values. |
| `precision?` | [`GeoHashPrecision`](GeoHashPrecision.md) | The string length of the geohashes used to define cells/buckets in the results. |
| `shard_size?` | [`integer`](integer.md) | Allows for more accurate counting of the top cells returned in the final result the aggregation.
Defaults to returning `max(10,(size x number-of-shards))` buckets from each shard. |
| `size?` | [`integer`](integer.md) | The maximum number of geohash buckets to return. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
