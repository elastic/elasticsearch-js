# `SnapshotS3Repository` [interface-SnapshotS3Repository]

| Name | Type | Description |
| - | - | - |
| `settings` | [SnapshotS3RepositorySettings](./SnapshotS3RepositorySettings.md) | The repository settings. NOTE: In addition to the specified settings, you can also use all non-secure client settings in the repository settings. In this case, the client settings found in the repository settings will be merged with those of the named client used by the repository. Conflicts between client and repository settings are resolved by the repository settings taking precedence over client settings. |
| `type` | 's3' | The S3 repository type. |
