## Interface `SearchSearchRequestBody`

| Name | Type | Description |
| - | - | - |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | The source fields that are returned for matching documents. These fields are returned in the `hits._source` property of the search response. If the `stored_fields` property is specified, the `_source` property defaults to `false`. Otherwise, it defaults to `true`. |
| `aggregations` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | Defines the aggregations that are run as part of the search request. |
| `aggs` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | Defines the aggregations that are run as part of the search request. aggregations |
| `collapse` | [SearchFieldCollapse](./SearchFieldCollapse.md) | Collapses search results the values of the specified field. |
| `docvalue_fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | An array of wildcard ( `*`) field patterns. The request returns doc values for field names matching these patterns in the `hits.fields` property of the response. |
| `explain` | boolean | If `true`, the request returns detailed information about score computation as part of a hit. |
| `ext` | Record<string, any> | Configuration of search extensions defined by Elasticsearch plugins. |
| `fields` | ([QueryDslFieldAndFormat](./QueryDslFieldAndFormat.md) | [Field](./Field.md))[] | An array of wildcard ( `*`) field patterns. The request returns values for field names matching these patterns in the `hits.fields` property of the response. |
| `from` | [integer](./integer.md) | The starting document offset, which must be non-negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter. |
| `highlight` | [SearchHighlight](./SearchHighlight.md) | Specifies the highlighter to use for retrieving highlighted snippets from one or more fields in your search results. |
| `indices_boost` | [Partial](./Partial.md)<Record<[IndexName](./IndexName.md), [double](./double.md)>>[] | Boost the `_score` of documents from specified indices. The boost value is the factor by which scores are multiplied. A boost value greater than `1.0` increases the score. A boost value between `0` and `1.0` decreases the score. |
| `knn` | [KnnSearch](./KnnSearch.md) | [KnnSearch](./KnnSearch.md)[] | The approximate kNN search to run. |
| `min_score` | [double](./double.md) | The minimum `_score` for matching documents. Documents with a lower `_score` are not included in search results or results collected by aggregations. |
| `pit` | [SearchPointInTimeReference](./SearchPointInTimeReference.md) | Limit the search to a point in time (PIT). If you provide a PIT, you cannot specify an `<index>` in the request path. |
| `post_filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Use the `post_filter` parameter to filter search results. The search hits are filtered after the aggregations are calculated. A post filter has no impact on the aggregation results. |
| `profile` | boolean | Set to `true` to return detailed timing information about the execution of individual components in a search request. NOTE: This is a debugging tool and adds significant overhead to search execution. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | The search definition using the Query DSL. |
| `rank` | [RankContainer](./RankContainer.md) | The Reciprocal Rank Fusion (RRF) to use. |
| `rescore` | [SearchRescore](./SearchRescore.md) | [SearchRescore](./SearchRescore.md)[] | Can be used to improve precision by reordering just the top (for example 100 - 500) documents returned by the `query` and `post_filter` phases. |
| `retriever` | [RetrieverContainer](./RetrieverContainer.md) | A retriever is a specification to describe top documents returned from a search. A retriever replaces other elements of the search API that also return top documents such as `query` and `knn`. |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | One or more runtime fields in the search request. These fields take precedence over mapped fields with the same name. |
| `script_fields` | Record<string, [ScriptField](./ScriptField.md)> | Retrieve a script evaluation (based on different fields) for each hit. |
| `search_after` | [SortResults](./SortResults.md) | Used to retrieve the next page of hits using a set of sort values from the previous page. |
| `seq_no_primary_term` | boolean | If `true`, the request returns sequence number and primary term of the last modification of each hit. |
| `size` | [integer](./integer.md) | The number of hits to return, which must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` property. |
| `slice` | [SlicedScroll](./SlicedScroll.md) | Split a scrolled search into multiple slices that can be consumed independently. |
| `sort` | [Sort](./Sort.md) | A comma-separated list of : pairs. |
| `stats` | string[] | The stats groups to associate with the search. Each group maintains a statistics aggregation for its associated searches. You can retrieve these stats using the indices stats API. |
| `stored_fields` | [Fields](./Fields.md) | A comma-separated list of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the `_source` property defaults to `false`. You can pass `_source: true` to return both source fields and stored fields in the search response. |
| `suggest` | [SearchSuggester](./SearchSuggester.md) | Defines a suggester that provides similar looking terms based on a provided text. |
| `terminate_after` | [long](./long.md) | The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. IMPORTANT: Use with caution. Elasticsearch applies this property to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this property for requests that target data streams with backing indices across multiple data tiers. If set to `0` (default), the query does not terminate early. |
| `timeout` | string | The period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout. |
| `track_scores` | boolean | If `true`, calculate and return document scores, even if the scores are not used for sorting. |
| `track_total_hits` | [SearchTrackHits](./SearchTrackHits.md) | Number of hits matching the query to count accurately. If `true`, the exact number of hits is returned at the cost of some performance. If `false`, the response does not include the total number of hits matching the query. |
| `version` | boolean | If `true`, the request returns the document version as part of a hit. |
