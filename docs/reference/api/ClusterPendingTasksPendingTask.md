# `ClusterPendingTasksPendingTask` [interface-ClusterPendingTasksPendingTask]

| Name | Type | Description |
| - | - | - |
| `executing` | boolean | Indicates whether the pending tasks are currently executing or not. |
| `insert_order` | [integer](./integer.md) | The number that represents when the task has been inserted into the task queue. |
| `priority` | string | The priority of the pending task. The valid priorities in descending priority order are: `IMMEDIATE` > `URGENT` > `HIGH` > `NORMAL` > `LOW` > `LANGUID`. |
| `source` | string | A general description of the cluster task that may include a reason and origin. |
| `time_in_queue_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The time expressed in milliseconds since the task is waiting for being performed. |
| `time_in_queue` | [Duration](./Duration.md) | The time since the task is waiting for being performed. |
