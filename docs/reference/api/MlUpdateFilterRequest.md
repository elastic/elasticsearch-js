# `MlUpdateFilterRequest` [interface-MlUpdateFilterRequest]

| Name | Type | Description |
| - | - | - |
| `add_items` | string[] | The items to add to the filter. |
| `body` | string | ({ [key: string]: any; } & { filter_id?: never; add_items?: never; description?: never; remove_items?: never; }) | All values in `body` will be added to the request body. |
| `description` | string | A description for the filter. |
| `filter_id` | [Id](./Id.md) | A string that uniquely identifies a filter. |
| `querystring` | { [key: string]: any; } & { filter_id?: never; add_items?: never; description?: never; remove_items?: never; } | All values in `querystring` will be added to the request querystring. |
| `remove_items` | string[] | The items to remove from the filter. |
