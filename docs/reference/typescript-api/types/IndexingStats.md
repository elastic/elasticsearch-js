# IndexingStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index_current` | [`long`](long.md) | - |
| `delete_current` | [`long`](long.md) | - |
| `delete_time?` | [`Duration`](Duration.md) | - |
| `delete_time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `delete_total` | [`long`](long.md) | - |
| `is_throttled` | `boolean` | - |
| `noop_update_total` | [`long`](long.md) | - |
| `throttle_time?` | [`Duration`](Duration.md) | - |
| `throttle_time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `index_time?` | [`Duration`](Duration.md) | - |
| `index_time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `index_total` | [`long`](long.md) | - |
| `index_failed` | [`long`](long.md) | - |
| `types?` | `Record<string, IndexingStats>` | - |
| `write_load?` | [`double`](double.md) | - |
| `recent_write_load?` | [`double`](double.md) | - |
| `peak_write_load?` | [`double`](double.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
