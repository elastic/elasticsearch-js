# SecurityGetRoleRole

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cluster` | `SecurityClusterPrivilege[]` | - |
| `indices` | `SecurityIndicesPrivileges[]` | - |
| `remote_indices?` | `SecurityRemoteIndicesPrivileges[]` | - |
| `remote_cluster?` | `SecurityRemoteClusterPrivileges[]` | - |
| `metadata` | [`Metadata`](Metadata.md) | - |
| `description?` | `string` | - |
| `run_as?` | `string[]` | - |
| `transient_metadata?` | `Record<string, any>` | - |
| `applications` | `SecurityApplicationPrivileges[]` | - |
| `role_templates?` | `SecurityRoleTemplate[]` | - |
| `global?` | `Record<string, Record<string, Record<string, string[]>>>` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
