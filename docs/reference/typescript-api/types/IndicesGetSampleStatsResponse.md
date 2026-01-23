# IndicesGetSampleStatsResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `potential_samples` | `long` | - |
| `samples_rejected_for_max_samples_exceeded` | `long` | - |
| `samples_rejected_for_condition` | `long` | - |
| `samples_rejected_for_rate` | `long` | - |
| `samples_rejected_for_exception` | `long` | - |
| `samples_rejected_for_size` | `long` | - |
| `samples_accepted` | `long` | - |
| `time_sampling?` | [`Duration`](Duration.md) | - |
| `time_sampling_millis` | `DurationValue<UnitMillis>` | - |
| `time_evaluating_condition?` | [`Duration`](Duration.md) | - |
| `time_evaluating_condition_millis` | `DurationValue<UnitMillis>` | - |
| `time_compiling_condition?` | [`Duration`](Duration.md) | - |
| `time_compiling_condition_millis` | `DurationValue<UnitMillis>` | - |
| `last_exception?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
