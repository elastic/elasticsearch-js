# NodesPressureMemory

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `all?` | [`ByteSize`](ByteSize.md) | Memory consumed by indexing requests in the coordinating, primary, or replica stage. |
| `all_in_bytes?` | `long` | Memory consumed, in bytes, by indexing requests in the coordinating, primary, or replica stage. |
| `combined_coordinating_and_primary?` | [`ByteSize`](ByteSize.md) | Memory consumed by indexing requests in the coordinating or primary stage.
This value is not the sum of coordinating and primary as a node can reuse the coordinating memory if the primary stage is executed locally. |
| `combined_coordinating_and_primary_in_bytes?` | `long` | Memory consumed, in bytes, by indexing requests in the coordinating or primary stage.
This value is not the sum of coordinating and primary as a node can reuse the coordinating memory if the primary stage is executed locally. |
| `coordinating?` | [`ByteSize`](ByteSize.md) | Memory consumed by indexing requests in the coordinating stage. |
| `coordinating_in_bytes?` | `long` | Memory consumed, in bytes, by indexing requests in the coordinating stage. |
| `primary?` | [`ByteSize`](ByteSize.md) | Memory consumed by indexing requests in the primary stage. |
| `primary_in_bytes?` | `long` | Memory consumed, in bytes, by indexing requests in the primary stage. |
| `replica?` | [`ByteSize`](ByteSize.md) | Memory consumed by indexing requests in the replica stage. |
| `replica_in_bytes?` | `long` | Memory consumed, in bytes, by indexing requests in the replica stage. |
| `coordinating_rejections?` | `long` | Number of indexing requests rejected in the coordinating stage. |
| `primary_rejections?` | `long` | Number of indexing requests rejected in the primary stage. |
| `replica_rejections?` | `long` | Number of indexing requests rejected in the replica stage. |
| `primary_document_rejections?` | `long` | - |
| `large_operation_rejections?` | `long` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
