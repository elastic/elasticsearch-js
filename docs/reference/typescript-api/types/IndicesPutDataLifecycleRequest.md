# IndicesPutDataLifecycleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`DataStreamNames`](DataStreamNames.md) | Comma-separated list of data streams used to limit the request.
Supports wildcards (`*`).
To target all data streams use `*` or `_all`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Type of data stream that wildcard patterns can match.
Supports comma-separated values, such as `open,hidden`. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. If no response is
received before the timeout expires, the request fails and returns an
error. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `data_retention?` | [`Duration`](Duration.md) | If defined, every document added to this data stream will be stored at least for this time frame.
Any time after this duration the document could be deleted.
When empty, every document in this data stream will be stored indefinitely. |
| `downsampling?` | `IndicesDownsamplingRound[]` | The downsampling configuration to execute for the managed backing index after rollover. |
| `downsampling_method?` | [`IndicesSamplingMethod`](IndicesSamplingMethod.md) | The method used to downsample the data. There are two options `aggregate` and `last_value`. It requires
`downsampling` to be defined. Defaults to `aggregate`. |
| `enabled?` | `boolean` | If defined, it turns data stream lifecycle on/off (`true`/`false`) for this data stream. A data stream lifecycle
that's disabled (enabled: `false`) will have no effect on the data stream. |
| `body?` | `string | { [key: string]: any } & { name?: never, expand_wildcards?: never, master_timeout?: never, timeout?: never, data_retention?: never, downsampling?: never, downsampling_method?: never, enabled?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, expand_wildcards?: never, master_timeout?: never, timeout?: never, data_retention?: never, downsampling?: never, downsampling_method?: never, enabled?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
