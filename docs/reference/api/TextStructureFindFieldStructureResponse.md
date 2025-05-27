## Interface `TextStructureFindFieldStructureResponse`

| Name | Type | Description |
| - | - | - |
| `charset` | string | &nbsp; |
| `ecs_compatibility` | [TextStructureEcsCompatibilityType](./TextStructureEcsCompatibilityType.md) | &nbsp; |
| `field_stats` | Record<[Field](./Field.md), [TextStructureFieldStat](./TextStructureFieldStat.md)> | &nbsp; |
| `format` | [TextStructureFormatType](./TextStructureFormatType.md) | &nbsp; |
| `grok_pattern` | [GrokPattern](./GrokPattern.md) | &nbsp; |
| `ingest_pipeline` | [IngestPipelineConfig](./IngestPipelineConfig.md) | &nbsp; |
| `java_timestamp_formats` | string[] | &nbsp; |
| `joda_timestamp_formats` | string[] | &nbsp; |
| `mappings` | [MappingTypeMapping](./MappingTypeMapping.md) | &nbsp; |
| `multiline_start_pattern` | string | &nbsp; |
| `need_client_timezone` | boolean | &nbsp; |
| `num_lines_analyzed` | [integer](./integer.md) | &nbsp; |
| `num_messages_analyzed` | [integer](./integer.md) | &nbsp; |
| `sample_start` | string | &nbsp; |
| `timestamp_field` | [Field](./Field.md) | &nbsp; |
