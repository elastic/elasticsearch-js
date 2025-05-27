## Interface `CatTasksRequest`

| Name | Type | Description |
| - | - | - |
| `actions` | string[] | The task action names, which are used to limit the response. |
| `body` | string | ({ [key: string]: any; } & { actions?: never; detailed?: never; nodes?: never; parent_task_id?: never; h?: never; s?: never; time?: never; timeout?: never; wait_for_completion?: never; }) | All values in `body` will be added to the request body. |
| `detailed` | boolean | If `true`, the response includes detailed information about shard recoveries. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `nodes` | string[] | Unique node identifiers, which are used to limit the response. |
| `parent_task_id` | string | The parent task identifier, which is used to limit the response. |
| `querystring` | { [key: string]: any; } & { actions?: never; detailed?: never; nodes?: never; parent_task_id?: never; h?: never; s?: never; time?: never; timeout?: never; wait_for_completion?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | Unit used to display time values. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_completion` | boolean | If `true`, the request blocks until the task has completed. |
