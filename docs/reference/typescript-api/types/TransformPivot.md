# TransformPivot

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `aggregations?` | `Record<string, AggregationsAggregationContainer>` | Defines how to aggregate the grouped data. The following aggregations are currently supported: average, bucket
script, bucket selector, cardinality, filter, geo bounds, geo centroid, geo line, max, median absolute deviation,
min, missing, percentiles, rare terms, scripted metric, stats, sum, terms, top metrics, value count, weighted
average. |
| `aggs?` | `Record<string, AggregationsAggregationContainer>` | Defines how to aggregate the grouped data. The following aggregations are currently supported: average, bucket
script, bucket selector, cardinality, filter, geo bounds, geo centroid, geo line, max, median absolute deviation,
min, missing, percentiles, rare terms, scripted metric, stats, sum, terms, top metrics, value count, weighted
average. |
| `group_by?` | `Record<string, TransformPivotGroupByContainer>` | Defines how to group the data. More than one grouping can be defined per pivot. The following groupings are
currently supported: date histogram, geotile grid, histogram, terms. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
