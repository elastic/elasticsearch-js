# `IndicesGetDataStreamRequest` [interface-IndicesGetDataStreamRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; expand_wildcards?: never; include_defaults?: never; master_timeout?: never; verbose?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of data stream that wildcard patterns can match. Supports comma-separated values, such as `open,hidden`. |
| `include_defaults` | boolean | If true, returns all relevant default configurations for the index template. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [DataStreamNames](./DataStreamNames.md) | Comma-separated list of data stream names used to limit the request. Wildcard ( `*`) expressions are supported. If omitted, all data streams are returned. |
| `querystring` | { [key: string]: any; } & { name?: never; expand_wildcards?: never; include_defaults?: never; master_timeout?: never; verbose?: never; } | All values in `querystring` will be added to the request querystring. |
| `verbose` | boolean | Whether the maximum timestamp for each data stream should be calculated and returned. |
