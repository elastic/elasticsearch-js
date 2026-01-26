# Client.snapshot.repositoryVerifyIntegrity

Verify the repository integrity. Verify the integrity of the contents of a snapshot repository. This API enables you to perform a comprehensive check of the contents of a repository, looking for any anomalies in its data or metadata which might prevent you from restoring snapshots from the repository or which might cause future snapshot create or delete operations to fail. If you suspect the integrity of the contents of one of your snapshot repositories, cease all write activity to this repository immediately, set its `read_only` option to `true`, and use this API to verify its integrity. Until you do so: * It may not be possible to restore some snapshots from this repository. * Searchable snapshots may report errors when searched or may have unassigned shards. * Taking snapshots into this repository may fail or may appear to succeed but have created a snapshot which cannot be restored. * Deleting snapshots from this repository may fail or may appear to succeed but leave the underlying data on disk. * Continuing to write to the repository while it is in an invalid state may causing additional damage to its contents. If the API finds any problems with the integrity of the contents of your repository, Elasticsearch will not be able to repair the damage. The only way to bring the repository back into a fully working state after its contents have been damaged is by restoring its contents from a repository backup which was taken before the damage occurred. You must also identify what caused the damage and take action to prevent it from happening again. If you cannot restore a repository backup, register a new repository and use this for all future snapshot operations. In some cases it may be possible to recover some of the contents of a damaged repository, either by restoring as many of its snapshots as needed and taking new snapshots of the restored data, or by using the reindex API to copy data from any searchable snapshots mounted from the damaged repository. Avoid all operations which write to the repository while the verify repository integrity API is running. If something changes the repository contents while an integrity verification is running then Elasticsearch may incorrectly report having detected some anomalies in its contents due to the concurrent writes. It may also incorrectly fail to report some anomalies that the concurrent writes prevented it from detecting. NOTE: This API is intended for exploratory use by humans. You should expect the request parameters and the response format to vary in future versions. NOTE: This API may not work correctly in a mixed-version cluster. The default values for the parameters of this API are designed to limit the impact of the integrity verification on other activities in your cluster. For instance, by default it will only use at most half of the `snapshot_meta` threads to verify the integrity of each snapshot, allowing other snapshot operations to use the other half of this thread pool. If you modify these parameters to speed up the verification process, you risk disrupting other snapshot-related operations in your cluster. For large repositories, consider setting up a separate single-node Elasticsearch cluster just for running the integrity verification API. The response exposes implementation details of the analysis which may change from version to version. The response body format is therefore not considered stable and may be different in newer versions.

## Method Signature

```typescript
client.snapshot.repositoryVerifyIntegrity(this: That, params: T.SnapshotRepositoryVerifyIntegrityRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotRepositoryVerifyIntegrityResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotRepositoryVerifyIntegrityRequest`](../types/SnapshotRepositoryVerifyIntegrityRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotRepositoryVerifyIntegrityResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
