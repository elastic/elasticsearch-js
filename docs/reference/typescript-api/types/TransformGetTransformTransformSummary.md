# TransformGetTransformTransformSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `authorization?` | [`MlTransformAuthorization`](MlTransformAuthorization.md) | The security privileges that the transform uses to run its queries. If Elastic Stack security features were disabled at the time of the most recent update to the transform, this property is omitted. |
| `create_time?` | `EpochTime<UnitMillis>` | The time the transform was created. |
| `create_time_string?` | [`DateTime`](DateTime.md) | - |
| `description?` | `string` | Free text description of the transform. |
| `dest` | [`ReindexDestination`](ReindexDestination.md) | The destination for the transform. |
| `frequency?` | [`Duration`](Duration.md) | - |
| `id` | [`Id`](Id.md) | - |
| `latest?` | [`TransformLatest`](TransformLatest.md) | - |
| `pivot?` | [`TransformPivot`](TransformPivot.md) | The pivot method transforms the data by aggregating and grouping it. |
| `retention_policy?` | [`TransformRetentionPolicyContainer`](TransformRetentionPolicyContainer.md) | - |
| `settings?` | [`TransformSettings`](TransformSettings.md) | Defines optional transform settings. |
| `source` | [`TransformSource`](TransformSource.md) | The source of the data for the transform. |
| `sync?` | [`TransformSyncContainer`](TransformSyncContainer.md) | Defines the properties transforms require to run continuously. |
| `version?` | [`VersionString`](VersionString.md) | The version of Elasticsearch that existed on the node when the transform was created. |
| `_meta?` | [`Metadata`](Metadata.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
