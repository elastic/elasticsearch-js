# WriteResponseBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_id` | [`Id`](Id.md) | The unique identifier for the added document. |
| `_index` | [`IndexName`](IndexName.md) | The name of the index the document was added to. |
| `_primary_term?` | [`long`](long.md) | The primary term assigned to the document for the indexing operation. |
| `result` | [`Result`](Result.md) | The result of the indexing operation: `created` or `updated`. |
| `_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | The sequence number assigned to the document for the indexing operation.
Sequence numbers are used to ensure an older version of a document doesn't overwrite a newer version. |
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | Information about the replication process of the operation. |
| `_version` | [`VersionNumber`](VersionNumber.md) | The document version, which is incremented each time the document is updated. |
| `failure_store?` | [`BulkFailureStoreStatus`](BulkFailureStoreStatus.md) | The role of the failure store in this document response |
| `forced_refresh?` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
