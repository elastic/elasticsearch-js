# MlDataDescription

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `format?` | `string` | Only JSON format is supported at this time. |
| `time_field?` | [`Field`](Field.md) | The name of the field that contains the timestamp. |
| `time_format?` | `string` | The time format, which can be `epoch`, `epoch_ms`, or a custom pattern. The value `epoch` refers to UNIX or Epoch time (the number of seconds since 1 Jan 1970). The value `epoch_ms` indicates that time is measured in milliseconds since the epoch. The `epoch` and `epoch_ms` time formats accept either integer or real values. Custom patterns must conform to the Java DateTimeFormatter class. When you use date-time formatting patterns, it is recommended that you provide the full date, time and time zone. For example: `yyyy-MM-dd'T'HH:mm:ssX`. If the pattern that you specify is not sufficient to produce a complete timestamp, job creation fails. |
| `field_delimiter?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
