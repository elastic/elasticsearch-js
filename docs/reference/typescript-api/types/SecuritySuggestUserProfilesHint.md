# SecuritySuggestUserProfilesHint

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `uids?` | [`SecurityUserProfileId`](SecurityUserProfileId.md)[] | A list of profile UIDs to match against. |
| `labels?` | `Record<string, string | string[]>` | A single key-value pair to match against the labels section
of a profile. A profile is considered matching if it matches
at least one of the strings. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
