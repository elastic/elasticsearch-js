# AggregationsCardinalityAggregation

## Interface

### Extends

- [`AggregationsMetricAggregationBase`](AggregationsMetricAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `precision_threshold?` | [`integer`](integer.md) | A unique count below which counts are expected to be close to accurate.
This allows to trade memory for accuracy. |
| `rehash?` | `boolean` | - |
| `execution_hint?` | [`AggregationsCardinalityExecutionMode`](AggregationsCardinalityExecutionMode.md) | Mechanism by which cardinality aggregations is run. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
