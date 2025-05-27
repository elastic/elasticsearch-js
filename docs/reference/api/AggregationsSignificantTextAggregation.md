## Interface `AggregationsSignificantTextAggregation`

| Name | Type | Description |
| - | - | - |
| `background_filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | A background filter that can be used to focus in on significant terms within a narrower context, instead of the entire index. |
| `chi_square` | [AggregationsChiSquareHeuristic](./AggregationsChiSquareHeuristic.md) | Use Chi square, as described in "Information Retrieval", Manning et al., Chapter 13.5.2, as the significance score. |
| `exclude` | [AggregationsTermsExclude](./AggregationsTermsExclude.md) | Values to exclude. |
| `execution_hint` | [AggregationsTermsAggregationExecutionHint](./AggregationsTermsAggregationExecutionHint.md) | Determines whether the aggregation will use field values directly or global ordinals. |
| `field` | [Field](./Field.md) | The field from which to return significant text. |
| `filter_duplicate_text` | boolean | Whether to out duplicate text to deal with noisy data. |
| `gnd` | [AggregationsGoogleNormalizedDistanceHeuristic](./AggregationsGoogleNormalizedDistanceHeuristic.md) | Use Google normalized distance as described in "The Google Similarity Distance", Cilibrasi and Vitanyi, 2007, as the significance score. |
| `include` | [AggregationsTermsInclude](./AggregationsTermsInclude.md) | Values to include. |
| `jlh` | [EmptyObject](./EmptyObject.md) | Use JLH score as the significance score. |
| `min_doc_count` | [long](./long.md) | Only return values that are found in more than `min_doc_count` hits. |
| `mutual_information` | [AggregationsMutualInformationHeuristic](./AggregationsMutualInformationHeuristic.md) | Use mutual information as described in "Information Retrieval", Manning et al., Chapter 13.5.1, as the significance score. |
| `percentage` | [AggregationsPercentageScoreHeuristic](./AggregationsPercentageScoreHeuristic.md) | A simple calculation of the number of documents in the foreground sample with a term divided by the number of documents in the background with the term. |
| `script_heuristic` | [AggregationsScriptedHeuristic](./AggregationsScriptedHeuristic.md) | Customized score, implemented via a script. |
| `shard_min_doc_count` | [long](./long.md) | Regulates the certainty a shard has if the values should actually be added to the candidate list or not with respect to the min_doc_count. Values will only be considered if their local shard frequency within the set is higher than the `shard_min_doc_count`. |
| `shard_size` | [integer](./integer.md) | The number of candidate terms produced by each shard. By default, `shard_size` will be automatically estimated based on the number of shards and the `size` parameter. |
| `size` | [integer](./integer.md) | The number of buckets returned out of the overall terms list. |
| `source_fields` | [Fields](./Fields.md) | Overrides the JSON `_source` fields from which text will be analyzed. |
