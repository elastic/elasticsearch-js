# MlFlushJobRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `advance_time?` | [`DateTime`](DateTime.md) | Refer to the description for the `advance_time` query parameter. |
| `calc_interim?` | `boolean` | Refer to the description for the `calc_interim` query parameter. |
| `end?` | [`DateTime`](DateTime.md) | Refer to the description for the `end` query parameter. |
| `skip_time?` | [`DateTime`](DateTime.md) | Refer to the description for the `skip_time` query parameter. |
| `start?` | [`DateTime`](DateTime.md) | Refer to the description for the `start` query parameter. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, advance_time?: never, calc_interim?: never, end?: never, skip_time?: never, start?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, advance_time?: never, calc_interim?: never, end?: never, skip_time?: never, start?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
