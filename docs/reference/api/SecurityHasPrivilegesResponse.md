## Interface `SecurityHasPrivilegesResponse`

| Name | Type | Description |
| - | - | - |
| `application` | [SecurityHasPrivilegesApplicationsPrivileges](./SecurityHasPrivilegesApplicationsPrivileges.md) | &nbsp; |
| `cluster` | Record<string, boolean> | &nbsp; |
| `has_all_requested` | boolean | &nbsp; |
| `index` | Record<[IndexName](./IndexName.md), [SecurityHasPrivilegesPrivileges](./SecurityHasPrivilegesPrivileges.md)> | &nbsp; |
| `username` | [Username](./Username.md) | &nbsp; |
