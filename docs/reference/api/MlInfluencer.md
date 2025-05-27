## Interface `MlInfluencer`

| Name | Type | Description |
| - | - | - |
| `bucket_span` | [DurationValue](./DurationValue.md)<[UnitSeconds](./UnitSeconds.md)> | The length of the bucket in seconds. This value matches the bucket span that is specified in the job. |
| `foo` | string | Additional influencer properties are added, depending on the fields being analyzed. For example, if it’s analyzing `user_name` as an influencer, a field `user_name` is added to the result document. This information enables you to filter the anomaly results more easily. |
| `influencer_field_name` | [Field](./Field.md) | The field name of the influencer. |
| `influencer_field_value` | string | The entity that influenced, contributed to, or was to blame for the anomaly. |
| `influencer_score` | [double](./double.md) | A normalized score between 0-100, which is based on the probability of the influencer in this bucket aggregated across detectors. Unlike `initial_influencer_score`, this value is updated by a re-normalization process as new data is analyzed. |
| `initial_influencer_score` | [double](./double.md) | A normalized score between 0-100, which is based on the probability of the influencer aggregated across detectors. This is the initial value that was calculated at the time the bucket was processed. |
| `is_interim` | boolean | If true, this is an interim result. In other words, the results are calculated based on partial input data. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. |
| `probability` | [double](./double.md) | The probability that the influencer has this behavior, in the range 0 to 1. This value can be held to a high precision of over 300 decimal places, so the `influencer_score` is provided as a human-readable and friendly interpretation of this value. |
| `result_type` | string | Internal. This value is always set to `influencer`. |
| `timestamp` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The start time of the bucket for which these results were calculated. |
