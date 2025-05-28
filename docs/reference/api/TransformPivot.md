# `TransformPivot` [interface-TransformPivot]

| Name | Type | Description |
| - | - | - |
| `aggregations` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | Defines how to aggregate the grouped data. The following aggregations are currently supported: average, bucket script, bucket selector, cardinality, filter, geo bounds, geo centroid, geo line, max, median absolute deviation, min, missing, percentiles, rare terms, scripted metric, stats, sum, terms, top metrics, value count, weighted average. |
| `aggs` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | Defines how to aggregate the grouped data. The following aggregations are currently supported: average, bucket script, bucket selector, cardinality, filter, geo bounds, geo centroid, geo line, max, median absolute deviation, min, missing, percentiles, rare terms, scripted metric, stats, sum, terms, top metrics, value count, weighted average. aggregations |
| `group_by` | Record<string, [TransformPivotGroupByContainer](./TransformPivotGroupByContainer.md)> | Defines how to group the data. More than one grouping can be defined per pivot. The following groupings are currently supported: date histogram, geotile grid, histogram, terms. |
