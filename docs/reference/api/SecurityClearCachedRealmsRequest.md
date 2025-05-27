## Interface `SecurityClearCachedRealmsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { realms?: never; usernames?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { realms?: never; usernames?: never; } | All values in `querystring` will be added to the request querystring. |
| `realms` | [Names](./Names.md) | A comma-separated list of realms. To clear all realms, use an asterisk ( `*`). It does not support other wildcard patterns. |
| `usernames` | string[] | A comma-separated list of the users to clear from the cache. If you do not specify this parameter, the API evicts all users from the user cache. |
