# SecuritySuggestUserProfilesResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total` | [`SecuritySuggestUserProfilesTotalUserProfiles`](SecuritySuggestUserProfilesTotalUserProfiles.md) | Metadata about the number of matching profiles. |
| `took` | [`long`](long.md) | The number of milliseconds it took Elasticsearch to run the request. |
| `profiles` | [`SecurityUserProfile`](SecurityUserProfile.md)[] | A list of profile documents, ordered by relevance, that match the search criteria. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
