## Interface `MlGetDatafeedStatsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: 1. Contains wildcard expressions and there are no datafeeds that match. 2. Contains the `_all` string or no identifiers and there are no matches. 3. Contains wildcard expressions and there are only partial matches. The default value is `true`, which returns an empty `datafeeds` array when there are no matches and the subset of results when there are partial matches. If this parameter is `false`, the request returns a `404` status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { datafeed_id?: never; allow_no_match?: never; }) | All values in `body` will be added to the request body. |
| `datafeed_id` | [Ids](./Ids.md) | Identifier for the datafeed. It can be a datafeed identifier or a wildcard expression. If you do not specify one of these options, the API returns information about all datafeeds. |
| `querystring` | { [key: string]: any; } & { datafeed_id?: never; allow_no_match?: never; } | All values in `querystring` will be added to the request querystring. |
