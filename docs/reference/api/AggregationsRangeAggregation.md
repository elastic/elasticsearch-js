# `AggregationsRangeAggregation` [interface-AggregationsRangeAggregation]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The date field whose values are use to build ranges. |
| `format` | string | &nbsp; |
| `keyed` | boolean | Set to `true` to associate a unique string key with each bucket and return the ranges as a hash rather than an array. |
| `missing` | [integer](./integer.md) | The value to apply to documents that do not have a value. By default, documents without a value are ignored. |
| `ranges` | [AggregationsAggregationRange](./AggregationsAggregationRange.md)[] | An array of ranges used to bucket documents. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | &nbsp; |
