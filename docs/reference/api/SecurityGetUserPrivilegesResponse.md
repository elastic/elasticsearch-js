## Interface `SecurityGetUserPrivilegesResponse`

| Name | Type | Description |
| - | - | - |
| `applications` | [SecurityApplicationPrivileges](./SecurityApplicationPrivileges.md)[] | &nbsp; |
| `cluster` | string[] | &nbsp; |
| `global` | [SecurityGlobalPrivilege](./SecurityGlobalPrivilege.md)[] | &nbsp; |
| `indices` | [SecurityUserIndicesPrivileges](./SecurityUserIndicesPrivileges.md)[] | &nbsp; |
| `remote_cluster` | [SecurityRemoteClusterPrivileges](./SecurityRemoteClusterPrivileges.md)[] | &nbsp; |
| `remote_indices` | [SecurityRemoteUserIndicesPrivileges](./SecurityRemoteUserIndicesPrivileges.md)[] | &nbsp; |
| `run_as` | string[] | &nbsp; |
