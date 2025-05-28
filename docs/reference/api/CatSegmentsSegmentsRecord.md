# `CatSegmentsSegmentsRecord` [interface-CatSegmentsSegmentsRecord]

| Name | Type | Description |
| - | - | - |
| `"docs.count"` | string | The number of documents in the segment. This excludes deleted documents and counts any nested documents separately from their parents. It also excludes documents which were indexed recently and do not yet belong to a segment. |
| `"docs.deleted"` | string | The number of deleted documents in the segment, which might be higher or lower than the number of delete operations you have performed. This number excludes deletes that were performed recently and do not yet belong to a segment. Deleted documents are cleaned up by the automatic merge process if it makes sense to do so. Also, Elasticsearch creates extra deleted documents to internally track the recent history of operations on a shard. |
| `"size.memory"` | [ByteSize](./ByteSize.md) | The segment memory in bytes. A value of `-1` indicates Elasticsearch was unable to compute this number. |
| `committed` | string | If `true`, the segment is synced to disk. Segments that are synced can survive a hard reboot. If `false`, the data from uncommitted segments is also stored in the transaction log so that Elasticsearch is able to replay changes on the next start. |
| `compound` | string | If `true`, the segment is stored in a compound file. This means Lucene merged all files from the segment in a single file to save file descriptors. |
| `dc` | string | The number of documents in the segment. This excludes deleted documents and counts any nested documents separately from their parents. It also excludes documents which were indexed recently and do not yet belong to a segment. 'docs.count' |
| `dd` | string | The number of deleted documents in the segment, which might be higher or lower than the number of delete operations you have performed. This number excludes deletes that were performed recently and do not yet belong to a segment. Deleted documents are cleaned up by the automatic merge process if it makes sense to do so. Also, Elasticsearch creates extra deleted documents to internally track the recent history of operations on a shard. 'docs.deleted' |
| `docsCount` | string | The number of documents in the segment. This excludes deleted documents and counts any nested documents separately from their parents. It also excludes documents which were indexed recently and do not yet belong to a segment. 'docs.count' |
| `docsDeleted` | string | The number of deleted documents in the segment, which might be higher or lower than the number of delete operations you have performed. This number excludes deletes that were performed recently and do not yet belong to a segment. Deleted documents are cleaned up by the automatic merge process if it makes sense to do so. Also, Elasticsearch creates extra deleted documents to internally track the recent history of operations on a shard. 'docs.deleted' |
| `g` | string | The segment generation number. Elasticsearch increments this generation number for each segment written then uses this number to derive the segment name. generation |
| `gen` | string | The segment generation number. Elasticsearch increments this generation number for each segment written then uses this number to derive the segment name. generation |
| `generation` | string | The segment generation number. Elasticsearch increments this generation number for each segment written then uses this number to derive the segment name. |
| `i` | [IndexName](./IndexName.md) | The index name. index |
| `ic` | string | If `true`, the segment is synced to disk. Segments that are synced can survive a hard reboot. If `false`, the data from uncommitted segments is also stored in the transaction log so that Elasticsearch is able to replay changes on the next start. committed |
| `ico` | string | If `true`, the segment is stored in a compound file. This means Lucene merged all files from the segment in a single file to save file descriptors. compound |
| `id` | [NodeId](./NodeId.md) | The unique identifier of the node where it lives. |
| `idx` | [IndexName](./IndexName.md) | The index name. index |
| `index` | [IndexName](./IndexName.md) | The index name. |
| `ip` | string | The IP address of the node where it lives. |
| `is` | string | If `true`, the segment is searchable. If `false`, the segment has most likely been written to disk but needs a refresh to be searchable. searchable |
| `isCommitted` | string | If `true`, the segment is synced to disk. Segments that are synced can survive a hard reboot. If `false`, the data from uncommitted segments is also stored in the transaction log so that Elasticsearch is able to replay changes on the next start. committed |
| `isCompound` | string | If `true`, the segment is stored in a compound file. This means Lucene merged all files from the segment in a single file to save file descriptors. compound |
| `isSearchable` | string | If `true`, the segment is searchable. If `false`, the segment has most likely been written to disk but needs a refresh to be searchable. searchable |
| `p` | string | The shard type: `primary` or `replica`. prirep |
| `pr` | string | The shard type: `primary` or `replica`. prirep |
| `primaryOrReplica` | string | The shard type: `primary` or `replica`. prirep |
| `prirep` | string | The shard type: `primary` or `replica`. |
| `s` | string | The shard name. shard |
| `searchable` | string | If `true`, the segment is searchable. If `false`, the segment has most likely been written to disk but needs a refresh to be searchable. |
| `seg` | string | The segment name, which is derived from the segment generation and used internally to create file names in the directory of the shard. segment |
| `segment` | string | The segment name, which is derived from the segment generation and used internally to create file names in the directory of the shard. |
| `sh` | string | The shard name. shard |
| `shard` | string | The shard name. |
| `si` | [ByteSize](./ByteSize.md) | The segment size in bytes. size |
| `size` | [ByteSize](./ByteSize.md) | The segment size in bytes. |
| `sizeMemory` | [ByteSize](./ByteSize.md) | The segment memory in bytes. A value of `-1` indicates Elasticsearch was unable to compute this number. 'size.memory' |
| `sm` | [ByteSize](./ByteSize.md) | The segment memory in bytes. A value of `-1` indicates Elasticsearch was unable to compute this number. 'size.memory' |
| `v` | [VersionString](./VersionString.md) | The version of Lucene used to write the segment. version |
| `version` | [VersionString](./VersionString.md) | The version of Lucene used to write the segment. |
