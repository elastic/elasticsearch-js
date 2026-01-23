# CcrFollowRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | The name of the follower index. |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | Specifies the number of shards to wait on being active before responding. This defaults to waiting on none of the shards to be
active.
A shard must be restored from the leader index before being active. Restoring a follower shard requires transferring all the
remote Lucene segment files to the follower index. |
| `data_stream_name?` | `string` | If the leader index is part of a data stream, the name to which the local data stream for the followed index should be renamed. |
| `leader_index` | [`IndexName`](IndexName.md) | The name of the index in the leader cluster to follow. |
| `max_outstanding_read_requests?` | [`long`](long.md) | The maximum number of outstanding reads requests from the remote cluster. |
| `max_outstanding_write_requests?` | [`integer`](integer.md) | The maximum number of outstanding write requests on the follower. |
| `max_read_request_operation_count?` | [`integer`](integer.md) | The maximum number of operations to pull per read from the remote cluster. |
| `max_read_request_size?` | [`ByteSize`](ByteSize.md) | The maximum size in bytes of per read of a batch of operations pulled from the remote cluster. |
| `max_retry_delay?` | [`Duration`](Duration.md) | The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when
retrying. |
| `max_write_buffer_count?` | [`integer`](integer.md) | The maximum number of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be
deferred until the number of queued operations goes below the limit. |
| `max_write_buffer_size?` | [`ByteSize`](ByteSize.md) | The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will
be deferred until the total bytes of queued operations goes below the limit. |
| `max_write_request_operation_count?` | [`integer`](integer.md) | The maximum number of operations per bulk write request executed on the follower. |
| `max_write_request_size?` | [`ByteSize`](ByteSize.md) | The maximum total bytes of operations per bulk write request executed on the follower. |
| `read_poll_timeout?` | [`Duration`](Duration.md) | The maximum time to wait for new operations on the remote cluster when the follower index is synchronized with the leader index.
When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics.
Then the follower will immediately attempt to read from the leader again. |
| `remote_cluster` | `string` | The remote cluster containing the leader index. |
| `settings?` | [`IndicesIndexSettings`](IndicesIndexSettings.md) | Settings to override from the leader index. |
| `body?` | `string | { [key: string]: any } & { index?: never, master_timeout?: never, wait_for_active_shards?: never, data_stream_name?: never, leader_index?: never, max_outstanding_read_requests?: never, max_outstanding_write_requests?: never, max_read_request_operation_count?: never, max_read_request_size?: never, max_retry_delay?: never, max_write_buffer_count?: never, max_write_buffer_size?: never, max_write_request_operation_count?: never, max_write_request_size?: never, read_poll_timeout?: never, remote_cluster?: never, settings?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, master_timeout?: never, wait_for_active_shards?: never, data_stream_name?: never, leader_index?: never, max_outstanding_read_requests?: never, max_outstanding_write_requests?: never, max_read_request_operation_count?: never, max_read_request_size?: never, max_retry_delay?: never, max_write_buffer_count?: never, max_write_buffer_size?: never, max_write_request_operation_count?: never, max_write_request_size?: never, read_poll_timeout?: never, remote_cluster?: never, settings?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
