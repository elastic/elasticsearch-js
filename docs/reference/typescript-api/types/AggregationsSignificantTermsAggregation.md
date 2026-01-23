# AggregationsSignificantTermsAggregation

## Interface

### Extends

- [`AggregationsBucketAggregationBase`](AggregationsBucketAggregationBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `background_filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | A background filter that can be used to focus in on significant terms within a narrower context, instead of the entire index. |
| `chi_square?` | [`AggregationsChiSquareHeuristic`](AggregationsChiSquareHeuristic.md) | Use Chi square, as described in "Information Retrieval", Manning et al., Chapter 13.5.2, as the significance score. |
| `exclude?` | [`AggregationsTermsExclude`](AggregationsTermsExclude.md) | Terms to exclude. |
| `execution_hint?` | [`AggregationsTermsAggregationExecutionHint`](AggregationsTermsAggregationExecutionHint.md) | Mechanism by which the aggregation should be executed: using field values directly or using global ordinals. |
| `field?` | [`Field`](Field.md) | The field from which to return significant terms. |
| `gnd?` | [`AggregationsGoogleNormalizedDistanceHeuristic`](AggregationsGoogleNormalizedDistanceHeuristic.md) | Use Google normalized distance as described in "The Google Similarity Distance", Cilibrasi and Vitanyi, 2007, as the significance score. |
| `include?` | [`AggregationsTermsInclude`](AggregationsTermsInclude.md) | Terms to include. |
| `jlh?` | [`EmptyObject`](EmptyObject.md) | Use JLH score as the significance score. |
| `min_doc_count?` | [`long`](long.md) | Only return terms that are found in more than `min_doc_count` hits. |
| `mutual_information?` | [`AggregationsMutualInformationHeuristic`](AggregationsMutualInformationHeuristic.md) | Use mutual information as described in "Information Retrieval", Manning et al., Chapter 13.5.1, as the significance score. |
| `percentage?` | [`AggregationsPercentageScoreHeuristic`](AggregationsPercentageScoreHeuristic.md) | A simple calculation of the number of documents in the foreground sample with a term divided by the number of documents in the background with the term. |
| `script_heuristic?` | [`AggregationsScriptedHeuristic`](AggregationsScriptedHeuristic.md) | Customized score, implemented via a script. |
| `p_value?` | [`AggregationsPValueHeuristic`](AggregationsPValueHeuristic.md) | Significant terms heuristic that calculates the p-value between the term existing in foreground and background sets.

The p-value is the probability of obtaining test results at least as extreme as
the results actually observed, under the assumption that the null hypothesis is
correct. The p-value is calculated assuming that the foreground set and the
background set are independent https://en.wikipedia.org/wiki/Bernoulli_trial, with the null
hypothesis that the probabilities are the same. |
| `shard_min_doc_count?` | [`long`](long.md) | Regulates the certainty a shard has if the term should actually be added to the candidate list or not with respect to the `min_doc_count`.
Terms will only be considered if their local shard frequency within the set is higher than the `shard_min_doc_count`. |
| `shard_size?` | [`integer`](integer.md) | Can be used to control the volumes of candidate terms produced by each shard.
By default, `shard_size` will be automatically estimated based on the number of shards and the `size` parameter. |
| `size?` | [`integer`](integer.md) | The number of buckets returned out of the overall terms list. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
