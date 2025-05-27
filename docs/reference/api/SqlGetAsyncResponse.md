## Interface `SqlGetAsyncResponse`

| Name | Type | Description |
| - | - | - |
| `columns` | [SqlColumn](./SqlColumn.md)[] | Column headings for the search results. Each object is a column. |
| `cursor` | string | The cursor for the next set of paginated results. For CSV, TSV, and TXT responses, this value is returned in the `Cursor` HTTP header. |
| `id` | [Id](./Id.md) | Identifier for the search. This value is returned only for async and saved synchronous searches. For CSV, TSV, and TXT responses, this value is returned in the `Async-ID` HTTP header. |
| `is_partial` | boolean | If `true`, the response does not contain complete search results. If `is_partial` is `true` and `is_running` is `true`, the search is still running. If `is_partial` is `true` but `is_running` is `false`, the results are partial due to a failure or timeout. This value is returned only for async and saved synchronous searches. For CSV, TSV, and TXT responses, this value is returned in the `Async-partial` HTTP header. |
| `is_running` | boolean | If `true`, the search is still running. If `false`, the search has finished. This value is returned only for async and saved synchronous searches. For CSV, TSV, and TXT responses, this value is returned in the `Async-partial` HTTP header. |
| `rows` | [SqlRow](./SqlRow.md)[] | The values for the search results. |
