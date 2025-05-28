# `IndicesMappingLimitSettingsNestedFields` [interface-IndicesMappingLimitSettingsNestedFields]

| Name | Type | Description |
| - | - | - |
| `limit` | [long](./long.md) | The maximum number of distinct nested mappings in an index. The nested type should only be used in special cases, when arrays of objects need to be queried independently of each other. To safeguard against poorly designed mappings, this setting limits the number of unique nested types per index. |
