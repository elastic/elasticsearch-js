# IndicesIndexState

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `aliases?` | `Record<IndexName, IndicesAlias>` | - |
| `mappings?` | [`MappingTypeMapping`](MappingTypeMapping.md) | - |
| `settings?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | - |
| `defaults?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | Default settings, included when the request's `include_default` is `true`. |
| `data_stream?` | [`DataStreamName`](DataStreamName.md) | - |
| `lifecycle?` | [`IndicesDataStreamLifecycle`](IndicesDataStreamLifecycle.md) | Data stream lifecycle applicable if this is a data stream. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
