# `CcrShardStats` [interface-CcrShardStats]

| Name | Type | Description |
| - | - | - |
| `bytes_read` | [long](./long.md) | The total of transferred bytes read from the leader. This is only an estimate and does not account for compression if enabled. |
| `failed_read_requests` | [long](./long.md) | The number of failed reads. |
| `failed_write_requests` | [long](./long.md) | The number of failed bulk write requests on the follower. |
| `fatal_exception` | [ErrorCause](./ErrorCause.md) | &nbsp; |
| `follower_aliases_version` | [VersionNumber](./VersionNumber.md) | The index aliases version the follower is synced up to. |
| `follower_global_checkpoint` | [long](./long.md) | The current global checkpoint on the follower. The difference between the `leader_global_checkpoint` and the `follower_global_checkpoint` is an indication of how much the follower is lagging the leader. |
| `follower_index` | string | The name of the follower index. |
| `follower_mapping_version` | [VersionNumber](./VersionNumber.md) | The mapping version the follower is synced up to. |
| `follower_max_seq_no` | [SequenceNumber](./SequenceNumber.md) | The current maximum sequence number on the follower. |
| `follower_settings_version` | [VersionNumber](./VersionNumber.md) | The index settings version the follower is synced up to. |
| `last_requested_seq_no` | [SequenceNumber](./SequenceNumber.md) | The starting sequence number of the last batch of operations requested from the leader. |
| `leader_global_checkpoint` | [long](./long.md) | The current global checkpoint on the leader known to the follower task. |
| `leader_index` | string | The name of the index in the leader cluster being followed. |
| `leader_max_seq_no` | [SequenceNumber](./SequenceNumber.md) | The current maximum sequence number on the leader known to the follower task. |
| `operations_read` | [long](./long.md) | The total number of operations read from the leader. |
| `operations_written` | [long](./long.md) | The number of operations written on the follower. |
| `outstanding_read_requests` | [integer](./integer.md) | The number of active read requests from the follower. |
| `outstanding_write_requests` | [integer](./integer.md) | The number of active bulk write requests on the follower. |
| `read_exceptions` | [CcrReadException](./CcrReadException.md)[] | An array of objects representing failed reads. |
| `remote_cluster` | string | The remote cluster containing the leader index. |
| `shard_id` | [integer](./integer.md) | The numerical shard ID, with values from 0 to one less than the number of replicas. |
| `successful_read_requests` | [long](./long.md) | The number of successful fetches. |
| `successful_write_requests` | [long](./long.md) | The number of bulk write requests run on the follower. |
| `time_since_last_read_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The number of milliseconds since a read request was sent to the leader. When the follower is caught up to the leader, this number will increase up to the configured `read_poll_timeout` at which point another read request will be sent to the leader. |
| `time_since_last_read` | [Duration](./Duration.md) | &nbsp; |
| `total_read_remote_exec_time_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The total time reads spent running on the remote cluster. |
| `total_read_remote_exec_time` | [Duration](./Duration.md) | &nbsp; |
| `total_read_time_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The total time reads were outstanding, measured from the time a read was sent to the leader to the time a reply was returned to the follower. |
| `total_read_time` | [Duration](./Duration.md) | &nbsp; |
| `total_write_time_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The total time spent writing on the follower. |
| `total_write_time` | [Duration](./Duration.md) | &nbsp; |
| `write_buffer_operation_count` | [long](./long.md) | The number of write operations queued on the follower. |
| `write_buffer_size_in_bytes` | [ByteSize](./ByteSize.md) | The total number of bytes of operations currently queued for writing. |
