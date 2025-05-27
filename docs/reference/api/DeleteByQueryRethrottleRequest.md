## Interface `DeleteByQueryRethrottleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { task_id?: never; requests_per_second?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { task_id?: never; requests_per_second?: never; } | All values in `querystring` will be added to the request querystring. |
| `requests_per_second` | [float](./float.md) | The throttle for this request in sub-requests per second. To disable throttling, set it to `-1`. |
| `task_id` | [TaskId](./TaskId.md) | The ID for the task. |
