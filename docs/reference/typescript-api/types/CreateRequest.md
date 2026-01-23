# CreateRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`Id`](Id.md) | A unique identifier for the document.
To automatically generate a document ID, use the `POST /<target>/_doc/` request format. |
| `index` | [`IndexName`](IndexName.md) | The name of the data stream or index to target.
If the target doesn't exist and matches the name or wildcard (`*`) pattern of an index template with a `data_stream` definition, this request creates the data stream.
If the target doesn't exist and doesn’t match a data stream template, this request creates the index. |
| `include_source_on_error?` | `boolean` | True or false if to include the document source in the error message in case of parsing errors. |
| `pipeline?` | `string` | The ID of the pipeline to use to preprocess incoming documents.
If the index has a default ingest pipeline specified, setting the value to `_none` turns off the default ingest pipeline for this request.
If a final pipeline is configured, it will always run regardless of the value of this parameter. |
| `refresh?` | [`Refresh`](Refresh.md) | If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search.
If `wait_for`, it waits for a refresh to make this operation visible to search.
If `false`, it does nothing with refreshes. |
| `require_alias?` | `boolean` | If `true`, the destination must be an index alias. |
| `require_data_stream?` | `boolean` | If `true`, the request's actions must target a data stream (existing or to be created). |
| `routing?` | [`Routing`](Routing.md) | A custom value that is used to route operations to a specific shard. |
| `timeout?` | [`Duration`](Duration.md) | The period the request waits for the following operations: automatic index creation, dynamic mapping updates, waiting for active shards.
Elasticsearch waits for at least the specified timeout period before failing.
The actual wait time could be longer, particularly when multiple waits occur.

This parameter is useful for situations where the primary shard assigned to perform the operation might not be available when the operation runs.
Some reasons for this might be that the primary shard is currently recovering from a gateway or undergoing relocation.
By default, the operation will wait on the primary shard to become available for at least 1 minute before failing and responding with an error.
The actual wait time could be longer, particularly when multiple waits occur. |
| `version?` | [`VersionNumber`](VersionNumber.md) | The explicit version number for concurrency control.
It must be a non-negative long number. |
| `version_type?` | [`VersionType`](VersionType.md) | The version type. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation.
You can set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).
The default value of `1` means it waits for each primary shard to be active. |
| `document?` | [`TDocument`](TDocument.md) | - |
| `body?` | `string | { [key: string]: any } & { id?: never, index?: never, include_source_on_error?: never, pipeline?: never, refresh?: never, require_alias?: never, require_data_stream?: never, routing?: never, timeout?: never, version?: never, version_type?: never, wait_for_active_shards?: never, document?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { id?: never, index?: never, include_source_on_error?: never, pipeline?: never, refresh?: never, require_alias?: never, require_data_stream?: never, routing?: never, timeout?: never, version?: never, version_type?: never, wait_for_active_shards?: never, document?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
