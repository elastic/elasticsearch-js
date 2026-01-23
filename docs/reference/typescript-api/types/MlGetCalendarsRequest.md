# MlGetCalendarsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `calendar_id?` | [`Id`](Id.md) | A string that uniquely identifies a calendar. You can get information for multiple calendars by using a comma-separated list of ids or a wildcard expression. You can get information for all calendars by using `_all` or `*` or by omitting the calendar identifier. |
| `from?` | [`integer`](integer.md) | Skips the specified number of calendars. This parameter is supported only when you omit the calendar identifier. |
| `size?` | [`integer`](integer.md) | Specifies the maximum number of calendars to obtain. This parameter is supported only when you omit the calendar identifier. |
| `page?` | [`MlPage`](MlPage.md) | This object is supported only when you omit the calendar identifier. |
| `body?` | `string | { [key: string]: any } & { calendar_id?: never, from?: never, size?: never, page?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { calendar_id?: never, from?: never, size?: never, page?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
