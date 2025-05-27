## Interface `MigrationDeprecationsRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; }) | All values in `body` will be added to the request body. |
| `index` | [IndexName](./IndexName.md) | Comma-separate list of data streams or indices to check. Wildcard (*) expressions are supported. |
| `querystring` | { [key: string]: any; } & { index?: never; } | All values in `querystring` will be added to the request querystring. |
