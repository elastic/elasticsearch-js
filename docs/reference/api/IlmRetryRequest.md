# `IlmRetryRequest` [interface-IlmRetryRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; }) | All values in `body` will be added to the request body. |
| `index` | [IndexName](./IndexName.md) | The name of the indices (comma-separated) whose failed lifecycle step is to be retry |
| `querystring` | { [key: string]: any; } & { index?: never; } | All values in `querystring` will be added to the request querystring. |
