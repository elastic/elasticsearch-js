# `IndicesIndexTemplateSummary` [interface-IndicesIndexTemplateSummary]

| Name | Type | Description |
| - | - | - |
| `aliases` | Record<[IndexName](./IndexName.md), [IndicesAlias](./IndicesAlias.md)> | Aliases to add. If the index template includes a `data_stream` object, these are data stream aliases. Otherwise, these are index aliases. Data stream aliases ignore the `index_routing`, `routing`, and `search_routing` options. |
| `lifecycle` | [IndicesDataStreamLifecycleWithRollover](./IndicesDataStreamLifecycleWithRollover.md) | &nbsp; |
| `mappings` | [MappingTypeMapping](./MappingTypeMapping.md) | Mapping for fields in the index. If specified, this mapping can include field names, field data types, and mapping parameters. |
| `settings` | [IndicesIndexSettings](./IndicesIndexSettings.md) | Configuration options for the index. |
