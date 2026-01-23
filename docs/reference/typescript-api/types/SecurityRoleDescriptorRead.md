# SecurityRoleDescriptorRead

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cluster` | `SecurityClusterPrivilege[]` | A list of cluster privileges. These privileges define the cluster level actions that API keys are able to execute. |
| `indices` | `SecurityIndicesPrivileges[]` | A list of indices permissions entries. |
| `index` | `SecurityIndicesPrivileges[]` | A list of indices permissions entries. |
| `remote_indices?` | `SecurityRemoteIndicesPrivileges[]` | A list of indices permissions for remote clusters. |
| `remote_cluster?` | `SecurityRemoteClusterPrivileges[]` | A list of cluster permissions for remote clusters.
NOTE: This is limited a subset of the cluster permissions. |
| `global?` | `SecurityGlobalPrivilege[] | SecurityGlobalPrivilege` | An object defining global privileges. A global privilege is a form of cluster privilege that is request-aware. Support for global privileges is currently limited to the management of application privileges. |
| `applications?` | `SecurityApplicationPrivileges[]` | A list of application privilege entries |
| `metadata?` | [`Metadata`](Metadata.md) | Optional meta-data. Within the metadata object, keys that begin with `_` are reserved for system usage. |
| `run_as?` | `string[]` | A list of users that the API keys can impersonate. |
| `description?` | `string` | An optional description of the role descriptor. |
| `restriction?` | [`SecurityRestriction`](SecurityRestriction.md) | A restriction for when the role descriptor is allowed to be effective. |
| `transient_metadata?` | `Record<string, any>` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
