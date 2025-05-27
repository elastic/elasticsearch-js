## Interface `AsyncSearchGetRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; keep_alive?: never; typed_keys?: never; wait_for_completion_timeout?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | A unique identifier for the async search. |
| `keep_alive` | [Duration](./Duration.md) | The length of time that the async search should be available in the cluster. When not specified, the `keep_alive` set with the corresponding submit async request will be used. Otherwise, it is possible to override the value and extend the validity of the request. When this period expires, the search, if still running, is cancelled. If the search is completed, its saved results are deleted. |
| `querystring` | { [key: string]: any; } & { id?: never; keep_alive?: never; typed_keys?: never; wait_for_completion_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `typed_keys` | boolean | Specify whether aggregation and suggester names should be prefixed by their respective types in the response |
| `wait_for_completion_timeout` | [Duration](./Duration.md) | Specifies to wait for the search to be completed up until the provided timeout. Final results will be returned if available before the timeout expires, otherwise the currently available results will be returned once the timeout expires. By default no timeout is set meaning that the currently available results will be returned without any additional wait. |
