# RollupStopJobRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | Identifier for the rollup job. |
| `timeout?` | [`Duration`](Duration.md) | If `wait_for_completion` is `true`, the API blocks for (at maximum) the specified duration while waiting for the job to stop.
If more than `timeout` time has passed, the API throws a timeout exception.
NOTE: Even if a timeout occurs, the stop request is still processing and eventually moves the job to STOPPED.
The timeout simply means the API call itself timed out while waiting for the status change. |
| `wait_for_completion?` | `boolean` | If set to `true`, causes the API to block until the indexer state completely stops.
If set to `false`, the API returns immediately and the indexer is stopped asynchronously in the background. |
| `body?` | `string | { [key: string]: any } & { id?: never, timeout?: never, wait_for_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, timeout?: never, wait_for_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
