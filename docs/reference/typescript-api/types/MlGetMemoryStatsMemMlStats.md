# MlGetMemoryStatsMemMlStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `anomaly_detectors?` | [`ByteSize`](ByteSize.md) | Amount of native memory set aside for anomaly detection jobs. |
| `anomaly_detectors_in_bytes` | [`integer`](integer.md) | Amount of native memory, in bytes, set aside for anomaly detection jobs. |
| `data_frame_analytics?` | [`ByteSize`](ByteSize.md) | Amount of native memory set aside for data frame analytics jobs. |
| `data_frame_analytics_in_bytes` | [`integer`](integer.md) | Amount of native memory, in bytes, set aside for data frame analytics jobs. |
| `max?` | [`ByteSize`](ByteSize.md) | Maximum amount of native memory (separate to the JVM heap) that may be used by machine learning native processes. |
| `max_in_bytes` | [`integer`](integer.md) | Maximum amount of native memory (separate to the JVM heap), in bytes, that may be used by machine learning native processes. |
| `native_code_overhead?` | [`ByteSize`](ByteSize.md) | Amount of native memory set aside for loading machine learning native code shared libraries. |
| `native_code_overhead_in_bytes` | [`integer`](integer.md) | Amount of native memory, in bytes, set aside for loading machine learning native code shared libraries. |
| `native_inference?` | [`ByteSize`](ByteSize.md) | Amount of native memory set aside for trained models that have a PyTorch model_type. |
| `native_inference_in_bytes` | [`integer`](integer.md) | Amount of native memory, in bytes, set aside for trained models that have a PyTorch model_type. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
