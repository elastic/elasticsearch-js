# SearchRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and aliases to search.
It supports wildcards (`*`).
To search all data streams and indices, omit this parameter or use `*` or `_all`. |
| `allow_no_indices?` | `boolean` | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices.
This behavior applies even if the request targets other open indices.
For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `allow_partial_search_results?` | `boolean` | If `true` and there are shard request timeouts or shard failures, the request returns partial results.
If `false`, it returns an error with no partial results.

To override the default behavior, you can set the `search.default_allow_partial_results` cluster setting to `false`. |
| `analyzer?` | `string` | The analyzer to use for the query string.
This parameter can be used only when the `q` query string parameter is specified. |
| `analyze_wildcard?` | `boolean` | If `true`, wildcard and prefix queries are analyzed.
This parameter can be used only when the `q` query string parameter is specified. |
| `batched_reduce_size?` | [`long`](long.md) | The number of shard results that should be reduced at once on the coordinating node.
If the potential number of shards in the request can be large, this value should be used as a protection mechanism to reduce the memory overhead per search request. |
| `ccs_minimize_roundtrips?` | `boolean` | If `true`, network round-trips between the coordinating node and the remote clusters are minimized when running cross-cluster search (CCS) requests. |
| `default_operator?` | [`QueryDslOperator`](QueryDslOperator.md) | The default operator for the query string query: `and` or `or`.
This parameter can be used only when the `q` query string parameter is specified. |
| `df?` | `string` | The field to use as a default when no field prefix is given in the query string.
This parameter can be used only when the `q` query string parameter is specified. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | The type of index that wildcard patterns can match.
If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
It supports comma-separated values such as `open,hidden`. |
| `ignore_throttled?` | `boolean` | If `true`, concrete, expanded or aliased indices will be ignored when frozen. |
| `ignore_unavailable?` | `boolean` | If `false`, the request returns an error if it targets a missing or closed index. |
| `include_named_queries_score?` | `boolean` | If `true`, the response includes the score contribution from any named queries.

This functionality reruns each named query on every hit in a search response.
Typically, this adds a small overhead to a request.
However, using computationally expensive named queries on a large number of hits may add significant overhead. |
| `lenient?` | `boolean` | If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored.
This parameter can be used only when the `q` query string parameter is specified. |
| `max_concurrent_shard_requests?` | [`integer`](integer.md) | The number of concurrent shard requests per node that the search runs concurrently.
This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests. |
| `preference?` | `string` | The nodes and shards used for the search.
By default, Elasticsearch selects from eligible nodes and shards using adaptive replica selection, accounting for allocation awareness.
Valid values are:

* `_only_local` to run the search only on shards on the local node.
* `_local` to, if possible, run the search on shards on the local node, or if not, select shards using the default method.
* `_only_nodes:<node-id>,<node-id>` to run the search on only the specified nodes IDs. If suitable shards exist on more than one selected node, use shards on those nodes using the default method. If none of the specified nodes are available, select shards from any available node using the default method.
* `_prefer_nodes:<node-id>,<node-id>` to if possible, run the search on the specified nodes IDs. If not, select shards using the default method.
* `_shards:<shard>,<shard>` to run the search only on the specified shards. You can combine this value with other `preference` values. However, the `_shards` value must come first. For example: `_shards:2,3|_local`.
* `<custom-string>` (any string that does not start with `_`) to route searches with the same `<custom-string>` to the same shards in the same order. |
| `pre_filter_shard_size?` | [`long`](long.md) | A threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold.
This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on its rewrite method (if date filters are mandatory to match but the shard bounds and the query are disjoint).
When unspecified, the pre-filter phase is executed if any of these conditions is met:

* The request targets more than 128 shards.
* The request targets one or more read-only index.
* The primary sort of the query targets an indexed field. |
| `request_cache?` | `boolean` | If `true`, the caching of search results is enabled for requests where `size` is `0`.
It defaults to index level settings. |
| `routing?` | [`Routing`](Routing.md) | A custom value that is used to route operations to a specific shard. |
| `scroll?` | [`Duration`](Duration.md) | The period to retain the search context for scrolling.
By default, this value cannot exceed `1d` (24 hours).
You can change this limit by using the `search.max_keep_alive` cluster-level setting. |
| `search_type?` | [`SearchType`](SearchType.md) | Indicates how distributed term frequencies are calculated for relevance scoring. |
| `suggest_field?` | [`Field`](Field.md) | The field to use for suggestions. |
| `suggest_mode?` | [`SuggestMode`](SuggestMode.md) | The suggest mode.
This parameter can be used only when the `suggest_field` and `suggest_text` query string parameters are specified. |
| `suggest_size?` | [`long`](long.md) | The number of suggestions to return.
This parameter can be used only when the `suggest_field` and `suggest_text` query string parameters are specified. |
| `suggest_text?` | `string` | The source text for which the suggestions should be returned.
This parameter can be used only when the `suggest_field` and `suggest_text` query string parameters are specified. |
| `typed_keys?` | `boolean` | If `true`, aggregation and suggester names are be prefixed by their respective types in the response. |
| `rest_total_hits_as_int?` | `boolean` | Indicates whether `hits.total` should be rendered as an integer or an object in the rest search response. |
| `_source_excludes?` | [`Fields`](Fields.md) | A comma-separated list of source fields to exclude from the response.
You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter.
If the `_source` parameter is `false`, this parameter is ignored. |
| `_source_exclude_vectors?` | `boolean` | Whether vectors should be excluded from _source |
| `_source_includes?` | [`Fields`](Fields.md) | A comma-separated list of source fields to include in the response.
If this parameter is specified, only these source fields are returned.
You can exclude fields from this subset using the `_source_excludes` query parameter.
If the `_source` parameter is `false`, this parameter is ignored. |
| `q?` | `string` | A query in the Lucene query string syntax.
Query parameter searches do not support the full Elasticsearch Query DSL but are handy for testing.

