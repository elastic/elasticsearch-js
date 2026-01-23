# NodesStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adaptive_selection?` | `Record<string, NodesAdaptiveSelection>` | Statistics about adaptive replica selection. |
| `breakers?` | `Record<string, NodesBreaker>` | Statistics about the field data circuit breaker. |
| `fs?` | [`NodesFileSystem`](NodesFileSystem.md) | File system information, data path, free disk space, read/write stats. |
| `host?` | [`Host`](Host.md) | Network host for the node, based on the network host setting. |
| `http?` | [`NodesHttp`](NodesHttp.md) | HTTP connection information. |
| `ingest?` | [`NodesIngest`](NodesIngest.md) | Statistics about ingest preprocessing. |
| `ip?` | `Ip | Ip[]` | IP address and port for the node. |
| `jvm?` | [`NodesJvm`](NodesJvm.md) | JVM stats, memory pool information, garbage collection, buffer pools, number of loaded/unloaded classes. |
| `name?` | [`Name`](Name.md) | Human-readable identifier for the node.
Based on the node name setting. |
| `os?` | [`NodesOperatingSystem`](NodesOperatingSystem.md) | Operating system stats, load average, mem, swap. |
| `process?` | [`NodesProcess`](NodesProcess.md) | Process statistics, memory consumption, cpu usage, open file descriptors. |
| `roles?` | [`NodeRoles`](NodeRoles.md) | Roles assigned to the node. |
| `script?` | [`NodesScripting`](NodesScripting.md) | Contains script statistics for the node. |
| `script_cache?` | `Record<string, NodesScriptCache | NodesScriptCache[]>` | - |
| `thread_pool?` | `Record<string, NodesThreadCount>` | Statistics about each thread pool, including current size, queue and rejected tasks. |
| `timestamp?` | [`long`](long.md) | - |
| `transport?` | [`NodesTransport`](NodesTransport.md) | Transport statistics about sent and received bytes in cluster communication. |
| `transport_address?` | [`TransportAddress`](TransportAddress.md) | Host and port for the transport layer, used for internal communication between nodes in a cluster. |
| `attributes?` | `Record<Field, string>` | Contains a list of attributes for the node. |
| `discovery?` | [`NodesDiscovery`](NodesDiscovery.md) | Contains node discovery statistics for the node. |
| `indexing_pressure?` | [`NodesIndexingPressure`](NodesIndexingPressure.md) | Contains indexing pressure statistics for the node. |
| `indices?` | [`IndicesStatsShardStats`](IndicesStatsShardStats.md) | Indices stats about size, document count, indexing and deletion times, search times, field cache size, merges and flushes. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
