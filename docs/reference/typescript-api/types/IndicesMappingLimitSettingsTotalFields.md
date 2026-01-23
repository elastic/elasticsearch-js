# IndicesMappingLimitSettingsTotalFields

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `limit?` | `long | string` | The maximum number of fields in an index. Field and object mappings, as well as field aliases count towards this limit.
The limit is in place to prevent mappings and searches from becoming too large. Higher values can lead to performance
degradations and memory issues, especially in clusters with a high load or few resources. |
| `ignore_dynamic_beyond_limit?` | `boolean | string` | This setting determines what happens when a dynamically mapped field would exceed the total fields limit. When set
to false (the default), the index request of the document that tries to add a dynamic field to the mapping will fail
with the message Limit of total fields [X] has been exceeded. When set to true, the index request will not fail.
Instead, fields that would exceed the limit are not added to the mapping, similar to dynamic: false.
The fields that were not added to the mapping will be added to the _ignored field. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
