# SqlQueryRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `format?` | [`SqlQuerySqlFormat`](SqlQuerySqlFormat.md) | The format for the response.
You can also specify a format using the `Accept` HTTP header.
If you specify both this parameter and the `Accept` HTTP header, this parameter takes precedence. |
| `allow_partial_search_results?` | `boolean` | If `true`, the response has partial results when there are shard request timeouts or shard failures.
If `false`, the API returns an error with no partial results. |
| `catalog?` | `string` | The default catalog (cluster) for queries.
If unspecified, the queries execute on the data in the local cluster only. |
| `columnar?` | `boolean` | If `true`, the results are in a columnar fashion: one row represents all the values of a certain column from the current page of results.
The API supports this parameter only for CBOR, JSON, SMILE, and YAML responses. |
| `cursor?` | `string` | The cursor used to retrieve a set of paginated results.
If you specify a cursor, the API only uses the `columnar` and `time_zone` request body parameters.
It ignores other request body parameters. |
| `fetch_size?` | `integer` | The maximum number of rows (or entries) to return in one response. |
| `field_multi_value_leniency?` | `boolean` | If `false`, the API returns an exception when encountering multiple values for a field.
If `true`, the API is lenient and returns the first value from the array with no guarantee of consistent results. |
| `filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | The Elasticsearch query DSL for additional filtering. |
| `index_using_frozen?` | `boolean` | If `true`, the search can run on frozen indices. |
| `keep_alive?` | [`Duration`](Duration.md) | The retention period for an async or saved synchronous search. |
| `keep_on_completion?` | `boolean` | If `true`, Elasticsearch stores synchronous searches if you also specify the `wait_for_completion_timeout` parameter.
If `false`, Elasticsearch only stores async searches that don't finish before the `wait_for_completion_timeout`. |
| `page_timeout?` | [`Duration`](Duration.md) | The minimum retention period for the scroll cursor.
After this time period, a pagination request might fail because the scroll cursor is no longer available.
Subsequent scroll requests prolong the lifetime of the scroll cursor by the duration of `page_timeout` in the scroll request. |
| `params?` | `any[]` | The values for parameters in the query. |
| `query?` | `string` | The SQL query to run. |
| `project_routing?` | [`ProjectRouting`](ProjectRouting.md) | Specifies a subset of projects to target using project
metadata tags in a subset of Lucene query syntax.
Allowed Lucene queries: the _alias tag and a single value (possibly wildcarded).
Examples:
 _alias:my-project
 _alias:_origin
 _alias:*pr*
Supported in serverless only. |
| `request_timeout?` | [`Duration`](Duration.md) | The timeout before the request fails. |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | One or more runtime fields for the search request.
These fields take precedence over mapped fields with the same name. |
| `time_zone?` | [`TimeZone`](TimeZone.md) | The ISO-8601 time zone ID for the search. |
| `wait_for_completion_timeout?` | [`Duration`](Duration.md) | The period to wait for complete results.
It defaults to no timeout, meaning the request waits for complete search results.
If the search doesn't finish within this period, the search becomes async.

To save a synchronous search, you must specify this parameter and the `keep_on_completion` parameter. |
| `body?` | `string | { [key: string]: any } & { format?: never, allow_partial_search_results?: never, catalog?: never, columnar?: never, cursor?: never, fetch_size?: never, field_multi_value_leniency?: never, filter?: never, index_using_frozen?: never, keep_alive?: never, keep_on_completion?: never, page_timeout?: never, params?: never, query?: never, project_routing?: never, request_timeout?: never, runtime_mappings?: never, time_zone?: never, wait_for_completion_timeout?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { format?: never, allow_partial_search_results?: never, catalog?: never, columnar?: never, cursor?: never, fetch_size?: never, field_multi_value_leniency?: never, filter?: never, index_using_frozen?: never, keep_alive?: never, keep_on_completion?: never, page_timeout?: never, params?: never, query?: never, project_routing?: never, request_timeout?: never, runtime_mappings?: never, time_zone?: never, wait_for_completion_timeout?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
