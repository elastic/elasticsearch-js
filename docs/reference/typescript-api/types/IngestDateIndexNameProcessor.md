# IngestDateIndexNameProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `date_formats?` | `string`[] | An array of the expected date formats for parsing dates / timestamps in the document being preprocessed.
Can be a java time pattern or one of the following formats: ISO8601, UNIX, UNIX_MS, or TAI64N. |
| `date_rounding` | `string` | How to round the date when formatting the date into the index name. Valid values are:
`y` (year), `M` (month), `w` (week), `d` (day), `h` (hour), `m` (minute) and `s` (second).
Supports template snippets. |
| `field` | [`Field`](Field.md) | The field to get the date or timestamp from. |
| `index_name_format?` | `string` | The format to be used when printing the parsed date into the index name.
A valid java time pattern is expected here.
Supports template snippets. |
| `index_name_prefix?` | `string` | A prefix of the index name to be prepended before the printed date.
Supports template snippets. |
| `locale?` | `string` | The locale to use when parsing the date from the document being preprocessed, relevant when parsing month names or week days. |
| `timezone?` | `string` | The timezone to use when parsing the date and when date math index supports resolves expressions into concrete index names. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
