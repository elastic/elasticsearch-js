## Interface `MlStopDataFrameAnalyticsRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: 1. Contains wildcard expressions and there are no data frame analytics jobs that match. 2. Contains the _all string or no identifiers and there are no matches. 3. Contains wildcard expressions and there are only partial matches. The default value is true, which returns an empty data_frame_analytics array when there are no matches and the subset of results when there are partial matches. If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { id?: never; allow_no_match?: never; force?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `force` | boolean | If true, the data frame analytics job is stopped forcefully. |
| `id` | [Id](./Id.md) | Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `querystring` | { [key: string]: any; } & { id?: never; allow_no_match?: never; force?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Controls the amount of time to wait until the data frame analytics job stops. Defaults to 20 seconds. |
