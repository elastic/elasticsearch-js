# MlGetOverallBucketsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. It can be a job identifier, a
group name, a comma-separated list of jobs or groups, or a wildcard
expression.

You can summarize the bucket results for all anomaly detection jobs by
using `_all` or by specifying `*` as the `<job_id>`. |
| `allow_no_match?` | `boolean` | Refer to the description for the `allow_no_match` query parameter. |
| `bucket_span?` | [`Duration`](Duration.md) | Refer to the description for the `bucket_span` query parameter. |
| `end?` | [`DateTime`](DateTime.md) | Refer to the description for the `end` query parameter. |
| `exclude_interim?` | `boolean` | Refer to the description for the `exclude_interim` query parameter. |
| `overall_score?` | [`double`](double.md) | Refer to the description for the `overall_score` query parameter. |
| `start?` | [`DateTime`](DateTime.md) | Refer to the description for the `start` query parameter. |
| `top_n?` | [`integer`](integer.md) | Refer to the description for the `top_n` query parameter. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, allow_no_match?: never, bucket_span?: never, end?: never, exclude_interim?: never, overall_score?: never, start?: never, top_n?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, allow_no_match?: never, bucket_span?: never, end?: never, exclude_interim?: never, overall_score?: never, start?: never, top_n?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
