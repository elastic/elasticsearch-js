# UpdateByQueryRethrottleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_id` | [`Id`](Id.md) | The ID for the task. |
| `requests_per_second` | `float` | The throttle for this request in sub-requests per second.
To turn off throttling, set it to `-1`. |
| `body?` | `string | { [key: string]: any } & { task_id?: never, requests_per_second?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_id?: never, requests_per_second?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
