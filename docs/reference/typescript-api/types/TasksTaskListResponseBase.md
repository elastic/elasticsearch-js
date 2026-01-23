# TasksTaskListResponseBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_failures?` | `ErrorCause[]` | - |
| `task_failures?` | `TaskFailure[]` | - |
| `nodes?` | `Record<string, TasksNodeTasks>` | Task information grouped by node, if `group_by` was set to `node` (the default). |
| `tasks?` | [`TasksTaskInfos`](TasksTaskInfos.md) | Either a flat list of tasks if `group_by` was set to `none`, or grouped by parents if
`group_by` was set to `parents`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
