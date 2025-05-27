## Interface `RollupGetRollupCapsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | Index, indices or index-pattern to return rollup capabilities for. `_all` may be used to fetch rollup capabilities from all jobs. |
| `querystring` | { [key: string]: any; } & { id?: never; } | All values in `querystring` will be added to the request querystring. |
