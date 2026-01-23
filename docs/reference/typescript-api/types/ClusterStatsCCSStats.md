# ClusterStatsCCSStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `clusters?` | `Record<string, ClusterStatsRemoteClusterInfo>` | Contains remote cluster settings and metrics collected from them.
The keys are cluster names, and the values are per-cluster data.
Only present if `include_remotes` option is set to true. |
| `_search` | [`ClusterStatsCCSUsageStats`](ClusterStatsCCSUsageStats.md) | Information about cross-cluster search usage. |
| `_esql?` | [`ClusterStatsCCSUsageStats`](ClusterStatsCCSUsageStats.md) | Information about ES|QL cross-cluster query usage. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
