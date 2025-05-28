# `IndicesGetMigrateReindexStatusResponse` [interface-IndicesGetMigrateReindexStatusResponse]

| Name | Type | Description |
| - | - | - |
| `complete` | boolean | &nbsp; |
| `errors` | [IndicesGetMigrateReindexStatusStatusError](./IndicesGetMigrateReindexStatusStatusError.md)[] | &nbsp; |
| `exception` | string | &nbsp; |
| `in_progress` | [IndicesGetMigrateReindexStatusStatusInProgress](./IndicesGetMigrateReindexStatusStatusInProgress.md)[] | &nbsp; |
| `pending` | [integer](./integer.md) | &nbsp; |
| `start_time_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `start_time` | [DateTime](./DateTime.md) | &nbsp; |
| `successes` | [integer](./integer.md) | &nbsp; |
| `total_indices_in_data_stream` | [integer](./integer.md) | &nbsp; |
| `total_indices_requiring_upgrade` | [integer](./integer.md) | &nbsp; |
