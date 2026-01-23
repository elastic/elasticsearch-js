# SecurityGetRoleRole

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cluster` | [`SecurityClusterPrivilege`](SecurityClusterPrivilege.md)[] | - |
| `indices` | [`SecurityIndicesPrivileges`](SecurityIndicesPrivileges.md)[] | - |
| `remote_indices?` | [`SecurityRemoteIndicesPrivileges`](SecurityRemoteIndicesPrivileges.md)[] | - |
| `remote_cluster?` | [`SecurityRemoteClusterPrivileges`](SecurityRemoteClusterPrivileges.md)[] | - |
| `metadata` | [`Metadata`](Metadata.md) | - |
| `description?` | `string` | - |
| `run_as?` | `string[]` | - |
| `transient_metadata?` | `Record<string, any>` | - |
| `applications` | [`SecurityApplicationPrivileges`](SecurityApplicationPrivileges.md)[] | - |
| `role_templates?` | [`SecurityRoleTemplate`](SecurityRoleTemplate.md)[] | - |
| `global?` | `Record<string, Record<string, Record<string, string[]>>>` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
