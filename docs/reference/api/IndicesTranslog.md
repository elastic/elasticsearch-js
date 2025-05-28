# `IndicesTranslog` [interface-IndicesTranslog]

| Name | Type | Description |
| - | - | - |
| `durability` | [IndicesTranslogDurability](./IndicesTranslogDurability.md) | Whether or not to `fsync` and commit the translog after every index, delete, update, or bulk request. |
| `flush_threshold_size` | [ByteSize](./ByteSize.md) | The translog stores all operations that are not yet safely persisted in Lucene (i.e., are not part of a Lucene commit point). Although these operations are available for reads, they will need to be replayed if the shard was stopped and had to be recovered. This setting controls the maximum total size of these operations, to prevent recoveries from taking too long. Once the maximum size has been reached a flush will happen, generating a new Lucene commit point. |
| `retention` | [IndicesTranslogRetention](./IndicesTranslogRetention.md) | &nbsp; |
| `sync_interval` | [Duration](./Duration.md) | How often the translog is fsynced to disk and committed, regardless of write operations. Values less than 100ms are not allowed. |
