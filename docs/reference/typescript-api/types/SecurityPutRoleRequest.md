# SecurityPutRoleRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Name`](Name.md) | The name of the role that is being created or updated. On Elasticsearch Serverless, the role name must begin with a letter or digit and can only contain letters, digits and the characters '_', '-', and '.'. Each role must have a unique name, as this will serve as the identifier for that role. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes. |
| `applications?` | `SecurityApplicationPrivileges[]` | A list of application privilege entries. |
| `cluster?` | `SecurityClusterPrivilege[]` | A list of cluster privileges. These privileges define the cluster-level actions for users with this role. |
| `global?` | `Record<string, any>` | An object defining global privileges. A global privilege is a form of cluster privilege that is request-aware. Support for global privileges is currently limited to the management of application privileges. |
| `indices?` | `SecurityIndicesPrivileges[]` | A list of indices permissions entries. |
| `remote_indices?` | `SecurityRemoteIndicesPrivileges[]` | A list of remote indices permissions entries.

NOTE: Remote indices are effective for remote clusters configured with the API key based model.
They have no effect for remote clusters configured with the certificate based model. |
| `remote_cluster?` | `SecurityRemoteClusterPrivileges[]` | A list of remote cluster permissions entries. |
| `metadata?` | [`Metadata`](Metadata.md) | Optional metadata. Within the metadata object, keys that begin with an underscore (`_`) are reserved for system use. |
| `run_as?` | `string[]` | A list of users that the owners of this role can impersonate. *Note*: in Serverless, the run-as feature is disabled. For API compatibility, you can still specify an empty `run_as` field, but a non-empty list will be rejected. |
| `description?` | `string` | Optional description of the role descriptor |
| `transient_metadata?` | `Record<string, any>` | Indicates roles that might be incompatible with the current cluster license, specifically roles with document and field level security. When the cluster license doesn’t allow certain features for a given role, this parameter is updated dynamically to list the incompatible features. If `enabled` is `false`, the role is ignored, but is still listed in the response from the authenticate API. |
| `body?` | `string | { [key: string]: any } & { name?: never, refresh?: never, applications?: never, cluster?: never, global?: never, indices?: never, remote_indices?: never, remote_cluster?: never, metadata?: never, run_as?: never, description?: never, transient_metadata?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, refresh?: never, applications?: never, cluster?: never, global?: never, indices?: never, remote_indices?: never, remote_cluster?: never, metadata?: never, run_as?: never, description?: never, transient_metadata?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
