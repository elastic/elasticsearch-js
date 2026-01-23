# AggregationsBoxplotAggregation

## Interface

### Extends

- [`AggregationsMetricAggregationBase`](AggregationsMetricAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `compression?` | [`double`](double.md) | Limits the maximum number of nodes used by the underlying TDigest algorithm to `20 * compression`, enabling control of memory usage and approximation error. |
| `execution_hint?` | [`AggregationsTDigestExecutionHint`](AggregationsTDigestExecutionHint.md) | The default implementation of TDigest is optimized for performance, scaling to millions or even billions of sample values while maintaining acceptable accuracy levels (close to 1% relative error for millions of samples in some cases).
To use an implementation optimized for accuracy, set this parameter to high_accuracy instead. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
