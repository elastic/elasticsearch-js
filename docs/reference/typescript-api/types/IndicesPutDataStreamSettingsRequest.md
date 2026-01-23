# IndicesPutDataStreamSettingsRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Indices`](Indices.md) | A comma-separated list of data streams or data stream patterns. |
| `dry_run?` | `boolean` | If `true`, the request does not actually change the settings on any data streams or indices. Instead, it
simulates changing the settings and reports back to the user what would have happened had these settings
actually been applied. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node. If no response is
received before the timeout expires, the request fails and returns an
error. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response. If no response is received before the
 timeout expires, the request fails and returns an error. |
| `settings?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | - |
| `body?` | `string | { [key: string]: any } & { name?: never, dry_run?: never, master_timeout?: never, timeout?: never, settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, dry_run?: never, master_timeout?: never, timeout?: never, settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
