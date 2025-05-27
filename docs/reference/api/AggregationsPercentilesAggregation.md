## Interface `AggregationsPercentilesAggregation`

| Name | Type | Description |
| - | - | - |
| `hdr` | [AggregationsHdrMethod](./AggregationsHdrMethod.md) | Uses the alternative High Dynamic Range Histogram algorithm to calculate percentiles. |
| `keyed` | boolean | By default, the aggregation associates a unique string key with each bucket and returns the ranges as a hash rather than an array. Set to `false` to disable this behavior. |
| `percents` | [double](./double.md)[] | The percentiles to calculate. |
| `tdigest` | [AggregationsTDigest](./AggregationsTDigest.md) | Sets parameters for the default TDigest algorithm used to calculate percentiles. |
