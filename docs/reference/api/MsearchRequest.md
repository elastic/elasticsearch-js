# `MsearchRequest` [interface-MsearchRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; ccs_minimize_roundtrips?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; include_named_queries_score?: never; max_concurrent_searches?: never; max_concurrent_shard_requests?: never; pre_filter_shard_size?: never; rest_total_hits_as_int?: never; routing?: never; search_type?: never; typed_keys?: never; searches?: never; }) | All values in `body` will be added to the request body. |
| `ccs_minimize_roundtrips` | boolean | If true, network roundtrips between the coordinating node and remote clusters are minimized for cross-cluster search requests. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Type of index that wildcard expressions can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. |
| `ignore_throttled` | boolean | If true, concrete, expanded or aliased indices are ignored when frozen. |
| `ignore_unavailable` | boolean | If true, missing or closed indices are not included in the response. |
| `include_named_queries_score` | boolean | Indicates whether hit.matched_queries should be rendered as a map that includes the name of the matched query associated with its score (true) or as an array containing the name of the matched queries (false) This functionality reruns each named query on every hit in a search response. Typically, this adds a small overhead to a request. However, using computationally expensive named queries on a large number of hits may add significant overhead. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and index aliases to search. |
| `max_concurrent_searches` | [integer](./integer.md) | Maximum number of concurrent searches the multi search API can execute. Defaults to `max(1, (# of data nodes * min(search thread pool size, 10)))`. |
| `max_concurrent_shard_requests` | [integer](./integer.md) | Maximum number of concurrent shard requests that each sub-search request executes per node. |
| `pre_filter_shard_size` | [long](./long.md) | Defines a threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on its rewrite method i.e., if date filters are mandatory to match but the shard bounds and the query are disjoint. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; ccs_minimize_roundtrips?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; include_named_queries_score?: never; max_concurrent_searches?: never; max_concurrent_shard_requests?: never; pre_filter_shard_size?: never; rest_total_hits_as_int?: never; routing?: never; search_type?: never; typed_keys?: never; searches?: never; } | All values in `querystring` will be added to the request querystring. |
| `rest_total_hits_as_int` | boolean | If true, hits.total are returned as an integer in the response. Defaults to false, which returns an object. |
| `routing` | [Routing](./Routing.md) | Custom routing value used to route search operations to a specific shard. |
| `search_type` | [SearchType](./SearchType.md) | Indicates whether global term and document frequencies should be used when scoring returned documents. |
| `searches` | [MsearchRequestItem](./MsearchRequestItem.md)[] | &nbsp; |
| `typed_keys` | boolean | Specifies whether aggregation and suggester names should be prefixed by their respective types in the response. |
