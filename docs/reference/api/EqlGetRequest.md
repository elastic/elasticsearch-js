# `EqlGetRequest` [interface-EqlGetRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; keep_alive?: never; wait_for_completion_timeout?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | Identifier for the search. |
| `keep_alive` | [Duration](./Duration.md) | Period for which the search and its results are stored on the cluster. Defaults to the keep_alive value set by the search’s EQL search API request. |
| `querystring` | { [key: string]: any; } & { id?: never; keep_alive?: never; wait_for_completion_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `wait_for_completion_timeout` | [Duration](./Duration.md) | Timeout duration to wait for the request to finish. Defaults to no timeout, meaning the request waits for complete search results. |
