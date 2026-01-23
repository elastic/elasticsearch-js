# MlPutCalendarRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `calendar_id` | [`Id`](Id.md) | A string that uniquely identifies a calendar. |
| `job_ids?` | [`Id`](Id.md)[] | An array of anomaly detection job identifiers. |
| `description?` | `string` | A description of the calendar. |
| `body?` | `string | { [key: string]: any } & { calendar_id?: never, job_ids?: never, description?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { calendar_id?: never, job_ids?: never, description?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
