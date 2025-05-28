# `AggregationsGeoLineAggregation` [interface-AggregationsGeoLineAggregation]

| Name | Type | Description |
| - | - | - |
| `include_sort` | boolean | When `true`, returns an additional array of the sort values in the feature properties. |
| `point` | [AggregationsGeoLinePoint](./AggregationsGeoLinePoint.md) | The name of the geo_point field. |
| `size` | [integer](./integer.md) | The maximum length of the line represented in the aggregation. Valid sizes are between 1 and 10000. |
| `sort_order` | [SortOrder](./SortOrder.md) | The order in which the line is sorted (ascending or descending). |
| `sort` | [AggregationsGeoLineSort](./AggregationsGeoLineSort.md) | The name of the numeric field to use as the sort key for ordering the points. When the `geo_line` aggregation is nested inside a `time_series` aggregation, this field defaults to `@timestamp`, and any other value will result in error. |
