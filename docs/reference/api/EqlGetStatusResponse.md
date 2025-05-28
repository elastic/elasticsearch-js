# `EqlGetStatusResponse` [interface-EqlGetStatusResponse]

| Name | Type | Description |
| - | - | - |
| `completion_status` | [integer](./integer.md) | For a completed search shows the http status code of the completed search. |
| `expiration_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | Shows a timestamp when the eql search will be expired, in milliseconds since the Unix epoch. When this time is reached, the search and its results are deleted, even if the search is still ongoing. |
| `id` | [Id](./Id.md) | Identifier for the search. |
| `is_partial` | boolean | If true, the search request is still executing. If false, the search is completed. |
| `is_running` | boolean | If true, the response does not contain complete search results. This could be because either the search is still running (is_running status is false), or because it is already completed (is_running status is true) and results are partial due to failures or timeouts. |
| `start_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | For a running search shows a timestamp when the eql search started, in milliseconds since the Unix epoch. |
