# IngestTrimProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The string-valued field to trim whitespace from. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `target_field?` | [`Field`](Field.md) | The field to assign the trimmed value to.
By default, the field is updated in-place. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
