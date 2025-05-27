## Interface `SecurityGetRoleRole`

| Name | Type | Description |
| - | - | - |
| `applications` | [SecurityApplicationPrivileges](./SecurityApplicationPrivileges.md)[] | &nbsp; |
| `cluster` | [SecurityClusterPrivilege](./SecurityClusterPrivilege.md)[] | &nbsp; |
| `description` | string | &nbsp; |
| `global` | Record<string, Record<string, Record<string, string[]>>> | &nbsp; |
| `indices` | [SecurityIndicesPrivileges](./SecurityIndicesPrivileges.md)[] | &nbsp; |
| `metadata` | [Metadata](./Metadata.md) | &nbsp; |
| `remote_cluster` | [SecurityRemoteClusterPrivileges](./SecurityRemoteClusterPrivileges.md)[] | &nbsp; |
| `remote_indices` | [SecurityRemoteIndicesPrivileges](./SecurityRemoteIndicesPrivileges.md)[] | &nbsp; |
| `role_templates` | [SecurityRoleTemplate](./SecurityRoleTemplate.md)[] | &nbsp; |
| `run_as` | string[] | &nbsp; |
| `transient_metadata` | Record<string, any> | &nbsp; |
