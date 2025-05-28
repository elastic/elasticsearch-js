# `MlDeleteCalendarEventRequest` [interface-MlDeleteCalendarEventRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { calendar_id?: never; event_id?: never; }) | All values in `body` will be added to the request body. |
| `calendar_id` | [Id](./Id.md) | A string that uniquely identifies a calendar. |
| `event_id` | [Id](./Id.md) | Identifier for the scheduled event. You can obtain this identifier by using the get calendar events API. |
| `querystring` | { [key: string]: any; } & { calendar_id?: never; event_id?: never; } | All values in `querystring` will be added to the request querystring. |
