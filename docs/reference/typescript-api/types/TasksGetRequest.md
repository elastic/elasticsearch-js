# TasksGetRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_id` | [`Id`](Id.md) | The task identifier. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_completion?` | `boolean` | If `true`, the request blocks until the task has completed. |
| `body?` | `string | { [key: string]: any } & { task_id?: never, timeout?: never, wait_for_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_id?: never, timeout?: never, wait_for_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
