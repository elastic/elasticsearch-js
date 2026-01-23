# MlGetBucketsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `timestamp?` | [`DateTime`](DateTime.md) | The timestamp of a single bucket result. If you do not specify this
parameter, the API returns information about all buckets. |
| `from?` | [`integer`](integer.md) | Skips the specified number of buckets. |
| `size?` | [`integer`](integer.md) | Specifies the maximum number of buckets to obtain. |
| `anomaly_score?` | [`double`](double.md) | Refer to the description for the `anomaly_score` query parameter. |
| `desc?` | `boolean` | Refer to the description for the `desc` query parameter. |
| `end?` | [`DateTime`](DateTime.md) | Refer to the description for the `end` query parameter. |
| `exclude_interim?` | `boolean` | Refer to the description for the `exclude_interim` query parameter. |
| `expand?` | `boolean` | Refer to the description for the `expand` query parameter. |
| `page?` | [`MlPage`](MlPage.md) | - |
| `sort?` | [`Field`](Field.md) | Refer to the desription for the `sort` query parameter. |
| `start?` | [`DateTime`](DateTime.md) | Refer to the description for the `start` query parameter. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, timestamp?: never, from?: never, size?: never, anomaly_score?: never, desc?: never, end?: never, exclude_interim?: never, expand?: never, page?: never, sort?: never, start?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, timestamp?: never, from?: never, size?: never, anomaly_score?: never, desc?: never, end?: never, exclude_interim?: never, expand?: never, page?: never, sort?: never, start?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
