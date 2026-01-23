# ShutdownGetNodeNodeShutdownStatus

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `node_id` | [`NodeId`](NodeId.md) | - |
| `type` | [`ShutdownGetNodeShutdownType`](ShutdownGetNodeShutdownType.md) | - |
| `reason` | `string` | - |
| `shutdown_startedmillis` | `EpochTime<UnitMillis>` | - |
| `status` | [`ShutdownGetNodeShutdownStatus`](ShutdownGetNodeShutdownStatus.md) | - |
| `shard_migration` | [`ShutdownGetNodeShardMigrationStatus`](ShutdownGetNodeShardMigrationStatus.md) | - |
| `persistent_tasks` | [`ShutdownGetNodePersistentTaskStatus`](ShutdownGetNodePersistentTaskStatus.md) | - |
| `plugins` | [`ShutdownGetNodePluginsStatus`](ShutdownGetNodePluginsStatus.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
