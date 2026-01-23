# MlPerPartitionCategorization

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enabled?` | `boolean` | To enable this setting, you must also set the `partition_field_name` property to the same value in every detector that uses the keyword `mlcategory`. Otherwise, job creation fails. |
| `stop_on_warn?` | `boolean` | This setting can be set to true only if per-partition categorization is enabled. If true, both categorization and subsequent anomaly detection stops for partitions where the categorization status changes to warn. This setting makes it viable to have a job where it is expected that categorization works well for some partitions but not others; you do not pay the cost of bad categorization forever in the partitions where it works badly. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
