# `UpdateRequest` [interface-UpdateRequest]

| Name | Type | Description |
| - | - | - |
| `_source_excludes` | [Fields](./Fields.md) | The source fields you want to exclude. |
| `_source_includes` | [Fields](./Fields.md) | The source fields you want to retrieve. |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | If `false`, turn off source retrieval. You can also specify a comma-separated list of the fields you want to retrieve. |
| `body` | string | ({ [key: string]: any; } & { id?: never; index?: never; if_primary_term?: never; if_seq_no?: never; include_source_on_error?: never; lang?: never; refresh?: never; require_alias?: never; retry_on_conflict?: never; routing?: never; timeout?: never; wait_for_active_shards?: never; _source_excludes?: never; _source_includes?: never; detect_noop?: never; doc?: never; doc_as_upsert?: never; script?: never; scripted_upsert?: never; _source?: never; upsert?: never; }) | All values in `body` will be added to the request body. |
| `detect_noop` | boolean | If `true`, the `result` in the response is set to `noop` (no operation) when there are no changes to the document. |
| `doc_as_upsert` | boolean | If `true`, use the contents of 'doc' as the value of 'upsert'. NOTE: Using ingest pipelines with `doc_as_upsert` is not supported. |
| `doc` | TPartialDocument | A partial update to an existing document. If both `doc` and `script` are specified, `doc` is ignored. |
| `id` | [Id](./Id.md) | A unique identifier for the document to be updated. |
| `if_primary_term` | [long](./long.md) | Only perform the operation if the document has this primary term. |
| `if_seq_no` | [SequenceNumber](./SequenceNumber.md) | Only perform the operation if the document has this sequence number. |
| `include_source_on_error` | boolean | True or false if to include the document source in the error message in case of parsing errors. |
| `index` | [IndexName](./IndexName.md) | The name of the target index. By default, the index is created automatically if it doesn't exist. |
| `lang` | string | The script language. |
| `querystring` | { [key: string]: any; } & { id?: never; index?: never; if_primary_term?: never; if_seq_no?: never; include_source_on_error?: never; lang?: never; refresh?: never; require_alias?: never; retry_on_conflict?: never; routing?: never; timeout?: never; wait_for_active_shards?: never; _source_excludes?: never; _source_includes?: never; detect_noop?: never; doc?: never; doc_as_upsert?: never; script?: never; scripted_upsert?: never; _source?: never; upsert?: never; } | All values in `querystring` will be added to the request querystring. |
| `refresh` | [Refresh](./Refresh.md) | If 'true', Elasticsearch refreshes the affected shards to make this operation visible to search. If 'wait_for', it waits for a refresh to make this operation visible to search. If 'false', it does nothing with refreshes. |
| `require_alias` | boolean | If `true`, the destination must be an index alias. |
| `retry_on_conflict` | [integer](./integer.md) | The number of times the operation should be retried when a conflict occurs. |
| `routing` | [Routing](./Routing.md) | A custom value used to route operations to a specific shard. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | The script to run to update the document. |
| `scripted_upsert` | boolean | If `true`, run the script whether or not the document exists. |
| `timeout` | [Duration](./Duration.md) | The period to wait for the following operations: dynamic mapping updates and waiting for active shards. Elasticsearch waits for at least the timeout period before failing. The actual wait time could be longer, particularly when multiple waits occur. |
| `upsert` | TDocument | If the document does not already exist, the contents of 'upsert' are inserted as a new document. If the document exists, the 'script' is run. |
| `wait_for_active_shards` | [WaitForActiveShards](./WaitForActiveShards.md) | The number of copies of each shard that must be active before proceeding with the operation. Set to 'all' or any positive integer up to the total number of shards in the index ( `number_of_replicas`+1). The default value of `1` means it waits for each primary shard to be active. |
