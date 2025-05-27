## Interface `SecurityRoleDescriptor`

| Name | Type | Description |
| - | - | - |
| `applications` | [SecurityApplicationPrivileges](./SecurityApplicationPrivileges.md)[] | A list of application privilege entries |
| `cluster` | [SecurityClusterPrivilege](./SecurityClusterPrivilege.md)[] | A list of cluster privileges. These privileges define the cluster level actions that API keys are able to execute. |
| `description` | string | Optional description of the role descriptor |
| `global` | [SecurityGlobalPrivilege](./SecurityGlobalPrivilege.md)[] | [SecurityGlobalPrivilege](./SecurityGlobalPrivilege.md) | An object defining global privileges. A global privilege is a form of cluster privilege that is request-aware. Support for global privileges is currently limited to the management of application privileges. |
| `index` | [SecurityIndicesPrivileges](./SecurityIndicesPrivileges.md)[] | A list of indices permissions entries. indices |
| `indices` | [SecurityIndicesPrivileges](./SecurityIndicesPrivileges.md)[] | A list of indices permissions entries. |
| `metadata` | [Metadata](./Metadata.md) | Optional meta-data. Within the metadata object, keys that begin with `_` are reserved for system usage. |
| `remote_cluster` | [SecurityRemoteClusterPrivileges](./SecurityRemoteClusterPrivileges.md)[] | A list of cluster permissions for remote clusters. NOTE: This is limited a subset of the cluster permissions. |
| `remote_indices` | [SecurityRemoteIndicesPrivileges](./SecurityRemoteIndicesPrivileges.md)[] | A list of indices permissions for remote clusters. |
| `restriction` | [SecurityRestriction](./SecurityRestriction.md) | Restriction for when the role descriptor is allowed to be effective. |
| `run_as` | string[] | A list of users that the API keys can impersonate. NOTE: In Elastic Cloud Serverless, the run-as feature is disabled. For API compatibility, you can still specify an empty `run_as` field, but a non-empty list will be rejected. |
| `transient_metadata` | Record<string, any> | &nbsp; |
