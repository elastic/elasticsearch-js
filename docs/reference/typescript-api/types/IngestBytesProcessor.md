# IngestBytesProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field to convert. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `target_field?` | [`Field`](Field.md) | The field to assign the converted value to.
By default, the field is updated in-place. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
