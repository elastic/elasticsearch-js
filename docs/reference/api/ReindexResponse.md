# `ReindexResponse` [interface-ReindexResponse]

| Name | Type | Description |
| - | - | - |
| `batches` | [long](./long.md) | The number of scroll responses that were pulled back by the reindex. |
| `created` | [long](./long.md) | The number of documents that were successfully created. |
| `deleted` | [long](./long.md) | The number of documents that were successfully deleted. |
| `failures` | [BulkIndexByScrollFailure](./BulkIndexByScrollFailure.md)[] | If there were any unrecoverable errors during the process, it is an array of those failures. If this array is not empty, the request ended because of those failures. Reindex is implemented using batches and any failure causes the entire process to end but all failures in the current batch are collected into the array. You can use the `conflicts` option to prevent the reindex from ending on version conflicts. |
| `noops` | [long](./long.md) | The number of documents that were ignored because the script used for the reindex returned a `noop` value for `ctx.op`. |
| `requests_per_second` | [float](./float.md) | The number of requests per second effectively run during the reindex. |
| `retries` | [Retries](./Retries.md) | The number of retries attempted by reindex. |
| `slice_id` | [integer](./integer.md) | &nbsp; |
| `task` | [TaskId](./TaskId.md) | &nbsp; |
| `throttled_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The number of milliseconds the request slept to conform to `requests_per_second`. |
| `throttled_until_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | This field should always be equal to zero in a reindex response. It has meaning only when using the task API, where it indicates the next time (in milliseconds since epoch) that a throttled request will be run again in order to conform to `requests_per_second`. |
| `timed_out` | boolean | If any of the requests that ran during the reindex timed out, it is `true`. |
| `took` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The total milliseconds the entire operation took. |
| `total` | [long](./long.md) | The number of documents that were successfully processed. |
| `updated` | [long](./long.md) | The number of documents that were successfully updated. That is to say, a document with the same ID already existed before the reindex updated it. |
| `version_conflicts` | [long](./long.md) | The number of version conflicts that occurred. |
