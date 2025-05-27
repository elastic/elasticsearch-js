## Interface `CatAllocationAllocationRecord`

| Name | Type | Description |
| - | - | - |
| `"disk.avail"` | [ByteSize](./ByteSize.md) | null | Free disk space available to Elasticsearch. Elasticsearch retrieves this metric from the node’s operating system. Disk-based shard allocation uses this metric to assign shards to nodes based on available disk space. |
| `"disk.indices.forecast"` | [ByteSize](./ByteSize.md) | null | Sum of shard size forecasts |
| `"disk.indices"` | [ByteSize](./ByteSize.md) | null | Disk space used by the node’s shards. Does not include disk space for the translog or unassigned shards. IMPORTANT: This metric double-counts disk space for hard-linked files, such as those created when shrinking, splitting, or cloning an index. |
| `"disk.percent"` | [Percentage](./Percentage.md) | null | Total percentage of disk space in use. Calculated as `disk.used / disk.total`. |
| `"disk.total"` | [ByteSize](./ByteSize.md) | null | Total disk space for the node, including in-use and available space. |
| `"disk.used"` | [ByteSize](./ByteSize.md) | null | Total disk space in use. Elasticsearch retrieves this metric from the node’s operating system (OS). The metric includes disk space for: Elasticsearch, including the translog and unassigned shards; the node’s operating system; any other applications or files on the node. Unlike `disk.indices`, this metric does not double-count disk space for hard-linked files. |
| `"node.role"` | string | null | Node roles |
| `"shards.undesired"` | string | null | Amount of shards that are scheduled to be moved elsewhere in the cluster or -1 other than desired balance allocator is used |
| `"write_load.forecast"` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[double](./double.md)> | null | Sum of index write load forecasts |
| `da` | [ByteSize](./ByteSize.md) | null | Free disk space available to Elasticsearch. Elasticsearch retrieves this metric from the node’s operating system. Disk-based shard allocation uses this metric to assign shards to nodes based on available disk space. 'disk.avail' |
| `di` | [ByteSize](./ByteSize.md) | null | Disk space used by the node’s shards. Does not include disk space for the translog or unassigned shards. IMPORTANT: This metric double-counts disk space for hard-linked files, such as those created when shrinking, splitting, or cloning an index. 'disk.indices' |
| `dif` | [ByteSize](./ByteSize.md) | null | Sum of shard size forecasts 'disk.indices.forecast' |
| `diskAvail` | [ByteSize](./ByteSize.md) | null | Free disk space available to Elasticsearch. Elasticsearch retrieves this metric from the node’s operating system. Disk-based shard allocation uses this metric to assign shards to nodes based on available disk space. 'disk.avail' |
| `diskIndices` | [ByteSize](./ByteSize.md) | null | Disk space used by the node’s shards. Does not include disk space for the translog or unassigned shards. IMPORTANT: This metric double-counts disk space for hard-linked files, such as those created when shrinking, splitting, or cloning an index. 'disk.indices' |
| `diskIndicesForecast` | [ByteSize](./ByteSize.md) | null | Sum of shard size forecasts 'disk.indices.forecast' |
| `diskPercent` | [Percentage](./Percentage.md) | null | Total percentage of disk space in use. Calculated as `disk.used / disk.total`. 'disk.percent' |
| `diskTotal` | [ByteSize](./ByteSize.md) | null | Total disk space for the node, including in-use and available space. 'disk.total' |
| `diskUsed` | [ByteSize](./ByteSize.md) | null | Total disk space in use. Elasticsearch retrieves this metric from the node’s operating system (OS). The metric includes disk space for: Elasticsearch, including the translog and unassigned shards; the node’s operating system; any other applications or files on the node. Unlike `disk.indices`, this metric does not double-count disk space for hard-linked files. 'disk.used' |
| `dp` | [Percentage](./Percentage.md) | null | Total percentage of disk space in use. Calculated as `disk.used / disk.total`. 'disk.percent' |
| `dt` | [ByteSize](./ByteSize.md) | null | Total disk space for the node, including in-use and available space. 'disk.total' |
| `du` | [ByteSize](./ByteSize.md) | null | Total disk space in use. Elasticsearch retrieves this metric from the node’s operating system (OS). The metric includes disk space for: Elasticsearch, including the translog and unassigned shards; the node’s operating system; any other applications or files on the node. Unlike `disk.indices`, this metric does not double-count disk space for hard-linked files. 'disk.used' |
| `h` | [Host](./Host.md) | null | Network host for the node. Set using the `network.host` setting. host |
| `host` | [Host](./Host.md) | null | Network host for the node. Set using the `network.host` setting. |
| `ip` | [Ip](./Ip.md) | null | IP address and port for the node. |
| `n` | string | Name for the node. Set using the `node.name` setting. node |
| `node` | string | Name for the node. Set using the `node.name` setting. |
| `nodeRole` | string | null | Node roles 'node.role' |
| `r` | string | null | Node roles 'node.role' |
| `role` | string | null | Node roles 'node.role' |
| `s` | string | Number of primary and replica shards assigned to the node. shards |
| `shards` | string | Number of primary and replica shards assigned to the node. |
| `wlf` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[double](./double.md)> | null | Sum of index write load forecasts 'write_load.forecast' |
| `writeLoadForecast` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[double](./double.md)> | null | Sum of index write load forecasts 'write_load.forecast' |
