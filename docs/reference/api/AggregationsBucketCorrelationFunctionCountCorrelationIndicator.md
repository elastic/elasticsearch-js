## Interface `AggregationsBucketCorrelationFunctionCountCorrelationIndicator`

| Name | Type | Description |
| - | - | - |
| `doc_count` | [integer](./integer.md) | The total number of documents that initially created the expectations. It’s required to be greater than or equal to the sum of all values in the buckets_path as this is the originating superset of data to which the term values are correlated. |
| `expectations` | [double](./double.md)[] | An array of numbers with which to correlate the configured `bucket_path` values. The length of this value must always equal the number of buckets returned by the `bucket_path`. |
| `fractions` | [double](./double.md)[] | An array of fractions to use when averaging and calculating variance. This should be used if the pre-calculated data and the buckets_path have known gaps. The length of fractions, if provided, must equal expectations. |
