# AggregationsDateRangeAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field?` | [`Field`](Field.md) | The date field whose values are use to build ranges. |
| `format?` | `string` | The date format used to format `from` and `to` in the response. |
| `missing?` | [`AggregationsMissing`](AggregationsMissing.md) | The value to apply to documents that do not have a value.
By default, documents without a value are ignored. |
| `ranges?` | [`AggregationsDateRangeExpression`](AggregationsDateRangeExpression.md)[] | Array of date ranges. |
| `time_zone?` | [`TimeZone`](TimeZone.md) | Time zone used to convert dates from another time zone to UTC. |
| `keyed?` | `boolean` | Set to `true` to associate a unique string key with each bucket and returns the ranges as a hash rather than an array. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
