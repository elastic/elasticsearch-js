# TransformTimeSync

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `delay?` | [`Duration`](Duration.md) | The time delay between the current time and the latest input data time. |
| `field` | [`Field`](Field.md) | The date field that is used to identify new documents in the source. In general, it’s a good idea to use a field
that contains the ingest timestamp. If you use a different field, you might need to set the delay such that it
accounts for data transmission delays. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
