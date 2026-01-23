# ClusterStatsCCSUsageStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total` | `integer` | The total number of cross-cluster search requests that have been executed by the cluster. |
| `success` | `integer` | The total number of cross-cluster search requests that have been successfully executed by the cluster. |
| `skipped` | `integer` | The total number of cross-cluster search requests (successful or failed) that had at least one remote cluster skipped. |
| `took` | [`ClusterStatsCCSUsageTimeValue`](ClusterStatsCCSUsageTimeValue.md) | Statistics about the time taken to execute cross-cluster search requests. |
| `took_mrt_true?` | [`ClusterStatsCCSUsageTimeValue`](ClusterStatsCCSUsageTimeValue.md) | Statistics about the time taken to execute cross-cluster search requests for which the `ccs_minimize_roundtrips` setting was set to `true`. |
| `took_mrt_false?` | [`ClusterStatsCCSUsageTimeValue`](ClusterStatsCCSUsageTimeValue.md) | Statistics about the time taken to execute cross-cluster search requests for which the `ccs_minimize_roundtrips` setting was set to `false`. |
| `remotes_per_search_max` | `integer` | The maximum number of remote clusters that were queried in a single cross-cluster search request. |
| `remotes_per_search_avg` | `double` | The average number of remote clusters that were queried in a single cross-cluster search request. |
| `failure_reasons` | `Record<string, integer>` | Statistics about the reasons for cross-cluster search request failures. The keys are the failure reason names and the values are the number of requests that failed for that reason. |
| `features` | `Record<string, integer>` | The keys are the names of the search feature, and the values are the number of requests that used that feature. Single request can use more than one feature (e.g. both `async` and `wildcard`). |
| `clients` | `Record<string, integer>` | Statistics about the clients that executed cross-cluster search requests. The keys are the names of the clients, and the values are the number of requests that were executed by that client. Only known clients (such as `kibana` or `elasticsearch`) are counted. |
| `clusters` | `Record<string, ClusterStatsCCSUsageClusterStats>` | Statistics about the clusters that were queried in cross-cluster search requests. The keys are cluster names, and the values are per-cluster telemetry data. This also includes the local cluster itself, which uses the name `(local)`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
