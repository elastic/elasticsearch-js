# CcrResumeFollowRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | Name of the follow index to resume following |
| `master_timeout?` | [`Duration`](Duration.md) | Period to wait for a connection to the master node. |
| `max_outstanding_read_requests?` | `long` | - |
| `max_outstanding_write_requests?` | `long` | - |
| `max_read_request_operation_count?` | `long` | - |
| `max_read_request_size?` | `string` | - |
| `max_retry_delay?` | [`Duration`](Duration.md) | - |
| `max_write_buffer_count?` | `long` | - |
| `max_write_buffer_size?` | `string` | - |
| `max_write_request_operation_count?` | `long` | - |
| `max_write_request_size?` | `string` | - |
| `read_poll_timeout?` | [`Duration`](Duration.md) | - |
| `body?` | `string | { [key: string]: any } & { index?: never, master_timeout?: never, max_outstanding_read_requests?: never, max_outstanding_write_requests?: never, max_read_request_operation_count?: never, max_read_request_size?: never, max_retry_delay?: never, max_write_buffer_count?: never, max_write_buffer_size?: never, max_write_request_operation_count?: never, max_write_request_size?: never, read_poll_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, master_timeout?: never, max_outstanding_read_requests?: never, max_outstanding_write_requests?: never, max_read_request_operation_count?: never, max_read_request_size?: never, max_retry_delay?: never, max_write_buffer_count?: never, max_write_buffer_size?: never, max_write_request_operation_count?: never, max_write_request_size?: never, read_poll_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
