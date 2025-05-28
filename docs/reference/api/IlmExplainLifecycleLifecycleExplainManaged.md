# `IlmExplainLifecycleLifecycleExplainManaged` [interface-IlmExplainLifecycleLifecycleExplainManaged]

| Name | Type | Description |
| - | - | - |
| `action_time_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `action_time` | [DateTime](./DateTime.md) | &nbsp; |
| `action` | [Name](./Name.md) | &nbsp; |
| `age` | [Duration](./Duration.md) | &nbsp; |
| `failed_step_retry_count` | [integer](./integer.md) | &nbsp; |
| `failed_step` | [Name](./Name.md) | &nbsp; |
| `index_creation_date_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `index_creation_date` | [DateTime](./DateTime.md) | &nbsp; |
| `index` | [IndexName](./IndexName.md) | &nbsp; |
| `is_auto_retryable_error` | boolean | &nbsp; |
| `lifecycle_date_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `lifecycle_date` | [DateTime](./DateTime.md) | &nbsp; |
| `managed` | true | &nbsp; |
| `phase_execution` | [IlmExplainLifecycleLifecycleExplainPhaseExecution](./IlmExplainLifecycleLifecycleExplainPhaseExecution.md) | &nbsp; |
| `phase_time_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `phase_time` | [DateTime](./DateTime.md) | &nbsp; |
| `phase` | [Name](./Name.md) | &nbsp; |
| `policy` | [Name](./Name.md) | &nbsp; |
| `previous_step_info` | Record<string, any> | &nbsp; |
| `repository_name` | string | &nbsp; |
| `shrink_index_name` | string | &nbsp; |
| `snapshot_name` | string | &nbsp; |
| `step_info` | Record<string, any> | &nbsp; |
| `step_time_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `step_time` | [DateTime](./DateTime.md) | &nbsp; |
| `step` | [Name](./Name.md) | &nbsp; |
| `time_since_index_creation` | [Duration](./Duration.md) | &nbsp; |
