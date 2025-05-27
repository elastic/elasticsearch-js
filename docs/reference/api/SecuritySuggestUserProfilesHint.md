## Interface `SecuritySuggestUserProfilesHint`

| Name | Type | Description |
| - | - | - |
| `labels` | Record<string, string | string[]> | A single key-value pair to match against the labels section of a profile. A profile is considered matching if it matches at least one of the strings. |
| `uids` | [SecurityUserProfileId](./SecurityUserProfileId.md)[] | A list of profile UIDs to match against. |
