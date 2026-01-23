# ReindexStatus

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `slice_id?` | [`integer`](integer.md) | The slice ID |
| `batches` | [`long`](long.md) | The number of scroll responses pulled back by the reindex. |
| `created?` | [`long`](long.md) | The number of documents that were successfully created. |
| `deleted` | [`long`](long.md) | The number of documents that were successfully deleted. |
| `noops` | [`long`](long.md) | The number of documents that were ignored because the script used for the reindex returned a `noop` value for `ctx.op`. |
| `requests_per_second` | [`float`](float.md) | The number of requests per second effectively executed during the reindex. |
| `retries` | [`Retries`](Retries.md) | The number of retries attempted by reindex. `bulk` is the number of bulk actions retried and `search` is the number of search actions retried. |
| `throttled?` | [`Duration`](Duration.md) | - |
| `throttled_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | Number of milliseconds the request slept to conform to `requests_per_second`. |
| `throttled_until?` | [`Duration`](Duration.md) | - |
| `throttled_until_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | This field should always be equal to zero in a `_reindex` response.
It only has meaning when using the Task API, where it indicates the next time (in milliseconds since epoch) a throttled request will be executed again in order to conform to `requests_per_second`. |
| `total` | [`long`](long.md) | The number of documents that were successfully processed. |
| `updated?` | [`long`](long.md) | The number of documents that were successfully updated, for example, a document with same ID already existed prior to reindex updating it. |
| `version_conflicts` | [`long`](long.md) | The number of version conflicts that reindex hits. |
| `cancelled?` | `string` | The reason for cancellation if the slice was canceled |

## See Also

- [All Types](./)
- [API Methods](../index.md)
