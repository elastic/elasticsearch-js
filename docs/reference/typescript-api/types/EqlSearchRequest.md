# EqlSearchRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | Comma-separated list of index names to scope the operation |
| `allow_no_indices?` | `boolean` | Whether to ignore if a wildcard indices expression resolves into no concrete indices.
(This includes `_all` string or when no indices have been specified) |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both. |
| `ccs_minimize_roundtrips?` | `boolean` | Indicates whether network round-trips should be minimized as part of cross-cluster search requests execution |
| `ignore_unavailable?` | `boolean` | If true, missing or closed indices are not included in the response. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `query` | `string` | EQL query you wish to run. |
| `case_sensitive?` | `boolean` | - |
| `event_category_field?` | [`Field`](Field.md) | Field containing the event classification, such as process, file, or network. |
| `tiebreaker_field?` | [`Field`](Field.md) | Field used to sort hits with the same timestamp in ascending order |
| `timestamp_field?` | [`Field`](Field.md) | Field containing event timestamp. |
| `fetch_size?` | [`uint`](uint.md) | Maximum number of events to search at a time for sequence queries. |
| `filter?` | `QueryDslQueryContainer | QueryDslQueryContainer`[] | Query, written in Query DSL, used to filter the events on which the EQL query runs. |
| `keep_alive?` | [`Duration`](Duration.md) | - |
| `keep_on_completion?` | `boolean` | - |
| `wait_for_completion_timeout?` | [`Duration`](Duration.md) | - |
| `allow_partial_search_results?` | `boolean` | Allow query execution also in case of shard failures.
If true, the query will keep running and will return results based on the available shards.
For sequences, the behavior can be further refined using allow_partial_sequence_results |
| `allow_partial_sequence_results?` | `boolean` | This flag applies only to sequences and has effect only if allow_partial_search_results=true.
If true, the sequence query will return results based on the available shards, ignoring the others.
If false, the sequence query will return successfully, but will always have empty results. |
| `size?` | [`uint`](uint.md) | For basic queries, the maximum number of matching events to return. Defaults to 10 |
| `fields?` | `QueryDslFieldAndFormat | Field | (QueryDslFieldAndFormat | Field)`[] | Array of wildcard (*) patterns. The response returns values for field names matching these patterns in the fields property of each hit. |
| `result_position?` | [`EqlSearchResultPosition`](EqlSearchResultPosition.md) | - |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | - |
| `max_samples_per_key?` | [`integer`](integer.md) | By default, the response of a sample query contains up to `10` samples, with one sample per unique set of join keys. Use the `size`
parameter to get a smaller or larger set of samples. To retrieve more than one sample per set of join keys, use the
`max_samples_per_key` parameter. Pipes are not supported for sample queries. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ccs_minimize_roundtrips?: never, ignore_unavailable?: never, project_routing?: never, query?: never, case_sensitive?: never, event_category_field?: never, tiebreaker_field?: never, timestamp_field?: never, fetch_size?: never, filter?: never, keep_alive?: never, keep_on_completion?: never, wait_for_completion_timeout?: never, allow_partial_search_results?: never, allow_partial_sequence_results?: never, size?: never, fields?: never, result_position?: never, runtime_mappings?: never, max_samples_per_key?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, expand_wildcards?: never, ccs_minimize_roundtrips?: never, ignore_unavailable?: never, project_routing?: never, query?: never, case_sensitive?: never, event_category_field?: never, tiebreaker_field?: never, timestamp_field?: never, fetch_size?: never, filter?: never, keep_alive?: never, keep_on_completion?: never, wait_for_completion_timeout?: never, allow_partial_search_results?: never, allow_partial_sequence_results?: never, size?: never, fields?: never, result_position?: never, runtime_mappings?: never, max_samples_per_key?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
