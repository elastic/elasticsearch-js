# `WatcherExecuteWatchRequest` [interface-WatcherExecuteWatchRequest]

| Name | Type | Description |
| - | - | - |
| `action_modes` | Record<string, [WatcherActionExecutionMode](./WatcherActionExecutionMode.md)> | Determines how to handle the watch actions as part of the watch execution. |
| `alternative_input` | Record<string, any> | When present, the watch uses this object as a payload instead of executing its own input. |
| `body` | string | ({ [key: string]: any; } & { id?: never; debug?: never; action_modes?: never; alternative_input?: never; ignore_condition?: never; record_execution?: never; simulated_actions?: never; trigger_data?: never; watch?: never; }) | All values in `body` will be added to the request body. |
| `debug` | boolean | Defines whether the watch runs in debug mode. |
| `id` | [Id](./Id.md) | The watch identifier. |
| `ignore_condition` | boolean | When set to `true`, the watch execution uses the always condition. This can also be specified as an HTTP parameter. |
| `querystring` | { [key: string]: any; } & { id?: never; debug?: never; action_modes?: never; alternative_input?: never; ignore_condition?: never; record_execution?: never; simulated_actions?: never; trigger_data?: never; watch?: never; } | All values in `querystring` will be added to the request querystring. |
| `record_execution` | boolean | When set to `true`, the watch record representing the watch execution result is persisted to the `.watcher-history` index for the current time. In addition, the status of the watch is updated, possibly throttling subsequent runs. This can also be specified as an HTTP parameter. |
| `simulated_actions` | [WatcherSimulatedActions](./WatcherSimulatedActions.md) | &nbsp; |
| `trigger_data` | [WatcherScheduleTriggerEvent](./WatcherScheduleTriggerEvent.md) | This structure is parsed as the data of the trigger event that will be used during the watch execution. |
| `watch` | [WatcherWatch](./WatcherWatch.md) | When present, this watch is used instead of the one specified in the request. This watch is not persisted to the index and `record_execution` cannot be set. |
