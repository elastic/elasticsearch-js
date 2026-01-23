# MlTrainedModelInferenceStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cache_miss_count` | [`integer`](integer.md) | The number of times the model was loaded for inference and was not retrieved from the cache.
If this number is close to the `inference_count`, the cache is not being appropriately used.
This can be solved by increasing the cache size or its time-to-live (TTL).
Refer to general machine learning settings for the appropriate settings. |
| `failure_count` | [`integer`](integer.md) | The number of failures when using the model for inference. |
| `inference_count` | [`integer`](integer.md) | The total number of times the model has been called for inference.
This is across all inference contexts, including all pipelines. |
| `missing_all_fields_count` | [`integer`](integer.md) | The number of inference calls where all the training features for the model were missing. |
| `timestamp` | [`EpochTime`](EpochTime.md)<UnitMillis> | The time when the statistics were last updated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
