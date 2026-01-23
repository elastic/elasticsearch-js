# MlDeleteExpiredDataRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id?` | [`Id`](Id.md) | Identifier for an anomaly detection job. It can be a job identifier, a
group name, or a wildcard expression. |
| `requests_per_second?` | [`float`](float.md) | The desired requests per second for the deletion processes. The default
behavior is no throttling. |
| `timeout?` | [`Duration`](Duration.md) | How long can the underlying delete processes run until they are canceled. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, requests_per_second?: never, timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, requests_per_second?: never, timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
