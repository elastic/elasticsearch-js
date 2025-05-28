# `CatFielddataRequest` [interface-CatFielddataRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { fields?: never; bytes?: never; h?: never; s?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit used to display byte values. |
| `fields` | [Fields](./Fields.md) | Comma-separated list of fields used to limit returned information. To retrieve all fields, omit this parameter. |
| `h` | [Names](./Names.md) | List of columns to appear in the response. Supports simple wildcards. |
| `querystring` | { [key: string]: any; } & { fields?: never; bytes?: never; h?: never; s?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [Names](./Names.md) | List of columns that determine how the table should be sorted. Sorting defaults to ascending and can be changed by setting `:asc` or `:desc` as a suffix to the column name. |
