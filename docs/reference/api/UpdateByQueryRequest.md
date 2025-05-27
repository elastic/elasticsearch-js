## Interface `UpdateByQueryRequest`

| Name | Type | Description |
| - | - | - |
| `allow_no_indices` | boolean | If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`. |
| `analyze_wildcard` | boolean | If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified. |
| `analyzer` | string | The analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified. |
| `body` | string | ({ [key: string]: any; } & { index?: never; allow_no_indices?: never; analyzer?: never; analyze_wildcard?: never; default_operator?: never; df?: never; expand_wildcards?: never; from?: never; ignore_unavailable?: never; lenient?: never; pipeline?: never; preference?: never; q?: never; refresh?: never; request_cache?: never; requests_per_second?: never; routing?: never; scroll?: never; scroll_size?: never; search_timeout?: never; search_type?: never; slices?: never; sort?: never; stats?: never; terminate_after?: never; timeout?: never; version?: never; version_type?: never; wait_for_active_shards?: never; wait_for_completion?: never; max_docs?: never; query?: never; script?: never; slice?: never; conflicts?: never; }) | All values in `body` will be added to the request body. |
| `conflicts` | [Conflicts](./Conflicts.md) | The preferred behavior when update by query hits version conflicts: `abort` or `proceed`. |
| `default_operator` | [QueryDslOperator](./QueryDslOperator.md) | The default operator for query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified. |
| `df` | string | The field to use as default where no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports comma-separated values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`. |
| `from` | [long](./long.md) | Skips the specified number of documents. |
| `ignore_unavailable` | boolean | If `false`, the request returns an error if it targets a missing or closed index. |
| `index` | [Indices](./Indices.md) | A comma-separated list of data streams, indices, and aliases to search. It supports wildcards ( `*`). To search all data streams or indices, omit this parameter or use `*` or `_all`. |
| `lenient` | boolean | If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified. |
| `max_docs` | [long](./long.md) | The maximum number of documents to update. |
| `pipeline` | string | The ID of the pipeline to use to preprocess incoming documents. If the index has a default ingest pipeline specified, then setting the value to `_none` disables the default ingest pipeline for this request. If a final pipeline is configured it will always run, regardless of the value of this parameter. |
| `preference` | string | The node or shard the operation should be performed on. It is random by default. |
| `q` | string | A query in the Lucene query string syntax. |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | The documents to update using the Query DSL. |
| `querystring` | { [key: string]: any; } & { index?: never; allow_no_indices?: never; analyzer?: never; analyze_wildcard?: never; default_operator?: never; df?: never; expand_wildcards?: never; from?: never; ignore_unavailable?: never; lenient?: never; pipeline?: never; preference?: never; q?: never; refresh?: never; request_cache?: never; requests_per_second?: never; routing?: never; scroll?: never; scroll_size?: never; search_timeout?: never; search_type?: never; slices?: never; sort?: never; stats?: never; terminate_after?: never; timeout?: never; version?: never; version_type?: never; wait_for_active_shards?: never; wait_for_completion?: never; max_docs?: never; query?: never; script?: never; slice?: never; conflicts?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | boolean | If `true`, Elasticsearch refreshes affected shards to make the operation visible to search after the request completes. This is different than the update API's `refresh` parameter, which causes just the shard that received the request to be refreshed. |
| `request_cache` | boolean | If `true`, the request cache is used for this request. It defaults to the index-level setting. |
| `requests_per_second` | [float](./float.md) | The throttle for this request in sub-requests per second. |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | The script to run to update the document source or metadata when updating. |
| `scroll_size` | [long](./long.md) | The size of the scroll request that powers the operation. |
| `scroll` | [Duration](./Duration.md) | The period to retain the search context for scrolling. |
| `search_timeout` | [Duration](./Duration.md) | An explicit timeout for each search request. By default, there is no timeout. |
| `search_type` | [SearchType](./SearchType.md) | The type of the search operation. Available options include `query_then_fetch` and `dfs_query_then_fetch`. |
| `slice` | [SlicedScroll](./SlicedScroll.md) | Slice the request manually using the provided slice ID and total number of slices. |
| `slices` | [Slices](./Slices.md) | The number of slices this task should be divided into. |
| `sort` | string[] | A comma-separated list of : pairs. |
| `stats` | string[] | The specific `tag` of the request for logging and statistical purposes. |
| `terminate_after` | [long](./long.md) | The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. IMPORTANT: Use with caution. Elasticsearch applies this parameter to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this parameter for requests that target data streams with backing indices across multiple data tiers. |
| `timeout` | [Duration](./Duration.md) | The period each update request waits for the following operations: dynamic mapping updates, waiting for active shards. By default, it is one minute. This guarantees Elasticsearch waits for at least the timeout before failing. The actual wait time could be longer, particularly when multiple waits occur. |
| `version_type` | boolean | Should the document increment the version number (internal) on hit or not (reindex) |
| `version` | boolean | If `true`, returns the document version as part of a hit. |
| `wait_for_active_shards` | [WaitForActiveShards](./WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index ( `number_of_replicas+1`). The `timeout` parameter controls how long each write request waits for unavailable shards to become available. Both work exactly the way they work in the bulk API. |
| `wait_for_completion` | boolean | If `true`, the request blocks until the operation is complete. If `false`, Elasticsearch performs some preflight checks, launches the request, and returns a task ID that you can use to cancel or get the status of the task. Elasticsearch creates a record of this task as a document at `.tasks/task/${taskId}`. |
