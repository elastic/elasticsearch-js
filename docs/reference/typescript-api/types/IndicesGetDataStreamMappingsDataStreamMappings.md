# IndicesGetDataStreamMappingsDataStreamMappings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | The name of the data stream. |
| `mappings` | [`MappingTypeMapping`](MappingTypeMapping.md) | The settings specific to this data stream |
| `effective_mappings` | [`MappingTypeMapping`](MappingTypeMapping.md) | The settings specific to this data stream merged with the settings from its template. These `effective_settings`
are the settings that will be used when a new index is created for this data stream. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
