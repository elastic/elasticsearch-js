# MlPreviewDatafeedRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `datafeed_id?` | [`Id`](Id.md) | A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase
alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric
characters. NOTE: If you use this path parameter, you cannot provide datafeed or anomaly detection job
configuration details in the request body. |
| `start?` | [`DateTime`](DateTime.md) | The start time from where the datafeed preview should begin |
| `end?` | [`DateTime`](DateTime.md) | The end time when the datafeed preview should stop |
| `datafeed_config?` | [`MlDatafeedConfig`](MlDatafeedConfig.md) | The datafeed definition to preview. |
| `job_config?` | [`MlJobConfig`](MlJobConfig.md) | The configuration details for the anomaly detection job that is associated with the datafeed. If the
`datafeed_config` object does not include a `job_id` that references an existing anomaly detection job, you must
supply this `job_config` object. If you include both a `job_id` and a `job_config`, the latter information is
used. You cannot specify a `job_config` object unless you also supply a `datafeed_config` object. |
| `body?` | `string | { [key: string]: any } & { datafeed_id?: never, start?: never, end?: never, datafeed_config?: never, job_config?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { datafeed_id?: never, start?: never, end?: never, datafeed_config?: never, job_config?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
