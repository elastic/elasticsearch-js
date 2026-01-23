# MlForecastRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. The job must be open when you
create a forecast; otherwise, an error occurs. |
| `duration?` | [`Duration`](Duration.md) | Refer to the description for the `duration` query parameter. |
| `expires_in?` | [`Duration`](Duration.md) | Refer to the description for the `expires_in` query parameter. |
| `max_model_memory?` | `string` | Refer to the description for the `max_model_memory` query parameter. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, duration?: never, expires_in?: never, max_model_memory?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, duration?: never, expires_in?: never, max_model_memory?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
