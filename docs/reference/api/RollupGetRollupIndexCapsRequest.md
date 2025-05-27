## Interface `RollupGetRollupIndexCapsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; }) | All values in `body` will be added to the request body. |
| `index` | [Ids](./Ids.md) | Data stream or index to check for rollup capabilities. Wildcard ( `*`) expressions are supported. |
| `querystring` | { [key: string]: any; } & { index?: never; } | All values in `querystring` will be added to the request querystring. |
