# IngestCefProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field containing the CEF message. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `target_field?` | [`Field`](Field.md) | The field to assign the converted value to.
By default, the `target_field` is 'cef' |
| `ignore_empty_values?` | `boolean` | If `true` and value is anempty string in extensions, the processor quietly exits without modifying the document. |
| `timezone?` | `string` | The timezone to use when parsing the date and when date math index supports resolves expressions into concrete index names. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
