## Interface `AggregationsPipelineAggregationBase`

| Name | Type | Description |
| - | - | - |
| `format` | string | `DecimalFormat` pattern for the output value. If specified, the formatted value is returned in the aggregation’s `value_as_string` property. |
| `gap_policy` | [AggregationsGapPolicy](./AggregationsGapPolicy.md) | Policy to apply when gaps are found in the data. |
