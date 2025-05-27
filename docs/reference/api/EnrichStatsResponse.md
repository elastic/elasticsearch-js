## Interface `EnrichStatsResponse`

| Name | Type | Description |
| - | - | - |
| `cache_stats` | [EnrichStatsCacheStats](./EnrichStatsCacheStats.md)[] | Objects containing information about the enrich cache stats on each ingest node. |
| `coordinator_stats` | [EnrichStatsCoordinatorStats](./EnrichStatsCoordinatorStats.md)[] | Objects containing information about each coordinating ingest node for configured enrich processors. |
| `executing_policies` | [EnrichStatsExecutingPolicy](./EnrichStatsExecutingPolicy.md)[] | Objects containing information about each enrich policy that is currently executing. |
