# `ShutdownGetNodeNodeShutdownStatus` [interface-ShutdownGetNodeNodeShutdownStatus]

| Name | Type | Description |
| - | - | - |
| `node_id` | [NodeId](./NodeId.md) | &nbsp; |
| `persistent_tasks` | [ShutdownGetNodePersistentTaskStatus](./ShutdownGetNodePersistentTaskStatus.md) | &nbsp; |
| `plugins` | [ShutdownGetNodePluginsStatus](./ShutdownGetNodePluginsStatus.md) | &nbsp; |
| `reason` | string | &nbsp; |
| `shard_migration` | [ShutdownGetNodeShardMigrationStatus](./ShutdownGetNodeShardMigrationStatus.md) | &nbsp; |
| `shutdown_startedmillis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `status` | [ShutdownGetNodeShutdownStatus](./ShutdownGetNodeShutdownStatus.md) | &nbsp; |
| `type` | [ShutdownGetNodeShutdownType](./ShutdownGetNodeShutdownType.md) | &nbsp; |
