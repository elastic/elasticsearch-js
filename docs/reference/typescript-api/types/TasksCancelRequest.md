# TasksCancelRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `task_id?` | [`TaskId`](TaskId.md) | The task identifier. |
| `actions?` | `string | string`[] | A comma-separated list or wildcard expression of actions that is used to limit the request. |
| `nodes?` | `string`[] | A comma-separated list of node IDs or names that is used to limit the request. |
| `parent_task_id?` | `string` | A parent task ID that is used to limit the tasks. |
| `wait_for_completion?` | `boolean` | If true, the request blocks until all found tasks are complete. |
| `body?` | `string | { [key: string]: any } & { task_id?: never, actions?: never, nodes?: never, parent_task_id?: never, wait_for_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { task_id?: never, actions?: never, nodes?: never, parent_task_id?: never, wait_for_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
