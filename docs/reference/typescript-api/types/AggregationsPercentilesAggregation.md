# AggregationsPercentilesAggregation

## Interface

### Extends

- [`AggregationsFormatMetricAggregationBase`](AggregationsFormatMetricAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `keyed?` | `boolean` | By default, the aggregation associates a unique string key with each bucket and returns the ranges as a hash rather than an array.
Set to `false` to disable this behavior. |
| `percents?` | `double | double[]` | The percentiles to calculate. |
| `hdr?` | [`AggregationsHdrMethod`](AggregationsHdrMethod.md) | Uses the alternative High Dynamic Range Histogram algorithm to calculate percentiles. |
| `tdigest?` | [`AggregationsTDigest`](AggregationsTDigest.md) | Sets parameters for the default TDigest algorithm used to calculate percentiles. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
