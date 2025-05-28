# `SecurityQueryUserRequest` [interface-SecurityQueryUserRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { with_profile_uid?: never; query?: never; from?: never; sort?: never; size?: never; search_after?: never; }) | All values in `body` will be added to the request body. |
| `from` | [integer](./integer.md) | The starting document offset. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter. |
| `query` | [SecurityQueryUserUserQueryContainer](./SecurityQueryUserUserQueryContainer.md) | A query to filter which users to return. If the query parameter is missing, it is equivalent to a `match_all` query. The query supports a subset of query types, including `match_all`, `bool`, `term`, `terms`, `match`, `ids`, `prefix`, `wildcard`, `exists`, `range`, and `simple_query_string`. You can query the following information associated with user: `username`, `roles`, `enabled`, `full_name`, and `email`. |
| `querystring` | { [key: string]: any; } & { with_profile_uid?: never; query?: never; from?: never; sort?: never; size?: never; search_after?: never; } | All values in `querystring` will be added to the request querystring. |
| `search_after` | [SortResults](./SortResults.md) | The search after definition |
| `size` | [integer](./integer.md) | The number of hits to return. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter. |
| `sort` | [Sort](./Sort.md) | The sort definition. Fields eligible for sorting are: `username`, `roles`, `enabled`. In addition, sort can also be applied to the `_doc` field to sort by index order. |
| `with_profile_uid` | boolean | Determines whether to retrieve the user profile UID, if it exists, for the users. |
