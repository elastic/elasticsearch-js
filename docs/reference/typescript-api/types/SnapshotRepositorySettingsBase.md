# SnapshotRepositorySettingsBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `chunk_size?` | [`ByteSize`](ByteSize.md) | Big files can be broken down into multiple smaller blobs in the blob store during snapshotting.
It is not recommended to change this value from its default unless there is an explicit reason for limiting the size of blobs in the repository.
Setting a value lower than the default can result in an increased number of API calls to the blob store during snapshot create and restore operations compared to using the default value and thus make both operations slower and more costly.
Specify the chunk size as a byte unit, for example: `10MB`, `5KB`, 500B.
The default varies by repository type. |
| `compress?` | `boolean` | When set to `true`, metadata files are stored in compressed format.
This setting doesn't affect index files that are already compressed by default. |
| `max_restore_bytes_per_sec?` | [`ByteSize`](ByteSize.md) | The maximum snapshot restore rate per node.
It defaults to unlimited.
Note that restores are also throttled through recovery settings. |
| `max_snapshot_bytes_per_sec?` | [`ByteSize`](ByteSize.md) | The maximum snapshot creation rate per node.
It defaults to 40mb per second.
Note that if the recovery settings for managed services are set, then it defaults to unlimited, and the rate is additionally throttled through recovery settings. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