IMPORTANT: This parameter overrides the query parameter in the request body.
If both parameters are specified, documents matching the query request body parameter are not returned. |
| `force_synthetic_source?` | `boolean` | Should this request force synthetic _source?
Use this to test if the mapping supports synthetic _source and to get a sense of the worst case performance.
Fetches with this enabled will be slower the enabling synthetic source natively in the index. |
| `aggregations?` | `Record<string, AggregationsAggregationContainer>` | Defines the aggregations that are run as part of the search request. |
| `aggs?` | `Record<string, AggregationsAggregationContainer>` | Defines the aggregations that are run as part of the search request. |
| `collapse?` | [`SearchFieldCollapse`](SearchFieldCollapse.md) | Collapses search results the values of the specified field. |
| `explain?` | `boolean` | If `true`, the request returns detailed information about score computation as part of a hit. |
| `ext?` | `Record<string, any>` | Configuration of search extensions defined by Elasticsearch plugins. |
| `from?` | [`integer`](integer.md) | The starting document offset, which must be non-negative.
By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters.
To page through more hits, use the `search_after` parameter. |
| `highlight?` | [`SearchHighlight`](SearchHighlight.md) | Specifies the highlighter to use for retrieving highlighted snippets from one or more fields in your search results. |
| `track_total_hits?` | [`SearchTrackHits`](SearchTrackHits.md) | Number of hits matching the query to count accurately.
If `true`, the exact number of hits is returned at the cost of some performance.
If `false`, the  response does not include the total number of hits matching the query. |
| `indices_boost?` | `Partial<Record<IndexName, double>>`[] | Boost the `_score` of documents from specified indices.
The boost value is the factor by which scores are multiplied.
A boost value greater than `1.0` increases the score.
A boost value between `0` and `1.0` decreases the score. |
| `docvalue_fields?` | `(QueryDslFieldAndFormat | Field)`[] | An array of wildcard (`*`) field patterns.
The request returns doc values for field names matching these patterns in the `hits.fields` property of the response. |
| `knn?` | `KnnSearch | KnnSearch`[] | The approximate kNN search to run. |
| `rank?` | [`RankContainer`](RankContainer.md) | The Reciprocal Rank Fusion (RRF) to use. |
| `min_score?` | [`double`](double.md) | The minimum `_score` for matching documents.
Documents with a lower `_score` are not included in search results and results collected by aggregations. |
| `post_filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Use the `post_filter` parameter to filter search results.
The search hits are filtered after the aggregations are calculated.
A post filter has no impact on the aggregation results. |
| `profile?` | `boolean` | Set to `true` to return detailed timing information about the execution of individual components in a search request.
NOTE: This is a debugging tool and adds significant overhead to search execution. |
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | The search definition using the Query DSL. |
| `rescore?` | `SearchRescore | SearchRescore`[] | Can be used to improve precision by reordering just the top (for example 100 - 500) documents returned by the `query` and `post_filter` phases. |
| `retriever?` | [`RetrieverContainer`](RetrieverContainer.md) | A retriever is a specification to describe top documents returned from a search.
A retriever replaces other elements of the search API that also return top documents such as `query` and `knn`. |
| `script_fields?` | `Record<string, ScriptField>` | Retrieve a script evaluation (based on different fields) for each hit. |
| `search_after?` | [`SortResults`](SortResults.md) | Used to retrieve the next page of hits using a set of sort values from the previous page. |
| `size?` | [`integer`](integer.md) | The number of hits to return, which must not be negative.
By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters.
To page through more hits, use the `search_after` property. |
| `slice?` | [`SlicedScroll`](SlicedScroll.md) | Split a scrolled search into multiple slices that can be consumed independently. |
| `sort?` | [`Sort`](Sort.md) | A comma-separated list of <field>:<direction> pairs. |
| `_source?` | [`SearchSourceConfig`](SearchSourceConfig.md) | The source fields that are returned for matching documents.
These fields are returned in the `hits._source` property of the search response.
If the `stored_fields` property is specified, the `_source` property defaults to `false`.
Otherwise, it defaults to `true`. |
| `fields?` | `(QueryDslFieldAndFormat | Field)`[] | An array of wildcard (`*`) field patterns.
The request returns values for field names matching these patterns in the `hits.fields` property of the response. |
| `suggest?` | [`SearchSuggester`](SearchSuggester.md) | Defines a suggester that provides similar looking terms based on a provided text. |
| `terminate_after?` | [`long`](long.md) | The maximum number of documents to collect for each shard.
If a query reaches this limit, Elasticsearch terminates the query early.
Elasticsearch collects documents before sorting.

IMPORTANT: Use with caution.
Elasticsearch applies this property to each shard handling the request.
When possible, let Elasticsearch perform early termination automatically.
Avoid specifying this property for requests that target data streams with backing indices across multiple data tiers.

If set to `0` (default), the query does not terminate early. |
| `timeout?` | `string` | The period of time to wait for a response from each shard.
If no response is received before the timeout expires, the request fails and returns an error.
Defaults to no timeout. |
| `track_scores?` | `boolean` | If `true`, calculate and return document scores, even if the scores are not used for sorting. |
| `version?` | `boolean` | If `true`, the request returns the document version as part of a hit. |
| `seq_no_primary_term?` | `boolean` | If `true`, the request returns sequence number and primary term of the last modification of each hit. |
| `stored_fields?` | [`Fields`](Fields.md) | A comma-separated list of stored fields to return as part of a hit.
If no fields are specified, no stored fields are included in the response.
If this field is specified, the `_source` property defaults to `false`.
You can pass `_source: true` to return both source fields and stored fields in the search response. |
| `pit?` | [`SearchPointInTimeReference`](SearchPointInTimeReference.md) | Limit the search to a point in time (PIT).
If you provide a PIT, you cannot specify an `<index>` in the request path. |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | One or more runtime fields in the search request.
These fields take precedence over mapped fields with the same name. |
| `stats?` | `string`[] | The stats groups to associate with the search.
Each group maintains a statistics aggregation for its associated searches.
You can retrieve these stats using the indices stats API. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target for the search using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `body?` | `string | { [key: string]: any } & { index?: never, allow_no_indices?: never, allow_partial_search_results?: never, analyzer?: never, analyze_wildcard?: never, batched_reduce_size?: never, ccs_minimize_roundtrips?: never, default_operator?: never, df?: never, expand_wildcards?: never, ignore_throttled?: never, ignore_unavailable?: never, include_named_queries_score?: never, lenient?: never, max_concurrent_shard_requests?: never, preference?: never, pre_filter_shard_size?: never, request_cache?: never, routing?: never, scroll?: never, search_type?: never, suggest_field?: never, suggest_mode?: never, suggest_size?: never, suggest_text?: never, typed_keys?: never, rest_total_hits_as_int?: never, _source_excludes?: never, _source_exclude_vectors?: never, _source_includes?: never, q?: never, force_synthetic_source?: never, aggregations?: never, aggs?: never, collapse?: never, explain?: never, ext?: never, from?: never, highlight?: never, track_total_hits?: never, indices_boost?: never, docvalue_fields?: never, knn?: never, rank?: never, min_score?: never, post_filter?: never, profile?: never, query?: never, rescore?: never, retriever?: never, script_fields?: never, search_after?: never, size?: never, slice?: never, sort?: never, _source?: never, fields?: never, suggest?: never, terminate_after?: never, timeout?: never, track_scores?: never, version?: never, seq_no_primary_term?: never, stored_fields?: never, pit?: never, runtime_mappings?: never, stats?: never, project_routing?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, allow_no_indices?: never, allow_partial_search_results?: never, analyzer?: never, analyze_wildcard?: never, batched_reduce_size?: never, ccs_minimize_roundtrips?: never, default_operator?: never, df?: never, expand_wildcards?: never, ignore_throttled?: never, ignore_unavailable?: never, include_named_queries_score?: never, lenient?: never, max_concurrent_shard_requests?: never, preference?: never, pre_filter_shard_size?: never, request_cache?: never, routing?: never, scroll?: never, search_type?: never, suggest_field?: never, suggest_mode?: never, suggest_size?: never, suggest_text?: never, typed_keys?: never, rest_total_hits_as_int?: never, _source_excludes?: never, _source_exclude_vectors?: never, _source_includes?: never, q?: never, force_synthetic_source?: never, aggregations?: never, aggs?: never, collapse?: never, explain?: never, ext?: never, from?: never, highlight?: never, track_total_hits?: never, indices_boost?: never, docvalue_fields?: never, knn?: never, rank?: never, min_score?: never, post_filter?: never, profile?: never, query?: never, rescore?: never, retriever?: never, script_fields?: never, search_after?: never, size?: never, slice?: never, sort?: never, _source?: never, fields?: never, suggest?: never, terminate_after?: never, timeout?: never, track_scores?: never, version?: never, seq_no_primary_term?: never, stored_fields?: never, pit?: never, runtime_mappings?: never, stats?: never, project_routing?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
