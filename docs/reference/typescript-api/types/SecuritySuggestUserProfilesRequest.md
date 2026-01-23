# SecuritySuggestUserProfilesRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name?` | `string` | A query string used to match name-related fields in user profile documents.
Name-related fields are the user's `username`, `full_name`, and `email`. |
| `size?` | `long` | The number of profiles to return. |
| `data?` | `string | string[]` | A comma-separated list of filters for the `data` field of the profile document.
To return all content use `data=*`.
To return a subset of content, use `data=<key>` to retrieve content nested under the specified `<key>`.
By default, the API returns no `data` content.
It is an error to specify `data` as both the query parameter and the request body field. |
| `hint?` | [`SecuritySuggestUserProfilesHint`](SecuritySuggestUserProfilesHint.md) | Extra search criteria to improve relevance of the suggestion result.
Profiles matching the spcified hint are ranked higher in the response.
Profiles not matching the hint aren't excluded from the response as long as the profile matches the `name` field query. |
| `body?` | `string | { [key: string]: any } & { name?: never, size?: never, data?: never, hint?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, size?: never, data?: never, hint?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
