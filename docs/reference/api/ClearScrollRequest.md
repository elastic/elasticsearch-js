## Interface `ClearScrollRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { scroll_id?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { scroll_id?: never; } | All values in `querystring` will be added to the request querystring. |
| `scroll_id` | [ScrollIds](./ScrollIds.md) | A comma-separated list of scroll IDs to clear. To clear all scroll IDs, use `_all`. IMPORTANT: Scroll IDs can be long. It is recommended to specify scroll IDs in the request body parameter. |
