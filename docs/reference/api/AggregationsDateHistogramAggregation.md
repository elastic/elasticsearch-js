# `AggregationsDateHistogramAggregation` [interface-AggregationsDateHistogramAggregation]

| Name | Type | Description |
| - | - | - |
| `calendar_interval` | [AggregationsCalendarInterval](./AggregationsCalendarInterval.md) | Calendar-aware interval. Can be specified using the unit name, such as `month`, or as a single unit quantity, such as `1M`. |
| `extended_bounds` | [AggregationsExtendedBounds](./AggregationsExtendedBounds.md)<[AggregationsFieldDateMath](./AggregationsFieldDateMath.md)> | Enables extending the bounds of the histogram beyond the data itself. |
| `field` | [Field](./Field.md) | The date field whose values are use to build a histogram. |
| `fixed_interval` | [Duration](./Duration.md) | Fixed intervals: a fixed number of SI units and never deviate, regardless of where they fall on the calendar. |
| `format` | string | The date format used to format `key_as_string` in the response. If no `format` is specified, the first date format specified in the field mapping is used. |
| `hard_bounds` | [AggregationsExtendedBounds](./AggregationsExtendedBounds.md)<[AggregationsFieldDateMath](./AggregationsFieldDateMath.md)> | Limits the histogram to specified bounds. |
| `interval` | [Duration](./Duration.md) | &nbsp; |
| `keyed` | boolean | Set to `true` to associate a unique string key with each bucket and return the ranges as a hash rather than an array. |
| `min_doc_count` | [integer](./integer.md) | Only returns buckets that have `min_doc_count` number of documents. By default, all buckets between the first bucket that matches documents and the last one are returned. |
| `missing` | [DateTime](./DateTime.md) | The value to apply to documents that do not have a value. By default, documents without a value are ignored. |
| `offset` | [Duration](./Duration.md) | Changes the start value of each bucket by the specified positive ( `+`) or negative offset ( `-`) duration. |
| `order` | [AggregationsAggregateOrder](./AggregationsAggregateOrder.md) | The sort order of the returned buckets. |
| `params` | Record<string, any> | &nbsp; |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | &nbsp; |
| `time_zone` | [TimeZone](./TimeZone.md) | Time zone used for bucketing and rounding. Defaults to Coordinated Universal Time (UTC). |
