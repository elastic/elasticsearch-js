# CatSegmentsSegmentsRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndexName`](IndexName.md) | The index name. |
| `i?` | [`IndexName`](IndexName.md) | The index name. |
| `idx?` | [`IndexName`](IndexName.md) | The index name. |
| `shard?` | `string` | The shard name. |
| `s?` | `string` | The shard name. |
| `sh?` | `string` | The shard name. |
| `prirep?` | `string` | The shard type: `primary` or `replica`. |
| `p?` | `string` | The shard type: `primary` or `replica`. |
| `pr?` | `string` | The shard type: `primary` or `replica`. |
| `primaryOrReplica?` | `string` | The shard type: `primary` or `replica`. |
| `ip?` | `string` | The IP address of the node where it lives. |
| `id?` | [`NodeId`](NodeId.md) | The unique identifier of the node where it lives. |
| `segment?` | `string` | The segment name, which is derived from the segment generation and used internally to create file names in the directory of the shard. |
| `seg?` | `string` | The segment name, which is derived from the segment generation and used internally to create file names in the directory of the shard. |
| `generation?` | `string` | The segment generation number.
Elasticsearch increments this generation number for each segment written then uses this number to derive the segment name. |
| `g?` | `string` | The segment generation number.
Elasticsearch increments this generation number for each segment written then uses this number to derive the segment name. |
| `gen?` | `string` | The segment generation number.
Elasticsearch increments this generation number for each segment written then uses this number to derive the segment name. |
| `'docs.count'?` | `string` | The number of documents in the segment.
This excludes deleted documents and counts any nested documents separately from their parents.
It also excludes documents which were indexed recently and do not yet belong to a segment. |
| `dc?` | `string` | The number of documents in the segment.
This excludes deleted documents and counts any nested documents separately from their parents.
It also excludes documents which were indexed recently and do not yet belong to a segment. |
| `docsCount?` | `string` | The number of documents in the segment.
This excludes deleted documents and counts any nested documents separately from their parents.
It also excludes documents which were indexed recently and do not yet belong to a segment. |
| `'docs.deleted'?` | `string` | The number of deleted documents in the segment, which might be higher or lower than the number of delete operations you have performed.
This number excludes deletes that were performed recently and do not yet belong to a segment.
Deleted documents are cleaned up by the automatic merge process if it makes sense to do so.
Also, Elasticsearch creates extra deleted documents to internally track the recent history of operations on a shard. |
| `dd?` | `string` | The number of deleted documents in the segment, which might be higher or lower than the number of delete operations you have performed.
This number excludes deletes that were performed recently and do not yet belong to a segment.
Deleted documents are cleaned up by the automatic merge process if it makes sense to do so.
Also, Elasticsearch creates extra deleted documents to internally track the recent history of operations on a shard. |
| `docsDeleted?` | `string` | The number of deleted documents in the segment, which might be higher or lower than the number of delete operations you have performed.
This number excludes deletes that were performed recently and do not yet belong to a segment.
Deleted documents are cleaned up by the automatic merge process if it makes sense to do so.
Also, Elasticsearch creates extra deleted documents to internally track the recent history of operations on a shard. |
| `size?` | [`ByteSize`](ByteSize.md) | The segment size in bytes. |
| `si?` | [`ByteSize`](ByteSize.md) | The segment size in bytes. |
| `'size.memory'?` | [`ByteSize`](ByteSize.md) | The segment memory in bytes.
A value of `-1` indicates Elasticsearch was unable to compute this number. |
| `sm?` | [`ByteSize`](ByteSize.md) | The segment memory in bytes.
A value of `-1` indicates Elasticsearch was unable to compute this number. |
| `sizeMemory?` | [`ByteSize`](ByteSize.md) | The segment memory in bytes.
A value of `-1` indicates Elasticsearch was unable to compute this number. |
| `committed?` | `string` | If `true`, the segment is synced to disk.
Segments that are synced can survive a hard reboot.
If `false`, the data from uncommitted segments is also stored in the transaction log so that Elasticsearch is able to replay changes on the next start. |
| `ic?` | `string` | If `true`, the segment is synced to disk.
Segments that are synced can survive a hard reboot.
If `false`, the data from uncommitted segments is also stored in the transaction log so that Elasticsearch is able to replay changes on the next start. |
| `isCommitted?` | `string` | If `true`, the segment is synced to disk.
Segments that are synced can survive a hard reboot.
If `false`, the data from uncommitted segments is also stored in the transaction log so that Elasticsearch is able to replay changes on the next start. |
| `searchable?` | `string` | If `true`, the segment is searchable.
If `false`, the segment has most likely been written to disk but needs a refresh to be searchable. |
| `is?` | `string` | If `true`, the segment is searchable.
If `false`, the segment has most likely been written to disk but needs a refresh to be searchable. |
| `isSearchable?` | `string` | If `true`, the segment is searchable.
If `false`, the segment has most likely been written to disk but needs a refresh to be searchable. |
| `version?` | [`VersionString`](VersionString.md) | The version of Lucene used to write the segment. |
| `v?` | [`VersionString`](VersionString.md) | The version of Lucene used to write the segment. |
| `compound?` | `string` | If `true`, the segment is stored in a compound file.
This means Lucene merged all files from the segment in a single file to save file descriptors. |
| `ico?` | `string` | If `true`, the segment is stored in a compound file.
This means Lucene merged all files from the segment in a single file to save file descriptors. |
| `isCompound?` | `string` | If `true`, the segment is stored in a compound file.
This means Lucene merged all files from the segment in a single file to save file descriptors. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
