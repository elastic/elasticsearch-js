# RollupHistogramGrouping

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fields` | [`Fields`](Fields.md) | The set of fields that you wish to build histograms for.
All fields specified must be some kind of numeric.
Order does not matter. |
| `interval` | [`long`](long.md) | The interval of histogram buckets to be generated when rolling up.
For example, a value of `5` creates buckets that are five units wide (`0-5`, `5-10`, etc).
Note that only one interval can be specified in the histogram group, meaning that all fields being grouped via the histogram must share the same interval. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
