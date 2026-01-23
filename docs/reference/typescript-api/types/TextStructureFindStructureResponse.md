# TextStructureFindStructureResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `charset` | `string` | The character encoding used to parse the text. |
| `has_header_row?` | `boolean` | - |
| `has_byte_order_marker` | `boolean` | For UTF character encodings, it indicates whether the text begins with a byte order marker. |
| `format` | `string` | Valid values include `ndjson`, `xml`, `delimited`, and `semi_structured_text`. |
| `field_stats` | `Record<Field, TextStructureFieldStat>` | The most common values of each field, plus basic numeric statistics for the numeric `page_count` field.
This information may provide clues that the data needs to be cleaned or transformed prior to use by other Elastic Stack functionality. |
| `sample_start` | `string` | The first two messages in the text verbatim.
This may help diagnose parse errors or accidental uploads of the wrong text. |
| `num_messages_analyzed` | `integer` | The number of distinct messages the lines contained.
For NDJSON, this value is the same as `num_lines_analyzed`.
For other text formats, messages can span several lines. |
| `mappings` | [`MappingTypeMapping`](MappingTypeMapping.md) | Some suitable mappings for an index into which the data could be ingested. |
| `quote?` | `string` | - |
| `delimiter?` | `string` | - |
| `need_client_timezone` | `boolean` | If a timestamp format is detected that does not include a timezone, `need_client_timezone` is `true`.
The server that parses the text must therefore be told the correct timezone by the client. |
| `num_lines_analyzed` | `integer` | The number of lines of the text that were analyzed. |
| `column_names?` | `string[]` | If `format` is `delimited`, the `column_names` field lists the column names in the order they appear in the sample. |
| `explanation?` | `string[]` | - |
| `grok_pattern?` | [`GrokPattern`](GrokPattern.md) | - |
| `multiline_start_pattern?` | `string` | - |
| `exclude_lines_pattern?` | `string` | - |
| `java_timestamp_formats?` | `string[]` | The Java time formats recognized in the time fields.
Elasticsearch mappings and ingest pipelines use this format. |
| `joda_timestamp_formats?` | `string[]` | Information that is used to tell Logstash how to parse timestamps. |
| `timestamp_field?` | [`Field`](Field.md) | The field considered most likely to be the primary timestamp of each document. |
| `should_trim_fields?` | `boolean` | - |
| `ingest_pipeline` | [`IngestPipelineConfig`](IngestPipelineConfig.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
