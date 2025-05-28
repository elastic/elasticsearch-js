# `IndicesDataStreamsStatsRequest` [interface-IndicesDataStreamsStatsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; expand_wildcards?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of data stream that wildcard patterns can match. Supports comma-separated values, such as `open,hidden`. |
| `name` | [IndexName](./IndexName.md) | Comma-separated list of data streams used to limit the request. Wildcard expressions ( `*`) are supported. To target all data streams in a cluster, omit this parameter or use `*`. |
| `querystring` | { [key: string]: any; } & { name?: never; expand_wildcards?: never; } | All values in `querystring` will be added to the request querystring. |
