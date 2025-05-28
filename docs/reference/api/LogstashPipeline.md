# `LogstashPipeline` [interface-LogstashPipeline]

| Name | Type | Description |
| - | - | - |
| `description` | string | A description of the pipeline. This description is not used by Elasticsearch or Logstash. |
| `last_modified` | [DateTime](./DateTime.md) | The date the pipeline was last updated. It must be in the `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` strict_date_time format. |
| `pipeline_metadata` | [LogstashPipelineMetadata](./LogstashPipelineMetadata.md) | Optional metadata about the pipeline, which can have any contents. This metadata is not generated or used by Elasticsearch or Logstash. |
| `pipeline_settings` | [LogstashPipelineSettings](./LogstashPipelineSettings.md) | Settings for the pipeline. It supports only flat keys in dot notation. |
| `pipeline` | string | The configuration for the pipeline. |
| `username` | string | The user who last updated the pipeline. |
