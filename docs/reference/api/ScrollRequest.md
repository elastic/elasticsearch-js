## Interface `ScrollRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { scroll_id?: never; rest_total_hits_as_int?: never; scroll?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { scroll_id?: never; rest_total_hits_as_int?: never; scroll?: never; } | All values in `querystring` will be added to the request querystring. |
| `rest_total_hits_as_int` | boolean | If true, the API response’s hit.total property is returned as an integer. If false, the API response’s hit.total property is returned as an object. |
| `scroll_id` | [ScrollId](./ScrollId.md) | The scroll ID |
| `scroll` | [Duration](./Duration.md) | The period to retain the search context for scrolling. |
