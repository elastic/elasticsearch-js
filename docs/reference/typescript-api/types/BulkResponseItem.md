# BulkResponseItem

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_id?` | `string | null` | The document ID associated with the operation. |
| `_index` | `string` | The name of the index associated with the operation.
If the operation targeted a data stream, this is the backing index into which the document was written. |
| `status` | [`integer`](integer.md) | The HTTP status code returned for the operation. |
| `failure_store?` | [`BulkFailureStoreStatus`](BulkFailureStoreStatus.md) | - |
| `error?` | [`ErrorCause`](ErrorCause.md) | Additional information about the failed operation.
The property is returned only for failed operations. |
| `_primary_term?` | [`long`](long.md) | The primary term assigned to the document for the operation.
This property is returned only for successful operations. |
| `result?` | `string` | The result of the operation.
Successful values are `created`, `deleted`, and `updated`. |
| `_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | The sequence number assigned to the document for the operation.
Sequence numbers are used to ensure an older version of a document doesn't overwrite a newer version. |
| `_shards?` | [`ShardStatistics`](ShardStatistics.md) | Shard information for the operation. |
| `_version?` | [`VersionNumber`](VersionNumber.md) | The document version associated with the operation.
The document version is incremented each time the document is updated.
This property is returned only for successful actions. |
| `forced_refresh?` | `boolean` | - |
| `get?` | [`InlineGet`](InlineGet.md)<Record<string, any>> | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
