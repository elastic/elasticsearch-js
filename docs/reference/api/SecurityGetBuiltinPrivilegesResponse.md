# `SecurityGetBuiltinPrivilegesResponse` [interface-SecurityGetBuiltinPrivilegesResponse]

| Name | Type | Description |
| - | - | - |
| `cluster` | [SecurityClusterPrivilege](./SecurityClusterPrivilege.md)[] | The list of cluster privileges that are understood by this version of Elasticsearch. |
| `index` | [IndexName](./IndexName.md)[] | The list of index privileges that are understood by this version of Elasticsearch. |
| `remote_cluster` | [SecurityRemoteClusterPrivilege](./SecurityRemoteClusterPrivilege.md)[] | The list of remote_cluster privileges that are understood by this version of Elasticsearch. |
