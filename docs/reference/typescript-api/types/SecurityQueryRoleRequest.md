# SecurityQueryRoleRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `query?` | [`SecurityQueryRoleRoleQueryContainer`](SecurityQueryRoleRoleQueryContainer.md) | A query to filter which roles to return.
If the query parameter is missing, it is equivalent to a `match_all` query.
The query supports a subset of query types, including `match_all`, `bool`, `term`, `terms`, `match`,
`ids`, `prefix`, `wildcard`, `exists`, `range`, and `simple_query_string`.
You can query the following information associated with roles: `name`, `description`, `metadata`,
`applications.application`, `applications.privileges`, and `applications.resources`. |
| `from?` | [`integer`](integer.md) | The starting document offset.
It must not be negative.
By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters.
To page through more hits, use the `search_after` parameter. |
| `sort?` | [`Sort`](Sort.md) | The sort definition.
You can sort on `name`, `description`, `metadata`, `applications.application`, `applications.privileges`,
and `applications.resources`.
In addition, sort can also be applied to the `_doc` field to sort by index order. |
| `size?` | [`integer`](integer.md) | The number of hits to return.
It must not be negative.
By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters.
To page through more hits, use the `search_after` parameter. |
| `search_after?` | [`SortResults`](SortResults.md) | The search after definition. |
| `body?` | `string | { [key: string]: any } & { query?: never, from?: never, sort?: never, size?: never, search_after?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { query?: never, from?: never, sort?: never, size?: never, search_after?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
