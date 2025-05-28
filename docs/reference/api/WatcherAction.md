# `WatcherAction` [interface-WatcherAction]

| Name | Type | Description |
| - | - | - |
| `action_type` | [WatcherActionType](./WatcherActionType.md) | &nbsp; |
| `condition` | [WatcherConditionContainer](./WatcherConditionContainer.md) | &nbsp; |
| `email` | [WatcherEmailAction](./WatcherEmailAction.md) | &nbsp; |
| `foreach` | string | &nbsp; |
| `index` | [WatcherIndexAction](./WatcherIndexAction.md) | &nbsp; |
| `logging` | [WatcherLoggingAction](./WatcherLoggingAction.md) | &nbsp; |
| `max_iterations` | [integer](./integer.md) | &nbsp; |
| `name` | [Name](./Name.md) | &nbsp; |
| `pagerduty` | [WatcherPagerDutyAction](./WatcherPagerDutyAction.md) | &nbsp; |
| `slack` | [WatcherSlackAction](./WatcherSlackAction.md) | &nbsp; |
| `throttle_period_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `throttle_period` | [Duration](./Duration.md) | &nbsp; |
| `transform` | [TransformContainer](./TransformContainer.md) | &nbsp; |
| `webhook` | [WatcherWebhookAction](./WatcherWebhookAction.md) | &nbsp; |
