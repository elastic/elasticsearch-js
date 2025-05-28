# `AggregationsAutoDateHistogramAggregation` [interface-AggregationsAutoDateHistogramAggregation]

| Name | Type | Description |
| - | - | - |
| `buckets` | [integer](./integer.md) | The target number of buckets. |
| `field` | [Field](./Field.md) | The field on which to run the aggregation. |
| `format` | string | The date format used to format `key_as_string` in the response. If no `format` is specified, the first date format specified in the field mapping is used. |
| `minimum_interval` | [AggregationsMinimumInterval](./AggregationsMinimumInterval.md) | The minimum rounding interval. This can make the collection process more efficient, as the aggregation will not attempt to round at any interval lower than `minimum_interval`. |
| `missing` | [DateTime](./DateTime.md) | The value to apply to documents that do not have a value. By default, documents without a value are ignored. |
| `offset` | string | Time zone specified as a ISO 8601 UTC offset. |
| `params` | Record<string, any> | &nbsp; |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | &nbsp; |
| `time_zone` | [TimeZone](./TimeZone.md) | Time zone ID. |
