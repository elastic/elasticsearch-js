# IndicesPutDataStreamSettingsIndexSettingResults

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `applied_to_data_stream_only` | `string[]` | The list of settings that were applied to the data stream but not to backing indices. These will be applied to
the write index the next time the data stream is rolled over. |
| `applied_to_data_stream_and_backing_indices` | `string[]` | The list of settings that were applied to the data stream and to all of its backing indices. These settings will
also be applied to the write index the next time the data stream is rolled over. |
| `errors?` | [`IndicesPutDataStreamSettingsDataStreamSettingsError`](IndicesPutDataStreamSettingsDataStreamSettingsError.md)[] | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
