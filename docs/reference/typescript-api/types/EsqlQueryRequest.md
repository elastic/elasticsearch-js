# EsqlQueryRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `format?` | [`EsqlEsqlFormat`](EsqlEsqlFormat.md) | A short version of the Accept header, e.g. json, yaml.

`csv`, `tsv`, and `txt` formats will return results in a tabular format, excluding other metadata fields from the response. |
| `delimiter?` | `string` | The character to use between values within a CSV row. Only valid for the CSV format. |
| `drop_null_columns?` | `boolean` | Should columns that are entirely `null` be removed from the `columns` and `values` portion of the results?
Defaults to `false`. If `true` then the response will include an extra section under the name `all_columns` which has the name of all columns. |
| `allow_partial_results?` | `boolean` | If `true`, partial results will be returned if there are shard failures, but the query can continue to execute on other clusters and shards.
If `false`, the query will fail if there are any failures.

To override the default behavior, you can set the `esql.query.allow_partial_results` cluster setting to `false`. |
| `columnar?` | `boolean` | By default, ES|QL returns results as rows. For example, FROM returns each individual document as one row. For the JSON, YAML, CBOR and smile formats, ES|QL can return the results in a columnar fashion where one row represents all the values of a certain column in the results. |
| `filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Specify a Query DSL query in the filter parameter to filter the set of documents that an ES|QL query runs on. |
| `locale?` | `string` | - |
| `params?` | `EsqlESQLParam[]` | To avoid any attempts of hacking or code injection, extract the values in a separate list of parameters. Use question mark placeholders (?) in the query string for each of the parameters. |
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
| `body?` | `string | { [key: string]: any } & { format?: never, delimiter?: never, drop_null_columns?: never, allow_partial_results?: never, columnar?: never, filter?: never, locale?: never, params?: never, profile?: never, query?: never, tables?: never, include_ccs_metadata?: never, include_execution_metadata?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { format?: never, delimiter?: never, drop_null_columns?: never, allow_partial_results?: never, columnar?: never, filter?: never, locale?: never, params?: never, profile?: never, query?: never, tables?: never, include_ccs_metadata?: never, include_execution_metadata?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
