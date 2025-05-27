## Interface `TasksTaskInfo`

| Name | Type | Description |
| - | - | - |
| `action` | string | &nbsp; |
| `cancellable` | boolean | &nbsp; |
| `cancelled` | boolean | &nbsp; |
| `description` | string | Human readable text that identifies the particular request that the task is performing. For example, it might identify the search request being performed by a search task. Other kinds of tasks have different descriptions, like `_reindex` which has the source and the destination, or `_bulk` which just has the number of requests and the destination indices. Many requests will have only an empty description because more detailed information about the request is not easily available or particularly helpful in identifying the request. |
| `headers` | Record<string, string> | &nbsp; |
| `id` | [long](./long.md) | &nbsp; |
| `node` | [NodeId](./NodeId.md) | &nbsp; |
| `parent_task_id` | [TaskId](./TaskId.md) | &nbsp; |
| `running_time_in_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | &nbsp; |
| `running_time` | [Duration](./Duration.md) | &nbsp; |
| `start_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `status` | any | The internal status of the task, which varies from task to task. The format also varies. While the goal is to keep the status for a particular task consistent from version to version, this is not always possible because sometimes the implementation changes. Fields might be removed from the status for a particular request so any parsing you do of the status might break in minor releases. |
| `type` | string | &nbsp; |
