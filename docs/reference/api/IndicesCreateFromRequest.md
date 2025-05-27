## Interface `IndicesCreateFromRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { source?: never; dest?: never; create_from?: never; }) | All values in `body` will be added to the request body. |
| `create_from` | [IndicesCreateFromCreateFrom](./IndicesCreateFromCreateFrom.md) | &nbsp; |
| `dest` | [IndexName](./IndexName.md) | The destination index or data stream name |
| `querystring` | { [key: string]: any; } & { source?: never; dest?: never; create_from?: never; } | All values in `querystring` will be added to the request querystring. |
| `source` | [IndexName](./IndexName.md) | The source index or data stream name |
