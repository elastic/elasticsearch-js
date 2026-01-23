# SnapshotSharedFileSystemRepositorySettings

## Interface

### Extends

- [`SnapshotRepositorySettingsBase`](SnapshotRepositorySettingsBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `location` | `string` | The location of the shared filesystem used to store and retrieve snapshots.
This location must be registered in the `path.repo` setting on all master and data nodes in the cluster.
Unlike `path.repo`, this setting supports only a single file path. |
| `max_number_of_snapshots?` | [`integer`](integer.md) | The maximum number of snapshots the repository can contain.
The default is `Integer.MAX_VALUE`, which is 2^31-1 or `2147483647`. |
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
