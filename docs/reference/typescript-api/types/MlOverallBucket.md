# MlOverallBucket

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `bucket_span` | [`DurationValue`](DurationValue.md)<UnitSeconds> | The length of the bucket in seconds. Matches the job with the longest bucket_span value. |
| `is_interim` | `boolean` | If true, this is an interim result. In other words, the results are calculated based on partial input data. |
| `jobs` | [`MlOverallBucketJob`](MlOverallBucketJob.md)[] | An array of objects that contain the max_anomaly_score per job_id. |
| `overall_score` | [`double`](double.md) | The top_n average of the maximum bucket anomaly_score per job. |
| `result_type` | `string` | Internal. This is always set to overall_bucket. |
| `timestamp` | [`EpochTime`](EpochTime.md)<UnitMillis> | The start time of the bucket for which these results were calculated. |
| `timestamp_string?` | [`DateTime`](DateTime.md) | The start time of the bucket for which these results were calculated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
