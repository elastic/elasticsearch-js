## Interface `EqlSearchRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | &nbsp; |
| `allow_partial_search_results` | boolean | Allow query execution also in case of shard failures. If true, the query will keep running and will return results based on the available shards. For sequences, the behavior can be further refined using allow_partial_sequence_results |
| `allow_partial_sequence_results` | boolean | This flag applies only to sequences and has effect only if allow_partial_search_results=true. If true, the sequence query will return results based on the available shards, ignoring the others. If false, the sequence query will return successfully, but will always have empty results. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; query?: never; case_sensitive?: never; event_category_field?: never; tiebreaker_field?: never; timestamp_field?: never; fetch_size?: never; filter?: never; keep_alive?: never; keep_on_completion?: never; wait_for_completion_timeout?: never; allow_partial_search_results?: never; allow_partial_sequence_results?: never; size?: never; fields?: never; result_position?: never; runtime_mappings?: never; max_samples_per_key?: never; }) | All values in `body` will be added to the request body. |
| `case_sensitive` | boolean | &nbsp; |
| `event_category_field` | [Field](./Field.md) | Field containing the event classification, such as process, file, or network. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | &nbsp; |
| `fetch_size` | [uint](./uint.md) | Maximum number of events to search at a time for sequence queries. |
| `fields` | [QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md) | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | Array of wildcard (*) patterns. The response returns values for field names matching these patterns in the fields property of each hit. |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | [QueryDslQueryContainer](./QueryDslQueryContainer.md)[] | Query, written in Query DSL, used to filter the events on which the EQL query runs. |
| `ignore_unavailable` | boolean | If true, missing or closed indices are not included in the response. |
| `index` | [Indices](./Indices.md) | The name of the index to scope the operation |
| `keep_alive` | [Duration](./Duration.md) | &nbsp; |
| `keep_on_completion` | boolean | &nbsp; |
| `max_samples_per_key` | [integer](./integer.md) | By default, the response of a sample query contains up to `10` samples, with one sample per unique set of join keys. Use the `size` parameter to get a smaller or larger set of samples. To retrieve more than one sample per set of join keys, use the `max_samples_per_key` parameter. Pipes are not supported for sample queries. |
| `query` | string | EQL query you wish to run. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; expand_wildcards?: never; ignore_unavailable?: never; query?: never; case_sensitive?: never; event_category_field?: never; tiebreaker_field?: never; timestamp_field?: never; fetch_size?: never; filter?: never; keep_alive?: never; keep_on_completion?: never; wait_for_completion_timeout?: never; allow_partial_search_results?: never; allow_partial_sequence_results?: never; size?: never; fields?: never; result_position?: never; runtime_mappings?: never; max_samples_per_key?: never; } | All values in `querystring` will be added to the request querystring. |
| `result_position` | [EqlSearchResultPosition](./EqlSearchResultPosition.md) | &nbsp; |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | &nbsp; |
| `size` | [uint](./uint.md) | For basic queries, the maximum number of matching events to return. Defaults to 10 |
| `tiebreaker_field` | [Field](./Field.md) | Field used to sort hits with the same timestamp in ascending order |
| `timestamp_field` | [Field](./Field.md) | Field containing event timestamp. Default " @ timestamp" |
| `wait_for_completion_timeout` | [Duration](./Duration.md) | &nbsp; |
