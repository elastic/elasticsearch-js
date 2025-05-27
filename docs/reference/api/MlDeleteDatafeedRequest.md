## Interface `MlDeleteDatafeedRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { datafeed_id?: never; force?: never; }) | All values in `body` will be added to the request body. |
| `datafeed_id` | [Id](./Id.md) | A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `force` | boolean | Use to forcefully delete a started datafeed; this method is quicker than stopping and deleting the datafeed. |
| `querystring` | { [key: string]: any; } & { datafeed_id?: never; force?: never; } | All values in `querystring` will be added to the request querystring. |
