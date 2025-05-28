# `NodesClient` [interface-NodesClient]

| Name | Type | Description |
| - | - | - |
| `agent` | string | Reported agent for the HTTP client. If unavailable, this property is not included in the response. |
| `closed_time_millis` | [long](./long.md) | Time at which the client closed the connection if the connection is closed. |
| `id` | [long](./long.md) | Unique ID for the HTTP client. |
| `last_request_time_millis` | [long](./long.md) | Time of the most recent request from this client. |
| `last_uri` | string | The URI of the client’s most recent request. |
| `local_address` | string | Local address for the HTTP connection. |
| `opened_time_millis` | [long](./long.md) | Time at which the client opened the connection. |
| `remote_address` | string | Remote address for the HTTP connection. |
| `request_count` | [long](./long.md) | Number of requests from this client. |
| `request_size_bytes` | [long](./long.md) | Cumulative size in bytes of all requests from this client. |
| `x_opaque_id` | string | Value from the client’s `x-opaque-id` HTTP header. If unavailable, this property is not included in the response. |
