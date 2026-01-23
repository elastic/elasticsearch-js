# IndicesPutDataStreamMappingsUpdatedDataStreamMappings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`IndexName`](IndexName.md) | The data stream name. |
| `applied_to_data_stream` | `boolean` | If the mappings were successfully applied to the data stream (or would have been, if running in `dry_run`
mode), it is `true`. If an error occurred, it is `false`. |
| `error?` | `string` | A message explaining why the mappings could not be applied to the data stream. |
| `mappings?` | [`MappingTypeMapping`](MappingTypeMapping.md) | The mappings that are specfic to this data stream that will override any mappings from the matching index template. |
| `effective_mappings?` | [`MappingTypeMapping`](MappingTypeMapping.md) | The mappings that are effective on this data stream, taking into account the mappings from the matching index
template and the mappings specific to this data stream. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
