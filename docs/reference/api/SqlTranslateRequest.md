# `SqlTranslateRequest` [interface-SqlTranslateRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { fetch_size?: never; filter?: never; query?: never; time_zone?: never; }) | All values in `body` will be added to the request body. |
| `fetch_size` | [integer](./integer.md) | The maximum number of rows (or entries) to return in one response. |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | The Elasticsearch query DSL for additional filtering. |
| `query` | string | The SQL query to run. |
| `querystring` | { [key: string]: any; } & { fetch_size?: never; filter?: never; query?: never; time_zone?: never; } | All values in `querystring` will be added to the request querystring. |
| `time_zone` | [TimeZone](./TimeZone.md) | The ISO-8601 time zone ID for the search. |
