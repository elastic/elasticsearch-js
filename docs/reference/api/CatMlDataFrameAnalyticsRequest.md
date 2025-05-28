# `CatMlDataFrameAnalyticsRequest` [interface-CatMlDataFrameAnalyticsRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Whether to ignore if a wildcard expression matches no configs. (This includes `_all` string or when no configs have been specified) |
| `body` | string | ({ [key: string]: any; } & { id?: never; allow_no_match?: never; bytes?: never; h?: never; s?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `bytes` | [Bytes](./Bytes.md) | The unit in which to display byte values |
| `h` | [CatCatDfaColumns](./CatCatDfaColumns.md) | Comma-separated list of column names to display. |
| `id` | [Id](./Id.md) | The ID of the data frame analytics to fetch |
| `querystring` | { [key: string]: any; } & { id?: never; allow_no_match?: never; bytes?: never; h?: never; s?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [CatCatDfaColumns](./CatCatDfaColumns.md) | Comma-separated list of column names or column aliases used to sort the response. |
| `time` | [TimeUnit](./TimeUnit.md) | Unit used to display time values. |
