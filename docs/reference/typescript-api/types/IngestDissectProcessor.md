# IngestDissectProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `append_separator?` | `string` | The character(s) that separate the appended fields. |
| `field` | [`Field`](Field.md) | The field to dissect. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `pattern` | `string` | The pattern to apply to the field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
