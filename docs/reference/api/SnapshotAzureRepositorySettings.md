## Interface `SnapshotAzureRepositorySettings`

| Name | Type | Description |
| - | - | - |
| `base_path` | string | The path to the repository data within the container. It defaults to the root directory. NOTE: Don't set `base_path` when configuring a snapshot repository for Elastic Cloud Enterprise. Elastic Cloud Enterprise automatically generates the `base_path` for each deployment so that multiple deployments can share the same bucket. |
| `client` | string | The name of the Azure repository client to use. |
| `container` | string | The Azure container. |
| `delete_objects_max_size` | [integer](./integer.md) | The maxmimum batch size, between 1 and 256, used for `BlobBatch` requests. Defaults to 256 which is the maximum number supported by the Azure blob batch API. |
| `location_mode` | string | Either `primary_only` or `secondary_only`. Note that if you set it to `secondary_only`, it will force `readonly` to `true`. |
| `max_concurrent_batch_deletes` | [integer](./integer.md) | The maximum number of concurrent batch delete requests that will be submitted for any individual bulk delete with `BlobBatch`. Note that the effective number of concurrent deletes is further limited by the Azure client connection and event loop thread limits. Defaults to 10, minimum is 1, maximum is 100. |
| `readonly` | boolean | If `true`, the repository is read-only. The cluster can retrieve and restore snapshots from the repository but not write to the repository or create snapshots in it. Only a cluster with write access can create snapshots in the repository. All other clusters connected to the repository should have the `readonly` parameter set to `true`. If `false`, the cluster can write to the repository and create snapshots in it. IMPORTANT: If you register the same snapshot repository with multiple clusters, only one cluster should have write access to the repository. Having multiple clusters write to the repository at the same time risks corrupting the contents of the repository. |
