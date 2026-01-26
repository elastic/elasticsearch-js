# SnapshotSnapshotInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `data_streams` | `string`[] | - |
| `duration?` | [`Duration`](Duration.md) | - |
| `duration_in_millis?` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `end_time?` | [`DateTime`](DateTime.md) | - |
| `end_time_in_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `failures?` | [`SnapshotSnapshotShardFailure`](SnapshotSnapshotShardFailure.md)[] | - |
| `include_global_state?` | `boolean` | - |
| `indices?` | [`IndexName`](IndexName.md)[] | - |
| `index_details?` | `Record<IndexName, SnapshotIndexDetails>` | - |
| `metadata?` | [`Metadata`](Metadata.md) | - |
| `reason?` | `string` | - |
| `repository?` | [`Name`](Name.md) | - |
| `snapshot` | [`Name`](Name.md) | - |
| `shards?` | [`ShardStatistics`](ShardStatistics.md) | - |
| `start_time?` | [`DateTime`](DateTime.md) | - |
| `start_time_in_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `state?` | `string` | - |
| `uuid` | [`Uuid`](Uuid.md) | - |
| `version?` | [`VersionString`](VersionString.md) | - |
| `version_id?` | [`VersionNumber`](VersionNumber.md) | - |
| `feature_states?` | [`SnapshotInfoFeatureState`](SnapshotInfoFeatureState.md)[] | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
