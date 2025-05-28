# `SecurityGetUserProfileRequest` [interface-SecurityGetUserProfileRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { uid?: never; data?: never; }) | All values in `body` will be added to the request body. |
| `data` | string | string[] | A comma-separated list of filters for the `data` field of the profile document. To return all content use `data=*`. To return a subset of content use `data=<key>` to retrieve content nested under the specified `<key>`. By default returns no `data` content. |
| `querystring` | { [key: string]: any; } & { uid?: never; data?: never; } | All values in `querystring` will be added to the request querystring. |
| `uid` | [SecurityUserProfileId](./SecurityUserProfileId.md) | [SecurityUserProfileId](./SecurityUserProfileId.md)[] | A unique identifier for the user profile. |
