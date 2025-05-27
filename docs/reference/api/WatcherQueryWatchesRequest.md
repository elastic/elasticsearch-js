## Interface `WatcherQueryWatchesRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { from?: never; size?: never; query?: never; sort?: never; search_after?: never; }) | All values in `body` will be added to the request body. |
| `from` | [integer](./integer.md) | The offset from the first result to fetch. It must be non-negative. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | A query that filters the watches to be returned. |
| `querystring` | { [key: string]: any; } & { from?: never; size?: never; query?: never; sort?: never; search_after?: never; } | All values in `querystring` will be added to the request querystring. |
| `search_after` | [SortResults](./SortResults.md) | Retrieve the next page of hits using a set of sort values from the previous page. |
| `size` | [integer](./integer.md) | The number of hits to return. It must be non-negative. |
| `sort` | [Sort](./Sort.md) | One or more fields used to sort the search results. |
