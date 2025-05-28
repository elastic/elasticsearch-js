# `MlGetCalendarEventsRequest` [interface-MlGetCalendarEventsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { calendar_id?: never; end?: never; from?: never; job_id?: never; size?: never; start?: never; }) | All values in `body` will be added to the request body. |
| `calendar_id` | [Id](./Id.md) | A string that uniquely identifies a calendar. You can get information for multiple calendars by using a comma-separated list of ids or a wildcard expression. You can get information for all calendars by using `_all` or `*` or by omitting the calendar identifier. |
| `end` | [DateTime](./DateTime.md) | Specifies to get events with timestamps earlier than this time. |
| `from` | [integer](./integer.md) | Skips the specified number of events. |
| `job_id` | [Id](./Id.md) | Specifies to get events for a specific anomaly detection job identifier or job group. It must be used with a calendar identifier of `_all` or `*`. |
| `querystring` | { [key: string]: any; } & { calendar_id?: never; end?: never; from?: never; job_id?: never; size?: never; start?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of events to obtain. |
| `start` | [DateTime](./DateTime.md) | Specifies to get events with timestamps after this time. |
