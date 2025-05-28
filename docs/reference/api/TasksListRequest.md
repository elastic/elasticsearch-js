# `TasksListRequest` [interface-TasksListRequest]

| Name | Type | Description |
| - | - | - |
| `actions` | string | string[] | A comma-separated list or wildcard expression of actions used to limit the request. For example, you can use `cluser:*` to retrieve all cluster-related tasks. |
| `body` | string | ({ [key: string]: any; } & { actions?: never; detailed?: never; group_by?: never; nodes?: never; parent_task_id?: never; timeout?: never; wait_for_completion?: never; }) | All values in `body` will be added to the request body. |
| `detailed` | boolean | If `true`, the response includes detailed information about the running tasks. This information is useful to distinguish tasks from each other but is more costly to run. |
| `group_by` | [TasksGroupBy](./TasksGroupBy.md) | A key that is used to group tasks in the response. The task lists can be grouped either by nodes or by parent tasks. |
| `nodes` | [NodeIds](./NodeIds.md) | A comma-separated list of node IDs or names that is used to limit the returned information. |
| `parent_task_id` | [Id](./Id.md) | A parent task identifier that is used to limit returned information. To return all tasks, omit this parameter or use a value of `-1`. If the parent task is not found, the API does not return a 404 response code. |
| `querystring` | { [key: string]: any; } & { actions?: never; detailed?: never; group_by?: never; nodes?: never; parent_task_id?: never; timeout?: never; wait_for_completion?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | The period to wait for each node to respond. If a node does not respond before its timeout expires, the response does not include its information. However, timed out nodes are included in the `node_failures` property. |
| `wait_for_completion` | boolean | If `true`, the request blocks until the operation is complete. |
