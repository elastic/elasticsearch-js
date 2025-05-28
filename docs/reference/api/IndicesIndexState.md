# `IndicesIndexState` [interface-IndicesIndexState]

| Name | Type | Description |
| - | - | - |
| `aliases` | Record<[IndexName](./IndexName.md), [IndicesAlias](./IndicesAlias.md)> | &nbsp; |
| `data_stream` | [DataStreamName](./DataStreamName.md) | &nbsp; |
| `defaults` | [IndicesIndexSettings](./IndicesIndexSettings.md) | Default settings, included when the request's `include_default` is `true`. |
| `lifecycle` | [IndicesDataStreamLifecycle](./IndicesDataStreamLifecycle.md) | Data stream lifecycle applicable if this is a data stream. |
| `mappings` | [MappingTypeMapping](./MappingTypeMapping.md) | &nbsp; |
| `settings` | [IndicesIndexSettings](./IndicesIndexSettings.md) | &nbsp; |
