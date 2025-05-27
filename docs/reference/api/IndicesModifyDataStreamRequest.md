## Interface `IndicesModifyDataStreamRequest`

| Name | Type | Description |
| - | - | - |
| `actions` | [IndicesModifyDataStreamAction](./IndicesModifyDataStreamAction.md)[] | Actions to perform. |
| `body` | string | ({ [key: string]: any; } & { actions?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { actions?: never; } | All values in `querystring` will be added to the request querystring. |
