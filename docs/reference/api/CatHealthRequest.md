## Interface `CatHealthRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { time?: never; ts?: never; h?: never; s?: never; }) | All values in `body` will be added to the request body. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `querystring` | { [key: string]: any; } & { time?: never; ts?: never; h?: never; s?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
| `time` | [TimeUnit](./TimeUnit.md) | The unit used to display time values. |
| `ts` | boolean | If true, returns `HH:MM:SS` and Unix epoch timestamps. |
