# `SecurityClearCachedPrivilegesRequest` [interface-SecurityClearCachedPrivilegesRequest]

| Name | Type | Description |
| - | - | - |
| `application` | [Name](./Name.md) | A comma-separated list of applications. To clear all applications, use an asterism ( `*`). It does not support other wildcard patterns. |
| `body` | string | ({ [key: string]: any; } & { application?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { application?: never; } | All values in `querystring` will be added to the request querystring. |
