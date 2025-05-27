## Interface `MlPutFilterRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { filter_id?: never; description?: never; items?: never; }) | All values in `body` will be added to the request body. |
| `description` | string | A description of the filter. |
| `filter_id` | [Id](./Id.md) | A string that uniquely identifies a filter. |
| `items` | string[] | The items of the filter. A wildcard `*` can be used at the beginning or the end of an item. Up to 10000 items are allowed in each filter. |
| `querystring` | { [key: string]: any; } & { filter_id?: never; description?: never; items?: never; } | All values in `querystring` will be added to the request querystring. |
