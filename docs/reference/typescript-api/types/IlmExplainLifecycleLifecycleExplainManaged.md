# IlmExplainLifecycleLifecycleExplainManaged

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `action?` | [`Name`](Name.md) | - |
| `action_time?` | [`DateTime`](DateTime.md) | - |
| `action_time_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `age?` | [`Duration`](Duration.md) | - |
| `age_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `failed_step?` | [`Name`](Name.md) | - |
| `failed_step_retry_count?` | [`integer`](integer.md) | - |
| `index` | [`IndexName`](IndexName.md) | - |
| `index_creation_date?` | [`DateTime`](DateTime.md) | - |
| `index_creation_date_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `is_auto_retryable_error?` | `boolean` | - |
| `lifecycle_date?` | [`DateTime`](DateTime.md) | - |
| `lifecycle_date_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `managed` | `true` | - |
| `phase?` | [`Name`](Name.md) | - |
| `phase_time?` | [`DateTime`](DateTime.md) | - |
| `phase_time_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `policy?` | [`Name`](Name.md) | - |
| `previous_step_info?` | `Record<string, any>` | - |
| `repository_name?` | `string` | - |
| `snapshot_name?` | `string` | - |
| `shrink_index_name?` | `string` | - |
| `step?` | [`Name`](Name.md) | - |
| `step_info?` | `Record<string, any>` | - |
| `step_time?` | [`DateTime`](DateTime.md) | - |
| `step_time_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `phase_execution?` | [`IlmExplainLifecycleLifecycleExplainPhaseExecution`](IlmExplainLifecycleLifecycleExplainPhaseExecution.md) | - |
| `time_since_index_creation?` | [`Duration`](Duration.md) | - |
| `skip` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
