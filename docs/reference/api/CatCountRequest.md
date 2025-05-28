# `CatCountRequest` [interface-CatCountRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; h?: never; s?: never; }) | All values in `body` will be added to the request body. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases used to limit the request. It supports wildcards ( `*`). To target all data streams and indices, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { index?: never; h?: never; s?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
