# SnapshotGcsRepositorySettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `bucket` | `string` | The name of the bucket to be used for snapshots. |
| `application_name?` | `string` | The name used by the client when it uses the Google Cloud Storage service. |
| `base_path?` | `string` | The path to the repository data within the bucket.
It defaults to the root of the bucket.

NOTE: Don't set `base_path` when configuring a snapshot repository for Elastic Cloud Enterprise.
Elastic Cloud Enterprise automatically generates the `base_path` for each deployment so that multiple deployments can share the same bucket. |
| `client?` | `string` | The name of the client to use to connect to Google Cloud Storage. |
| `readonly?` | `boolean` | If `true`, the repository is read-only.
The cluster can retrieve and restore snapshots from the repository but not write to the repository or create snapshots in it.

Only a cluster with write access can create snapshots in the repository.
All other clusters connected to the repository should have the `readonly` parameter set to `true`.

If `false`, the cluster can write to the repository and create snapshots in it.

IMPORTANT: If you register the same snapshot repository with multiple clusters, only one cluster should have write access to the repository.
Having multiple clusters write to the repository at the same time risks corrupting the contents of the repository. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
