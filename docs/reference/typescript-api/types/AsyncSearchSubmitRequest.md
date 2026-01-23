# AsyncSearchSubmitRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices |
| `wait_for_completion_timeout?` | [`Duration`](Duration.md) | Blocks and waits until the search is completed up to a certain timeout.
When the async search completes within the timeout, the response won’t include the ID as the results are not stored in the cluster. |
| `keep_alive?` | [`Duration`](Duration.md) | Specifies how long the async search needs to be available.
Ongoing async searches and any saved search results are deleted after this period. |
| `keep_on_completion?` | `boolean` | If `true`, results are stored for later retrieval when the search completes within the `wait_for_completion_timeout`. |
| `allow_no_indices?` | `boolean` | Whether to ignore if a wildcard indices expression resolves into no concrete indices.
(This includes `_all` string or when no indices have been specified) |
| `allow_partial_search_results?` | `boolean` | Indicate if an error should be returned if there is a partial search failure or timeout |
| `analyzer?` | `string` | The analyzer to use for the query string |
| `analyze_wildcard?` | `boolean` | Specify whether wildcard and prefix queries should be analyzed |
| `batched_reduce_size?` | [`long`](long.md) | Affects how often partial results become available, which happens whenever shard results are reduced.
A partial reduction is performed every time the coordinating node has received a certain number of new shard responses (5 by default). |
| `ccs_minimize_roundtrips?` | `boolean` | The default value is the only supported value. |
| `default_operator?` | [`QueryDslOperator`](QueryDslOperator.md) | The default operator for query string query (AND or OR) |
| `df?` | `string` | The field to use as default where no field prefix is given in the query string |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both |
| `ignore_throttled?` | `boolean` | Whether specified concrete, expanded or aliased indices should be ignored when throttled |
| `ignore_unavailable?` | `boolean` | Whether specified concrete indices should be ignored when unavailable (missing or closed) |
| `lenient?` | `boolean` | Specify whether format-based query failures (such as providing text to a numeric field) should be ignored |
| `max_concurrent_shard_requests?` | [`integer`](integer.md) | The number of concurrent shard requests per node this search executes concurrently.
This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests |
| `preference?` | `string` | Specify the node or shard the operation should be performed on |
| `request_cache?` | `boolean` | Specify if request cache should be used for this request or not, defaults to true |
| `routing?` | [`Routing`](Routing.md) | A comma-separated list of specific routing values |
| `search_type?` | [`SearchType`](SearchType.md) | Search operation type |
| `suggest_field?` | [`Field`](Field.md) | Specifies which field to use for suggestions. |
| `suggest_mode?` | [`SuggestMode`](SuggestMode.md) | Specify suggest mode |
| `suggest_size?` | [`long`](long.md) | How many suggestions to return in response |
| `suggest_text?` | `string` | The source text for which the suggestions should be returned. |
| `typed_keys?` | `boolean` | Specify whether aggregation and suggester names should be prefixed by their respective types in the response |
| `rest_total_hits_as_int?` | `boolean` | Indicates whether hits.total should be rendered as an integer or an object in the rest search response |
| `_source_excludes?` | [`Fields`](Fields.md) | A list of fields to exclude from the returned _source field |
| `_source_includes?` | [`Fields`](Fields.md) | A list of fields to extract and return from the _source field |
| `q?` | `string` | Query in the Lucene query string syntax |
| `aggregations?` | `Record<string, AggregationsAggregationContainer>` | - |
| `aggs?` | `Record<string, AggregationsAggregationContainer>` | - |
| `collapse?` | [`SearchFieldCollapse`](SearchFieldCollapse.md) | - |
| `explain?` | `boolean` | If true, returns detailed information about score computation as part of a hit. |
| `ext?` | `Record<string, any>` | Configuration of search extensions defined by Elasticsearch plugins. |
| `from?` | [`integer`](integer.md) | Starting document offset. By default, you cannot page through more than 10,000
hits using the from and size parameters. To page through more hits, use the
search_after parameter. |
| `highlight?` | [`SearchHighlight`](SearchHighlight.md) | - |
| `track_total_hits?` | [`SearchTrackHits`](SearchTrackHits.md) | Number of hits matching the query to count accurately. If true, the exact
number of hits is returned at the cost of some performance. If false, the
response does not include the total number of hits matching the query.
Defaults to 10,000 hits. |
| `indices_boost?` | `Partial<Record<IndexName, double>>[]` | Boosts the _score of documents from specified indices. |
| `docvalue_fields?` | `(QueryDslFieldAndFormat | Field)[]` | Array of wildcard (*) patterns. The request returns doc values for field
names matching these patterns in the hits.fields property of the response. |
| `knn?` | `KnnSearch | KnnSearch[]` | Defines the approximate kNN search to run. |
| `min_score?` | [`double`](double.md) | Minimum _score for matching documents. Documents with a lower _score are
not included in search results and results collected by aggregations. |
| `post_filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | - |
| `profile?` | `boolean` | - |
| `query?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Defines the search definition using the Query DSL. |
| `rescore?` | `SearchRescore | SearchRescore[]` | - |
| `script_fields?` | `Record<string, ScriptField>` | Retrieve a script evaluation (based on different fields) for each hit. |
| `search_after?` | [`SortResults`](SortResults.md) | - |
| `size?` | [`integer`](integer.md) | The number of hits to return. By default, you cannot page through more
than 10,000 hits using the from and size parameters. To page through more
hits, use the search_after parameter. |
| `slice?` | [`SlicedScroll`](SlicedScroll.md) | - |
| `sort?` | [`Sort`](Sort.md) | - |
| `_source?` | [`SearchSourceConfig`](SearchSourceConfig.md) | Indicates which source fields are returned for matching documents. These
fields are returned in the hits._source property of the search response. |
| `fields?` | `(QueryDslFieldAndFormat | Field)[]` | Array of wildcard (*) patterns. The request returns values for field names
matching these patterns in the hits.fields property of the response. |
| `suggest?` | [`SearchSuggester`](SearchSuggester.md) | - |
| `terminate_after?` | [`long`](long.md) | Maximum number of documents to collect for each shard. If a query reaches this
limit, Elasticsearch terminates the query early. Elasticsearch collects documents
before sorting. Defaults to 0, which does not terminate query execution early. |
| `timeout?` | `string` | Specifies the period of time to wait for a response from each shard. If no response
is received before the timeout expires, the request fails and returns an error.
Defaults to no timeout. |
| `track_scores?` | `boolean` | If true, calculate and return document scores, even if the scores are not used for sorting. |
| `version?` | `boolean` | If true, returns document version as part of a hit. |
| `seq_no_primary_term?` | `boolean` | If true, returns sequence number and primary term of the last modification
of each hit. See Optimistic concurrency control. |
| `stored_fields?` | [`Fields`](Fields.md) | List of stored fields to return as part of a hit. If no fields are specified,
no stored fields are included in the response. If this field is specified, the _source
parameter defaults to false. You can pass _source: true to return both source fields
and stored fields in the search response. |
| `pit?` | [`SearchPointInTimeReference`](SearchPointInTimeReference.md) | Limits the search to a point in time (PIT). If you provide a PIT, you
cannot specify an <index> in the request path. |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | Defines one or more runtime fields in the search request. These fields take
precedence over mapped fields with the same name. |
| `stats?` | `string[]` | Stats groups to associate with the search. Each group maintains a statistics
aggregation for its associated searches. You can retrieve these stats using
the indices stats API. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target for the search using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `body?` | `string | { [key: string]: any } & { index?: never, wait_for_completion_timeout?: never, keep_alive?: never, keep_on_completion?: never, allow_no_indices?: never, allow_partial_search_results?: never, analyzer?: never, analyze_wildcard?: never, batched_reduce_size?: never, ccs_minimize_roundtrips?: never, default_operator?: never, df?: never, expand_wildcards?: never, ignore_throttled?: never, ignore_unavailable?: never, lenient?: never, max_concurrent_shard_requests?: never, preference?: never, request_cache?: never, routing?: never, search_type?: never, suggest_field?: never, suggest_mode?: never, suggest_size?: never, suggest_text?: never, typed_keys?: never, rest_total_hits_as_int?: never, _source_excludes?: never, _source_includes?: never, q?: never, aggregations?: never, aggs?: never, collapse?: never, explain?: never, ext?: never, from?: never, highlight?: never, track_total_hits?: never, indices_boost?: never, docvalue_fields?: never, knn?: never, min_score?: never, post_filter?: never, profile?: never, query?: never, rescore?: never, script_fields?: never, search_after?: never, size?: never, slice?: never, sort?: never, _source?: never, fields?: never, suggest?: never, terminate_after?: never, timeout?: never, track_scores?: never, version?: never, seq_no_primary_term?: never, stored_fields?: never, pit?: never, runtime_mappings?: never, stats?: never, project_routing?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, wait_for_completion_timeout?: never, keep_alive?: never, keep_on_completion?: never, allow_no_indices?: never, allow_partial_search_results?: never, analyzer?: never, analyze_wildcard?: never, batched_reduce_size?: never, ccs_minimize_roundtrips?: never, default_operator?: never, df?: never, expand_wildcards?: never, ignore_throttled?: never, ignore_unavailable?: never, lenient?: never, max_concurrent_shard_requests?: never, preference?: never, request_cache?: never, routing?: never, search_type?: never, suggest_field?: never, suggest_mode?: never, suggest_size?: never, suggest_text?: never, typed_keys?: never, rest_total_hits_as_int?: never, _source_excludes?: never, _source_includes?: never, q?: never, aggregations?: never, aggs?: never, collapse?: never, explain?: never, ext?: never, from?: never, highlight?: never, track_total_hits?: never, indices_boost?: never, docvalue_fields?: never, knn?: never, min_score?: never, post_filter?: never, profile?: never, query?: never, rescore?: never, script_fields?: never, search_after?: never, size?: never, slice?: never, sort?: never, _source?: never, fields?: never, suggest?: never, terminate_after?: never, timeout?: never, track_scores?: never, version?: never, seq_no_primary_term?: never, stored_fields?: never, pit?: never, runtime_mappings?: never, stats?: never, project_routing?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
