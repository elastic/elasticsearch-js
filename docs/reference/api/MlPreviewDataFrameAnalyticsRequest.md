# `MlPreviewDataFrameAnalyticsRequest` [interface-MlPreviewDataFrameAnalyticsRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; config?: never; }) | All values in `body` will be added to the request body. |
| `config` | [MlPreviewDataFrameAnalyticsDataframePreviewConfig](./MlPreviewDataFrameAnalyticsDataframePreviewConfig.md) | A data frame analytics config as described in create data frame analytics jobs. Note that `id` and `dest` don’t need to be provided in the context of this API. |
| `id` | [Id](./Id.md) | Identifier for the data frame analytics job. |
| `querystring` | { [key: string]: any; } & { id?: never; config?: never; } | All values in `querystring` will be added to the request querystring. |
