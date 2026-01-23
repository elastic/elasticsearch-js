# TextStructureFindFieldStructureResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `charset` | `string` | - |
| `ecs_compatibility?` | [`TextStructureEcsCompatibilityType`](TextStructureEcsCompatibilityType.md) | - |
| `field_stats` | `Record<Field, TextStructureFieldStat>` | - |
| `format` | [`TextStructureFormatType`](TextStructureFormatType.md) | - |
| `grok_pattern?` | [`GrokPattern`](GrokPattern.md) | - |
| `java_timestamp_formats?` | `string[]` | - |
| `joda_timestamp_formats?` | `string[]` | - |
| `ingest_pipeline` | [`IngestPipelineConfig`](IngestPipelineConfig.md) | - |
| `mappings` | [`MappingTypeMapping`](MappingTypeMapping.md) | - |
| `multiline_start_pattern?` | `string` | - |
| `need_client_timezone` | `boolean` | - |
| `num_lines_analyzed` | [`integer`](integer.md) | - |
| `num_messages_analyzed` | [`integer`](integer.md) | - |
| `sample_start` | `string` | - |
| `timestamp_field?` | [`Field`](Field.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
