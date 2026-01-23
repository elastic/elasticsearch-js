# IndexingStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index_current` | `long` | - |
| `delete_current` | `long` | - |
| `delete_time?` | [`Duration`](Duration.md) | - |
| `delete_time_in_millis` | `DurationValue<UnitMillis>` | - |
| `delete_total` | `long` | - |
| `is_throttled` | `boolean` | - |
| `noop_update_total` | `long` | - |
| `throttle_time?` | [`Duration`](Duration.md) | - |
| `throttle_time_in_millis` | `DurationValue<UnitMillis>` | - |
| `index_time?` | [`Duration`](Duration.md) | - |
| `index_time_in_millis` | `DurationValue<UnitMillis>` | - |
| `index_total` | `long` | - |
| `index_failed` | `long` | - |
| `types?` | `Record<string, IndexingStats>` | - |
| `write_load?` | `double` | - |
| `recent_write_load?` | `double` | - |
| `peak_write_load?` | `double` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
