# `IndicesGetDataLifecycleRequest` [interface-IndicesGetDataLifecycleRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; expand_wildcards?: never; include_defaults?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of data stream that wildcard patterns can match. Supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `include_defaults` | boolean | If `true`, return all default settings in the response. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [DataStreamNames](./DataStreamNames.md) | Comma-separated list of data streams to limit the request. Supports wildcards ( `*`). To target all data streams, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { name?: never; expand_wildcards?: never; include_defaults?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
