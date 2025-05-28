# `SynonymsGetSynonymRequest` [interface-SynonymsGetSynonymRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; from?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `from` | [integer](./integer.md) | The starting offset for query rules to retrieve. |
| `id` | [Id](./Id.md) | The synonyms set identifier to retrieve. |
| `querystring` | { [key: string]: any; } & { id?: never; from?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | The max number of query rules to retrieve. |
