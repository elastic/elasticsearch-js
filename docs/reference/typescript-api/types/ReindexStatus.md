# ReindexStatus

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `slice_id?` | `integer` | The slice ID |
| `batches` | `long` | The number of scroll responses pulled back by the reindex. |
| `created?` | `long` | The number of documents that were successfully created. |
| `deleted` | `long` | The number of documents that were successfully deleted. |
| `noops` | `long` | The number of documents that were ignored because the script used for the reindex returned a `noop` value for `ctx.op`. |
| `requests_per_second` | `float` | The number of requests per second effectively executed during the reindex. |
| `retries` | [`Retries`](Retries.md) | The number of retries attempted by reindex. `bulk` is the number of bulk actions retried and `search` is the number of search actions retried. |
| `throttled?` | [`Duration`](Duration.md) | - |
| `throttled_millis` | `DurationValue<UnitMillis>` | Number of milliseconds the request slept to conform to `requests_per_second`. |
| `throttled_until?` | [`Duration`](Duration.md) | - |
| `throttled_until_millis` | `DurationValue<UnitMillis>` | This field should always be equal to zero in a `_reindex` response.
It only has meaning when using the Task API, where it indicates the next time (in milliseconds since epoch) a throttled request will be executed again in order to conform to `requests_per_second`. |
| `total` | `long` | The number of documents that were successfully processed. |
| `updated?` | `long` | The number of documents that were successfully updated, for example, a document with same ID already existed prior to reindex updating it. |
| `version_conflicts` | `long` | The number of version conflicts that reindex hits. |
| `cancelled?` | `string` | The reason for cancellation if the slice was canceled |

## See Also

- [All Types](./)
- [API Methods](../index.md)
