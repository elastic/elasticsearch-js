# WatcherStatsRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `metric?` | `WatcherStatsWatcherMetric | WatcherStatsWatcherMetric`[] | Defines which additional metrics are included in the response. |
| `emit_stacktraces?` | `boolean` | Defines whether stack traces are generated for each watch that is running. |
| `body?` | `string | { [key: string]: any } & { metric?: never, emit_stacktraces?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { metric?: never, emit_stacktraces?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
