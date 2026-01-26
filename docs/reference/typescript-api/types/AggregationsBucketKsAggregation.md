# AggregationsBucketKsAggregation

## Interface

### Extends

- [`AggregationsBucketPathAggregation`](AggregationsBucketPathAggregation.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `alternative?` | `string`[] | A list of string values indicating which K-S test alternative to calculate. The valid values
are: "greater", "less", "two_sided". This parameter is key for determining the K-S statistic used
when calculating the K-S test. Default value is all possible alternative hypotheses. |
| `fractions?` | [`double`](double.md)[] | A list of doubles indicating the distribution of the samples with which to compare to the `buckets_path` results.
In typical usage this is the overall proportion of documents in each bucket, which is compared with the actual
document proportions in each bucket from the sibling aggregation counts. The default is to assume that overall
documents are uniformly distributed on these buckets, which they would be if one used equal percentiles of a
metric to define the bucket end points. |
| `sampling_method?` | `string` | Indicates the sampling methodology when calculating the K-S test. Note, this is sampling of the returned values.
This determines the cumulative distribution function (CDF) points used comparing the two samples. Default is
`upper_tail`, which emphasizes the upper end of the CDF points. Valid options are: `upper_tail`, `uniform`,
and `lower_tail`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
