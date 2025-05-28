# `SearchApplicationSearchRequest` [interface-SearchApplicationSearchRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; typed_keys?: never; params?: never; }) | All values in `body` will be added to the request body. |
| `name` | [Name](./Name.md) | The name of the search application to be searched. |
| `params` | Record<string, any> | Query parameters specific to this request, which will override any defaults specified in the template. |
| `querystring` | { [key: string]: any; } & { name?: never; typed_keys?: never; params?: never; } | All values in `querystring` will be added to the request querystring. |
| `typed_keys` | boolean | Determines whether aggregation names are prefixed by their respective types in the response. |
