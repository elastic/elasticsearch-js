## Interface `MlStartDataFrameAnalyticsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. |
| `querystring` | { [key: string]: any; } & { id?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Controls the amount of time to wait until the data frame analytics job starts. |
