# IndicesGetMigrateReindexStatusResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `start_time?` | [`DateTime`](DateTime.md) | - |
| `start_time_millis` | `EpochTime<UnitMillis>` | - |
| `complete` | `boolean` | - |
| `total_indices_in_data_stream` | `integer` | - |
| `total_indices_requiring_upgrade` | `integer` | - |
| `successes` | `integer` | - |
| `in_progress` | `IndicesGetMigrateReindexStatusStatusInProgress[]` | - |
| `pending` | `integer` | - |
| `errors` | `IndicesGetMigrateReindexStatusStatusError[]` | - |
| `exception?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
