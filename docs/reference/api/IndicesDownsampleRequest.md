## Interface `IndicesDownsampleRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; target_index?: never; config?: never; }) | All values in `body` will be added to the request body. |
| `config` | [IndicesDownsampleConfig](./IndicesDownsampleConfig.md) | &nbsp; |
| `index` | [IndexName](./IndexName.md) | Name of the time series index to downsample. |
| `querystring` | { [key: string]: any; } & { index?: never; target_index?: never; config?: never; } | All values in `querystring` will be added to the request querystring. |
| `target_index` | [IndexName](./IndexName.md) | Name of the index to create. |
