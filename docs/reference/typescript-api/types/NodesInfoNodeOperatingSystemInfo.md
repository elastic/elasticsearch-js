# NodesInfoNodeOperatingSystemInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `arch` | `string` | Name of the JVM architecture (ex: amd64, x86) |
| `available_processors` | [`integer`](integer.md) | Number of processors available to the Java virtual machine |
| `allocated_processors?` | [`integer`](integer.md) | The number of processors actually used to calculate thread pool size. This number can be set with the node.processors setting of a node and defaults to the number of processors reported by the OS. |
| `name` | [`Name`](Name.md) | Name of the operating system (ex: Linux, Windows, Mac OS X) |
| `pretty_name` | [`Name`](Name.md) | - |
| `refresh_interval_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | Refresh interval for the OS statistics |
| `version` | [`VersionString`](VersionString.md) | Version of the operating system |
| `cpu?` | [`NodesInfoNodeInfoOSCPU`](NodesInfoNodeInfoOSCPU.md) | - |
| `mem?` | [`NodesInfoNodeInfoMemory`](NodesInfoNodeInfoMemory.md) | - |
| `swap?` | [`NodesInfoNodeInfoMemory`](NodesInfoNodeInfoMemory.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
