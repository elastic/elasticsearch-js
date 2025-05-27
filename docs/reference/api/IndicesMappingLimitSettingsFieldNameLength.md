## Interface `IndicesMappingLimitSettingsFieldNameLength`

| Name | Type | Description |
| - | - | - |
| `limit` | [long](./long.md) | Setting for the maximum length of a field name. This setting isn’t really something that addresses mappings explosion but might still be useful if you want to limit the field length. It usually shouldn’t be necessary to set this setting. The default is okay unless a user starts to add a huge number of fields with really long names. Default is `Long.MAX_VALUE` (no limit). |
