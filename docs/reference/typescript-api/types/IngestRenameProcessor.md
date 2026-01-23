# IngestRenameProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field to be renamed.
Supports template snippets. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `target_field` | [`Field`](Field.md) | The new name of the field.
Supports template snippets. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
