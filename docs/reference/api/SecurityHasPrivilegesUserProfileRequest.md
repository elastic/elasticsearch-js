# `SecurityHasPrivilegesUserProfileRequest` [interface-SecurityHasPrivilegesUserProfileRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { uids?: never; privileges?: never; }) | All values in `body` will be added to the request body. |
| `privileges` | [SecurityHasPrivilegesUserProfilePrivilegesCheck](./SecurityHasPrivilegesUserProfilePrivilegesCheck.md) | An object containing all the privileges to be checked. |
| `querystring` | { [key: string]: any; } & { uids?: never; privileges?: never; } | All values in `querystring` will be added to the request querystring. |
| `uids` | [SecurityUserProfileId](./SecurityUserProfileId.md)[] | A list of profile IDs. The privileges are checked for associated users of the profiles. |
