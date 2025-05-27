## Interface `TextStructureFindStructureResponse`

| Name | Type | Description |
| - | - | - |
| `charset` | string | The character encoding used to parse the text. |
| `column_names` | string[] | If `format` is `delimited`, the `column_names` field lists the column names in the order they appear in the sample. |
| `delimiter` | string | &nbsp; |
| `exclude_lines_pattern` | string | &nbsp; |
| `explanation` | string[] | &nbsp; |
| `field_stats` | Record<[Field](./Field.md), [TextStructureFieldStat](./TextStructureFieldStat.md)> | The most common values of each field, plus basic numeric statistics for the numeric `page_count` field. This information may provide clues that the data needs to be cleaned or transformed prior to use by other Elastic Stack functionality. |
| `format` | string | Valid values include `ndjson`, `xml`, `delimited`, and `semi_structured_text`. |
| `grok_pattern` | [GrokPattern](./GrokPattern.md) | &nbsp; |
| `has_byte_order_marker` | boolean | For UTF character encodings, it indicates whether the text begins with a byte order marker. |
| `has_header_row` | boolean | &nbsp; |
| `ingest_pipeline` | [IngestPipelineConfig](./IngestPipelineConfig.md) | &nbsp; |
| `java_timestamp_formats` | string[] | The Java time formats recognized in the time fields. Elasticsearch mappings and ingest pipelines use this format. |
| `joda_timestamp_formats` | string[] | Information that is used to tell Logstash how to parse timestamps. |
| `mappings` | [MappingTypeMapping](./MappingTypeMapping.md) | Some suitable mappings for an index into which the data could be ingested. |
| `multiline_start_pattern` | string | &nbsp; |
| `need_client_timezone` | boolean | If a timestamp format is detected that does not include a timezone, `need_client_timezone` is `true`. The server that parses the text must therefore be told the correct timezone by the client. |
| `num_lines_analyzed` | [integer](./integer.md) | The number of lines of the text that were analyzed. |
| `num_messages_analyzed` | [integer](./integer.md) | The number of distinct messages the lines contained. For NDJSON, this value is the same as `num_lines_analyzed`. For other text formats, messages can span several lines. |
| `quote` | string | &nbsp; |
| `sample_start` | string | The first two messages in the text verbatim. This may help diagnose parse errors or accidental uploads of the wrong text. |
| `should_trim_fields` | boolean | &nbsp; |
| `timestamp_field` | [Field](./Field.md) | The field considered most likely to be the primary timestamp of each document. |
