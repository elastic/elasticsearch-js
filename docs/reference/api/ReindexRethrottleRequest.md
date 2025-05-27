## Interface `ReindexRethrottleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_id?: never; requests_per_second?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { task_id?: never; requests_per_second?: never; } | All values in `querystring` will be added to the request querystring. |
| `requests_per_second` | [float](./float.md) | The throttle for this request in sub-requests per second. It can be either `-1` to turn off throttling or any decimal number like `1.7` or `12` to throttle to that level. |
| `task_id` | [Id](./Id.md) | The task identifier, which can be found by using the tasks API. |
