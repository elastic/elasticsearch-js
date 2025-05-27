## Interface `IngestDateProcessor`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The field to get the date from. |
| `formats` | string[] | An array of the expected date formats. Can be a java time pattern or one of the following formats: ISO8601, UNIX, UNIX_MS, or TAI64N. |
| `locale` | string | The locale to use when parsing the date, relevant when parsing month names or week days. Supports template snippets. |
| `output_format` | string | The format to use when writing the date to target_field. Must be a valid java time pattern. |
| `target_field` | [Field](./Field.md) | The field that will hold the parsed date. |
| `timezone` | string | The timezone to use when parsing the date. Supports template snippets. |
