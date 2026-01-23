# AsyncSearchStatusStatusResponseBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | The number of shards that have run the query so far. |
| `_clusters?` | [`ClusterStatistics`](ClusterStatistics.md) | Metadata about clusters involved in the cross-cluster search.
It is not shown for local-only searches. |
| `completion_status?` | `integer` | If the async search completed, this field shows the status code of the search.
For example, `200` indicates that the async search was successfully completed.
`503` indicates that the async search was completed with an error. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
