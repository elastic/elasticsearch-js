## Interface `NodesInfoNodeOperatingSystemInfo`

| Name | Type | Description |
| - | - | - |
| `allocated_processors` | [integer](./integer.md) | The number of processors actually used to calculate thread pool size. This number can be set with the node.processors setting of a node and defaults to the number of processors reported by the OS. |
| `arch` | string | Name of the JVM architecture (ex: amd64, x86) |
| `available_processors` | [integer](./integer.md) | Number of processors available to the Java virtual machine |
| `cpu` | [NodesInfoNodeInfoOSCPU](./NodesInfoNodeInfoOSCPU.md) | &nbsp; |
| `mem` | [NodesInfoNodeInfoMemory](./NodesInfoNodeInfoMemory.md) | &nbsp; |
| `name` | [Name](./Name.md) | Name of the operating system (ex: Linux, Windows, Mac OS X) |
| `pretty_name` | [Name](./Name.md) | &nbsp; |
| `refresh_interval_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Refresh interval for the OS statistics |
| `swap` | [NodesInfoNodeInfoMemory](./NodesInfoNodeInfoMemory.md) | &nbsp; |
| `version` | [VersionString](./VersionString.md) | Version of the operating system |
