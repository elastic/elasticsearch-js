# `TermsEnumRequest` [interface-TermsEnumRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; field?: never; size?: never; timeout?: never; case_insensitive?: never; index_filter?: never; string?: never; search_after?: never; }) | All values in `body` will be added to the request body. |
| `case_insensitive` | boolean | When `true`, the provided search string is matched against index terms without case sensitivity. |
| `field` | [Field](./Field.md) | The string to match at the start of indexed terms. If not provided, all terms in the field are considered. |
| `index_filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Filter an index shard if the provided query rewrites to `match_none`. |
| `index` | [IndexName](./IndexName.md) | A comma-separated list of data streams, indices, and index aliases to search. Wildcard ( `*`) expressions are supported. To search all data streams or indices, omit this parameter or use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { index?: never; field?: never; size?: never; timeout?: never; case_insensitive?: never; index_filter?: never; string?: never; search_after?: never; } | All values in `querystring` will be added to the request querystring. |
| `search_after` | string | The string after which terms in the index should be returned. It allows for a form of pagination if the last result from one request is passed as the `search_after` parameter for a subsequent request. |
| `size` | [integer](./integer.md) | The number of matching terms to return. |
| `string` | string | The string to match at the start of indexed terms. If it is not provided, all terms in the field are considered. > info > The prefix string cannot be larger than the largest possible keyword value, which is Lucene's term byte-length limit of 32766. |
| `timeout` | [Duration](./Duration.md) | The maximum length of time to spend collecting results. If the timeout is exceeded the `complete` flag set to `false` in the response and the results may be partial or empty. |
