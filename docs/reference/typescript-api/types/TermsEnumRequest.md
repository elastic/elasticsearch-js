# TermsEnumRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and index aliases to search.
Wildcard (`*`) expressions are supported.
To search all data streams or indices, omit this parameter or use `*`  or `_all`. |
| `field` | [`Field`](Field.md) | The string to match at the start of indexed terms. If not provided, all terms in the field are considered. |
| `size?` | `integer` | The number of matching terms to return. |
| `timeout?` | [`Duration`](Duration.md) | The maximum length of time to spend collecting results.
If the timeout is exceeded the `complete` flag set to `false` in the response and the results may be partial or empty. |
| `case_insensitive?` | `boolean` | When `true`, the provided search string is matched against index terms without case sensitivity. |
| `index_filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Filter an index shard if the provided query rewrites to `match_none`. |
| `string?` | `string` | The string to match at the start of indexed terms.
If it is not provided, all terms in the field are considered.

> info
> The prefix string cannot be larger than the largest possible keyword value, which is Lucene's term byte-length limit of 32766. |
| `search_after?` | `string` | The string after which terms in the index should be returned.
It allows for a form of pagination if the last result from one request is passed as the `search_after` parameter for a subsequent request. |
| `body?` | `string | { [key: string]: any } & { index?: never, field?: never, size?: never, timeout?: never, case_insensitive?: never, index_filter?: never, string?: never, search_after?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, field?: never, size?: never, timeout?: never, case_insensitive?: never, index_filter?: never, string?: never, search_after?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
