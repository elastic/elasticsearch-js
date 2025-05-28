# `AsyncSearchStatusRequest` [interface-AsyncSearchStatusRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; keep_alive?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | A unique identifier for the async search. |
| `keep_alive` | [Duration](./Duration.md) | The length of time that the async search needs to be available. Ongoing async searches and any saved search results are deleted after this period. |
| `querystring` | { [key: string]: any; } & { id?: never; keep_alive?: never; } | All values in `querystring` will be added to the request querystring. |
