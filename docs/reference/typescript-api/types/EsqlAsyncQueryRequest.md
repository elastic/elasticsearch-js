# EsqlAsyncQueryRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `allow_partial_results?` | `boolean` | If `true`, partial results will be returned if there are shard failures, but the query can continue to execute on other clusters and shards.
If `false`, the query will fail if there are any failures.

To override the default behavior, you can set the `esql.query.allow_partial_results` cluster setting to `false`. |
| `delimiter?` | `string` | The character to use between values within a CSV row.
It is valid only for the CSV format. |
| `drop_null_columns?` | `boolean` | Indicates whether columns that are entirely `null` will be removed from the `columns` and `values` portion of the results.
If `true`, the response will include an extra section under the name `all_columns` which has the name of all the columns. |
| `format?` | [`EsqlEsqlFormat`](EsqlEsqlFormat.md) | A short version of the Accept header, e.g. json, yaml.

`csv`, `tsv`, and `txt` formats will return results in a tabular format, excluding other metadata fields from the response.

For async requests, nothing will be returned if the async query doesn't finish within the timeout.
The query ID and running status are available in the `X-Elasticsearch-Async-Id` and `X-Elasticsearch-Async-Is-Running` HTTP headers of the response, respectively. |
| `columnar?` | `boolean` | By default, ES|QL returns results as rows. For example, FROM returns each individual document as one row. For the JSON, YAML, CBOR and smile formats, ES|QL can return the results in a columnar fashion where one row represents all the values of a certain column in the results. |
| `filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Specify a Query DSL query in the filter parameter to filter the set of documents that an ES|QL query runs on. |
| `locale?` | `string` | - |
| `params?` | [`FieldValue`](FieldValue.md)[] | To avoid any attempts of hacking or code injection, extract the values in a separate list of parameters. Use question mark placeholders (?) in the query string for each of the parameters. |
| `profile?` | `boolean` | If provided and `true` the response will include an extra `profile` object
with information on how the query was executed. This information is for human debugging
and its format can change at any time but it can give some insight into the performance
of each part of the query. |
| `query` | `string` | The ES|QL query API accepts an ES|QL query string in the query parameter, runs it, and returns the results. |
| `tables?` | `Record<string, Record<string, EsqlTableValuesContainer>>` | Tables to use with the LOOKUP operation. The top level key is the table
name and the next level key is the column name. |
| `include_ccs_metadata?` | `boolean` | When set to `true` and performing a cross-cluster/cross-project query, the response will include an extra `_clusters`
object with information about the clusters that participated in the search along with info such as shards
count. |
| `include_execution_metadata?` | `boolean` | When set to `true`, the response will include an extra `_clusters`
object with information about the clusters that participated in the search along with info such as shards
count.
This is similar to `include_ccs_metadata`, but it also returns metadata when the query is not CCS/CPS |
| `wait_for_completion_timeout?` | [`Duration`](Duration.md) | The period to wait for the request to finish.
By default, the request waits for 1 second for the query results.
If the query completes during this period, results are returned
Otherwise, a query ID is returned that can later be used to retrieve the results. |
| `keep_alive?` | [`Duration`](Duration.md) | The period for which the query and its results are stored in the cluster.
The default period is five days.
When this period expires, the query and its results are deleted, even if the query is still ongoing.
If the `keep_on_completion` parameter is false, Elasticsearch only stores async queries that do not complete within the period set by the `wait_for_completion_timeout` parameter, regardless of this value. |
| `keep_on_completion?` | `boolean` | Indicates whether the query and its results are stored in the cluster.
If false, the query and its results are stored in the cluster only if the request does not complete during the period set by the `wait_for_completion_timeout` parameter. |
| `body?` | `string | { [key: string]: any } & { allow_partial_results?: never, delimiter?: never, drop_null_columns?: never, format?: never, columnar?: never, filter?: never, locale?: never, params?: never, profile?: never, query?: never, tables?: never, include_ccs_metadata?: never, include_execution_metadata?: never, wait_for_completion_timeout?: never, keep_alive?: never, keep_on_completion?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { allow_partial_results?: never, delimiter?: never, drop_null_columns?: never, format?: never, columnar?: never, filter?: never, locale?: never, params?: never, profile?: never, query?: never, tables?: never, include_ccs_metadata?: never, include_execution_metadata?: never, wait_for_completion_timeout?: never, keep_alive?: never, keep_on_completion?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
