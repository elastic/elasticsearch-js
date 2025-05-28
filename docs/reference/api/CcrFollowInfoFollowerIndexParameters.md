# `CcrFollowInfoFollowerIndexParameters` [interface-CcrFollowInfoFollowerIndexParameters]

| Name | Type | Description |
| - | - | - |
| `max_outstanding_read_requests` | [long](./long.md) | The maximum number of outstanding reads requests from the remote cluster. |
| `max_outstanding_write_requests` | [integer](./integer.md) | The maximum number of outstanding write requests on the follower. |
| `max_read_request_operation_count` | [integer](./integer.md) | The maximum number of operations to pull per read from the remote cluster. |
| `max_read_request_size` | [ByteSize](./ByteSize.md) | The maximum size in bytes of per read of a batch of operations pulled from the remote cluster. |
| `max_retry_delay` | [Duration](./Duration.md) | The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying. |
| `max_write_buffer_count` | [integer](./integer.md) | The maximum number of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the number of queued operations goes below the limit. |
| `max_write_buffer_size` | [ByteSize](./ByteSize.md) | The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the total bytes of queued operations goes below the limit. |
| `max_write_request_operation_count` | [integer](./integer.md) | The maximum number of operations per bulk write request executed on the follower. |
| `max_write_request_size` | [ByteSize](./ByteSize.md) | The maximum total bytes of operations per bulk write request executed on the follower. |
| `read_poll_timeout` | [Duration](./Duration.md) | The maximum time to wait for new operations on the remote cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again. |
