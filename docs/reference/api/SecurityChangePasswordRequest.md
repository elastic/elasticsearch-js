# `SecurityChangePasswordRequest` [interface-SecurityChangePasswordRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { username?: never; refresh?: never; password?: never; password_hash?: never; }) | All values in `body` will be added to the request body. |
| `password_hash` | string | A hash of the new password value. This must be produced using the same hashing algorithm as has been configured for password storage. For more details, see the explanation of the `xpack.security.authc.password_hashing.algorithm` setting. |
| `password` | [Password](./Password.md) | The new password value. Passwords must be at least 6 characters long. |
| `querystring` | { [key: string]: any; } & { username?: never; refresh?: never; password?: never; password_hash?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `username` | [Username](./Username.md) | The user whose password you want to change. If you do not specify this parameter, the password is changed for the current user. |
