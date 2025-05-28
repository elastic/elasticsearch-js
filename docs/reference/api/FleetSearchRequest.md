# `FleetSearchRequest` [interface-FleetSearchRequest]

| Name | Type | Description |
| - | - | - |
| `_source_excludes` | [Fields](./Fields.md) | &nbsp; |
| `_source_includes` | [Fields](./Fields.md) | &nbsp; |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | Indicates which source fields are returned for matching documents. These fields are returned in the hits._source property of the search response. |
| `aggregations` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | &nbsp; |
| `aggs` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | aggregations |
| `allow_no_indices` | boolean | &nbsp; |
| `allow_partial_search_results` | boolean | If true, returns partial results if there are shard request timeouts or shard failures. If false, returns an error with no partial results. Defaults to the configured cluster setting `search.default_allow_partial_results`, which is true by default. |
| `analyze_wildcard` | boolean | &nbsp; |
| `analyzer` | string | &nbsp; |
| `batched_reduce_size` | [long](./long.md) | &nbsp; |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; analyzer?: never; analyze_wildcard?: never; batched_reduce_size?: never; ccs_minimize_roundtrips?: never; default_operator?: never; df?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; lenient?: never; max_concurrent_shard_requests?: never; preference?: never; pre_filter_shard_size?: never; request_cache?: never; routing?: never; scroll?: never; search_type?: never; suggest_field?: never; suggest_mode?: never; suggest_size?: never; suggest_text?: never; typed_keys?: never; rest_total_hits_as_int?: never; _source_excludes?: never; _source_includes?: never; q?: never; wait_for_checkpoints?: never; allow_partial_search_results?: never; aggregations?: never; aggs?: never; collapse?: never; explain?: never; ext?: never; from?: never; highlight?: never; track_total_hits?: never; indices_boost?: never; docvalue_fields?: never; min_score?: never; post_filter?: never; profile?: never; query?: never; rescore?: never; script_fields?: never; search_after?: never; size?: never; slice?: never; sort?: never; _source?: never; fields?: never; suggest?: never; terminate_after?: never; timeout?: never; track_scores?: never; version?: never; seq_no_primary_term?: never; stored_fields?: never; pit?: never; runtime_mappings?: never; stats?: never; }) | All values in `body` will be added to the request body. |
| `ccs_minimize_roundtrips` | boolean | &nbsp; |
| `collapse` | [SearchFieldCollapse](./SearchFieldCollapse.md) | &nbsp; |
| `default_operator` | [QueryDslOperator](./QueryDslOperator.md) | &nbsp; |
| `df` | string | &nbsp; |
| `docvalue_fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | Array of wildcard (*) patterns. The request returns doc values for field names matching these patterns in the hits.fields property of the response. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | &nbsp; |
| `explain` | boolean | If true, returns detailed information about score computation as part of a hit. |
| `ext` | Record<string, any> | Configuration of search extensions defined by Elasticsearch plugins. |
| `fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | Array of wildcard (*) patterns. The request returns values for field names matching these patterns in the hits.fields property of the response. |
| `from` | [integer](./integer.md) | Starting document offset. By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the search_after parameter. |
| `highlight` | [SearchHighlight](./SearchHighlight.md) | &nbsp; |
| `ignore_throttled` | boolean | &nbsp; |
| `ignore_unavailable` | boolean | &nbsp; |
| `index` | [IndexName](./IndexName.md) | [IndexAlias](./IndexAlias.md) | A single target to search. If the target is an index alias, it must resolve to a single index. |
| `indices_boost` | [Partial](./Partial.md)<Record<[IndexName](./IndexName.md), [double](./double.md)>>[] | Boosts the _score of documents from specified indices. |
| `lenient` | boolean | &nbsp; |
| `max_concurrent_shard_requests` | [integer](./integer.md) | &nbsp; |
| `min_score` | [double](./double.md) | Minimum _score for matching documents. Documents with a lower _score are not included in search results and results collected by aggregations. |
| `pit` | [SearchPointInTimeReference](./SearchPointInTimeReference.md) | Limits the search to a point in time (PIT). If you provide a PIT, you cannot specify an in the request path. |
| `post_filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | &nbsp; |
| `pre_filter_shard_size` | [long](./long.md) | &nbsp; |
| `preference` | string | &nbsp; |
| `profile` | boolean | &nbsp; |
| `q` | string | &nbsp; |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Defines the search definition using the Query DSL. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; analyzer?: never; analyze_wildcard?: never; batched_reduce_size?: never; ccs_minimize_roundtrips?: never; default_operator?: never; df?: never; expand_wildcards?: never; ignore_throttled?: never; ignore_unavailable?: never; lenient?: never; max_concurrent_shard_requests?: never; preference?: never; pre_filter_shard_size?: never; request_cache?: never; routing?: never; scroll?: never; search_type?: never; suggest_field?: never; suggest_mode?: never; suggest_size?: never; suggest_text?: never; typed_keys?: never; rest_total_hits_as_int?: never; _source_excludes?: never; _source_includes?: never; q?: never; wait_for_checkpoints?: never; allow_partial_search_results?: never; aggregations?: never; aggs?: never; collapse?: never; explain?: never; ext?: never; from?: never; highlight?: never; track_total_hits?: never; indices_boost?: never; docvalue_fields?: never; min_score?: never; post_filter?: never; profile?: never; query?: never; rescore?: never; script_fields?: never; search_after?: never; size?: never; slice?: never; sort?: never; _source?: never; fields?: never; suggest?: never; terminate_after?: never; timeout?: never; track_scores?: never; version?: never; seq_no_primary_term?: never; stored_fields?: never; pit?: never; runtime_mappings?: never; stats?: never; } | All values in `querystring` will be added to the request querystring. |
| `request_cache` | boolean | &nbsp; |
| `rescore` | [SearchRescore](./SearchRescore.md) | [SearchRescore](./SearchRescore.md)[] | &nbsp; |
| `rest_total_hits_as_int` | boolean | &nbsp; |
| `routing` | [Routing](./Routing.md) | &nbsp; |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | Defines one or more runtime fields in the search request. These fields take precedence over mapped fields with the same name. |
| `script_fields` | Record<string, [ScriptField](./ScriptField.md)> | Retrieve a script evaluation (based on different fields) for each hit. |
| `scroll` | [Duration](./Duration.md) | &nbsp; |
| `search_after` | [SortResults](./SortResults.md) | &nbsp; |
| `search_type` | [SearchType](./SearchType.md) | &nbsp; |
| `seq_no_primary_term` | boolean | If true, returns sequence number and primary term of the last modification of each hit. See Optimistic concurrency control. |
| `size` | [integer](./integer.md) | The number of hits to return. By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the search_after parameter. |
| `slice` | [SlicedScroll](./SlicedScroll.md) | &nbsp; |
| `sort` | [Sort](./Sort.md) | &nbsp; |
| `stats` | string[] | Stats groups to associate with the search. Each group maintains a statistics aggregation for its associated searches. You can retrieve these stats using the indices stats API. |
| `stored_fields` | [Fields](./Fields.md) | List of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the _source parameter defaults to false. You can pass _source: true to return both source fields and stored fields in the search response. |
| `suggest_field` | [Field](./Field.md) | Specifies which field to use for suggestions. |
| `suggest_mode` | [SuggestMode](./SuggestMode.md) | &nbsp; |
| `suggest_size` | [long](./long.md) | &nbsp; |
| `suggest_text` | string | The source text for which the suggestions should be returned. |
| `suggest` | [SearchSuggester](./SearchSuggester.md) | &nbsp; |
| `terminate_after` | [long](./long.md) | Maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. Defaults to 0, which does not terminate query execution early. |
| `timeout` | string | Specifies the period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout. |
| `track_scores` | boolean | If true, calculate and return document scores, even if the scores are not used for sorting. |
| `track_total_hits` | [SearchTrackHits](./SearchTrackHits.md) | Number of hits matching the query to count accurately. If true, the exact number of hits is returned at the cost of some performance. If false, the response does not include the total number of hits matching the query. Defaults to 10,000 hits. |
| `typed_keys` | boolean | &nbsp; |
| `version` | boolean | If true, returns document version as part of a hit. |
| `wait_for_checkpoints` | [FleetCheckpoint](./FleetCheckpoint.md)[] | A comma separated list of checkpoints. When configured, the search API will only be executed on a shard after the relevant checkpoint has become visible for search. Defaults to an empty list which will cause Elasticsearch to immediately execute the search. |
