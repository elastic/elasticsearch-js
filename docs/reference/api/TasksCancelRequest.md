# `TasksCancelRequest` [interface-TasksCancelRequest]

| Name | Type | Description |
| - | - | - |
| `actions` | string | string[] | A comma-separated list or wildcard expression of actions that is used to limit the request. |
| `body` | string | ({ [key: string]: any; } & { task_id?: never; actions?: never; nodes?: never; parent_task_id?: never; wait_for_completion?: never; }) | All values in `body` will be added to the request body. |
| `nodes` | string[] | A comma-separated list of node IDs or names that is used to limit the request. |
| `parent_task_id` | string | A parent task ID that is used to limit the tasks. |
| `querystring` | { [key: string]: any; } & { task_id?: never; actions?: never; nodes?: never; parent_task_id?: never; wait_for_completion?: never; } | All values in `querystring` will be added to the request querystring. |
| `task_id` | [TaskId](./TaskId.md) | The task identifier. |
| `wait_for_completion` | boolean | If true, the request blocks until all found tasks are complete. |
