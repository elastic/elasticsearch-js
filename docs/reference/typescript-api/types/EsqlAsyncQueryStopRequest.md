# EsqlAsyncQueryStopRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | The unique identifier of the query.
A query ID is provided in the ES|QL async query API response for a query that does not complete in the designated time.
A query ID is also provided when the request was submitted with the `keep_on_completion` parameter set to `true`. |
| `drop_null_columns?` | `boolean` | Indicates whether columns that are entirely `null` will be removed from the `columns` and `values` portion of the results.
If `true`, the response will include an extra section under the name `all_columns` which has the name of all the columns. |
| `body?` | `string | { [key: string]: any } & { id?: never, drop_null_columns?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, drop_null_columns?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
