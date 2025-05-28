# `EsqlAsyncQueryGetRequest` [interface-EsqlAsyncQueryGetRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; drop_null_columns?: never; keep_alive?: never; wait_for_completion_timeout?: never; }) | All values in `body` will be added to the request body. |
| `drop_null_columns` | boolean | Indicates whether columns that are entirely `null` will be removed from the `columns` and `values` portion of the results. If `true`, the response will include an extra section under the name `all_columns` which has the name of all the columns. |
| `id` | [Id](./Id.md) | The unique identifier of the query. A query ID is provided in the ES|QL async query API response for a query that does not complete in the designated time. A query ID is also provided when the request was submitted with the `keep_on_completion` parameter set to `true`. |
| `keep_alive` | [Duration](./Duration.md) | The period for which the query and its results are stored in the cluster. When this period expires, the query and its results are deleted, even if the query is still ongoing. |
| `querystring` | { [key: string]: any; } & { id?: never; drop_null_columns?: never; keep_alive?: never; wait_for_completion_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `wait_for_completion_timeout` | [Duration](./Duration.md) | The period to wait for the request to finish. By default, the request waits for complete query results. If the request completes during the period specified in this parameter, complete query results are returned. Otherwise, the response returns an `is_running` value of `true` and no results. |
