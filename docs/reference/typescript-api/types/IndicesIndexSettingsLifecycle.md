# IndicesIndexSettingsLifecycle

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | [`Name`](Name.md) | The name of the policy to use to manage the index. For information about how Elasticsearch applies policy changes, see Policy updates. |
| `indexing_complete?` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<boolean> | Indicates whether or not the index has been rolled over. Automatically set to true when ILM completes the rollover action.
You can explicitly set it to skip rollover. |
| `origination_date?` | [`long`](long.md) | If specified, this is the timestamp used to calculate the index age for its phase transitions. Use this setting
if you create a new index that contains old data and want to use the original creation date to calculate the index
age. Specified as a Unix epoch value in milliseconds. |
| `parse_origination_date?` | `boolean` | Set to true to parse the origination date from the index name. This origination date is used to calculate the index age
for its phase transitions. The index name must match the pattern ^.*-{date_format}-\\d+, where the date_format is
yyyy.MM.dd and the trailing digits are optional. An index that was rolled over would normally match the full format,
for example logs-2016.10.31-000002). If the index name doesn’t match the pattern, index creation fails. |
| `step?` | [`IndicesIndexSettingsLifecycleStep`](IndicesIndexSettingsLifecycleStep.md) | - |
| `rollover_alias?` | `string` | The index alias to update when the index rolls over. Specify when using a policy that contains a rollover action.
When the index rolls over, the alias is updated to reflect that the index is no longer the write index. For more
information about rolling indices, see Rollover. |
| `prefer_ilm?` | `boolean | string` | Preference for the system that manages a data stream backing index (preferring ILM when both ILM and DLM are
applicable for an index). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
