# `AggregationsPercentileRanksAggregation` [interface-AggregationsPercentileRanksAggregation]

| Name | Type | Description |
| - | - | - |
| `hdr` | [AggregationsHdrMethod](./AggregationsHdrMethod.md) | Uses the alternative High Dynamic Range Histogram algorithm to calculate percentile ranks. |
| `keyed` | boolean | By default, the aggregation associates a unique string key with each bucket and returns the ranges as a hash rather than an array. Set to `false` to disable this behavior. |
| `tdigest` | [AggregationsTDigest](./AggregationsTDigest.md) | Sets parameters for the default TDigest algorithm used to calculate percentile ranks. |
| `values` | [double](./double.md)[] | null | An array of values for which to calculate the percentile ranks. |
