# `SnapshotSnapshotInfo` [interface-SnapshotSnapshotInfo]

| Name | Type | Description |
| - | - | - |
| `data_streams` | string[] | &nbsp; |
| `duration_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `duration` | [Duration](./Duration.md) | &nbsp; |
| `end_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `end_time` | [DateTime](./DateTime.md) | &nbsp; |
| `failures` | [SnapshotSnapshotShardFailure](./SnapshotSnapshotShardFailure.md)[] | &nbsp; |
| `feature_states` | [SnapshotInfoFeatureState](./SnapshotInfoFeatureState.md)[] | &nbsp; |
| `include_global_state` | boolean | &nbsp; |
| `index_details` | Record<[IndexName](./IndexName.md), [SnapshotIndexDetails](./SnapshotIndexDetails.md)> | &nbsp; |
| `indices` | [IndexName](./IndexName.md)[] | &nbsp; |
| `metadata` | [Metadata](./Metadata.md) | &nbsp; |
| `reason` | string | &nbsp; |
| `repository` | [Name](./Name.md) | &nbsp; |
| `shards` | [ShardStatistics](./ShardStatistics.md) | &nbsp; |
| `snapshot` | [Name](./Name.md) | &nbsp; |
| `start_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `start_time` | [DateTime](./DateTime.md) | &nbsp; |
| `state` | string | &nbsp; |
| `uuid` | [Uuid](./Uuid.md) | &nbsp; |
| `version_id` | [VersionNumber](./VersionNumber.md) | &nbsp; |
| `version` | [VersionString](./VersionString.md) | &nbsp; |
