## Interface `IndicesExplainDataLifecycleDataStreamLifecycleExplain`

| Name | Type | Description |
| - | - | - |
| `error` | string | &nbsp; |
| `generation_time` | [Duration](./Duration.md) | &nbsp; |
| `index_creation_date_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `index` | [IndexName](./IndexName.md) | &nbsp; |
| `lifecycle` | [IndicesDataStreamLifecycleWithRollover](./IndicesDataStreamLifecycleWithRollover.md) | &nbsp; |
| `managed_by_lifecycle` | boolean | &nbsp; |
| `rollover_date_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `time_since_index_creation` | [Duration](./Duration.md) | &nbsp; |
| `time_since_rollover` | [Duration](./Duration.md) | &nbsp; |
