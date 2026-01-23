# SnapshotRepositoryVerifyIntegrityRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | [`Names`](Names.md) | The name of the snapshot repository. |
| `blob_thread_pool_concurrency?` | `integer` | If `verify_blob_contents` is `true`, this parameter specifies how many blobs to verify at once. |
| `index_snapshot_verification_concurrency?` | `integer` | The maximum number of index snapshots to verify concurrently within each index verification. |
| `index_verification_concurrency?` | `integer` | The number of indices to verify concurrently.
The default behavior is to use the entire `snapshot_meta` thread pool. |
| `max_bytes_per_sec?` | `string` | If `verify_blob_contents` is `true`, this parameter specifies the maximum amount of data that Elasticsearch will read from the repository every second. |
| `max_failed_shard_snapshots?` | `integer` | The number of shard snapshot failures to track during integrity verification, in order to avoid excessive resource usage.
If your repository contains more than this number of shard snapshot failures, the verification will fail. |
| `meta_thread_pool_concurrency?` | `integer` | The maximum number of snapshot metadata operations to run concurrently.
The default behavior is to use at most half of the `snapshot_meta` thread pool at once. |
| `snapshot_verification_concurrency?` | `integer` | The number of snapshots to verify concurrently.
The default behavior is to use at most half of the `snapshot_meta` thread pool at once. |
| `verify_blob_contents?` | `boolean` | Indicates whether to verify the checksum of every data blob in the repository.
If this feature is enabled, Elasticsearch will read the entire repository contents, which may be extremely slow and expensive. |
| `body?` | `string | { [key: string]: any } & { name?: never, blob_thread_pool_concurrency?: never, index_snapshot_verification_concurrency?: never, index_verification_concurrency?: never, max_bytes_per_sec?: never, max_failed_shard_snapshots?: never, meta_thread_pool_concurrency?: never, snapshot_verification_concurrency?: never, verify_blob_contents?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { name?: never, blob_thread_pool_concurrency?: never, index_snapshot_verification_concurrency?: never, index_verification_concurrency?: never, max_bytes_per_sec?: never, max_failed_shard_snapshots?: never, meta_thread_pool_concurrency?: never, snapshot_verification_concurrency?: never, verify_blob_contents?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
