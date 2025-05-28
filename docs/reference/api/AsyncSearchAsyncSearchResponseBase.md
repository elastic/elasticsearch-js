# `AsyncSearchAsyncSearchResponseBase` [interface-AsyncSearchAsyncSearchResponseBase]

| Name | Type | Description |
| - | - | - |
| `completion_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `completion_time` | [DateTime](./DateTime.md) | Indicates when the async search completed. It is present only when the search has completed. |
| `expiration_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `expiration_time` | [DateTime](./DateTime.md) | Indicates when the async search will expire. |
| `id` | [Id](./Id.md) | &nbsp; |
| `is_partial` | boolean | When the query is no longer running, this property indicates whether the search failed or was successfully completed on all shards. While the query is running, `is_partial` is always set to `true`. |
| `is_running` | boolean | Indicates whether the search is still running or has completed. > info > If the search failed after some shards returned their results or the node that is coordinating the async search dies, results may be partial even though `is_running` is `false`. |
| `start_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `start_time` | [DateTime](./DateTime.md) | &nbsp; |
