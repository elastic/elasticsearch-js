# TasksTaskInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `action` | `string` | - |
| `cancelled?` | `boolean` | - |
| `cancellable` | `boolean` | - |
| `description?` | `string` | Human readable text that identifies the particular request that the task is performing.
For example, it might identify the search request being performed by a search task.
Other kinds of tasks have different descriptions, like `_reindex` which has the source and the destination, or `_bulk` which just has the number of requests and the destination indices.
Many requests will have only an empty description because more detailed information about the request is not easily available or particularly helpful in identifying the request. |
| `headers` | `Record<string, string>` | - |
| `id` | `long` | - |
| `node` | [`NodeId`](NodeId.md) | - |
| `running_time?` | [`Duration`](Duration.md) | - |
| `running_time_in_nanos` | `DurationValue<UnitNanos>` | - |
| `start_time_in_millis` | `EpochTime<UnitMillis>` | - |
| `status?` | `any` | The internal status of the task, which varies from task to task.
The format also varies.
While the goal is to keep the status for a particular task consistent from version to version, this is not always possible because sometimes the implementation changes.
Fields might be removed from the status for a particular request so any parsing you do of the status might break in minor releases. |
| `type` | `string` | - |
| `parent_task_id?` | [`TaskId`](TaskId.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
