# IndicesDownsampleConfig

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `fixed_interval` | [`DurationLarge`](DurationLarge.md) | The interval at which to aggregate the original time series index. |
| `sampling_method?` | [`IndicesSamplingMethod`](IndicesSamplingMethod.md) | The sampling method used to reduce the documents; it can be either `aggregate` or `last_value`. Defaults to `aggregate`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
