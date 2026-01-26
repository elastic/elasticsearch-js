# IngestKeyValueProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `exclude_keys?` | `string`[] | List of keys to exclude from document. |
| `field` | [`Field`](Field.md) | The field to be parsed.
Supports template snippets. |
| `field_split` | `string` | Regex pattern to use for splitting key-value pairs. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `include_keys?` | `string`[] | List of keys to filter and insert into document.
Defaults to including all keys. |
| `prefix?` | `string` | Prefix to be added to extracted keys. |
| `strip_brackets?` | `boolean` | If `true`. strip brackets `()`, `<>`, `[]` as well as quotes `'` and `"` from extracted values. |
| `target_field?` | [`Field`](Field.md) | The field to insert the extracted keys into.
Defaults to the root of the document.
Supports template snippets. |
| `trim_key?` | `string` | String of characters to trim from extracted keys. |
| `trim_value?` | `string` | String of characters to trim from extracted values. |
| `value_split` | `string` | Regex pattern to use for splitting the key from the value within a key-value pair. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
