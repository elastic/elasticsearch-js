# `NodesInfoNodeInfo` [interface-NodesInfoNodeInfo]

| Name | Type | Description |
| - | - | - |
| `aggregations` | Record<string, [NodesInfoNodeInfoAggregation](./NodesInfoNodeInfoAggregation.md)> | &nbsp; |
| `attributes` | Record<string, string> | &nbsp; |
| `build_flavor` | string | &nbsp; |
| `build_hash` | string | Short hash of the last git commit in this release. |
| `build_type` | string | &nbsp; |
| `host` | [Host](./Host.md) | The node’s host name. |
| `http` | [NodesInfoNodeInfoHttp](./NodesInfoNodeInfoHttp.md) | &nbsp; |
| `ingest` | [NodesInfoNodeInfoIngest](./NodesInfoNodeInfoIngest.md) | &nbsp; |
| `ip` | [Ip](./Ip.md) | The node’s IP address. |
| `jvm` | [NodesInfoNodeJvmInfo](./NodesInfoNodeJvmInfo.md) | &nbsp; |
| `modules` | [PluginStats](./PluginStats.md)[] | &nbsp; |
| `name` | [Name](./Name.md) | The node's name |
| `network` | [NodesInfoNodeInfoNetwork](./NodesInfoNodeInfoNetwork.md) | &nbsp; |
| `os` | [NodesInfoNodeOperatingSystemInfo](./NodesInfoNodeOperatingSystemInfo.md) | &nbsp; |
| `plugins` | [PluginStats](./PluginStats.md)[] | &nbsp; |
| `process` | [NodesInfoNodeProcessInfo](./NodesInfoNodeProcessInfo.md) | &nbsp; |
| `roles` | [NodeRoles](./NodeRoles.md) | &nbsp; |
| `settings` | [NodesInfoNodeInfoSettings](./NodesInfoNodeInfoSettings.md) | &nbsp; |
| `thread_pool` | Record<string, [NodesInfoNodeThreadPoolInfo](./NodesInfoNodeThreadPoolInfo.md)> | &nbsp; |
| `total_indexing_buffer_in_bytes` | [ByteSize](./ByteSize.md) | Same as total_indexing_buffer, but expressed in bytes. |
| `total_indexing_buffer` | [long](./long.md) | Total heap allowed to be used to hold recently indexed documents before they must be written to disk. This size is a shared pool across all shards on this node, and is controlled by Indexing Buffer settings. |
| `transport_address` | [TransportAddress](./TransportAddress.md) | Host and port where transport HTTP connections are accepted. |
| `transport` | [NodesInfoNodeInfoTransport](./NodesInfoNodeInfoTransport.md) | &nbsp; |
| `version` | [VersionString](./VersionString.md) | Elasticsearch version running on this node. |
