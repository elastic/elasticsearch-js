# MlCategory

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `category_id` | `ulong` | A unique identifier for the category. category_id is unique at the job level, even when per-partition categorization is enabled. |
| `examples` | `string[]` | A list of examples of actual values that matched the category. |
| `grok_pattern?` | [`GrokPattern`](GrokPattern.md) | [experimental] A Grok pattern that could be used in Logstash or an ingest pipeline to extract fields from messages that match the category. This field is experimental and may be changed or removed in a future release. The Grok patterns that are found are not optimal, but are often a good starting point for manual tweaking. |
| `job_id` | [`Id`](Id.md) | Identifier for the anomaly detection job. |
| `max_matching_length` | `ulong` | The maximum length of the fields that matched the category. The value is increased by 10% to enable matching for similar fields that have not been analyzed. |
| `partition_field_name?` | `string` | If per-partition categorization is enabled, this property identifies the field used to segment the categorization. It is not present when per-partition categorization is disabled. |
| `partition_field_value?` | `string` | If per-partition categorization is enabled, this property identifies the value of the partition_field_name for the category. It is not present when per-partition categorization is disabled. |
| `regex` | `string` | A regular expression that is used to search for values that match the category. |
| `terms` | `string` | A space separated list of the common tokens that are matched in values of the category. |
| `num_matches?` | `long` | The number of messages that have been matched by this category. This is only guaranteed to have the latest accurate count after a job _flush or _close |
| `preferred_to_categories?` | `Id[]` | A list of category_id entries that this current category encompasses. Any new message that is processed by the categorizer will match against this category and not any of the categories in this list. This is only guaranteed to have the latest accurate list of categories after a job _flush or _close |
| `p?` | `string` | - |
| `result_type` | `string` | - |
| `mlcategory` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
