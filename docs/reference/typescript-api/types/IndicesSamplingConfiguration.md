# IndicesSamplingConfiguration

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `rate` | `double` | The fraction of documents to sample between 0 and 1. |
| `max_samples` | `integer` | The maximum number of documents to sample. |
| `max_size?` | [`ByteSize`](ByteSize.md) | The maximum total size of sampled documents. |
| `max_size_in_bytes` | `long` | The maximum total size of sampled documents in bytes. |
| `time_to_live?` | [`Duration`](Duration.md) | The duration for which the sampled documents should be retained. |
| `time_to_live_in_millis` | `long` | The duration for which the sampled documents should be retained, in milliseconds. |
| `if?` | `string` | An optional condition script that sampled documents must satisfy. |
| `creation_time?` | [`DateTime`](DateTime.md) | The time when the sampling configuration was created. |
| `creation_time_in_millis` | `long` | The time when the sampling configuration was created, in milliseconds since epoch. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
