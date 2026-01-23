# ClusterStatsFieldTypesMappings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field_types` | `ClusterStatsFieldTypes[]` | Contains statistics about field data types used in selected nodes. |
| `runtime_field_types` | `ClusterStatsRuntimeFieldTypes[]` | Contains statistics about runtime field data types used in selected nodes. |
| `total_field_count?` | `long` | Total number of fields in all non-system indices. |
| `total_deduplicated_field_count?` | `long` | Total number of fields in all non-system indices, accounting for mapping deduplication. |
| `total_deduplicated_mapping_size?` | [`ByteSize`](ByteSize.md) | Total size of all mappings after deduplication and compression. |
| `total_deduplicated_mapping_size_in_bytes?` | `long` | Total size of all mappings, in bytes, after deduplication and compression. |
| `source_modes` | `Record<Name, integer>` | Source mode usage count. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
