# `EsqlAsyncQueryDeleteRequest` [interface-EsqlAsyncQueryDeleteRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; }) | All values in `body` will be added to the request body. |
| `id` | [Id](./Id.md) | The unique identifier of the query. A query ID is provided in the ES|QL async query API response for a query that does not complete in the designated time. A query ID is also provided when the request was submitted with the `keep_on_completion` parameter set to `true`. |
| `querystring` | { [key: string]: any; } & { id?: never; } | All values in `querystring` will be added to the request querystring. |
