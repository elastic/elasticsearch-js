# MlBucketInfluencer

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `anomaly_score` | `double` | A normalized score between 0-100, which is calculated for each bucket influencer. This score might be updated as
newer data is analyzed. |
| `bucket_span` | `DurationValue<UnitSeconds>` | The length of the bucket in seconds. This value matches the bucket span that is specified in the job. |
| `influencer_field_name` | [`Field`](Field.md) | The field name of the influencer. |
| `initial_anomaly_score` | `double` | The score between 0-100 for each bucket influencer. This score is the initial value that was calculated at the
time the bucket was processed. |
| `is_interim` | `boolean` | If true, this is an interim result. In other words, the results are calculated based on partial input data. |
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `probability` | `double` | The probability that the bucket has this behavior, in the range 0 to 1. This value can be held to a high precision
of over 300 decimal places, so the `anomaly_score` is provided as a human-readable and friendly interpretation of
this. |
| `raw_anomaly_score` | `double` | Internal. |
| `result_type` | `string` | Internal. This value is always set to `bucket_influencer`. |
| `timestamp` | `EpochTime<UnitMillis>` | The start time of the bucket for which these results were calculated. |
| `timestamp_string?` | [`DateTime`](DateTime.md) | The start time of the bucket for which these results were calculated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
