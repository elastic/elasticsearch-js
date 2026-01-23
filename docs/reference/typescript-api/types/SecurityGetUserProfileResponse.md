# SecurityGetUserProfileResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `profiles` | `SecurityUserProfileWithMetadata[]` | A successful call returns the JSON representation of the user profile and its internal versioning numbers.
The API returns an empty object if no profile document is found for the provided `uid`.
The content of the data field is not returned by default to avoid deserializing a potential large payload. |
| `errors?` | [`SecurityGetUserProfileGetUserProfileErrors`](SecurityGetUserProfileGetUserProfileErrors.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
