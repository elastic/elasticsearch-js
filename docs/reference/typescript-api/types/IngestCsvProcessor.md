# IngestCsvProcessor

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `empty_value?` | `any` | Value used to fill empty fields.
Empty fields are skipped if this is not provided.
An empty field is one with no value (2 consecutive separators) or empty quotes (`""`). |
| `field` | [`Field`](Field.md) | The field to extract data from. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist, the processor quietly exits without modifying the document. |
| `quote?` | `string` | Quote used in CSV, has to be single character string. |
| `separator?` | `string` | Separator used in CSV, has to be single character string. |
| `target_fields` | [`Fields`](Fields.md) | The array of fields to assign extracted values to. |
| `trim?` | `boolean` | Trim whitespaces in unquoted fields. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
