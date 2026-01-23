# IngestConvertProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field whose value is to be converted. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `target_field?` | [`Field`](Field.md) | The field to assign the converted value to.
By default, the `field` is updated in-place. |
| `type` | [`IngestConvertType`](IngestConvertType.md) | The type to convert the existing value to. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
