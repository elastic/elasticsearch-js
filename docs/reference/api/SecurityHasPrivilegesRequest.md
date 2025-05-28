# `SecurityHasPrivilegesRequest` [interface-SecurityHasPrivilegesRequest]

| Name | Type | Description |
| - | - | - |
| `application` | [SecurityHasPrivilegesApplicationPrivilegesCheck](./SecurityHasPrivilegesApplicationPrivilegesCheck.md)[] | &nbsp; |
| `body` | string | ({ [key: string]: any; } & { user?: never; application?: never; cluster?: never; index?: never; }) | All values in `body` will be added to the request body. |
| `cluster` | [SecurityClusterPrivilege](./SecurityClusterPrivilege.md)[] | A list of the cluster privileges that you want to check. |
| `index` | [SecurityHasPrivilegesIndexPrivilegesCheck](./SecurityHasPrivilegesIndexPrivilegesCheck.md)[] | &nbsp; |
| `querystring` | { [key: string]: any; } & { user?: never; application?: never; cluster?: never; index?: never; } | All values in `querystring` will be added to the request querystring. |
| `user` | [Name](./Name.md) | Username |
