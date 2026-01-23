# IndicesIndexTemplateSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `aliases?` | `Record<IndexName, IndicesAlias>` | Aliases to add.
If the index template includes a `data_stream` object, these are data stream aliases.
Otherwise, these are index aliases.
Data stream aliases ignore the `index_routing`, `routing`, and `search_routing` options. |
| `mappings?` | [`MappingTypeMapping`](MappingTypeMapping.md) | Mapping for fields in the index.
If specified, this mapping can include field names, field data types, and mapping parameters. |
| `settings?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | Configuration options for the index. |
| `lifecycle?` | [`IndicesDataStreamLifecycleWithRollover`](IndicesDataStreamLifecycleWithRollover.md) | - |
| `data_stream_options?` | [`IndicesDataStreamOptions`](IndicesDataStreamOptions.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
