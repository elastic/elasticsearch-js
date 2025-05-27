## Interface `SecurityGetUserRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { username?: never; with_profile_uid?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { username?: never; with_profile_uid?: never; } | All values in `querystring` will be added to the request querystring. |
| `username` | [Username](./Username.md) | [Username](./Username.md)[] | An identifier for the user. You can specify multiple usernames as a comma-separated list. If you omit this parameter, the API retrieves information about all users. |
| `with_profile_uid` | boolean | Determines whether to retrieve the user profile UID, if it exists, for the users. |
