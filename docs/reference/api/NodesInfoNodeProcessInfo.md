# `NodesInfoNodeProcessInfo` [interface-NodesInfoNodeProcessInfo]

| Name | Type | Description |
| - | - | - |
| `id` | [long](./long.md) | Process identifier (PID) |
| `mlockall` | boolean | Indicates if the process address space has been successfully locked in memory |
| `refresh_interval_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Refresh interval for the process statistics |
