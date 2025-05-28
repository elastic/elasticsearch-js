# `TransformGetTransformTransformSummary` [interface-TransformGetTransformTransformSummary]

| Name | Type | Description |
| - | - | - |
| `_meta` | [Metadata](./Metadata.md) | &nbsp; |
| `authorization` | [MlTransformAuthorization](./MlTransformAuthorization.md) | The security privileges that the transform uses to run its queries. If Elastic Stack security features were disabled at the time of the most recent update to the transform, this property is omitted. |
| `create_time_string` | [DateTime](./DateTime.md) | &nbsp; |
| `create_time` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The time the transform was created. |
| `description` | string | Free text description of the transform. |
| `dest` | [ReindexDestination](./ReindexDestination.md) | The destination for the transform. |
| `frequency` | [Duration](./Duration.md) | &nbsp; |
| `id` | [Id](./Id.md) | &nbsp; |
| `latest` | [TransformLatest](./TransformLatest.md) | &nbsp; |
| `pivot` | [TransformPivot](./TransformPivot.md) | The pivot method transforms the data by aggregating and grouping it. |
| `retention_policy` | [TransformRetentionPolicyContainer](./TransformRetentionPolicyContainer.md) | &nbsp; |
| `settings` | [TransformSettings](./TransformSettings.md) | Defines optional transform settings. |
| `source` | [TransformSource](./TransformSource.md) | The source of the data for the transform. |
| `sync` | [TransformSyncContainer](./TransformSyncContainer.md) | Defines the properties transforms require to run continuously. |
| `version` | [VersionString](./VersionString.md) | The version of Elasticsearch that existed on the node when the transform was created. |
