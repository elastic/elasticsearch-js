## Interface `MlCalendarEvent`

| Name | Type | Description |
| - | - | - |
| `calendar_id` | [Id](./Id.md) | A string that uniquely identifies a calendar. |
| `description` | string | A description of the scheduled event. |
| `end_time` | [DateTime](./DateTime.md) | The timestamp for the end of the scheduled event in milliseconds since the epoch or ISO 8601 format. |
| `event_id` | [Id](./Id.md) | &nbsp; |
| `force_time_shift` | [integer](./integer.md) | Shift time by this many seconds. For example adjust time for daylight savings changes |
| `skip_model_update` | boolean | When true the model will not be updated for this calendar period. |
| `skip_result` | boolean | When true the model will not create results for this calendar period. |
| `start_time` | [DateTime](./DateTime.md) | The timestamp for the beginning of the scheduled event in milliseconds since the epoch or ISO 8601 format. |
