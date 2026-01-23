# ReindexRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `refresh?` | `boolean` | If `true`, the request refreshes affected shards to make this operation visible to search. |
| `requests_per_second?` | `float` | The throttle for this request in sub-requests per second.
By default, there is no throttle. |
| `scroll?` | [`Duration`](Duration.md) | The period of time that a consistent view of the index should be maintained for scrolled search. |
| `slices?` | [`Slices`](Slices.md) | The number of slices this task should be divided into.
It defaults to one slice, which means the task isn't sliced into subtasks.

Reindex supports sliced scroll to parallelize the reindexing process.
This parallelization can improve efficiency and provide a convenient way to break the request down into smaller parts.

NOTE: Reindexing from remote clusters does not support manual or automatic slicing.

If set to `auto`, Elasticsearch chooses the number of slices to use.
This setting will use one slice per shard, up to a certain limit.
If there are multiple sources, it will choose the number of slices based on the index or backing index with the smallest number of shards. |
| `timeout?` | [`Duration`](Duration.md) | The period each indexing waits for automatic index creation, dynamic mapping updates, and waiting for active shards.
By default, Elasticsearch waits for at least one minute before failing.
The actual wait time could be longer, particularly when multiple waits occur. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation.
Set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).
The default value is one, which means it waits for each primary shard to be active. |
| `wait_for_completion?` | `boolean` | If `true`, the request blocks until the operation is complete. |
| `require_alias?` | `boolean` | If `true`, the destination must be an index alias. |
| `conflicts?` | [`Conflicts`](Conflicts.md) | Indicates whether to continue reindexing even when there are conflicts. |
| `dest` | [`ReindexDestination`](ReindexDestination.md) | The destination you are copying to. |
| `max_docs?` | `long` | The maximum number of documents to reindex.
By default, all documents are reindexed.
If it is a value less then or equal to `scroll_size`, a scroll will not be used to retrieve the results for the operation.

If `conflicts` is set to `proceed`, the reindex operation could attempt to reindex more documents from the source than `max_docs` until it has successfully indexed `max_docs` documents into the target or it has gone through every document in the source query. |
| `script?` | `Script | ScriptSource` | The script to run to update the document source or metadata when reindexing. |
| `source` | [`ReindexSource`](ReindexSource.md) | The source you are copying from. |
| `body?` | `string | { [key: string]: any } & { refresh?: never, requests_per_second?: never, scroll?: never, slices?: never, timeout?: never, wait_for_active_shards?: never, wait_for_completion?: never, require_alias?: never, conflicts?: never, dest?: never, max_docs?: never, script?: never, source?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { refresh?: never, requests_per_second?: never, scroll?: never, slices?: never, timeout?: never, wait_for_active_shards?: never, wait_for_completion?: never, require_alias?: never, conflicts?: never, dest?: never, max_docs?: never, script?: never, source?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
