# SecurityGetUserPrivilegesResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `applications` | [`SecurityApplicationPrivileges`](SecurityApplicationPrivileges.md)[] | - |
| `cluster` | `string`[] | - |
| `remote_cluster?` | [`SecurityRemoteClusterPrivileges`](SecurityRemoteClusterPrivileges.md)[] | - |
| `global` | [`SecurityGlobalPrivilege`](SecurityGlobalPrivilege.md)[] | - |
| `indices` | [`SecurityUserIndicesPrivileges`](SecurityUserIndicesPrivileges.md)[] | - |
| `remote_indices?` | [`SecurityRemoteUserIndicesPrivileges`](SecurityRemoteUserIndicesPrivileges.md)[] | - |
| `run_as` | `string`[] | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
