# MlAnomaly

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `actual?` | [`double`](double.md)[] | The actual value for the bucket. |
| `anomaly_score_explanation?` | [`MlAnomalyExplanation`](MlAnomalyExplanation.md) | Information about the factors impacting the initial anomaly score. |
| `bucket_span` | [`DurationValue`](DurationValue.md)<UnitSeconds> | The length of the bucket in seconds. This value matches the `bucket_span` that is specified in the job. |
| `by_field_name?` | `string` | The field used to split the data. In particular, this property is used for analyzing the splits with respect to their own history. It is used for finding unusual values in the context of the split. |
| `by_field_value?` | `string` | The value of `by_field_name`. |
| `causes?` | [`MlAnomalyCause`](MlAnomalyCause.md)[] | For population analysis, an over field must be specified in the detector. This property contains an array of anomaly records that are the causes for the anomaly that has been identified for the over field. This sub-resource contains the most anomalous records for the `over_field_name`. For scalability reasons, a maximum of the 10 most significant causes of the anomaly are returned. As part of the core analytical modeling, these low-level anomaly records are aggregated for their parent over field record. The `causes` resource contains similar elements to the record resource, namely `actual`, `typical`, `geo_results.actual_point`, `geo_results.typical_point`, `*_field_name` and `*_field_value`. Probability and scores are not applicable to causes. |
| `detector_index` | [`integer`](integer.md) | A unique identifier for the detector. |
| `field_name?` | `string` | Certain functions require a field to operate on, for example, `sum()`. For those functions, this value is the name of the field to be analyzed. |
| `function?` | `string` | The function in which the anomaly occurs, as specified in the detector configuration. For example, `max`. |
| `function_description?` | `string` | The description of the function in which the anomaly occurs, as specified in the detector configuration. |
| `geo_results?` | [`MlGeoResults`](MlGeoResults.md) | If the detector function is `lat_long`, this object contains comma delimited strings for the latitude and longitude of the actual and typical values. |
| `influencers?` | [`MlInfluence`](MlInfluence.md)[] | If influencers were specified in the detector configuration, this array contains influencers that contributed to or were to blame for an anomaly. |
| `initial_record_score` | [`double`](double.md) | A normalized score between 0-100, which is based on the probability of the anomalousness of this record. This is the initial value that was calculated at the time the bucket was processed. |
| `is_interim` | `boolean` | If true, this is an interim result. In other words, the results are calculated based on partial input data. |
| `job_id` | `string` | Identifier for the anomaly detection job. |
| `over_field_name?` | `string` | The field used to split the data. In particular, this property is used for analyzing the splits with respect to the history of all splits. It is used for finding unusual values in the population of all splits. |
| `over_field_value?` | `string` | The value of `over_field_name`. |
| `partition_field_name?` | `string` | The field used to segment the analysis. When you use this property, you have completely independent baselines for each value of this field. |
| `partition_field_value?` | `string` | The value of `partition_field_name`. |
| `probability` | [`double`](double.md) | The probability of the individual anomaly occurring, in the range 0 to 1. For example, `0.0000772031`. This value can be held to a high precision of over 300 decimal places, so the `record_score` is provided as a human-readable and friendly interpretation of this. |
| `record_score` | [`double`](double.md) | A normalized score between 0-100, which is based on the probability of the anomalousness of this record. Unlike `initial_record_score`, this value will be updated by a re-normalization process as new data is analyzed. |
| `result_type` | `string` | Internal. This is always set to `record`. |
| `timestamp` | [`EpochTime`](EpochTime.md)<UnitMillis> | The start time of the bucket for which these results were calculated. |
| `typical?` | [`double`](double.md)[] | The typical value for the bucket, according to analytical modeling. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
