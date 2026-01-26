# CatTasksRequest

## Interface

### Extends

- [`CatCatRequestBase`](CatCatRequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `actions?` | `string`[] | The task action names, which are used to limit the response. |
| `detailed?` | `boolean` | If `true`, the response includes detailed information about shard recoveries. |
| `nodes?` | `string`[] | Unique node identifiers, which are used to limit the response. |
| `parent_task_id?` | `string` | The parent task identifier, which is used to limit the response. |
| `h?` | [`CatCatTasksColumns`](CatCatTasksColumns.md) | A comma-separated list of columns names to display. It supports simple wildcards. |
| `s?` | [`Names`](Names.md) | List of columns that determine how the table should be sorted.
Sorting defaults to ascending and can be changed by setting `:asc`
or `:desc` as a suffix to the column name. |
| `timeout?` | [`Duration`](Duration.md) | Period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_completion?` | `boolean` | If `true`, the request blocks until the task has completed. |
| `body?` | `string | { [key: string]: any } & { actions?: never, detailed?: never, nodes?: never, parent_task_id?: never, h?: never, s?: never, timeout?: never, wait_for_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { actions?: never, detailed?: never, nodes?: never, parent_task_id?: never, h?: never, s?: never, timeout?: never, wait_for_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
