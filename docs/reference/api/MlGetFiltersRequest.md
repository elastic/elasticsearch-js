# `MlGetFiltersRequest` [interface-MlGetFiltersRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { filter_id?: never; from?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `filter_id` | [Ids](./Ids.md) | A string that uniquely identifies a filter. |
| `from` | [integer](./integer.md) | Skips the specified number of filters. |
| `querystring` | { [key: string]: any; } & { filter_id?: never; from?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Specifies the maximum number of filters to obtain. |
