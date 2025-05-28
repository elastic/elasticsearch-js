# `IndicesResolveClusterResolveClusterInfo` [interface-IndicesResolveClusterResolveClusterInfo]

| Name | Type | Description |
| - | - | - |
| `connected` | boolean | Whether the remote cluster is connected to the local (querying) cluster. |
| `error` | string | Provides error messages that are likely to occur if you do a search with this index expression on the specified cluster (for example, lack of security privileges to query an index). |
| `matching_indices` | boolean | Whether the index expression provided in the request matches any indices, aliases or data streams on the cluster. |
| `skip_unavailable` | boolean | The `skip_unavailable` setting for a remote cluster. |
| `version` | [ElasticsearchVersionMinInfo](./ElasticsearchVersionMinInfo.md) | Provides version information about the cluster. |
