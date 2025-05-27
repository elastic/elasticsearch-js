## Interface `CatMlDatafeedsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: * Contains wildcard expressions and there are no datafeeds that match. * Contains the `_all` string or no identifiers and there are no matches. * Contains wildcard expressions and there are only partial matches. If `true`, the API returns an empty datafeeds array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { datafeed_id?: never; allow_no_match?: never; h?: never; s?: never; time?: never; }) | All values in `body` will be added to the request body. |
| `datafeed_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the datafeed. |
| `h` | [CatCatDatafeedColumns](./CatCatDatafeedColumns.md) | Comma-separated list of column names to display. |
| `querystring` | { [key: string]: any; } & { datafeed_id?: never; allow_no_match?: never; h?: never; s?: never; time?: never; } | All values in `querystring` will be added to the request querystring. |
| `s` | [CatCatDatafeedColumns](./CatCatDatafeedColumns.md) | Comma-separated list of column names or column aliases used to sort the response. |
| `time` | [TimeUnit](./TimeUnit.md) | The unit used to display time values. |
