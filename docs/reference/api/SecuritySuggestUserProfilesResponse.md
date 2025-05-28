# `SecuritySuggestUserProfilesResponse` [interface-SecuritySuggestUserProfilesResponse]

| Name | Type | Description |
| - | - | - |
| `profiles` | [SecurityUserProfile](./SecurityUserProfile.md)[] | A list of profile documents, ordered by relevance, that match the search criteria. |
| `took` | [long](./long.md) | The number of milliseconds it took Elasticsearch to run the request. |
| `total` | [SecuritySuggestUserProfilesTotalUserProfiles](./SecuritySuggestUserProfilesTotalUserProfiles.md) | Metadata about the number of matching profiles. |
