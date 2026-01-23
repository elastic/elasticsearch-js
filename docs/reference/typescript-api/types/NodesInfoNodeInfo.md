# NodesInfoNodeInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `attributes` | `Record<string, string>` | - |
| `build_flavor` | `string` | - |
| `build_hash` | `string` | Short hash of the last git commit in this release. |
| `build_type` | `string` | - |
| `component_versions` | `Record<Name, integer>` | - |
| `host` | [`Host`](Host.md) | The node’s host name. |
| `http?` | [`NodesInfoNodeInfoHttp`](NodesInfoNodeInfoHttp.md) | - |
| `index_version` | [`VersionNumber`](VersionNumber.md) | - |
| `ip` | [`Ip`](Ip.md) | The node’s IP address. |
| `jvm?` | [`NodesInfoNodeJvmInfo`](NodesInfoNodeJvmInfo.md) | - |
| `name` | [`Name`](Name.md) | The node's name |
| `os?` | [`NodesInfoNodeOperatingSystemInfo`](NodesInfoNodeOperatingSystemInfo.md) | - |
| `plugins?` | `PluginStats[]` | - |
| `process?` | [`NodesInfoNodeProcessInfo`](NodesInfoNodeProcessInfo.md) | - |
| `roles` | [`NodeRoles`](NodeRoles.md) | - |
| `settings?` | [`NodesInfoNodeInfoSettings`](NodesInfoNodeInfoSettings.md) | - |
| `thread_pool?` | `Record<string, NodesInfoNodeThreadPoolInfo>` | - |
| `total_indexing_buffer?` | `long` | Total heap allowed to be used to hold recently indexed documents before they must be written to disk. This size is a shared pool across all shards on this node, and is controlled by Indexing Buffer settings. |
| `total_indexing_buffer_in_bytes?` | [`ByteSize`](ByteSize.md) | Same as total_indexing_buffer, but expressed in bytes. |
| `transport?` | [`NodesInfoNodeInfoTransport`](NodesInfoNodeInfoTransport.md) | - |
| `transport_address` | [`TransportAddress`](TransportAddress.md) | Host and port where transport HTTP connections are accepted. |
| `transport_version` | [`VersionNumber`](VersionNumber.md) | - |
| `version` | [`VersionString`](VersionString.md) | Elasticsearch version running on this node. |
| `modules?` | `PluginStats[]` | - |
| `ingest?` | [`NodesInfoNodeInfoIngest`](NodesInfoNodeInfoIngest.md) | - |
| `aggregations?` | `Record<string, NodesInfoNodeInfoAggregation>` | - |
| `remote_cluster_server?` | [`NodesInfoRemoveClusterServer`](NodesInfoRemoveClusterServer.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
