## Interface `AsyncSearchStatusStatusResponseBase`

| Name | Type | Description |
| - | - | - |
| `_clusters` | [ClusterStatistics](./ClusterStatistics.md) | Metadata about clusters involved in the cross-cluster search. It is not shown for local-only searches. |
| `_shards` | [ShardStatistics](./ShardStatistics.md) | The number of shards that have run the query so far. |
| `completion_status` | [integer](./integer.md) | If the async search completed, this field shows the status code of the search. For example, `200` indicates that the async search was successfully completed. `503` indicates that the async search was completed with an error. |
