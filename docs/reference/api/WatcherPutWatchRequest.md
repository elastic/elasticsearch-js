## Interface `WatcherPutWatchRequest`

| Name | Type | Description |
| - | - | - |
| `actions` | Record<string, [WatcherAction](./WatcherAction.md)> | The list of actions that will be run if the condition matches. |
| `active` | boolean | The initial state of the watch. The default value is `true`, which means the watch is active by default. |
| `body` | string | ({ [key: string]: any; } & { id?: never; active?: never; if_primary_term?: never; if_seq_no?: never; version?: never; actions?: never; condition?: never; input?: never; metadata?: never; throttle_period?: never; throttle_period_in_millis?: never; transform?: never; trigger?: never; }) | All values in `body` will be added to the request body. |
| `condition` | [WatcherConditionContainer](./WatcherConditionContainer.md) | The condition that defines if the actions should be run. |
| `id` | [Id](./Id.md) | The identifier for the watch. |
| `if_primary_term` | [long](./long.md) | only update the watch if the last operation that has changed the watch has the specified primary term |
| `if_seq_no` | [SequenceNumber](./SequenceNumber.md) | only update the watch if the last operation that has changed the watch has the specified sequence number |
| `input` | [WatcherInputContainer](./WatcherInputContainer.md) | The input that defines the input that loads the data for the watch. |
| `metadata` | [Metadata](./Metadata.md) | Metadata JSON that will be copied into the history entries. |
| `querystring` | { [key: string]: any; } & { id?: never; active?: never; if_primary_term?: never; if_seq_no?: never; version?: never; actions?: never; condition?: never; input?: never; metadata?: never; throttle_period?: never; throttle_period_in_millis?: never; transform?: never; trigger?: never; } | All values in `querystring` will be added to the request querystring. |
| `throttle_period_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Minimum time in milliseconds between actions being run. Defaults to 5000. If both this value and the throttle_period parameter are specified, Watcher uses the last parameter included in the request. |
| `throttle_period` | [Duration](./Duration.md) | The minimum time between actions being run. The default is 5 seconds. This default can be changed in the config file with the setting `xpack.watcher.throttle.period.default_period`. If both this value and the `throttle_period_in_millis` parameter are specified, Watcher uses the last parameter included in the request. |
| `transform` | [TransformContainer](./TransformContainer.md) | The transform that processes the watch payload to prepare it for the watch actions. |
| `trigger` | [WatcherTriggerContainer](./WatcherTriggerContainer.md) | The trigger that defines when the watch should run. |
| `version` | [VersionNumber](./VersionNumber.md) | Explicit version number for concurrency control |
