# `TasksTaskListResponseBase` [interface-TasksTaskListResponseBase]

| Name | Type | Description |
| - | - | - |
| `node_failures` | [ErrorCause](./ErrorCause.md)[] | &nbsp; |
| `nodes` | Record<string, [TasksNodeTasks](./TasksNodeTasks.md)> | Task information grouped by node, if `group_by` was set to `node` (the default). |
| `task_failures` | [TaskFailure](./TaskFailure.md)[] | &nbsp; |
| `tasks` | [TasksTaskInfos](./TasksTaskInfos.md) | Either a flat list of tasks if `group_by` was set to `none`, or grouped by parents if `group_by` was set to `parents`. |
