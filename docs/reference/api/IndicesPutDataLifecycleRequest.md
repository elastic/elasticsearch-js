## Interface `IndicesPutDataLifecycleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; expand_wildcards?: never; master_timeout?: never; timeout?: never; data_retention?: never; downsampling?: never; enabled?: never; }) | All values in `body` will be added to the request body. |
| `data_retention` | [Duration](./Duration.md) | If defined, every document added to this data stream will be stored at least for this time frame. Any time after this duration the document could be deleted. When empty, every document in this data stream will be stored indefinitely. |
| `downsampling` | [IndicesDataStreamLifecycleDownsampling](./IndicesDataStreamLifecycleDownsampling.md) | The downsampling configuration to execute for the managed backing index after rollover. |
| `enabled` | boolean | If defined, it turns data stream lifecycle on/off ( `true`/ `false`) for this data stream. A data stream lifecycle that's disabled (enabled: `false`) will have no effect on the data stream. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of data stream that wildcard patterns can match. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `hidden`, `open`, `closed`, `none`. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [DataStreamNames](./DataStreamNames.md) | Comma-separated list of data streams used to limit the request. Supports wildcards ( `*`). To target all data streams use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { name?: never; expand_wildcards?: never; master_timeout?: never; timeout?: never; data_retention?: never; downsampling?: never; enabled?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
