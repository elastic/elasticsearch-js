## Interface `WatcherStatsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { metric?: never; emit_stacktraces?: never; }) | All values in `body` will be added to the request body. |
| `emit_stacktraces` | boolean | Defines whether stack traces are generated for each watch that is running. |
| `metric` | [WatcherStatsWatcherMetric](./WatcherStatsWatcherMetric.md) | [WatcherStatsWatcherMetric](./WatcherStatsWatcherMetric.md)[] | Defines which additional metrics are included in the response. |
| `querystring` | { [key: string]: any; } & { metric?: never; emit_stacktraces?: never; } | All values in `querystring` will be added to the request querystring. |
