# `MlAnomalyExplanation` [interface-MlAnomalyExplanation]

| Name | Type | Description |
| - | - | - |
| `anomaly_characteristics_impact` | [integer](./integer.md) | Impact from the duration and magnitude of the detected anomaly relative to the historical average. |
| `anomaly_length` | [integer](./integer.md) | Length of the detected anomaly in the number of buckets. |
| `anomaly_type` | string | Type of the detected anomaly: `spike` or `dip`. |
| `high_variance_penalty` | boolean | Indicates reduction of anomaly score for the bucket with large confidence intervals. If a bucket has large confidence intervals, the score is reduced. |
| `incomplete_bucket_penalty` | boolean | If the bucket contains fewer samples than expected, the score is reduced. |
| `lower_confidence_bound` | [double](./double.md) | Lower bound of the 95% confidence interval. |
| `multi_bucket_impact` | [integer](./integer.md) | Impact of the deviation between actual and typical values in the past 12 buckets. |
| `single_bucket_impact` | [integer](./integer.md) | Impact of the deviation between actual and typical values in the current bucket. |
| `typical_value` | [double](./double.md) | Typical (expected) value for this bucket. |
| `upper_confidence_bound` | [double](./double.md) | Upper bound of the 95% confidence interval. |
