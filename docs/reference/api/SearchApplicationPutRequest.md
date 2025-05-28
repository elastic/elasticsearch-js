# `SearchApplicationPutRequest` [interface-SearchApplicationPutRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; create?: never; search_application?: never; }) | All values in `body` will be added to the request body. |
| `create` | boolean | If `true`, this request cannot replace or update existing Search Applications. |
| `name` | [Name](./Name.md) | The name of the search application to be created or updated. |
| `querystring` | { [key: string]: any; } & { name?: never; create?: never; search_application?: never; } | All values in `querystring` will be added to the request querystring. |
| `search_application` | [SearchApplicationSearchApplicationParameters](./SearchApplicationSearchApplicationParameters.md) | &nbsp; |
