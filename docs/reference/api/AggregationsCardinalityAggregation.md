# `AggregationsCardinalityAggregation` [interface-AggregationsCardinalityAggregation]

| Name | Type | Description |
| - | - | - |
| `execution_hint` | [AggregationsCardinalityExecutionMode](./AggregationsCardinalityExecutionMode.md) | Mechanism by which cardinality aggregations is run. |
| `precision_threshold` | [integer](./integer.md) | A unique count below which counts are expected to be close to accurate. This allows to trade memory for accuracy. |
| `rehash` | boolean | &nbsp; |
