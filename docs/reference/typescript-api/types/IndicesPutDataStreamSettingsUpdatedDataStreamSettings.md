# IndicesPutDataStreamSettingsUpdatedDataStreamSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`IndexName`](IndexName.md) | The data stream name. |
| `applied_to_data_stream` | `boolean` | If the settings were successfully applied to the data stream (or would have been, if running in `dry_run`
mode), it is `true`. If an error occurred, it is `false`. |
| `error?` | `string` | A message explaining why the settings could not be applied to the data stream. |
| `settings` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | The settings that are specfic to this data stream that will override any settings from the matching index template. |
| `effective_settings` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | The settings that are effective on this data stream, taking into account the settings from the matching index
template and the settings specific to this data stream. |
| `index_settings_results` | [`IndicesPutDataStreamSettingsIndexSettingResults`](IndicesPutDataStreamSettingsIndexSettingResults.md) | Information about whether and where each setting was applied. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
