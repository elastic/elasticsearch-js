## Interface `UpdateByQueryResponse`

| Name | Type | Description |
| - | - | - |
| `batches` | [long](./long.md) | The number of scroll responses pulled back by the update by query. |
| `deleted` | [long](./long.md) | The number of documents that were successfully deleted. |
| `failures` | [BulkIndexByScrollFailure](./BulkIndexByScrollFailure.md)[] | Array of failures if there were any unrecoverable errors during the process. If this is non-empty then the request ended because of those failures. Update by query is implemented using batches. Any failure causes the entire process to end, but all failures in the current batch are collected into the array. You can use the `conflicts` option to prevent reindex from ending when version conflicts occur. |
| `noops` | [long](./long.md) | The number of documents that were ignored because the script used for the update by query returned a noop value for `ctx.op`. |
| `requests_per_second` | [float](./float.md) | The number of requests per second effectively run during the update by query. |
| `retries` | [Retries](./Retries.md) | The number of retries attempted by update by query. `bulk` is the number of bulk actions retried. `search` is the number of search actions retried. |
| `task` | [TaskId](./TaskId.md) | &nbsp; |
| `throttled_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The number of milliseconds the request slept to conform to `requests_per_second`. |
| `throttled_until_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | This field should always be equal to zero in an _update_by_query response. It only has meaning when using the task API, where it indicates the next time (in milliseconds since epoch) a throttled request will be run again in order to conform to `requests_per_second`. |
| `throttled_until` | [Duration](./Duration.md) | &nbsp; |
| `throttled` | [Duration](./Duration.md) | &nbsp; |
| `timed_out` | boolean | If true, some requests timed out during the update by query. |
| `took` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The number of milliseconds from start to end of the whole operation. |
| `total` | [long](./long.md) | The number of documents that were successfully processed. |
| `updated` | [long](./long.md) | The number of documents that were successfully updated. |
| `version_conflicts` | [long](./long.md) | The number of version conflicts that the update by query hit. |
