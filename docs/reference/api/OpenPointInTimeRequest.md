# `OpenPointInTimeRequest` [interface-OpenPointInTimeRequest]

| Name | Type | Description |
| - | - | - |
| `allow_partial_search_results` | boolean | Indicates whether the point in time tolerates unavailable shards or shard failures when initially creating the PIT. If `false`, creating a point in time request when a shard is missing or unavailable will throw an exception. If `true`, the point in time will contain all the shards that are available at the time of the request. |
| `body` | string | ({ [key: string]: any; } & { index?: never; keep_alive?: never; ignore_unavailable?: never; preference?: never; routing?: never; expand_wildcards?: never; allow_partial_search_results?: never; max_concurrent_shard_requests?: never; index_filter?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `index_filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Filter indices if the provided query rewrites to `match_none` on every shard. |
| `index` | [Indices](./Indices.md) | A comma-separated list of index names to open point in time; use `_all` or empty string to perform the operation on all indices |
| `keep_alive` | [Duration](./Duration.md) | Extend the length of time that the point in time persists. |
| `max_concurrent_shard_requests` | [integer](./integer.md) | Maximum number of concurrent shard requests that each sub-search request executes per node. |
| `preference` | string | The node or shard the operation should be performed on. By default, it is random. |
| `querystring` | { [key: string]: any; } & { index?: never; keep_alive?: never; ignore_unavailable?: never; preference?: never; routing?: never; expand_wildcards?: never; allow_partial_search_results?: never; max_concurrent_shard_requests?: never; index_filter?: never; } | All values in `querystring` will be added to the request querystring. |
| `routing` | [Routing](./Routing.md) | A custom value that is used to route operations to a specific shard. |
