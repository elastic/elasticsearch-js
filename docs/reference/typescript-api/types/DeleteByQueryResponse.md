# DeleteByQueryResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `batches?` | `long` | The number of scroll responses pulled back by the delete by query. |
| `deleted?` | `long` | The number of documents that were successfully deleted. |
| `failures?` | `BulkIndexByScrollFailure[]` | An array of failures if there were any unrecoverable errors during the process.
If this array is not empty, the request ended abnormally because of those failures.
Delete by query is implemented using batches and any failures cause the entire process to end but all failures in the current batch are collected into the array.
You can use the `conflicts` option to prevent reindex from ending on version conflicts. |
| `noops?` | `long` | This field is always equal to zero for delete by query.
It exists only so that delete by query, update by query, and reindex APIs return responses with the same structure. |
| `requests_per_second?` | `float` | The number of requests per second effectively run during the delete by query. |
| `retries?` | [`Retries`](Retries.md) | The number of retries attempted by delete by query.
`bulk` is the number of bulk actions retried.
`search` is the number of search actions retried. |
| `slice_id?` | `integer` | - |
| `slices?` | `ReindexStatus[]` | Status of each slice if the delete by query was sliced |
| `task?` | [`TaskId`](TaskId.md) | - |
| `throttled?` | [`Duration`](Duration.md) | - |
| `throttled_millis?` | `DurationValue<UnitMillis>` | The number of milliseconds the request slept to conform to `requests_per_second`. |
| `throttled_until?` | [`Duration`](Duration.md) | - |
| `throttled_until_millis?` | `DurationValue<UnitMillis>` | This field should always be equal to zero in a `_delete_by_query` response.
It has meaning only when using the task API, where it indicates the next time (in milliseconds since epoch) a throttled request will be run again in order to conform to `requests_per_second`. |
| `timed_out?` | `boolean` | If `true`, some requests run during the delete by query operation timed out. |
| `took?` | `DurationValue<UnitMillis>` | The number of milliseconds from start to end of the whole operation. |
| `total?` | `long` | The number of documents that were successfully processed. |
| `version_conflicts?` | `long` | The number of version conflicts that the delete by query hit. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
