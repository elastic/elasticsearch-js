# MlPostCalendarEventsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `calendar_id` | [`Id`](Id.md) | A string that uniquely identifies a calendar. |
| `events` | `MlCalendarEvent[]` | A list of one of more scheduled events. The event’s start and end times can be specified as integer milliseconds since the epoch or as a string in ISO 8601 format. |
| `body?` | `string | { [key: string]: any } & { calendar_id?: never, events?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { calendar_id?: never, events?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
