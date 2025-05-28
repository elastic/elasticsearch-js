# `ClusterStatsFieldTypesMappings` [interface-ClusterStatsFieldTypesMappings]

| Name | Type | Description |
| - | - | - |
| `field_types` | [ClusterStatsFieldTypes](./ClusterStatsFieldTypes.md)[] | Contains statistics about field data types used in selected nodes. |
| `runtime_field_types` | [ClusterStatsRuntimeFieldTypes](./ClusterStatsRuntimeFieldTypes.md)[] | Contains statistics about runtime field data types used in selected nodes. |
| `total_deduplicated_field_count` | [integer](./integer.md) | Total number of fields in all non-system indices, accounting for mapping deduplication. |
| `total_deduplicated_mapping_size_in_bytes` | [long](./long.md) | Total size of all mappings, in bytes, after deduplication and compression. |
| `total_deduplicated_mapping_size` | [ByteSize](./ByteSize.md) | Total size of all mappings after deduplication and compression. |
| `total_field_count` | [integer](./integer.md) | Total number of fields in all non-system indices. |
