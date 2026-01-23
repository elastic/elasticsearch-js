# IngestAppendProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | The field to be appended to.
Supports template snippets. |
| `value?` | `any | any[]` | The value to be appended. Supports template snippets. May specify only one of `value` or `copy_from`. |
| `media_type?` | `string` | The media type for encoding `value`.
Applies only when value is a template snippet.
Must be one of `application/json`, `text/plain`, or `application/x-www-form-urlencoded`. |
| `copy_from?` | [`Field`](Field.md) | The origin field which will be appended to `field`, cannot set `value` simultaneously. |
| `allow_duplicates?` | `boolean` | If `false`, the processor does not append values already present in the field. |
| `ignore_empty_values?` | `boolean` | If `true`, the processor will skip empty values from the source (e.g. empty strings, and null values),
rather than appending them to the field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
