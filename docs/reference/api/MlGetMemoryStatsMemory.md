## Interface `MlGetMemoryStatsMemory`

| Name | Type | Description |
| - | - | - |
| `attributes` | Record<string, string> | &nbsp; |
| `ephemeral_id` | [Id](./Id.md) | &nbsp; |
| `jvm` | [MlGetMemoryStatsJvmStats](./MlGetMemoryStatsJvmStats.md) | Contains Java Virtual Machine (JVM) statistics for the node. |
| `mem` | [MlGetMemoryStatsMemStats](./MlGetMemoryStatsMemStats.md) | Contains statistics about memory usage for the node. |
| `name` | [Name](./Name.md) | Human-readable identifier for the node. Based on the Node name setting setting. |
| `roles` | string[] | Roles assigned to the node. |
| `transport_address` | [TransportAddress](./TransportAddress.md) | The host and port where transport HTTP connections are accepted. |
