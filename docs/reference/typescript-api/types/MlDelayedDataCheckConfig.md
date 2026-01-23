# MlDelayedDataCheckConfig

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `check_window?` | [`Duration`](Duration.md) | The window of time that is searched for late data. This window of time ends with the latest finalized bucket.
It defaults to null, which causes an appropriate `check_window` to be calculated when the real-time datafeed runs.
In particular, the default `check_window` span calculation is based on the maximum of `2h` or `8 * bucket_span`. |
| `enabled` | `boolean` | Specifies whether the datafeed periodically checks for delayed data. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
