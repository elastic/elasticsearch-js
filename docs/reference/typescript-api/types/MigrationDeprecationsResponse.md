# MigrationDeprecationsResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cluster_settings` | `MigrationDeprecationsDeprecation[]` | Cluster-level deprecation warnings. |
| `index_settings` | `Record<string, MigrationDeprecationsDeprecation[]>` | Index warnings are sectioned off per index and can be filtered using an index-pattern in the query.
This section includes warnings for the backing indices of data streams specified in the request path. |
| `data_streams` | `Record<string, MigrationDeprecationsDeprecation[]>` | - |
| `node_settings` | `MigrationDeprecationsDeprecation[]` | Node-level deprecation warnings.
Since only a subset of your nodes might incorporate these settings, it is important to read the details section for more information about which nodes are affected. |
| `ml_settings` | `MigrationDeprecationsDeprecation[]` | Machine learning-related deprecation warnings. |
| `templates` | `Record<string, MigrationDeprecationsDeprecation[]>` | Template warnings are sectioned off per template and include deprecations for both component templates and
index templates. |
| `ilm_policies` | `Record<string, MigrationDeprecationsDeprecation[]>` | ILM policy warnings are sectioned off per policy. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
