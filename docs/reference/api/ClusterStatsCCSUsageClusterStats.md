## Interface `ClusterStatsCCSUsageClusterStats`

| Name | Type | Description |
| - | - | - |
| `skipped` | [integer](./integer.md) | The total number of cross-cluster search requests for which this cluster was skipped. |
| `took` | [ClusterStatsCCSUsageTimeValue](./ClusterStatsCCSUsageTimeValue.md) | Statistics about the time taken to execute requests against this cluster. |
| `total` | [integer](./integer.md) | The total number of successful (not skipped) cross-cluster search requests that were executed against this cluster. This may include requests where partial results were returned, but not requests in which the cluster has been skipped entirely. |
