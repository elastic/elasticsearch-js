# BulkRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`IndexName`](IndexName.md) | The name of the data stream, index, or index alias to perform bulk actions on. |
| `include_source_on_error?` | `boolean` | True or false if to include the document source in the error message in case of parsing errors. |
| `list_executed_pipelines?` | `boolean` | If `true`, the response will include the ingest pipelines that were run for each index or create. |
| `pipeline?` | `string` | The pipeline identifier to use to preprocess incoming documents.
If the index has a default ingest pipeline specified, setting the value to `_none` turns off the default ingest pipeline for this request.
If a final pipeline is configured, it will always run regardless of the value of this parameter. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search.
If `wait_for`, wait for a refresh to make this operation visible to search.
If `false`, do nothing with refreshes.
Valid values: `true`, `false`, `wait_for`. |
| `routing?` | [`Routing`](Routing.md) | A custom value that is used to route operations to a specific shard. |
| `_source?` | [`SearchSourceConfigParam`](SearchSourceConfigParam.md) | Indicates whether to return the `_source` field (`true` or `false`) or contains a list of fields to return. |
| `_source_excludes?` | [`Fields`](Fields.md) | A comma-separated list of source fields to exclude from the response.
You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter.
If the `_source` parameter is `false`, this parameter is ignored. |
| `_source_includes?` | [`Fields`](Fields.md) | A comma-separated list of source fields to include in the response.
If this parameter is specified, only these source fields are returned.
You can exclude fields from this subset using the `_source_excludes` query parameter.
If the `_source` parameter is `false`, this parameter is ignored. |
| `timeout?` | [`Duration`](Duration.md) | The period each action waits for the following operations: automatic index creation, dynamic mapping updates, and waiting for active shards.
The default is `1m` (one minute), which guarantees Elasticsearch waits for at least the timeout before failing.
The actual wait time could be longer, particularly when multiple waits occur. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation.
Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).
The default is `1`, which waits for each primary shard to be active. |
| `require_alias?` | `boolean` | If `true`, the request's actions must target an index alias. |
| `require_data_stream?` | `boolean` | If `true`, the request's actions must target a data stream (existing or to be created). |
| `operations?` | `(BulkOperationContainer | BulkUpdateAction<TDocument, TPartialDocument> | TDocument)`[] | - |
| `body?` | `string | { [key: string]: any } & { index?: never, include_source_on_error?: never, list_executed_pipelines?: never, pipeline?: never, refresh?: never, routing?: never, _source?: never, _source_excludes?: never, _source_includes?: never, timeout?: never, wait_for_active_shards?: never, require_alias?: never, require_data_stream?: never, operations?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, include_source_on_error?: never, list_executed_pipelines?: never, pipeline?: never, refresh?: never, routing?: never, _source?: never, _source_excludes?: never, _source_includes?: never, timeout?: never, wait_for_active_shards?: never, require_alias?: never, require_data_stream?: never, operations?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
