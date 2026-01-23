# IndicesGetMigrateReindexStatusResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `start_time?` | [`DateTime`](DateTime.md) | - |
| `start_time_millis` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `complete` | `boolean` | - |
| `total_indices_in_data_stream` | [`integer`](integer.md) | - |
| `total_indices_requiring_upgrade` | [`integer`](integer.md) | - |
| `successes` | [`integer`](integer.md) | - |
| `in_progress` | [`IndicesGetMigrateReindexStatusStatusInProgress`](IndicesGetMigrateReindexStatusStatusInProgress.md)[] | - |
| `pending` | [`integer`](integer.md) | - |
| `errors` | [`IndicesGetMigrateReindexStatusStatusError`](IndicesGetMigrateReindexStatusStatusError.md)[] | - |
| `exception?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
