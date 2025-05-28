# `NodesHotThreadsRequest` [interface-NodesHotThreadsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; ignore_idle_threads?: never; interval?: never; snapshots?: never; threads?: never; timeout?: never; type?: never; sort?: never; }) | All values in `body` will be added to the request body. |
| `ignore_idle_threads` | boolean | If true, known idle threads (e.g. waiting in a socket select, or to get a task from an empty queue) are filtered out. |
| `interval` | [Duration](./Duration.md) | The interval to do the second sampling of threads. |
| `node_id` | [NodeIds](./NodeIds.md) | List of node IDs or names used to limit returned information. |
| `querystring` | { [key: string]: any; } & { node_id?: never; ignore_idle_threads?: never; interval?: never; snapshots?: never; threads?: never; timeout?: never; type?: never; sort?: never; } | All values in `querystring` will be added to the request querystring. |
| `snapshots` | [long](./long.md) | Number of samples of thread stacktrace. |
| `sort` | [ThreadType](./ThreadType.md) | The sort order for 'cpu' type (default: total) |
| `threads` | [long](./long.md) | Specifies the number of hot threads to provide information for. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `type` | [ThreadType](./ThreadType.md) | The type to sample. |
