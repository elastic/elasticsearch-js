# AggregationsPercentileRanksAggregation

## Interface

### Extends

- [`AggregationsFormatMetricAggregationBase`](AggregationsFormatMetricAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `keyed?` | `boolean` | By default, the aggregation associates a unique string key with each bucket and returns the ranges as a hash rather than an array.
Set to `false` to disable this behavior. |
| `values?` | `double[] | null` | An array of values for which to calculate the percentile ranks. |
| `hdr?` | [`AggregationsHdrMethod`](AggregationsHdrMethod.md) | Uses the alternative High Dynamic Range Histogram algorithm to calculate percentile ranks. |
| `tdigest?` | [`AggregationsTDigest`](AggregationsTDigest.md) | Sets parameters for the default TDigest algorithm used to calculate percentile ranks. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
