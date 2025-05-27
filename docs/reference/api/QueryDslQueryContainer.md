## Interface `QueryDslQueryContainer`

| Name | Type | Description |
| - | - | - |
| `bool` | [QueryDslBoolQuery](./QueryDslBoolQuery.md) | matches documents matching boolean combinations of other queries. |
| `boosting` | [QueryDslBoostingQuery](./QueryDslBoostingQuery.md) | Returns documents matching a `positive` query while reducing the relevance score of documents that also match a `negative` query. |
| `combined_fields` | [QueryDslCombinedFieldsQuery](./QueryDslCombinedFieldsQuery.md) | The `combined_fields` query supports searching multiple text fields as if their contents had been indexed into one combined field. |
| `common` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslCommonTermsQuery](./QueryDslCommonTermsQuery.md) | string>> | &nbsp; |
| `constant_score` | [QueryDslConstantScoreQuery](./QueryDslConstantScoreQuery.md) | Wraps a filter query and returns every matching document with a relevance score equal to the `boost` parameter value. |
| `dis_max` | [QueryDslDisMaxQuery](./QueryDslDisMaxQuery.md) | Returns documents matching one or more wrapped queries, called query clauses or clauses. If a returned document matches multiple query clauses, the `dis_max` query assigns the document the highest relevance score from any matching clause, plus a tie breaking increment for any additional matching subqueries. |
| `distance_feature` | [QueryDslDistanceFeatureQuery](./QueryDslDistanceFeatureQuery.md) | Boosts the relevance score of documents closer to a provided origin date or point. For example, you can use this query to give more weight to documents closer to a certain date or location. |
| `exists` | [QueryDslExistsQuery](./QueryDslExistsQuery.md) | Returns documents that contain an indexed value for a field. |
| `function_score` | [QueryDslFunctionScoreQuery](./QueryDslFunctionScoreQuery.md) | [QueryDslFunctionScoreContainer](./QueryDslFunctionScoreContainer.md)[] | The `function_score` enables you to modify the score of documents that are retrieved by a query. |
| `fuzzy` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslFuzzyQuery](./QueryDslFuzzyQuery.md) | string | [double](./double.md) | boolean>> | Returns documents that contain terms similar to the search term, as measured by a Levenshtein edit distance. |
| `geo_bounding_box` | [QueryDslGeoBoundingBoxQuery](./QueryDslGeoBoundingBoxQuery.md) | Matches geo_point and geo_shape values that intersect a bounding box. |
| `geo_distance` | [QueryDslGeoDistanceQuery](./QueryDslGeoDistanceQuery.md) | Matches `geo_point` and `geo_shape` values within a given distance of a geopoint. |
| `geo_grid` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslGeoGridQuery](./QueryDslGeoGridQuery.md)>> | Matches `geo_point` and `geo_shape` values that intersect a grid cell from a GeoGrid aggregation. |
| `geo_polygon` | [QueryDslGeoPolygonQuery](./QueryDslGeoPolygonQuery.md) | &nbsp; |
| `geo_shape` | [QueryDslGeoShapeQuery](./QueryDslGeoShapeQuery.md) | Filter documents indexed using either the `geo_shape` or the `geo_point` type. |
| `has_child` | [QueryDslHasChildQuery](./QueryDslHasChildQuery.md) | Returns parent documents whose joined child documents match a provided query. |
| `has_parent` | [QueryDslHasParentQuery](./QueryDslHasParentQuery.md) | Returns child documents whose joined parent document matches a provided query. |
| `ids` | [QueryDslIdsQuery](./QueryDslIdsQuery.md) | Returns documents based on their IDs. This query uses document IDs stored in the `_id` field. |
| `intervals` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslIntervalsQuery](./QueryDslIntervalsQuery.md)>> | Returns documents based on the order and proximity of matching terms. |
| `knn` | [KnnQuery](./KnnQuery.md) | Finds the k nearest vectors to a query vector, as measured by a similarity metric. knn query finds nearest vectors through approximate search on indexed dense_vectors. |
| `match_all` | [QueryDslMatchAllQuery](./QueryDslMatchAllQuery.md) | Matches all documents, giving them all a `_score` of 1.0. |
| `match_bool_prefix` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslMatchBoolPrefixQuery](./QueryDslMatchBoolPrefixQuery.md) | string>> | Analyzes its input and constructs a `bool` query from the terms. Each term except the last is used in a `term` query. The last term is used in a prefix query. |
| `match_none` | [QueryDslMatchNoneQuery](./QueryDslMatchNoneQuery.md) | Matches no documents. |
| `match_phrase_prefix` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslMatchPhrasePrefixQuery](./QueryDslMatchPhrasePrefixQuery.md) | string>> | Returns documents that contain the words of a provided text, in the same order as provided. The last term of the provided text is treated as a prefix, matching any words that begin with that term. |
| `match_phrase` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslMatchPhraseQuery](./QueryDslMatchPhraseQuery.md) | string>> | Analyzes the text and creates a phrase query out of the analyzed text. |
| `match` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslMatchQuery](./QueryDslMatchQuery.md) | string | [float](./float.md) | boolean>> | Returns documents that match a provided text, number, date or boolean value. The provided text is analyzed before matching. |
| `more_like_this` | [QueryDslMoreLikeThisQuery](./QueryDslMoreLikeThisQuery.md) | Returns documents that are "like" a given set of documents. |
| `multi_match` | [QueryDslMultiMatchQuery](./QueryDslMultiMatchQuery.md) | Enables you to search for a provided text, number, date or boolean value across multiple fields. The provided text is analyzed before matching. |
| `nested` | [QueryDslNestedQuery](./QueryDslNestedQuery.md) | Wraps another query to search nested fields. If an object matches the search, the nested query returns the root parent document. |
| `parent_id` | [QueryDslParentIdQuery](./QueryDslParentIdQuery.md) | Returns child documents joined to a specific parent document. |
| `percolate` | [QueryDslPercolateQuery](./QueryDslPercolateQuery.md) | Matches queries stored in an index. |
| `pinned` | [QueryDslPinnedQuery](./QueryDslPinnedQuery.md) | Promotes selected documents to rank higher than those matching a given query. |
| `prefix` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslPrefixQuery](./QueryDslPrefixQuery.md) | string>> | Returns documents that contain a specific prefix in a provided field. |
| `query_string` | [QueryDslQueryStringQuery](./QueryDslQueryStringQuery.md) | Returns documents based on a provided query string, using a parser with a strict syntax. |
| `range` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslRangeQuery](./QueryDslRangeQuery.md)>> | Returns documents that contain terms within a provided range. |
| `rank_feature` | [QueryDslRankFeatureQuery](./QueryDslRankFeatureQuery.md) | Boosts the relevance score of documents based on the numeric value of a `rank_feature` or `rank_features` field. |
| `regexp` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslRegexpQuery](./QueryDslRegexpQuery.md) | string>> | Returns documents that contain terms matching a regular expression. |
| `rule` | [QueryDslRuleQuery](./QueryDslRuleQuery.md) | &nbsp; |
| `script_score` | [QueryDslScriptScoreQuery](./QueryDslScriptScoreQuery.md) | Uses a script to provide a custom score for returned documents. |
| `script` | [QueryDslScriptQuery](./QueryDslScriptQuery.md) | Filters documents based on a provided script. The script query is typically used in a filter context. |
| `semantic` | [QueryDslSemanticQuery](./QueryDslSemanticQuery.md) | A semantic query to semantic_text field types |
| `shape` | [QueryDslShapeQuery](./QueryDslShapeQuery.md) | Queries documents that contain fields indexed using the `shape` type. |
| `simple_query_string` | [QueryDslSimpleQueryStringQuery](./QueryDslSimpleQueryStringQuery.md) | Returns documents based on a provided query string, using a parser with a limited but fault-tolerant syntax. |
| `span_containing` | [QueryDslSpanContainingQuery](./QueryDslSpanContainingQuery.md) | Returns matches which enclose another span query. |
| `span_field_masking` | [QueryDslSpanFieldMaskingQuery](./QueryDslSpanFieldMaskingQuery.md) | Wrapper to allow span queries to participate in composite single-field span queries by _lying_ about their search field. |
| `span_first` | [QueryDslSpanFirstQuery](./QueryDslSpanFirstQuery.md) | Matches spans near the beginning of a field. |
| `span_multi` | [QueryDslSpanMultiTermQuery](./QueryDslSpanMultiTermQuery.md) | Allows you to wrap a multi term query (one of `wildcard`, `fuzzy`, `prefix`, `range`, or `regexp` query) as a `span` query, so it can be nested. |
| `span_near` | [QueryDslSpanNearQuery](./QueryDslSpanNearQuery.md) | Matches spans which are near one another. You can specify `slop`, the maximum number of intervening unmatched positions, as well as whether matches are required to be in-order. |
| `span_not` | [QueryDslSpanNotQuery](./QueryDslSpanNotQuery.md) | Removes matches which overlap with another span query or which are within x tokens before (controlled by the parameter `pre`) or y tokens after (controlled by the parameter `post`) another span query. |
| `span_or` | [QueryDslSpanOrQuery](./QueryDslSpanOrQuery.md) | Matches the union of its span clauses. |
| `span_term` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslSpanTermQuery](./QueryDslSpanTermQuery.md) | [FieldValue](./FieldValue.md)>> | Matches spans containing a term. |
| `span_within` | [QueryDslSpanWithinQuery](./QueryDslSpanWithinQuery.md) | Returns matches which are enclosed inside another span query. |
| `sparse_vector` | [QueryDslSparseVectorQuery](./QueryDslSparseVectorQuery.md) | Using input query vectors or a natural language processing model to convert a query into a list of token-weight pairs, queries against a sparse vector field. |
| `term` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslTermQuery](./QueryDslTermQuery.md) | [FieldValue](./FieldValue.md)>> | Returns documents that contain an exact term in a provided field. To return a document, the query term must exactly match the queried field's value, including whitespace and capitalization. |
| `terms_set` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslTermsSetQuery](./QueryDslTermsSetQuery.md)>> | Returns documents that contain a minimum number of exact terms in a provided field. To return a document, a required number of terms must exactly match the field values, including whitespace and capitalization. |
| `terms` | [QueryDslTermsQuery](./QueryDslTermsQuery.md) | Returns documents that contain one or more exact terms in a provided field. To return a document, one or more terms must exactly match a field value, including whitespace and capitalization. |
| `text_expansion` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslTextExpansionQuery](./QueryDslTextExpansionQuery.md)>> | Uses a natural language processing model to convert the query text into a list of token-weight pairs which are then used in a query against a sparse vector or rank features field. |
| `type` | [QueryDslTypeQuery](./QueryDslTypeQuery.md) | &nbsp; |
| `weighted_tokens` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslWeightedTokensQuery](./QueryDslWeightedTokensQuery.md)>> | Supports returning text_expansion query results by sending in precomputed tokens with the query. |
| `wildcard` | [Partial](./Partial.md)<Record<[Field](./Field.md), [QueryDslWildcardQuery](./QueryDslWildcardQuery.md) | string>> | Returns documents that contain terms matching a wildcard pattern. |
| `wrapper` | [QueryDslWrapperQuery](./QueryDslWrapperQuery.md) | A query that accepts any other query as base64 encoded string. |
