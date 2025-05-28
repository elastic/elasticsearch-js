# `MlStopDatafeedRequest` [interface-MlStopDatafeedRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Refer to the description for the `allow_no_match` query parameter. |
| `body` | string | ({ [key: string]: any; } & { datafeed_id?: never; allow_no_match?: never; force?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `datafeed_id` | [Id](./Id.md) | Identifier for the datafeed. You can stop multiple datafeeds in a single API request by using a comma-separated list of datafeeds or a wildcard expression. You can close all datafeeds by using `_all` or by specifying `*` as the identifier. |
| `force` | boolean | Refer to the description for the `force` query parameter. |
| `querystring` | { [key: string]: any; } & { datafeed_id?: never; allow_no_match?: never; force?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Refer to the description for the `timeout` query parameter. |
