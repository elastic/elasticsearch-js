# CatAllocationAllocationRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `shards?` | `string` | Number of primary and replica shards assigned to the node. |
| `s?` | `string` | Number of primary and replica shards assigned to the node. |
| `'shards.undesired'?` | `string | null` | Amount of shards that are scheduled to be moved elsewhere in the cluster or -1 other than desired balance allocator is used |
| `'write_load.forecast'?` | `SpecUtilsStringified<double> | null` | Sum of index write load forecasts |
| `wlf?` | `SpecUtilsStringified<double> | null` | Sum of index write load forecasts |
| `writeLoadForecast?` | `SpecUtilsStringified<double> | null` | Sum of index write load forecasts |
| `'disk.indices.forecast'?` | `ByteSize | null` | Sum of shard size forecasts |
| `dif?` | `ByteSize | null` | Sum of shard size forecasts |
| `diskIndicesForecast?` | `ByteSize | null` | Sum of shard size forecasts |
| `'disk.indices'?` | `ByteSize | null` | Disk space used by the node’s shards. Does not include disk space for the translog or unassigned shards.
IMPORTANT: This metric double-counts disk space for hard-linked files, such as those created when shrinking, splitting, or cloning an index. |
| `di?` | `ByteSize | null` | Disk space used by the node’s shards. Does not include disk space for the translog or unassigned shards.
IMPORTANT: This metric double-counts disk space for hard-linked files, such as those created when shrinking, splitting, or cloning an index. |
| `diskIndices?` | `ByteSize | null` | Disk space used by the node’s shards. Does not include disk space for the translog or unassigned shards.
IMPORTANT: This metric double-counts disk space for hard-linked files, such as those created when shrinking, splitting, or cloning an index. |
| `'disk.used'?` | `ByteSize | null` | Total disk space in use.
Elasticsearch retrieves this metric from the node’s operating system (OS).
The metric includes disk space for: Elasticsearch, including the translog and unassigned shards; the node’s operating system; any other applications or files on the node.
Unlike `disk.indices`, this metric does not double-count disk space for hard-linked files. |
| `du?` | `ByteSize | null` | Total disk space in use.
Elasticsearch retrieves this metric from the node’s operating system (OS).
The metric includes disk space for: Elasticsearch, including the translog and unassigned shards; the node’s operating system; any other applications or files on the node.
Unlike `disk.indices`, this metric does not double-count disk space for hard-linked files. |
| `diskUsed?` | `ByteSize | null` | Total disk space in use.
Elasticsearch retrieves this metric from the node’s operating system (OS).
The metric includes disk space for: Elasticsearch, including the translog and unassigned shards; the node’s operating system; any other applications or files on the node.
Unlike `disk.indices`, this metric does not double-count disk space for hard-linked files. |
| `'disk.avail'?` | `ByteSize | null` | Free disk space available to Elasticsearch.
Elasticsearch retrieves this metric from the node’s operating system.
Disk-based shard allocation uses this metric to assign shards to nodes based on available disk space. |
| `da?` | `ByteSize | null` | Free disk space available to Elasticsearch.
Elasticsearch retrieves this metric from the node’s operating system.
Disk-based shard allocation uses this metric to assign shards to nodes based on available disk space. |
| `diskAvail?` | `ByteSize | null` | Free disk space available to Elasticsearch.
Elasticsearch retrieves this metric from the node’s operating system.
Disk-based shard allocation uses this metric to assign shards to nodes based on available disk space. |
| `'disk.total'?` | `ByteSize | null` | Total disk space for the node, including in-use and available space. |
| `dt?` | `ByteSize | null` | Total disk space for the node, including in-use and available space. |
| `diskTotal?` | `ByteSize | null` | Total disk space for the node, including in-use and available space. |
| `'disk.percent'?` | `Percentage | null` | Total percentage of disk space in use. Calculated as `disk.used / disk.total`. |
| `dp?` | `Percentage | null` | Total percentage of disk space in use. Calculated as `disk.used / disk.total`. |
| `diskPercent?` | `Percentage | null` | Total percentage of disk space in use. Calculated as `disk.used / disk.total`. |
| `host?` | `Host | null` | Network host for the node. Set using the `network.host` setting. |
| `h?` | `Host | null` | Network host for the node. Set using the `network.host` setting. |
| `ip?` | `Ip | null` | IP address and port for the node. |
| `node?` | `string` | Name for the node. Set using the `node.name` setting. |
| `n?` | `string` | Name for the node. Set using the `node.name` setting. |
| `'node.role'?` | `string | null` | Node roles |
| `r?` | `string | null` | Node roles |
| `role?` | `string | null` | Node roles |
| `nodeRole?` | `string | null` | Node roles |

## See Also

- [All Types](./)
- [API Methods](../index.md)
