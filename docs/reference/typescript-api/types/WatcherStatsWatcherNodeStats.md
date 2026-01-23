# WatcherStatsWatcherNodeStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `current_watches?` | [`WatcherStatsWatchRecordStats`](WatcherStatsWatchRecordStats.md)[] | The current executing watches metric gives insight into the watches that are currently being executed by Watcher.
Additional information is shared per watch that is currently executing.
This information includes the `watch_id`, the time its execution started and its current execution phase.
To include this metric, the `metric` option should be set to `current_watches` or `_all`.
In addition you can also specify the `emit_stacktraces=true` parameter, which adds stack traces for each watch that is being run.
These stack traces can give you more insight into an execution of a watch. |
| `execution_thread_pool` | [`WatcherExecutionThreadPool`](WatcherExecutionThreadPool.md) | - |
| `queued_watches?` | [`WatcherStatsWatchRecordQueuedStats`](WatcherStatsWatchRecordQueuedStats.md)[] | Watcher moderates the execution of watches such that their execution won't put too much pressure on the node and its resources.
If too many watches trigger concurrently and there isn't enough capacity to run them all, some of the watches are queued, waiting for the current running watches to finish.s
The queued watches metric gives insight on these queued watches.

To include this metric, the `metric` option should include `queued_watches` or `_all`. |
| `watch_count` | [`long`](long.md) | The number of watches currently registered. |
| `watcher_state` | [`WatcherStatsWatcherState`](WatcherStatsWatcherState.md) | The current state of Watcher. |
| `node_id` | [`Id`](Id.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
