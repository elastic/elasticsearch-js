# AggregationsRangeAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field?` | [`Field`](Field.md) | The date field whose values are use to build ranges. |
| `missing?` | [`integer`](integer.md) | The value to apply to documents that do not have a value.
By default, documents without a value are ignored. |
| `ranges?` | [`AggregationsAggregationRange`](AggregationsAggregationRange.md)[] | An array of ranges used to bucket documents. |
| `script?` | `Script | ScriptSource` | - |
| `keyed?` | `boolean` | Set to `true` to associate a unique string key with each bucket and return the ranges as a hash rather than an array. |
| `format?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
