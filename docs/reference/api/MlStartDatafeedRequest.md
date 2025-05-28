# `MlStartDatafeedRequest` [interface-MlStartDatafeedRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { datafeed_id?: never; end?: never; start?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `datafeed_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `end` | [DateTime](./DateTime.md) | Refer to the description for the `end` query parameter. |
| `querystring` | { [key: string]: any; } & { datafeed_id?: never; end?: never; start?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `start` | [DateTime](./DateTime.md) | Refer to the description for the `start` query parameter. |
| `timeout` | [Duration](./Duration.md) | Refer to the description for the `timeout` query parameter. |
