## Interface `MigrationDeprecationsResponse`

| Name | Type | Description |
| - | - | - |
| `cluster_settings` | [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[] | Cluster-level deprecation warnings. |
| `data_streams` | Record<string, [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[]> | &nbsp; |
| `ilm_policies` | Record<string, [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[]> | ILM policy warnings are sectioned off per policy. |
| `index_settings` | Record<string, [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[]> | Index warnings are sectioned off per index and can be filtered using an index-pattern in the query. This section includes warnings for the backing indices of data streams specified in the request path. |
| `ml_settings` | [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[] | Machine learning-related deprecation warnings. |
| `node_settings` | [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[] | Node-level deprecation warnings. Since only a subset of your nodes might incorporate these settings, it is important to read the details section for more information about which nodes are affected. |
| `templates` | Record<string, [MigrationDeprecationsDeprecation](./MigrationDeprecationsDeprecation.md)[]> | Template warnings are sectioned off per template and include deprecations for both component templates and index templates. |
