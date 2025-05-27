## Interface `SecurityPutUserRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { username?: never; refresh?: never; email?: never; full_name?: never; metadata?: never; password?: never; password_hash?: never; roles?: never; enabled?: never; }) | All values in `body` will be added to the request body. |
| `email` | string | null | The email of the user. |
| `enabled` | boolean | Specifies whether the user is enabled. |
| `full_name` | string | null | The full name of the user. |
| `metadata` | [Metadata](./Metadata.md) | Arbitrary metadata that you want to associate with the user. |
| `password_hash` | string | A hash of the user's password. This must be produced using the same hashing algorithm as has been configured for password storage. For more details, see the explanation of the `xpack.security.authc.password_hashing.algorithm` setting in the user cache and password hash algorithm documentation. Using this parameter allows the client to pre-hash the password for performance and/or confidentiality reasons. The `password` parameter and the `password_hash` parameter cannot be used in the same request. |
| `password` | [Password](./Password.md) | The user's password. Passwords must be at least 6 characters long. When adding a user, one of `password` or `password_hash` is required. When updating an existing user, the password is optional, so that other fields on the user (such as their roles) may be updated without modifying the user's password |
| `querystring` | { [key: string]: any; } & { username?: never; refresh?: never; email?: never; full_name?: never; metadata?: never; password?: never; password_hash?: never; roles?: never; enabled?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | Valid values are `true`, `false`, and `wait_for`. These values have the same meaning as in the index API, but the default value for this API is true. |
| `roles` | string[] | A set of roles the user has. The roles determine the user's access permissions. To create a user without any roles, specify an empty list ( `[]`). |
| `username` | [Username](./Username.md) | An identifier for the user. NOTE: Usernames must be at least 1 and no more than 507 characters. They can contain alphanumeric characters (a-z, A-Z, 0-9), spaces, punctuation, and printable symbols in the Basic Latin (ASCII) block. Leading or trailing whitespace is not allowed. |
