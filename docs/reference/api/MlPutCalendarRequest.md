# `MlPutCalendarRequest` [interface-MlPutCalendarRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { calendar_id?: never; job_ids?: never; description?: never; }) | All values in `body` will be added to the request body. |
| `calendar_id` | [Id](./Id.md) | A string that uniquely identifies a calendar. |
| `description` | string | A description of the calendar. |
| `job_ids` | [Id](./Id.md)[] | An array of anomaly detection job identifiers. |
| `querystring` | { [key: string]: any; } & { calendar_id?: never; job_ids?: never; description?: never; } | All values in `querystring` will be added to the request querystring. |
