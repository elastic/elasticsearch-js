---
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html
---

# API Reference [api-reference]


## bulk [_bulk]

Bulk index or delete documents. Perform multiple `index`, `create`, `delete`, and `update` actions in a single request. This reduces overhead and can greatly increase indexing speed.

If the Elasticsearch security features are enabled, you must have the following index privileges for the target data stream, index, or index alias:

* To use the `create` action, you must have the `create_doc`, `create`, `index`, or `write` index privilege. Data streams support only the `create` action.
* To use the `index` action, you must have the `create`, `index`, or `write` index privilege.
* To use the `delete` action, you must have the `delete` or `write` index privilege.
* To use the `update` action, you must have the `index` or `write` index privilege.
* To automatically create a data stream or index with a bulk API request, you must have the `auto_configure`, `create_index`, or `manage` index privilege.
* To make the result of a bulk operation visible to search using the `refresh` parameter, you must have the `maintenance` or `manage` index privilege.

Automatic data stream creation requires a matching index template with data stream enabled.

The actions are specified in the request body using a newline delimited JSON (NDJSON) structure:

```
action_and_meta_data\n
optional_source\n
action_and_meta_data\n
optional_source\n
....
action_and_meta_data\n
optional_source\n
```

The `index` and `create` actions expect a source on the next line and have the same semantics as the `op_type` parameter in the standard index API. A `create` action fails if a document with the same ID already exists in the target An `index` action adds or replaces a document as necessary.

::::{note}
Data streams support only the `create` action. To update or delete a document in a data stream, you must target the backing index containing the document.
::::


An `update` action expects that the partial doc, upsert, and script and its options are specified on the next line.

A `delete` action does not expect a source on the next line and has the same semantics as the standard delete API.

::::{note}
The final line of data must end with a newline character (`\n`). Each newline character may be preceded by a carriage return (`\r`). When sending NDJSON data to the `_bulk` endpoint, use a `Content-Type` header of `application/json` or `application/x-ndjson`. Because this format uses literal newline characters (`\n`) as delimiters, make sure that the JSON actions and sources are not pretty printed.
::::


If you provide a target in the request path, it is used for any actions that don’t explicitly specify an `_index` argument.

A note on the format: the idea here is to make processing as fast as possible. As some of the actions are redirected to other shards on other nodes, only `action_meta_data` is parsed on the receiving node side.

Client libraries using this protocol should try and strive to do something similar on the client side, and reduce buffering as much as possible.

There is no "correct" number of actions to perform in a single bulk request. Experiment with different settings to find the optimal size for your particular workload. Note that Elasticsearch limits the maximum size of a HTTP request to 100mb by default so clients must ensure that no request exceeds this size. It is not possible to index a single document that exceeds the size limit, so you must pre-process any such documents into smaller pieces before sending them to Elasticsearch. For instance, split documents into pages or chapters before indexing them, or store raw binary data in a system outside Elasticsearch and replace the raw data with a link to the external system in the documents that you send to Elasticsearch.

**Client suppport for bulk requests**

Some of the officially supported clients provide helpers to assist with bulk requests and reindexing:

* Go: Check out `esutil.BulkIndexer`
* Perl: Check out `Search::Elasticsearch::Client::5_0::Bulk` and `Search::Elasticsearch::Client::5_0::Scroll`
* Python: Check out `elasticsearch.helpers.*`
* JavaScript: Check out `client.helpers.*`
* .NET: Check out `BulkAllObservable`
* PHP: Check out bulk indexing.

**Submitting bulk requests with cURL**

If you’re providing text file input to `curl`, you must use the `--data-binary` flag instead of plain `-d`. The latter doesn’t preserve newlines. For example:

```
$ cat requests
{ "index" : { "_index" : "test", "_id" : "1" } }
{ "field1" : "value1" }
$ curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/_bulk --data-binary "@requests"; echo
{"took":7, "errors": false, "items":[{"index":{"_index":"test","_id":"1","_version":1,"result":"created","forced_refresh":false}}]}
```

**Optimistic concurrency control**

Each `index` and `delete` action within a bulk API call may include the `if_seq_no` and `if_primary_term` parameters in their respective action and meta data lines. The `if_seq_no` and `if_primary_term` parameters control how operations are run, based on the last modification to existing documents. See Optimistic concurrency control for more details.

**Versioning**

Each bulk item can include the version value using the `version` field. It automatically follows the behavior of the index or delete operation based on the `_version` mapping. It also support the `version_type`.

**Routing**

Each bulk item can include the routing value using the `routing` field. It automatically follows the behavior of the index or delete operation based on the `_routing` mapping.

::::{note}
Data streams do not support custom routing unless they were created with the `allow_custom_routing` setting enabled in the template.
::::


**Wait for active shards**

When making bulk calls, you can set the `wait_for_active_shards` parameter to require a minimum number of shard copies to be active before starting to process the bulk request.

**Refresh**

Control when the changes made by this request are visible to search.

::::{note}
Only the shards that receive the bulk request will be affected by refresh. Imagine a `_bulk?refresh=wait_for` request with three documents in it that happen to be routed to different shards in an index with five shards. The request will only wait for those three shards to refresh. The other two shards that make up the index do not participate in the `_bulk` request at all.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk)

```ts
client.bulk({ ... })
```


### Arguments [_arguments]

* **Request (object):**

    * **`index` (Optional, string)**: The name of the data stream, index, or index alias to perform bulk actions on.
    * **`operations` (Optional, { index, create, update, delete } | { detect_noop, doc, doc_as_upsert, script, scripted_upsert, _source, upsert } | object[])**
    * **`list_executed_pipelines` (Optional, boolean)**: If `true`, the response will include the ingest pipelines that were run for each index or create.
    * **`pipeline` (Optional, string)**: The pipeline identifier to use to preprocess incoming documents. If the index has a default ingest pipeline specified, setting the value to `_none` turns off the default ingest pipeline for this request. If a final pipeline is configured, it will always run regardless of the value of this parameter.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search. If `wait_for`, wait for a refresh to make this operation visible to search. If `false`, do nothing with refreshes. Valid values: `true`, `false`, `wait_for`.
    * **`routing` (Optional, string)**: A custom value that is used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: Indicates whether to return the `_source` field (`true` or `false`) or contains a list of fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`timeout` (Optional, string | -1 | 0)**: The period each action waits for the following operations: automatic index creation, dynamic mapping updates, and waiting for active shards. The default is `1m` (one minute), which guarantees Elasticsearch waits for at least the timeout before failing. The actual wait time could be longer, particularly when multiple waits occur.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The default is `1`, which waits for each primary shard to be active.
    * **`require_alias` (Optional, boolean)**: If `true`, the request’s actions must target an index alias.
    * **`require_data_stream` (Optional, boolean)**: If `true`, the request’s actions must target a data stream (existing or to be created).



## clear_scroll [_clear_scroll]

Clear a scrolling search. Clear the search context and results for a scrolling search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-clear-scroll)

```ts
client.clearScroll({ ... })
```


### Arguments [_arguments_2]

* **Request (object):**

    * **`scroll_id` (Optional, string | string[])**: A list of scroll IDs to clear. To clear all scroll IDs, use `_all`. IMPORTANT: Scroll IDs can be long. It is recommended to specify scroll IDs in the request body parameter.



## close_point_in_time [_close_point_in_time]

Close a point in time. A point in time must be opened explicitly before being used in search requests. The `keep_alive` parameter tells Elasticsearch how long it should persist. A point in time is automatically closed when the `keep_alive` period has elapsed. However, keeping points in time has a cost; close them as soon as they are no longer required for search requests.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-open-point-in-time)

```ts
client.closePointInTime({ id })
```


### Arguments [_arguments_3]

* **Request (object):**

    * **`id` (string)**: The ID of the point-in-time.



## count [_count]

Count search results. Get the number of documents matching a query.

The query can either be provided using a simple query string as a parameter or using the Query DSL defined within the request body. The latter must be nested in a `query` key, which is the same as the search API.

The count API supports multi-target syntax. You can run a single count API search across multiple data streams and indices.

The operation is broadcast across all shards. For each shard ID group, a replica is chosen and the search is run against it. This means that replicas increase the scalability of the count.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-count)

```ts
client.count({ ... })
```


### Arguments [_arguments_4]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases to search. It supports wildcards (`*`). To search all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Defines the search definition using the Query DSL. The query is optional, and when not provided, it will use `match_all` to count all the docs.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`analyzer` (Optional, string)**: The analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`analyze_wildcard` (Optional, boolean)**: If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified.
    * **`df` (Optional, string)**: The field to use as a default when no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports a list of values, such as `open,hidden`.
    * **`ignore_throttled` (Optional, boolean)**: If `true`, concrete, expanded, or aliased indices are ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`lenient` (Optional, boolean)**: If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified.
    * **`min_score` (Optional, number)**: The minimum `_score` value that documents must have to be included in the result.
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. By default, it is random.
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`terminate_after` (Optional, number)**: The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. IMPORTANT: Use with caution. Elasticsearch applies this parameter to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this parameter for requests that target data streams with backing indices across multiple data tiers.
    * **`q` (Optional, string)**: The query in Lucene query string syntax.



## create [_create]

Create a new document in the index.

You can index a new JSON document with the `/<target>/_doc/` or `/<target>/_create/<_id>` APIs Using `_create` guarantees that the document is indexed only if it does not already exist. It returns a 409 response when a document with a same ID already exists in the index. To update an existing document, you must use the `/<target>/_doc/` API.

If the Elasticsearch security features are enabled, you must have the following index privileges for the target data stream, index, or index alias:

* To add a document using the `PUT /<target>/_create/<_id>` or `POST /<target>/_create/<_id>` request formats, you must have the `create_doc`, `create`, `index`, or `write` index privilege.
* To automatically create a data stream or index with this API request, you must have the `auto_configure`, `create_index`, or `manage` index privilege.

Automatic data stream creation requires a matching index template with data stream enabled.

**Automatically create data streams and indices**

If the request’s target doesn’t exist and matches an index template with a `data_stream` definition, the index operation automatically creates the data stream.

If the target doesn’t exist and doesn’t match a data stream template, the operation automatically creates the index and applies any matching index templates.

::::{note}
Elasticsearch includes several built-in index templates. To avoid naming collisions with these templates, refer to index pattern documentation.
::::


If no mapping exists, the index operation creates a dynamic mapping. By default, new fields and objects are automatically added to the mapping if needed.

Automatic index creation is controlled by the `action.auto_create_index` setting. If it is `true`, any index can be created automatically. You can modify this setting to explicitly allow or block automatic creation of indices that match specified patterns or set it to `false` to turn off automatic index creation entirely. Specify a list of patterns you want to allow or prefix each pattern with `+` or `-` to indicate whether it should be allowed or blocked. When a list is specified, the default behaviour is to disallow.

::::{note}
The `action.auto_create_index` setting affects the automatic creation of indices only. It does not affect the creation of data streams.
::::


**Routing**

By default, shard placement — or routing — is controlled by using a hash of the document’s ID value. For more explicit control, the value fed into the hash function used by the router can be directly specified on a per-operation basis using the `routing` parameter.

When setting up explicit mapping, you can also use the `_routing` field to direct the index operation to extract the routing value from the document itself. This does come at the (very minimal) cost of an additional document parsing pass. If the `_routing` mapping is defined and set to be required, the index operation will fail if no routing value is provided or extracted.

::::{note}
Data streams do not support custom routing unless they were created with the `allow_custom_routing` setting enabled in the template.
::::


**Distributed**

The index operation is directed to the primary shard based on its route and performed on the actual node containing this shard. After the primary shard completes the operation, if needed, the update is distributed to applicable replicas.

**Active shards**

To improve the resiliency of writes to the system, indexing operations can be configured to wait for a certain number of active shard copies before proceeding with the operation. If the requisite number of active shard copies are not available, then the write operation must wait and retry, until either the requisite shard copies have started or a timeout occurs. By default, write operations only wait for the primary shards to be active before proceeding (that is to say `wait_for_active_shards` is `1`). This default can be overridden in the index settings dynamically by setting `index.write.wait_for_active_shards`. To alter this behavior per operation, use the `wait_for_active_shards request` parameter.

Valid values are all or any positive integer up to the total number of configured copies per shard in the index (which is `number_of_replicas`+1). Specifying a negative value or a number greater than the number of shard copies will throw an error.

For example, suppose you have a cluster of three nodes, A, B, and C and you create an index index with the number of replicas set to 3 (resulting in 4 shard copies, one more copy than there are nodes). If you attempt an indexing operation, by default the operation will only ensure the primary copy of each shard is available before proceeding. This means that even if B and C went down and A hosted the primary shard copies, the indexing operation would still proceed with only one copy of the data. If `wait_for_active_shards` is set on the request to `3` (and all three nodes are up), the indexing operation will require 3 active shard copies before proceeding. This requirement should be met because there are 3 active nodes in the cluster, each one holding a copy of the shard. However, if you set `wait_for_active_shards` to `all` (or to `4`, which is the same in this situation), the indexing operation will not proceed as you do not have all 4 copies of each shard active in the index. The operation will timeout unless a new node is brought up in the cluster to host the fourth copy of the shard.

It is important to note that this setting greatly reduces the chances of the write operation not writing to the requisite number of shard copies, but it does not completely eliminate the possibility, because this check occurs before the write operation starts. After the write operation is underway, it is still possible for replication to fail on any number of shard copies but still succeed on the primary. The `_shards` section of the API response reveals the number of shard copies on which replication succeeded and failed.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-create)

```ts
client.create({ id, index })
```


### Arguments [_arguments_5]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the document. To automatically generate a document ID, use the `POST /<target>/_doc/` request format.
    * **`index` (string)**: The name of the data stream or index to target. If the target doesn’t exist and matches the name or wildcard (`*`) pattern of an index template with a `data_stream` definition, this request creates the data stream. If the target doesn’t exist and doesn’t match a data stream template, this request creates the index.
    * **`document` (Optional, object)**: A document.
    * **`pipeline` (Optional, string)**: The ID of the pipeline to use to preprocess incoming documents. If the index has a default ingest pipeline specified, setting the value to `_none` turns off the default ingest pipeline for this request. If a final pipeline is configured, it will always run regardless of the value of this parameter.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search. If `wait_for`, it waits for a refresh to make this operation visible to search. If `false`, it does nothing with refreshes.
    * **`routing` (Optional, string)**: A custom value that is used to route operations to a specific shard.
    * **`timeout` (Optional, string | -1 | 0)**: The period the request waits for the following operations: automatic index creation, dynamic mapping updates, waiting for active shards. Elasticsearch waits for at least the specified timeout period before failing. The actual wait time could be longer, particularly when multiple waits occur. This parameter is useful for situations where the primary shard assigned to perform the operation might not be available when the operation runs. Some reasons for this might be that the primary shard is currently recovering from a gateway or undergoing relocation. By default, the operation will wait on the primary shard to become available for at least 1 minute before failing and responding with an error. The actual wait time could be longer, particularly when multiple waits occur.
    * **`version` (Optional, number)**: The explicit version number for concurrency control. It must be a non-negative long number.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. You can set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The default value of `1` means it waits for each primary shard to be active.



## delete [_delete]

Delete a document.

Remove a JSON document from the specified index.

::::{note}
You cannot send deletion requests directly to a data stream. To delete a document in a data stream, you must target the backing index containing the document.
::::


**Optimistic concurrency control**

Delete operations can be made conditional and only be performed if the last modification to the document was assigned the sequence number and primary term specified by the `if_seq_no` and `if_primary_term` parameters. If a mismatch is detected, the operation will result in a `VersionConflictException` and a status code of `409`.

**Versioning**

Each document indexed is versioned. When deleting a document, the version can be specified to make sure the relevant document you are trying to delete is actually being deleted and it has not changed in the meantime. Every write operation run on a document, deletes included, causes its version to be incremented. The version number of a deleted document remains available for a short time after deletion to allow for control of concurrent operations. The length of time for which a deleted document’s version remains available is determined by the `index.gc_deletes` index setting.

**Routing**

If routing is used during indexing, the routing value also needs to be specified to delete a document.

If the `_routing` mapping is set to `required` and no routing value is specified, the delete API throws a `RoutingMissingException` and rejects the request.

For example:

```
DELETE /my-index-000001/_doc/1?routing=shard-1
```

This request deletes the document with ID 1, but it is routed based on the user. The document is not deleted if the correct routing is not specified.

**Distributed**

The delete operation gets hashed into a specific shard ID. It then gets redirected into the primary shard within that ID group and replicated (if needed) to shard replicas within that ID group.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete)

```ts
client.delete({ id, index })
```


### Arguments [_arguments_6]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the document.
    * **`index` (string)**: The name of the target index.
    * **`if_primary_term` (Optional, number)**: Only perform the operation if the document has this primary term.
    * **`if_seq_no` (Optional, number)**: Only perform the operation if the document has this sequence number.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search. If `wait_for`, it waits for a refresh to make this operation visible to search. If `false`, it does nothing with refreshes.
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for active shards. This parameter is useful for situations where the primary shard assigned to perform the delete operation might not be available when the delete operation runs. Some reasons for this might be that the primary shard is currently recovering from a store or undergoing relocation. By default, the delete operation will wait on the primary shard to become available for up to 1 minute before failing and responding with an error.
    * **`version` (Optional, number)**: An explicit version number for concurrency control. It must match the current version of the document for the request to succeed.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The minimum number of shard copies that must be active before proceeding with the operation. You can set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The default value of `1` means it waits for each primary shard to be active.



## delete_by_query [_delete_by_query]

Delete documents.

Deletes documents that match the specified query.

If the Elasticsearch security features are enabled, you must have the following index privileges for the target data stream, index, or alias:

* `read`
* `delete` or `write`

You can specify the query criteria in the request URI or the request body using the same syntax as the search API. When you submit a delete by query request, Elasticsearch gets a snapshot of the data stream or index when it begins processing the request and deletes matching documents using internal versioning. If a document changes between the time that the snapshot is taken and the delete operation is processed, it results in a version conflict and the delete operation fails.

::::{note}
Documents with a version equal to 0 cannot be deleted using delete by query because internal versioning does not support 0 as a valid version number.
::::


While processing a delete by query request, Elasticsearch performs multiple search requests sequentially to find all of the matching documents to delete. A bulk delete request is performed for each batch of matching documents. If a search or bulk request is rejected, the requests are retried up to 10 times, with exponential back off. If the maximum retry limit is reached, processing halts and all failed requests are returned in the response. Any delete requests that completed successfully still stick, they are not rolled back.

You can opt to count version conflicts instead of halting and returning by setting `conflicts` to `proceed`. Note that if you opt to count version conflicts the operation could attempt to delete more documents from the source than `max_docs` until it has successfully deleted `max_docs documents`, or it has gone through every document in the source query.

**Throttling delete requests**

To control the rate at which delete by query issues batches of delete operations, you can set `requests_per_second` to any positive decimal number. This pads each batch with a wait time to throttle the rate. Set `requests_per_second` to `-1` to disable throttling.

Throttling uses a wait time between batches so that the internal scroll requests can be given a timeout that takes the request padding into account. The padding time is the difference between the batch size divided by the `requests_per_second` and the time spent writing. By default the batch size is `1000`, so if `requests_per_second` is set to `500`:

```
target_time = 1000 / 500 per second = 2 seconds
wait_time = target_time - write_time = 2 seconds - .5 seconds = 1.5 seconds
```

Since the batch is issued as a single `_bulk` request, large batch sizes cause Elasticsearch to create many requests and wait before starting the next set. This is "bursty" instead of "smooth".

**Slicing**

Delete by query supports sliced scroll to parallelize the delete process. This can improve efficiency and provide a convenient way to break the request down into smaller parts.

Setting `slices` to `auto` lets Elasticsearch choose the number of slices to use. This setting will use one slice per shard, up to a certain limit. If there are multiple source data streams or indices, it will choose the number of slices based on the index or backing index with the smallest number of shards. Adding slices to the delete by query operation creates sub-requests which means it has some quirks:

* You can see these requests in the tasks APIs. These sub-requests are "child" tasks of the task for the request with slices.
* Fetching the status of the task for the request with slices only contains the status of completed slices.
* These sub-requests are individually addressable for things like cancellation and rethrottling.
* Rethrottling the request with `slices` will rethrottle the unfinished sub-request proportionally.
* Canceling the request with `slices` will cancel each sub-request.
* Due to the nature of `slices` each sub-request won’t get a perfectly even portion of the documents. All documents will be addressed, but some slices may be larger than others. Expect larger slices to have a more even distribution.
* Parameters like `requests_per_second` and `max_docs` on a request with `slices` are distributed proportionally to each sub-request. Combine that with the earlier point about distribution being uneven and you should conclude that using `max_docs` with `slices` might not result in exactly `max_docs` documents being deleted.
* Each sub-request gets a slightly different snapshot of the source data stream or index though these are all taken at approximately the same time.

If you’re slicing manually or otherwise tuning automatic slicing, keep in mind that:

* Query performance is most efficient when the number of slices is equal to the number of shards in the index or backing index. If that number is large (for example, 500), choose a lower number as too many `slices` hurts performance. Setting `slices` higher than the number of shards generally does not improve efficiency and adds overhead.
* Delete performance scales linearly across available resources with the number of slices.

Whether query or delete performance dominates the runtime depends on the documents being reindexed and cluster resources.

**Cancel a delete by query operation**

Any delete by query can be canceled using the task cancel API. For example:

```
POST _tasks/r1A2WoRbTwKZ516z6NEs5A:36619/_cancel
```

The task ID can be found by using the get tasks API.

Cancellation should happen quickly but might take a few seconds. The get task status API will continue to list the delete by query task until this task checks that it has been cancelled and terminates itself.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete-by-query)

```ts
client.deleteByQuery({ index })
```


### Arguments [_arguments_7]

* **Request (object):**

    * **`index` (string | string[])**: A list of data streams, indices, and aliases to search. It supports wildcards (`*`). To search all data streams or indices, omit this parameter or use `*` or `_all`.
    * **`max_docs` (Optional, number)**: The maximum number of documents to delete.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The documents to delete specified with Query DSL.
    * **`slice` (Optional, { field, id, max })**: Slice the request manually using the provided slice ID and total number of slices.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`analyzer` (Optional, string)**: Analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`analyze_wildcard` (Optional, boolean)**: If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified.
    * **`conflicts` (Optional, Enum("abort" | "proceed"))**: What to do if delete by query hits version conflicts: `abort` or `proceed`.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified.
    * **`df` (Optional, string)**: The field to use as default where no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports a list of values, such as `open,hidden`.
    * **`from` (Optional, number)**: Starting offset (default: 0)
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`lenient` (Optional, boolean)**: If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified.
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. It is random by default.
    * **`refresh` (Optional, boolean)**: If `true`, Elasticsearch refreshes all shards involved in the delete by query after the request completes. This is different than the delete API’s `refresh` parameter, which causes just the shard that received the delete request to be refreshed. Unlike the delete API, it does not support `wait_for`.
    * **`request_cache` (Optional, boolean)**: If `true`, the request cache is used for this request. Defaults to the index-level setting.
    * **`requests_per_second` (Optional, float)**: The throttle for this request in sub-requests per second.
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`q` (Optional, string)**: A query in the Lucene query string syntax.
    * **`scroll` (Optional, string | -1 | 0)**: The period to retain the search context for scrolling.
    * **`scroll_size` (Optional, number)**: The size of the scroll request that powers the operation.
    * **`search_timeout` (Optional, string | -1 | 0)**: The explicit timeout for each search request. It defaults to no timeout.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: The type of the search operation. Available options include `query_then_fetch` and `dfs_query_then_fetch`.
    * **`slices` (Optional, number | Enum("auto"))**: The number of slices this task should be divided into.
    * **`sort` (Optional, string[])**: A list of `<field>:<direction>` pairs.
    * **`stats` (Optional, string[])**: The specific `tag` of the request for logging and statistical purposes.
    * **`terminate_after` (Optional, number)**: The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. Use with caution. Elasticsearch applies this parameter to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this parameter for requests that target data streams with backing indices across multiple data tiers.
    * **`timeout` (Optional, string | -1 | 0)**: The period each deletion request waits for active shards.
    * **`version` (Optional, boolean)**: If `true`, returns the document version as part of a hit.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The `timeout` value controls how long each write request waits for unavailable shards to become available.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks until the operation is complete. If `false`, Elasticsearch performs some preflight checks, launches the request, and returns a task you can use to cancel or get the status of the task. Elasticsearch creates a record of this task as a document at `.tasks/task/${taskId}`. When you are done with a task, you should delete the task document so Elasticsearch can reclaim the space.



## delete_by_query_rethrottle [_delete_by_query_rethrottle]

Throttle a delete by query operation.

Change the number of requests per second for a particular delete by query operation. Rethrottling that speeds up the query takes effect immediately but rethrotting that slows down the query takes effect after completing the current batch to prevent scroll timeouts.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-delete-by-query)

```ts
client.deleteByQueryRethrottle({ task_id })
```


### Arguments [_arguments_8]

* **Request (object):**

    * **`task_id` (string | number)**: The ID for the task.
    * **`requests_per_second` (Optional, float)**: The throttle for this request in sub-requests per second. To disable throttling, set it to `-1`.



## delete_script [_delete_script]

Delete a script or search template. Deletes a stored script or search template.

[Endpoint documentation](docs-content://explore-analyze/scripting.md)

```ts
client.deleteScript({ id })
```


### Arguments [_arguments_9]

* **Request (object):**

    * **`id` (string)**: Identifier for the stored script or search template.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## exists [_exists]

Check a document.

Verify that a document exists. For example, check to see if a document with the `_id` 0 exists:

```
HEAD my-index-000001/_doc/0
```

If the document exists, the API returns a status code of `200 - OK`. If the document doesn’t exist, the API returns `404 - Not Found`.

**Versioning support**

You can use the `version` parameter to check the document only if its current version is equal to the specified one.

Internally, Elasticsearch has marked the old document as deleted and added an entirely new document. The old version of the document doesn’t disappear immediately, although you won’t be able to access it. Elasticsearch cleans up deleted documents in the background as you continue to index more data.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-get)

```ts
client.exists({ id, index })
```


### Arguments [_arguments_10]

* **Request (object):**

    * **`id` (string)**: A unique document identifier.
    * **`index` (string)**: A list of data streams, indices, and aliases. It supports wildcards (`*`).
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. By default, the operation is randomized between the shard replicas. If it is set to `_local`, the operation will prefer to be run on a local allocated shard when possible. If it is set to a custom value, the value is used to guarantee that the same shards will be used for the same custom value. This can help with "jumping values" when hitting different shards in different refresh states. A sample value can be something like the web session ID or the user name.
    * **`realtime` (Optional, boolean)**: If `true`, the request is real-time as opposed to near-real-time.
    * **`refresh` (Optional, boolean)**: If `true`, the request refreshes the relevant shards before retrieving the document. Setting it to `true` should be done after careful thought and verification that this does not cause a heavy load on the system (and slow down indexing).
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: Indicates whether to return the `_source` field (`true` or `false`) or lists the fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`stored_fields` (Optional, string | string[])**: A list of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the `_source` parameter defaults to `false`.
    * **`version` (Optional, number)**: Explicit version number for concurrency control. The specified version must match the current version of the document for the request to succeed.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.



## exists_source [_exists_source]

Check for a document source.

Check whether a document source exists in an index. For example:

```
HEAD my-index-000001/_source/1
```

A document’s source is not available if it is disabled in the mapping.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-get)

```ts
client.existsSource({ id, index })
```


### Arguments [_arguments_11]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the document.
    * **`index` (string)**: A list of data streams, indices, and aliases. It supports wildcards (`*`).
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. By default, the operation is randomized between the shard replicas.
    * **`realtime` (Optional, boolean)**: If `true`, the request is real-time as opposed to near-real-time.
    * **`refresh` (Optional, boolean)**: If `true`, the request refreshes the relevant shards before retrieving the document. Setting it to `true` should be done after careful thought and verification that this does not cause a heavy load on the system (and slow down indexing).
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: Indicates whether to return the `_source` field (`true` or `false`) or lists the fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude in the response.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response.
    * **`version` (Optional, number)**: The version number for concurrency control. It must match the current version of the document for the request to succeed.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.



## explain [_explain]

Explain a document match result. Returns information about why a specific document matches, or doesn’t match, a query.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-explain)

```ts
client.explain({ id, index })
```


### Arguments [_arguments_12]

* **Request (object):**

    * **`id` (string)**: Defines the document ID.
    * **`index` (string)**: Index names used to limit the request. Only a single index name can be provided to this parameter.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Defines the search definition using the Query DSL.
    * **`analyzer` (Optional, string)**: Analyzer to use for the query string. This parameter can only be used when the `q` query string parameter is specified.
    * **`analyze_wildcard` (Optional, boolean)**: If `true`, wildcard and prefix queries are analyzed.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for query string query: `AND` or `OR`.
    * **`df` (Optional, string)**: Field to use as default where no field prefix is given in the query string.
    * **`lenient` (Optional, boolean)**: If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored.
    * **`preference` (Optional, string)**: Specifies the node or shard the operation should be performed on. Random by default.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: True or false to return the `_source` field or not, or a list of fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude from the response.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response.
    * **`stored_fields` (Optional, string | string[])**: A list of stored fields to return in the response.
    * **`q` (Optional, string)**: Query in the Lucene query string syntax.



## field_caps [_field_caps]

Get the field capabilities.

Get information about the capabilities of fields among multiple indices.

For data streams, the API returns field capabilities among the stream’s backing indices. It returns runtime fields like any other field. For example, a runtime field with a type of keyword is returned the same as any other field that belongs to the `keyword` family.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-field-caps)

```ts
client.fieldCaps({ ... })
```


### Arguments [_arguments_13]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (*). To target all data streams and indices, omit this parameter or use * or _all.
    * **`fields` (Optional, string | string[])**: List of fields to retrieve capabilities for. Wildcard (`*`) expressions are supported.
    * **`index_filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Allows to filter indices if the provided query rewrites to match_none on every shard.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Defines ad-hoc runtime fields in the request similar to the way it is done in search requests. These fields exist only as part of the query and take precedence over fields defined with the same name in the index mappings.
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with foo but no index starts with bar.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, missing or closed indices are not included in the response.
    * **`include_unmapped` (Optional, boolean)**: If true, unmapped fields are included in the response.
    * **`filters` (Optional, string)**: An optional set of filters: can include +metadata,-metadata,-nested,-multifield,-parent
    * **`types` (Optional, string[])**: Only return results for fields that have one of the types in the list
    * **`include_empty_fields` (Optional, boolean)**: If false, empty fields are not included in the response.



## get [_get]

Get a document by its ID.

Get a document and its source or stored fields from an index.

By default, this API is realtime and is not affected by the refresh rate of the index (when data will become visible for search). In the case where stored fields are requested with the `stored_fields` parameter and the document has been updated but is not yet refreshed, the API will have to parse and analyze the source to extract the stored fields. To turn off realtime behavior, set the `realtime` parameter to false.

**Source filtering**

By default, the API returns the contents of the `_source` field unless you have used the `stored_fields` parameter or the `_source` field is turned off. You can turn off `_source` retrieval by using the `_source` parameter:

```
GET my-index-000001/_doc/0?_source=false
```

If you only need one or two fields from the `_source`, use the `_source_includes` or `_source_excludes` parameters to include or filter out particular fields. This can be helpful with large documents where partial retrieval can save on network overhead Both parameters take a comma separated list of fields or wildcard expressions. For example:

```
GET my-index-000001/_doc/0?_source_includes=*.id&_source_excludes=entities
```

If you only want to specify includes, you can use a shorter notation:

```
GET my-index-000001/_doc/0?_source=*.id
```

**Routing**

If routing is used during indexing, the routing value also needs to be specified to retrieve a document. For example:

```
GET my-index-000001/_doc/2?routing=user1
```

This request gets the document with ID 2, but it is routed based on the user. The document is not fetched if the correct routing is not specified.

**Distributed**

The GET operation is hashed into a specific shard ID. It is then redirected to one of the replicas within that shard ID and returns the result. The replicas are the primary shard and its replicas within that shard ID group. This means that the more replicas you have, the better your GET scaling will be.

**Versioning support**

You can use the `version` parameter to retrieve the document only if its current version is equal to the specified one.

Internally, Elasticsearch has marked the old document as deleted and added an entirely new document. The old version of the document doesn’t disappear immediately, although you won’t be able to access it. Elasticsearch cleans up deleted documents in the background as you continue to index more data.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-get)

```ts
client.get({ id, index })
```


### Arguments [_arguments_14]

* **Request (object):**

    * **`id` (string)**: A unique document identifier.
    * **`index` (string)**: The name of the index that contains the document.
    * **`force_synthetic_source` (Optional, boolean)**: Indicates whether the request forces synthetic `_source`. Use this paramater to test if the mapping supports synthetic `_source` and to get a sense of the worst case performance. Fetches with this parameter enabled will be slower than enabling synthetic source natively in the index.
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. By default, the operation is randomized between the shard replicas. If it is set to `_local`, the operation will prefer to be run on a local allocated shard when possible. If it is set to a custom value, the value is used to guarantee that the same shards will be used for the same custom value. This can help with "jumping values" when hitting different shards in different refresh states. A sample value can be something like the web session ID or the user name.
    * **`realtime` (Optional, boolean)**: If `true`, the request is real-time as opposed to near-real-time.
    * **`refresh` (Optional, boolean)**: If `true`, the request refreshes the relevant shards before retrieving the document. Setting it to `true` should be done after careful thought and verification that this does not cause a heavy load on the system (and slow down indexing).
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: Indicates whether to return the `_source` field (`true` or `false`) or lists the fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`stored_fields` (Optional, string | string[])**: A list of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the `_source` parameter defaults to `false`. Only leaf fields can be retrieved with the `stored_field` option. Object fields can’t be returned;if specified, the request fails.
    * **`version` (Optional, number)**: The version number for concurrency control. It must match the current version of the document for the request to succeed.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.



## get_script [_get_script]

Get a script or search template. Retrieves a stored script or search template.

[Endpoint documentation](docs-content://explore-analyze/scripting.md)

```ts
client.getScript({ id })
```


### Arguments [_arguments_15]

* **Request (object):**

    * **`id` (string)**: Identifier for the stored script or search template.
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master



## get_script_context [_get_script_context]

Get script contexts.

Get a list of supported script contexts and their methods.

[Endpoint documentation](elasticsearch://reference/scripting-languages/painless/painless-contexts.md)

```ts
client.getScriptContext()
```


## get_script_languages [_get_script_languages]

Get script languages.

Get a list of available script types, languages, and contexts.

[Endpoint documentation](docs-content://explore-analyze/scripting.md)

```ts
client.getScriptLanguages()
```


## get_source [_get_source]

Get a document’s source.

Get the source of a document. For example:

```
GET my-index-000001/_source/1
```

You can use the source filtering parameters to control which parts of the `_source` are returned:

```
GET my-index-000001/_source/1/?_source_includes=*.id&_source_excludes=entities
```

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-get)

```ts
client.getSource({ id, index })
```


### Arguments [_arguments_16]

* **Request (object):**

    * **`id` (string)**: A unique document identifier.
    * **`index` (string)**: The name of the index that contains the document.
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. By default, the operation is randomized between the shard replicas.
    * **`realtime` (Optional, boolean)**: If `true`, the request is real-time as opposed to near-real-time.
    * **`refresh` (Optional, boolean)**: If `true`, the request refreshes the relevant shards before retrieving the document. Setting it to `true` should be done after careful thought and verification that this does not cause a heavy load on the system (and slow down indexing).
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: Indicates whether to return the `_source` field (`true` or `false`) or lists the fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude in the response.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response.
    * **`stored_fields` (Optional, string | string[])**: A list of stored fields to return as part of a hit.
    * **`version` (Optional, number)**: The version number for concurrency control. It must match the current version of the document for the request to succeed.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.



## health_report [_health_report]

Get the cluster health. Get a report with the health status of an Elasticsearch cluster. The report contains a list of indicators that compose Elasticsearch functionality.

Each indicator has a health status of: green, unknown, yellow or red. The indicator will provide an explanation and metadata describing the reason for its current health status.

The cluster’s status is controlled by the worst indicator status.

In the event that an indicator’s status is non-green, a list of impacts may be present in the indicator result which detail the functionalities that are negatively affected by the health issue. Each impact carries with it a severity level, an area of the system that is affected, and a simple description of the impact on the system.

Some health indicators can determine the root cause of a health problem and prescribe a set of steps that can be performed in order to improve the health of the system. The root cause and remediation steps are encapsulated in a diagnosis. A diagnosis contains a cause detailing a root cause analysis, an action containing a brief description of the steps to take to fix the problem, the list of affected resources (if applicable), and a detailed step-by-step troubleshooting guide to fix the diagnosed problem.

::::{note}
The health indicators perform root cause analysis of non-green health statuses. This can be computationally expensive when called frequently. When setting up automated polling of the API for health status, set verbose to false to disable the more expensive analysis logic.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-health-report)

```ts
client.healthReport({ ... })
```


### Arguments [_arguments_17]

* **Request (object):**

    * **`feature` (Optional, string | string[])**: A feature of the cluster, as returned by the top-level health report API.
    * **`timeout` (Optional, string | -1 | 0)**: Explicit operation timeout.
    * **`verbose` (Optional, boolean)**: Opt-in for more information about the health of the system.
    * **`size` (Optional, number)**: Limit the number of affected resources the health report API returns.



## index [_index]

Create or update a document in an index.

Add a JSON document to the specified data stream or index and make it searchable. If the target is an index and the document already exists, the request updates the document and increments its version.

::::{note}
You cannot use this API to send update requests for existing documents in a data stream.
::::


If the Elasticsearch security features are enabled, you must have the following index privileges for the target data stream, index, or index alias:

* To add or overwrite a document using the `PUT /<target>/_doc/<_id>` request format, you must have the `create`, `index`, or `write` index privilege.
* To add a document using the `POST /<target>/_doc/` request format, you must have the `create_doc`, `create`, `index`, or `write` index privilege.
* To automatically create a data stream or index with this API request, you must have the `auto_configure`, `create_index`, or `manage` index privilege.

Automatic data stream creation requires a matching index template with data stream enabled.

::::{note}
Replica shards might not all be started when an indexing operation returns successfully. By default, only the primary is required. Set `wait_for_active_shards` to change this default behavior.
::::


**Automatically create data streams and indices**

If the request’s target doesn’t exist and matches an index template with a `data_stream` definition, the index operation automatically creates the data stream.

If the target doesn’t exist and doesn’t match a data stream template, the operation automatically creates the index and applies any matching index templates.

::::{note}
Elasticsearch includes several built-in index templates. To avoid naming collisions with these templates, refer to index pattern documentation.
::::


If no mapping exists, the index operation creates a dynamic mapping. By default, new fields and objects are automatically added to the mapping if needed.

Automatic index creation is controlled by the `action.auto_create_index` setting. If it is `true`, any index can be created automatically. You can modify this setting to explicitly allow or block automatic creation of indices that match specified patterns or set it to `false` to turn off automatic index creation entirely. Specify a list of patterns you want to allow or prefix each pattern with `+` or `-` to indicate whether it should be allowed or blocked. When a list is specified, the default behaviour is to disallow.

::::{note}
The `action.auto_create_index` setting affects the automatic creation of indices only. It does not affect the creation of data streams.
::::


**Optimistic concurrency control**

Index operations can be made conditional and only be performed if the last modification to the document was assigned the sequence number and primary term specified by the `if_seq_no` and `if_primary_term` parameters. If a mismatch is detected, the operation will result in a `VersionConflictException` and a status code of `409`.

**Routing**

By default, shard placement — or routing — is controlled by using a hash of the document’s ID value. For more explicit control, the value fed into the hash function used by the router can be directly specified on a per-operation basis using the `routing` parameter.

When setting up explicit mapping, you can also use the `_routing` field to direct the index operation to extract the routing value from the document itself. This does come at the (very minimal) cost of an additional document parsing pass. If the `_routing` mapping is defined and set to be required, the index operation will fail if no routing value is provided or extracted.

::::{note}
Data streams do not support custom routing unless they were created with the `allow_custom_routing` setting enabled in the template.
::::


**Distributed**

The index operation is directed to the primary shard based on its route and performed on the actual node containing this shard. After the primary shard completes the operation, if needed, the update is distributed to applicable replicas.

**Active shards**

To improve the resiliency of writes to the system, indexing operations can be configured to wait for a certain number of active shard copies before proceeding with the operation. If the requisite number of active shard copies are not available, then the write operation must wait and retry, until either the requisite shard copies have started or a timeout occurs. By default, write operations only wait for the primary shards to be active before proceeding (that is to say `wait_for_active_shards` is `1`). This default can be overridden in the index settings dynamically by setting `index.write.wait_for_active_shards`. To alter this behavior per operation, use the `wait_for_active_shards request` parameter.

Valid values are all or any positive integer up to the total number of configured copies per shard in the index (which is `number_of_replicas`+1). Specifying a negative value or a number greater than the number of shard copies will throw an error.

For example, suppose you have a cluster of three nodes, A, B, and C and you create an index index with the number of replicas set to 3 (resulting in 4 shard copies, one more copy than there are nodes). If you attempt an indexing operation, by default the operation will only ensure the primary copy of each shard is available before proceeding. This means that even if B and C went down and A hosted the primary shard copies, the indexing operation would still proceed with only one copy of the data. If `wait_for_active_shards` is set on the request to `3` (and all three nodes are up), the indexing operation will require 3 active shard copies before proceeding. This requirement should be met because there are 3 active nodes in the cluster, each one holding a copy of the shard. However, if you set `wait_for_active_shards` to `all` (or to `4`, which is the same in this situation), the indexing operation will not proceed as you do not have all 4 copies of each shard active in the index. The operation will timeout unless a new node is brought up in the cluster to host the fourth copy of the shard.

It is important to note that this setting greatly reduces the chances of the write operation not writing to the requisite number of shard copies, but it does not completely eliminate the possibility, because this check occurs before the write operation starts. After the write operation is underway, it is still possible for replication to fail on any number of shard copies but still succeed on the primary. The `_shards` section of the API response reveals the number of shard copies on which replication succeeded and failed.

**No operation (noop) updates**

When updating a document by using this API, a new version of the document is always created even if the document hasn’t changed. If this isn’t acceptable use the `_update` API with `detect_noop` set to `true`. The `detect_noop` option isn’t available on this API because it doesn’t fetch the old source and isn’t able to compare it against the new source.

There isn’t a definitive rule for when noop updates aren’t acceptable. It’s a combination of lots of factors like how frequently your data source sends updates that are actually noops and how many queries per second Elasticsearch runs on the shard receiving the updates.

**Versioning**

Each indexed document is given a version number. By default, internal versioning is used that starts at 1 and increments with each update, deletes included. Optionally, the version number can be set to an external value (for example, if maintained in a database). To enable this functionality, `version_type` should be set to `external`. The value provided must be a numeric, long value greater than or equal to 0, and less than around `9.2e+18`.

::::{note}
Versioning is completely real time, and is not affected by the near real time aspects of search operations. If no version is provided, the operation runs without any version checks.
::::


When using the external version type, the system checks to see if the version number passed to the index request is greater than the version of the currently stored document. If true, the document will be indexed and the new version number used. If the value provided is less than or equal to the stored document’s version number, a version conflict will occur and the index operation will fail. For example:

```
PUT my-index-000001/_doc/1?version=2&version_type=external
{
  "user": {
    "id": "elkbee"
  }
}
```

In this example, the operation will succeed since the supplied version of 2 is higher than the current document version of 1. If the document was already updated and its version was set to 2 or higher, the indexing command will fail and result in a conflict (409 HTTP status code).

A nice side effect is that there is no need to maintain strict ordering of async indexing operations run as a result of changes to a source database, as long as version numbers from the source database are used. Even the simple case of updating the Elasticsearch index using data from a database is simplified if external versioning is used, as only the latest version will be used if the index operations arrive out of order.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-create)

```ts
client.index({ index })
```


### Arguments [_arguments_18]

* **Request (object):**

    * **`index` (string)**: The name of the data stream or index to target. If the target doesn’t exist and matches the name or wildcard (`*`) pattern of an index template with a `data_stream` definition, this request creates the data stream. If the target doesn’t exist and doesn’t match a data stream template, this request creates the index. You can check for existing targets with the resolve index API.
    * **`id` (Optional, string)**: A unique identifier for the document. To automatically generate a document ID, use the `POST /<target>/_doc/` request format and omit this parameter.
    * **`document` (Optional, object)**: A document.
    * **`if_primary_term` (Optional, number)**: Only perform the operation if the document has this primary term.
    * **`if_seq_no` (Optional, number)**: Only perform the operation if the document has this sequence number.
    * **`op_type` (Optional, Enum("index" | "create"))**: Set to `create` to only index the document if it does not already exist (put if absent). If a document with the specified `_id` already exists, the indexing operation will fail. The behavior is the same as using the `<index>/_create` endpoint. If a document ID is specified, this paramater defaults to `index`. Otherwise, it defaults to `create`. If the request targets a data stream, an `op_type` of `create` is required.
    * **`pipeline` (Optional, string)**: The ID of the pipeline to use to preprocess incoming documents. If the index has a default ingest pipeline specified, then setting the value to `_none` disables the default ingest pipeline for this request. If a final pipeline is configured it will always run, regardless of the value of this parameter.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true`, Elasticsearch refreshes the affected shards to make this operation visible to search. If `wait_for`, it waits for a refresh to make this operation visible to search. If `false`, it does nothing with refreshes.
    * **`routing` (Optional, string)**: A custom value that is used to route operations to a specific shard.
    * **`timeout` (Optional, string | -1 | 0)**: The period the request waits for the following operations: automatic index creation, dynamic mapping updates, waiting for active shards. This parameter is useful for situations where the primary shard assigned to perform the operation might not be available when the operation runs. Some reasons for this might be that the primary shard is currently recovering from a gateway or undergoing relocation. By default, the operation will wait on the primary shard to become available for at least 1 minute before failing and responding with an error. The actual wait time could be longer, particularly when multiple waits occur.
    * **`version` (Optional, number)**: An explicit version number for concurrency control. It must be a non-negative long number.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: The version type.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. You can set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The default value of `1` means it waits for each primary shard to be active.
    * **`require_alias` (Optional, boolean)**: If `true`, the destination must be an index alias.



## info [_info]

Get cluster info. Get basic build, version, and cluster information.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-info)

```ts
client.info()
```


## knn_search [_knn_search]

Run a knn search.

::::{note}
The kNN search API has been replaced by the `knn` option in the search API.
::::


Perform a k-nearest neighbor (kNN) search on a dense_vector field and return the matching documents. Given a query vector, the API finds the k closest vectors and returns those documents as search hits.

Elasticsearch uses the HNSW algorithm to support efficient kNN search. Like most kNN algorithms, HNSW is an approximate method that sacrifices result accuracy for improved search speed. This means the results returned are not always the true k closest neighbors.

The kNN search API supports restricting the search using a filter. The search will return the top k documents that also match the filter query.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search)

```ts
client.knnSearch({ index, knn })
```


### Arguments [_arguments_19]

* **Request (object):**

    * **`index` (string | string[])**: A list of index names to search; use `_all` or to perform the operation on all indices
    * **`knn` ({ field, query_vector, k, num_candidates })**: kNN query to execute
    * **`_source` (Optional, boolean | { excludes, includes })**: Indicates which source fields are returned for matching documents. These fields are returned in the hits._source property of the search response.
    * **`docvalue_fields` (Optional, { field, format, include_unmapped }[])**: The request returns doc values for field names matching these patterns in the hits.fields property of the response. Accepts wildcard (*) patterns.
    * **`stored_fields` (Optional, string | string[])**: List of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the _source parameter defaults to false. You can pass _source: true to return both source fields and stored fields in the search response.
    * **`fields` (Optional, string | string[])**: The request returns values for field names matching these patterns in the hits.fields property of the response. Accepts wildcard (*) patterns.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type } | { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type }[])**: Query to filter the documents that can match. The kNN search will return the top `k` documents that also match this filter. The value can be a single query or a list of queries. If `filter` isn’t provided, all documents are allowed to match.
    * **`routing` (Optional, string)**: A list of specific routing values



## mget [_mget]

Get multiple documents.

Get multiple JSON documents by ID from one or more indices. If you specify an index in the request URI, you only need to specify the document IDs in the request body. To ensure fast responses, this multi get (mget) API responds with partial results if one or more shards fail.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-mget)

```ts
client.mget({ ... })
```


### Arguments [_arguments_20]

* **Request (object):**

    * **`index` (Optional, string)**: Name of the index to retrieve documents from when `ids` are specified, or when a document in the `docs` array does not specify an index.
    * **`docs` (Optional, { _id, _index, routing, _source, stored_fields, version, version_type }[])**: The documents you want to retrieve. Required if no index is specified in the request URI.
    * **`ids` (Optional, string | string[])**: The IDs of the documents you want to retrieve. Allowed when the index is specified in the request URI.
    * **`force_synthetic_source` (Optional, boolean)**: Should this request force synthetic _source? Use this to test if the mapping supports synthetic _source and to get a sense of the worst case performance. Fetches with this enabled will be slower the enabling synthetic source natively in the index.
    * **`preference` (Optional, string)**: Specifies the node or shard the operation should be performed on. Random by default.
    * **`realtime` (Optional, boolean)**: If `true`, the request is real-time as opposed to near-real-time.
    * **`refresh` (Optional, boolean)**: If `true`, the request refreshes relevant shards before retrieving documents.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.
    * **`_source` (Optional, boolean | string | string[])**: True or false to return the `_source` field or not, or a list of fields to return.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`stored_fields` (Optional, string | string[])**: If `true`, retrieves the document fields stored in the index rather than the document `_source`.



## msearch [_msearch]

Run multiple searches.

The format of the request is similar to the bulk API format and makes use of the newline delimited JSON (NDJSON) format. The structure is as follows:

```
header\n
body\n
header\n
body\n
```

This structure is specifically optimized to reduce parsing if a specific search ends up redirected to another node.

::::{important}
The final line of data must end with a newline character `\n`. Each newline character may be preceded by a carriage return `\r`. When sending requests to this endpoint the `Content-Type` header should be set to `application/x-ndjson`.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-msearch)

```ts
client.msearch({ ... })
```


### Arguments [_arguments_21]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and index aliases to search.
    * **`searches` (Optional, { allow_no_indices, expand_wildcards, ignore_unavailable, index, preference, request_cache, routing, search_type, ccs_minimize_roundtrips, allow_partial_search_results, ignore_throttled } | { aggregations, collapse, query, explain, ext, stored_fields, docvalue_fields, knn, from, highlight, indices_boost, min_score, post_filter, profile, rescore, script_fields, search_after, size, sort, _source, fields, terminate_after, stats, timeout, track_scores, track_total_hits, version, runtime_mappings, seq_no_primary_term, pit, suggest }[])**
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar.
    * **`ccs_minimize_roundtrips` (Optional, boolean)**: If true, network roundtrips between the coordinating node and remote clusters are minimized for cross-cluster search requests.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard expressions can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
    * **`ignore_throttled` (Optional, boolean)**: If true, concrete, expanded or aliased indices are ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If true, missing or closed indices are not included in the response.
    * **`include_named_queries_score` (Optional, boolean)**: Indicates whether hit.matched_queries should be rendered as a map that includes the name of the matched query associated with its score (true) or as an array containing the name of the matched queries (false) This functionality reruns each named query on every hit in a search response. Typically, this adds a small overhead to a request. However, using computationally expensive named queries on a large number of hits may add significant overhead.
    * **`max_concurrent_searches` (Optional, number)**: Maximum number of concurrent searches the multi search API can execute.
    * **`max_concurrent_shard_requests` (Optional, number)**: Maximum number of concurrent shard requests that each sub-search request executes per node.
    * **`pre_filter_shard_size` (Optional, number)**: Defines a threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on its rewrite method i.e., if date filters are mandatory to match but the shard bounds and the query are disjoint.
    * **`rest_total_hits_as_int` (Optional, boolean)**: If true, hits.total are returned as an integer in the response. Defaults to false, which returns an object.
    * **`routing` (Optional, string)**: Custom routing value used to route search operations to a specific shard.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: Indicates whether global term and document frequencies should be used when scoring returned documents.
    * **`typed_keys` (Optional, boolean)**: Specifies whether aggregation and suggester names should be prefixed by their respective types in the response.



## msearch_template [_msearch_template]

Run multiple templated searches.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-msearch)

```ts
client.msearchTemplate({ ... })
```


### Arguments [_arguments_22]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases to search. Supports wildcards (`*`). To search all data streams and indices, omit this parameter or use `*`.
    * **`search_templates` (Optional, { allow_no_indices, expand_wildcards, ignore_unavailable, index, preference, request_cache, routing, search_type, ccs_minimize_roundtrips, allow_partial_search_results, ignore_throttled } | { aggregations, collapse, query, explain, ext, stored_fields, docvalue_fields, knn, from, highlight, indices_boost, min_score, post_filter, profile, rescore, script_fields, search_after, size, sort, _source, fields, terminate_after, stats, timeout, track_scores, track_total_hits, version, runtime_mappings, seq_no_primary_term, pit, suggest }[])**
    * **`ccs_minimize_roundtrips` (Optional, boolean)**: If `true`, network round-trips are minimized for cross-cluster search requests.
    * **`max_concurrent_searches` (Optional, number)**: Maximum number of concurrent searches the API can run.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: The type of the search operation. Available options: `query_then_fetch`, `dfs_query_then_fetch`.
    * **`rest_total_hits_as_int` (Optional, boolean)**: If `true`, the response returns `hits.total` as an integer. If `false`, it returns `hits.total` as an object.
    * **`typed_keys` (Optional, boolean)**: If `true`, the response prefixes aggregation and suggester names with their respective types.



## mtermvectors [_mtermvectors]

Get multiple term vectors.

You can specify existing documents by index and ID or provide artificial documents in the body of the request. You can specify the index in the request body or request URI. The response contains a `docs` array with all the fetched termvectors. Each element has the structure provided by the termvectors API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-mtermvectors)

```ts
client.mtermvectors({ ... })
```


### Arguments [_arguments_23]

* **Request (object):**

    * **`index` (Optional, string)**: Name of the index that contains the documents.
    * **`docs` (Optional, { _id, _index, routing, _source, stored_fields, version, version_type }[])**: Array of existing or artificial documents.
    * **`ids` (Optional, string[])**: Simplified syntax to specify documents by their ID if they’re in the same index.
    * **`fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in the statistics. Used as the default list unless a specific field list is provided in the `completion_fields` or `fielddata_fields` parameters.
    * **`field_statistics` (Optional, boolean)**: If `true`, the response includes the document count, sum of document frequencies, and sum of total term frequencies.
    * **`offsets` (Optional, boolean)**: If `true`, the response includes term offsets.
    * **`payloads` (Optional, boolean)**: If `true`, the response includes term payloads.
    * **`positions` (Optional, boolean)**: If `true`, the response includes term positions.
    * **`preference` (Optional, string)**: Specifies the node or shard the operation should be performed on. Random by default.
    * **`realtime` (Optional, boolean)**: If true, the request is real-time as opposed to near-real-time.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.
    * **`term_statistics` (Optional, boolean)**: If true, the response includes term frequency and document frequency.
    * **`version` (Optional, number)**: If `true`, returns the document version as part of a hit.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: Specific version type.



## open_point_in_time [_open_point_in_time]

Open a point in time.

A search request by default runs against the most recent visible data of the target indices, which is called point in time. Elasticsearch pit (point in time) is a lightweight view into the state of the data as it existed when initiated. In some cases, it’s preferred to perform multiple search requests using the same point in time. For example, if refreshes happen between `search_after` requests, then the results of those requests might not be consistent as changes happening between searches are only visible to the more recent point in time.

A point in time must be opened explicitly before being used in search requests.

A subsequent search request with the `pit` parameter must not specify `index`, `routing`, or `preference` values as these parameters are copied from the point in time.

Just like regular searches, you can use `from` and `size` to page through point in time search results, up to the first 10,000 hits. If you want to retrieve more hits, use PIT with `search_after`.

::::{important}
The open point in time request and each subsequent search request can return different identifiers; always use the most recently received ID for the next search request.
::::


When a PIT that contains shard failures is used in a search request, the missing are always reported in the search response as a `NoShardAvailableActionException` exception. To get rid of these exceptions, a new PIT needs to be created so that shards missing from the previous PIT can be handled, assuming they become available in the meantime.

**Keeping point in time alive**

The `keep_alive` parameter, which is passed to a open point in time request and search request, extends the time to live of the corresponding point in time. The value does not need to be long enough to process all data — it just needs to be long enough for the next request.

Normally, the background merge process optimizes the index by merging together smaller segments to create new, bigger segments. Once the smaller segments are no longer needed they are deleted. However, open point-in-times prevent the old segments from being deleted since they are still in use.

::::{tip}
Keeping older segments alive means that more disk space and file handles are needed. Ensure that you have configured your nodes to have ample free file handles.
::::


Additionally, if a segment contains deleted or updated documents then the point in time must keep track of whether each document in the segment was live at the time of the initial search request. Ensure that your nodes have sufficient heap space if you have many open point-in-times on an index that is subject to ongoing deletes or updates. Note that a point-in-time doesn’t prevent its associated indices from being deleted. You can check how many point-in-times (that is, search contexts) are open with the nodes stats API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-open-point-in-time)

```ts
client.openPointInTime({ index, keep_alive })
```


### Arguments [_arguments_24]

* **Request (object):**

    * **`index` (string | string[])**: A list of index names to open point in time; use `_all` or empty string to perform the operation on all indices
    * **`keep_alive` (string | -1 | 0)**: Extend the length of time that the point in time persists.
    * **`index_filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Filter indices if the provided query rewrites to `match_none` on every shard.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. By default, it is random.
    * **`routing` (Optional, string)**: A custom value that is used to route operations to a specific shard.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`allow_partial_search_results` (Optional, boolean)**: Indicates whether the point in time tolerates unavailable shards or shard failures when initially creating the PIT. If `false`, creating a point in time request when a shard is missing or unavailable will throw an exception. If `true`, the point in time will contain all the shards that are available at the time of the request.



## ping [_ping]

Ping the cluster. Get information about whether the cluster is running.

[Endpoint documentation](docs-content://get-started/index.md)

```ts
client.ping()
```


## put_script [_put_script]

Create or update a script or search template. Creates or updates a stored script or search template.

[Endpoint documentation](docs-content://explore-analyze/scripting.md)

```ts
client.putScript({ id, script })
```


### Arguments [_arguments_25]

* **Request (object):**

    * **`id` (string)**: Identifier for the stored script or search template. Must be unique within the cluster.
    * **`script` ({ lang, options, source })**: Contains the script or search template, its parameters, and its language.
    * **`context` (Optional, string)**: Context in which the script or search template should run. To prevent errors, the API immediately compiles the script or template in this context.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## rank_eval [_rank_eval]

Evaluate ranked search results.

Evaluate the quality of ranked search results over a set of typical search queries.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rank-eval)

```ts
client.rankEval({ requests })
```


### Arguments [_arguments_26]

* **Request (object):**

    * **`requests` ({ id, request, ratings, template_id, params }[])**: A set of typical search requests, together with their provided ratings.
    * **`index` (Optional, string | string[])**: List of data streams, indices, and index aliases used to limit the request. Wildcard (`*`) expressions are supported. To target all data streams and indices in a cluster, omit this parameter or use `_all` or `*`.
    * **`metric` (Optional, { precision, recall, mean_reciprocal_rank, dcg, expected_reciprocal_rank })**: Definition of the evaluation metric to calculate.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, missing or closed indices are not included in the response.
    * **`search_type` (Optional, string)**: Search operation type



## reindex [_reindex]

Reindex documents.

Copy documents from a source to a destination. You can copy all documents to the destination index or reindex a subset of the documents. The source can be any existing index, alias, or data stream. The destination must differ from the source. For example, you cannot reindex a data stream into itself.

::::{important}
Reindex requires `_source` to be enabled for all documents in the source. The destination should be configured as wanted before calling the reindex API. Reindex does not copy the settings from the source or its associated template. Mappings, shard counts, and replicas, for example, must be configured ahead of time.
::::


If the Elasticsearch security features are enabled, you must have the following security privileges:

* The `read` index privilege for the source data stream, index, or alias.
* The `write` index privilege for the destination data stream, index, or index alias.
* To automatically create a data stream or index with a reindex API request, you must have the `auto_configure`, `create_index`, or `manage` index privilege for the destination data stream, index, or alias.
* If reindexing from a remote cluster, the `source.remote.user` must have the `monitor` cluster privilege and the `read` index privilege for the source data stream, index, or alias.

If reindexing from a remote cluster, you must explicitly allow the remote host in the `reindex.remote.whitelist` setting. Automatic data stream creation requires a matching index template with data stream enabled.

The `dest` element can be configured like the index API to control optimistic concurrency control. Omitting `version_type` or setting it to `internal` causes Elasticsearch to blindly dump documents into the destination, overwriting any that happen to have the same ID.

Setting `version_type` to `external` causes Elasticsearch to preserve the `version` from the source, create any documents that are missing, and update any documents that have an older version in the destination than they do in the source.

Setting `op_type` to `create` causes the reindex API to create only missing documents in the destination. All existing documents will cause a version conflict.

::::{important}
Because data streams are append-only, any reindex request to a destination data stream must have an `op_type` of `create`. A reindex can only add new documents to a destination data stream. It cannot update existing documents in a destination data stream.
::::


By default, version conflicts abort the reindex process. To continue reindexing if there are conflicts, set the `conflicts` request body property to `proceed`. In this case, the response includes a count of the version conflicts that were encountered. Note that the handling of other error types is unaffected by the `conflicts` property. Additionally, if you opt to count version conflicts, the operation could attempt to reindex more documents from the source than `max_docs` until it has successfully indexed `max_docs` documents into the target or it has gone through every document in the source query.

::::{note}
The reindex API makes no effort to handle ID collisions. The last document written will "win" but the order isn’t usually predictable so it is not a good idea to rely on this behavior. Instead, make sure that IDs are unique by using a script.
::::


**Running reindex asynchronously**

If the request contains `wait_for_completion=false`, Elasticsearch performs some preflight checks, launches the request, and returns a task you can use to cancel or get the status of the task. Elasticsearch creates a record of this task as a document at `_tasks/<task_id>`.

**Reindex from multiple sources**

If you have many sources to reindex it is generally better to reindex them one at a time rather than using a glob pattern to pick up multiple sources. That way you can resume the process if there are any errors by removing the partially completed source and starting over. It also makes parallelizing the process fairly simple: split the list of sources to reindex and run each list in parallel.

For example, you can use a bash script like this:

```
for index in i1 i2 i3 i4 i5; do
  curl -HContent-Type:application/json -XPOST localhost:9200/_reindex?pretty -d'{
    "source": {
      "index": "'$index'"
    },
    "dest": {
      "index": "'$index'-reindexed"
    }
  }'
done
```

**Throttling**

Set `requests_per_second` to any positive decimal number (`1.4`, `6`, `1000`, for example) to throttle the rate at which reindex issues batches of index operations. Requests are throttled by padding each batch with a wait time. To turn off throttling, set `requests_per_second` to `-1`.

The throttling is done by waiting between batches so that the scroll that reindex uses internally can be given a timeout that takes into account the padding. The padding time is the difference between the batch size divided by the `requests_per_second` and the time spent writing. By default the batch size is `1000`, so if `requests_per_second` is set to `500`:

```
target_time = 1000 / 500 per second = 2 seconds
wait_time = target_time - write_time = 2 seconds - .5 seconds = 1.5 seconds
```

Since the batch is issued as a single bulk request, large batch sizes cause Elasticsearch to create many requests and then wait for a while before starting the next set. This is "bursty" instead of "smooth".

**Slicing**

Reindex supports sliced scroll to parallelize the reindexing process. This parallelization can improve efficiency and provide a convenient way to break the request down into smaller parts.

::::{note}
Reindexing from remote clusters does not support manual or automatic slicing.
::::


You can slice a reindex request manually by providing a slice ID and total number of slices to each request. You can also let reindex automatically parallelize by using sliced scroll to slice on `_id`. The `slices` parameter specifies the number of slices to use.

Adding `slices` to the reindex request just automates the manual process, creating sub-requests which means it has some quirks:

* You can see these requests in the tasks API. These sub-requests are "child" tasks of the task for the request with slices.
* Fetching the status of the task for the request with `slices` only contains the status of completed slices.
* These sub-requests are individually addressable for things like cancellation and rethrottling.
* Rethrottling the request with `slices` will rethrottle the unfinished sub-request proportionally.
* Canceling the request with `slices` will cancel each sub-request.
* Due to the nature of `slices`, each sub-request won’t get a perfectly even portion of the documents. All documents will be addressed, but some slices may be larger than others. Expect larger slices to have a more even distribution.
* Parameters like `requests_per_second` and `max_docs` on a request with `slices` are distributed proportionally to each sub-request. Combine that with the previous point about distribution being uneven and you should conclude that using `max_docs` with `slices` might not result in exactly `max_docs` documents being reindexed.
* Each sub-request gets a slightly different snapshot of the source, though these are all taken at approximately the same time.

If slicing automatically, setting `slices` to `auto` will choose a reasonable number for most indices. If slicing manually or otherwise tuning automatic slicing, use the following guidelines.

Query performance is most efficient when the number of slices is equal to the number of shards in the index. If that number is large (for example, `500`), choose a lower number as too many slices will hurt performance. Setting slices higher than the number of shards generally does not improve efficiency and adds overhead.

Indexing performance scales linearly across available resources with the number of slices.

Whether query or indexing performance dominates the runtime depends on the documents being reindexed and cluster resources.

**Modify documents during reindexing**

Like `_update_by_query`, reindex operations support a script that modifies the document. Unlike `_update_by_query`, the script is allowed to modify the document’s metadata.

Just as in `_update_by_query`, you can set `ctx.op` to change the operation that is run on the destination. For example, set `ctx.op` to `noop` if your script decides that the document doesn’t have to be indexed in the destination. This "no operation" will be reported in the `noop` counter in the response body. Set `ctx.op` to `delete` if your script decides that the document must be deleted from the destination. The deletion will be reported in the `deleted` counter in the response body. Setting `ctx.op` to anything else will return an error, as will setting any other field in `ctx`.

Think of the possibilities! Just be careful; you are able to change:

* `_id`
* `_index`
* `_version`
* `_routing`

Setting `_version` to `null` or clearing it from the `ctx` map is just like not sending the version in an indexing request. It will cause the document to be overwritten in the destination regardless of the version on the target or the version type you use in the reindex API.

**Reindex from remote**

Reindex supports reindexing from a remote Elasticsearch cluster. The `host` parameter must contain a scheme, host, port, and optional path. The `username` and `password` parameters are optional and when they are present the reindex operation will connect to the remote Elasticsearch node using basic authentication. Be sure to use HTTPS when using basic authentication or the password will be sent in plain text. There are a range of settings available to configure the behavior of the HTTPS connection.

When using Elastic Cloud, it is also possible to authenticate against the remote cluster through the use of a valid API key. Remote hosts must be explicitly allowed with the `reindex.remote.whitelist` setting. It can be set to a comma delimited list of allowed remote host and port combinations. Scheme is ignored; only the host and port are used. For example:

```
reindex.remote.whitelist: [otherhost:9200, another:9200, 127.0.10.*:9200, localhost:*"]
```

The list of allowed hosts must be configured on any nodes that will coordinate the reindex. This feature should work with remote clusters of any version of Elasticsearch. This should enable you to upgrade from any version of Elasticsearch to the current version by reindexing from a cluster of the old version.

::::{warning}
Elasticsearch does not support forward compatibility across major versions. For example, you cannot reindex from a 7.x cluster into a 6.x cluster.
::::


To enable queries sent to older versions of Elasticsearch, the `query` parameter is sent directly to the remote host without validation or modification.

::::{note}
Reindexing from remote clusters does not support manual or automatic slicing.
::::


Reindexing from a remote server uses an on-heap buffer that defaults to a maximum size of 100mb. If the remote index includes very large documents you’ll need to use a smaller batch size. It is also possible to set the socket read timeout on the remote connection with the `socket_timeout` field and the connection timeout with the `connect_timeout` field. Both default to 30 seconds.

**Configuring SSL parameters**

Reindex from remote supports configurable SSL settings. These must be specified in the `elasticsearch.yml` file, with the exception of the secure settings, which you add in the Elasticsearch keystore. It is not possible to configure SSL in the body of the reindex request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-reindex)

```ts
client.reindex({ dest, source })
```


### Arguments [_arguments_27]

* **Request (object):**

    * **`dest` ({ index, op_type, pipeline, routing, version_type })**: The destination you are copying to.
    * **`source` ({ index, query, remote, size, slice, sort, _source, runtime_mappings })**: The source you are copying from.
    * **`conflicts` (Optional, Enum("abort" | "proceed"))**: Indicates whether to continue reindexing even when there are conflicts.
    * **`max_docs` (Optional, number)**: The maximum number of documents to reindex. By default, all documents are reindexed. If it is a value less then or equal to `scroll_size`, a scroll will not be used to retrieve the results for the operation. If `conflicts` is set to `proceed`, the reindex operation could attempt to reindex more documents from the source than `max_docs` until it has successfully indexed `max_docs` documents into the target or it has gone through every document in the source query.
    * **`script` (Optional, { source, id, params, lang, options })**: The script to run to update the document source or metadata when reindexing.
    * **`size` (Optional, number)**
    * **`refresh` (Optional, boolean)**: If `true`, the request refreshes affected shards to make this operation visible to search.
    * **`requests_per_second` (Optional, float)**: The throttle for this request in sub-requests per second. By default, there is no throttle.
    * **`scroll` (Optional, string | -1 | 0)**: The period of time that a consistent view of the index should be maintained for scrolled search.
    * **`slices` (Optional, number | Enum("auto"))**: The number of slices this task should be divided into. It defaults to one slice, which means the task isn’t sliced into subtasks. Reindex supports sliced scroll to parallelize the reindexing process. This parallelization can improve efficiency and provide a convenient way to break the request down into smaller parts. NOTE: Reindexing from remote clusters does not support manual or automatic slicing. If set to `auto`, Elasticsearch chooses the number of slices to use. This setting will use one slice per shard, up to a certain limit. If there are multiple sources, it will choose the number of slices based on the index or backing index with the smallest number of shards.
    * **`timeout` (Optional, string | -1 | 0)**: The period each indexing waits for automatic index creation, dynamic mapping updates, and waiting for active shards. By default, Elasticsearch waits for at least one minute before failing. The actual wait time could be longer, particularly when multiple waits occur.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set it to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The default value is one, which means it waits for each primary shard to be active.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks until the operation is complete.
    * **`require_alias` (Optional, boolean)**: If `true`, the destination must be an index alias.



## reindex_rethrottle [_reindex_rethrottle]

Throttle a reindex operation.

Change the number of requests per second for a particular reindex operation. For example:

```
POST _reindex/r1A2WoRbTwKZ516z6NEs5A:36619/_rethrottle?requests_per_second=-1
```

Rethrottling that speeds up the query takes effect immediately. Rethrottling that slows down the query will take effect after completing the current batch. This behavior prevents scroll timeouts.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-reindex)

```ts
client.reindexRethrottle({ task_id })
```


### Arguments [_arguments_28]

* **Request (object):**

    * **`task_id` (string)**: The task identifier, which can be found by using the tasks API.
    * **`requests_per_second` (Optional, float)**: The throttle for this request in sub-requests per second. It can be either `-1` to turn off throttling or any decimal number like `1.7` or `12` to throttle to that level.



## render_search_template [_render_search_template]

Render a search template.

Render a search template as a search request body.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-render-search-template)

```ts
client.renderSearchTemplate({ ... })
```


### Arguments [_arguments_29]

* **Request (object):**

    * **`id` (Optional, string)**: ID of the search template to render. If no `source` is specified, this or the `id` request body parameter is required.
    * **`file` (Optional, string)**
    * **`params` (Optional, Record<string, User-defined value>)**: Key-value pairs used to replace Mustache variables in the template. The key is the variable name. The value is the variable value.
    * **`source` (Optional, string)**: An inline search template. Supports the same parameters as the search API’s request body. These parameters also support Mustache variables. If no `id` or `<templated-id>` is specified, this parameter is required.



## scripts_painless_execute [_scripts_painless_execute]

Run a script.

Runs a script and returns a result. Use this API to build and test scripts, such as when defining a script for a runtime field. This API requires very few dependencies and is especially useful if you don’t have permissions to write documents on a cluster.

The API uses several *contexts*, which control how scripts are run, what variables are available at runtime, and what the return type is.

Each context requires a script, but additional parameters depend on the context you’re using for that script.

[Endpoint documentation](elasticsearch://reference/scripting-languages/painless/painless-api-examples.md)

```ts
client.scriptsPainlessExecute({ ... })
```


### Arguments [_arguments_30]

* **Request (object):**

    * **`context` (Optional, Enum("painless_test" | "filter" | "score" | "boolean_field" | "date_field" | "double_field" | "geo_point_field" | "ip_field" | "keyword_field" | "long_field" | "composite_field"))**: The context that the script should run in. NOTE: Result ordering in the field contexts is not guaranteed.
    * **`context_setup` (Optional, { document, index, query })**: Additional parameters for the `context`. NOTE: This parameter is required for all contexts except `painless_test`, which is the default if no value is provided for `context`.
    * **`script` (Optional, { source, id, params, lang, options })**: The Painless script to run.



## scroll [_scroll]

Run a scrolling search.

::::{important}
The scroll API is no longer recommend for deep pagination. If you need to preserve the index state while paging through more than 10,000 hits, use the `search_after` parameter with a point in time (PIT).
::::


The scroll API gets large sets of results from a single scrolling search request. To get the necessary scroll ID, submit a search API request that includes an argument for the `scroll` query parameter. The `scroll` parameter indicates how long Elasticsearch should retain the search context for the request. The search response returns a scroll ID in the `_scroll_id` response body parameter. You can then use the scroll ID with the scroll API to retrieve the next batch of results for the request. If the Elasticsearch security features are enabled, the access to the results of a specific scroll ID is restricted to the user or API key that submitted the search.

You can also use the scroll API to specify a new scroll parameter that extends or shortens the retention period for the search context.

::::{important}
Results from a scrolling search reflect the state of the index at the time of the initial search request. Subsequent indexing or document changes only affect later search and scroll requests.
::::


[Endpoint documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html)

```ts
client.scroll({ scroll_id })
```


### Arguments [_arguments_31]

* **Request (object):**

    * **`scroll_id` (string)**: Scroll ID of the search.
    * **`scroll` (Optional, string | -1 | 0)**: Period to retain the search context for scrolling.
    * **`rest_total_hits_as_int` (Optional, boolean)**: If true, the API response’s hit.total property is returned as an integer. If false, the API response’s hit.total property is returned as an object.



## search [_search]

Run a search.

Get search hits that match the query defined in the request. You can provide search queries using the `q` query string parameter or the request body. If both are specified, only the query parameter is used.

If the Elasticsearch security features are enabled, you must have the read index privilege for the target data stream, index, or alias. For cross-cluster search, refer to the documentation about configuring CCS privileges. To search a point in time (PIT) for an alias, you must have the `read` index privilege for the alias’s data streams or indices.

**Search slicing**

When paging through a large number of documents, it can be helpful to split the search into multiple slices to consume them independently with the `slice` and `pit` properties. By default the splitting is done first on the shards, then locally on each shard. The local splitting partitions the shard into contiguous ranges based on Lucene document IDs.

For instance if the number of shards is equal to 2 and you request 4 slices, the slices 0 and 2 are assigned to the first shard and the slices 1 and 3 are assigned to the second shard.

::::{important}
The same point-in-time ID should be used for all slices. If different PIT IDs are used, slices can overlap and miss documents. This situation can occur because the splitting criterion is based on Lucene document IDs, which are not stable across changes to the index.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search)

```ts
client.search({ ... })
```


### Arguments [_arguments_32]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases to search. It supports wildcards (`*`). To search all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`aggregations` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**: Defines the aggregations that are run as part of the search request.
    * **`collapse` (Optional, { field, inner_hits, max_concurrent_group_searches, collapse })**: Collapses search results the values of the specified field.
    * **`explain` (Optional, boolean)**: If `true`, the request returns detailed information about score computation as part of a hit.
    * **`ext` (Optional, Record<string, User-defined value>)**: Configuration of search extensions defined by Elasticsearch plugins.
    * **`from` (Optional, number)**: The starting document offset, which must be non-negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter.
    * **`highlight` (Optional, { encoder, fields })**: Specifies the highlighter to use for retrieving highlighted snippets from one or more fields in your search results.
    * **`track_total_hits` (Optional, boolean | number)**: Number of hits matching the query to count accurately. If `true`, the exact number of hits is returned at the cost of some performance. If `false`, the response does not include the total number of hits matching the query.
    * **`indices_boost` (Optional, Record<string, number>[])**: Boost the `_score` of documents from specified indices. The boost value is the factor by which scores are multiplied. A boost value greater than `1.0` increases the score. A boost value between `0` and `1.0` decreases the score.
    * **`docvalue_fields` (Optional, { field, format, include_unmapped }[])**: An array of wildcard (`*`) field patterns. The request returns doc values for field names matching these patterns in the `hits.fields` property of the response.
    * **`knn` (Optional, { field, query_vector, query_vector_builder, k, num_candidates, boost, filter, similarity, inner_hits, rescore_vector } | { field, query_vector, query_vector_builder, k, num_candidates, boost, filter, similarity, inner_hits, rescore_vector }[])**: The approximate kNN search to run.
    * **`rank` (Optional, { rrf })**: The Reciprocal Rank Fusion (RRF) to use.
    * **`min_score` (Optional, number)**: The minimum `_score` for matching documents. Documents with a lower `_score` are not included in the search results.
    * **`post_filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Use the `post_filter` parameter to filter search results. The search hits are filtered after the aggregations are calculated. A post filter has no impact on the aggregation results.
    * **`profile` (Optional, boolean)**: Set to `true` to return detailed timing information about the execution of individual components in a search request. NOTE: This is a debugging tool and adds significant overhead to search execution.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The search definition using the Query DSL.
    * **`rescore` (Optional, { window_size, query, learning_to_rank } | { window_size, query, learning_to_rank }[])**: Can be used to improve precision by reordering just the top (for example 100 - 500) documents returned by the `query` and `post_filter` phases.
    * **`retriever` (Optional, { standard, knn, rrf, text_similarity_reranker, rule })**: A retriever is a specification to describe top documents returned from a search. A retriever replaces other elements of the search API that also return top documents such as `query` and `knn`.
    * **`script_fields` (Optional, Record<string, { script, ignore_failure }>)**: Retrieve a script evaluation (based on different fields) for each hit.
    * **`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**: Used to retrieve the next page of hits using a set of sort values from the previous page.
    * **`size` (Optional, number)**: The number of hits to return, which must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` property.
    * **`slice` (Optional, { field, id, max })**: Split a scrolled search into multiple slices that can be consumed independently.
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**: A list of <field>:<direction> pairs.
    * **`_source` (Optional, boolean | { excludes, includes })**: The source fields that are returned for matching documents. These fields are returned in the `hits._source` property of the search response. If the `stored_fields` property is specified, the `_source` property defaults to `false`. Otherwise, it defaults to `true`.
    * **`fields` (Optional, { field, format, include_unmapped }[])**: An array of wildcard (`*`) field patterns. The request returns values for field names matching these patterns in the `hits.fields` property of the response.
    * **`suggest` (Optional, { text })**: Defines a suggester that provides similar looking terms based on a provided text.
    * **`terminate_after` (Optional, number)**: The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. IMPORTANT: Use with caution. Elasticsearch applies this property to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this property for requests that target data streams with backing indices across multiple data tiers. If set to `0` (default), the query does not terminate early.
    * **`timeout` (Optional, string)**: The period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout.
    * **`track_scores` (Optional, boolean)**: If `true`, calculate and return document scores, even if the scores are not used for sorting.
    * **`version` (Optional, boolean)**: If `true`, the request returns the document version as part of a hit.
    * **`seq_no_primary_term` (Optional, boolean)**: If `true`, the request returns sequence number and primary term of the last modification of each hit.
    * **`stored_fields` (Optional, string | string[])**: A list of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the `_source` property defaults to `false`. You can pass `_source: true` to return both source fields and stored fields in the search response.
    * **`pit` (Optional, { id, keep_alive })**: Limit the search to a point in time (PIT). If you provide a PIT, you cannot specify an `<index>` in the request path.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: One or more runtime fields in the search request. These fields take precedence over mapped fields with the same name.
    * **`stats` (Optional, string[])**: The stats groups to associate with the search. Each group maintains a statistics aggregation for its associated searches. You can retrieve these stats using the indices stats API.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`allow_partial_search_results` (Optional, boolean)**: If `true` and there are shard request timeouts or shard failures, the request returns partial results. If `false`, it returns an error with no partial results. To override the default behavior, you can set the `search.default_allow_partial_results` cluster setting to `false`.
    * **`analyzer` (Optional, string)**: The analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`analyze_wildcard` (Optional, boolean)**: If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified.
    * **`batched_reduce_size` (Optional, number)**: The number of shard results that should be reduced at once on the coordinating node. If the potential number of shards in the request can be large, this value should be used as a protection mechanism to reduce the memory overhead per search request.
    * **`ccs_minimize_roundtrips` (Optional, boolean)**: If `true`, network round-trips between the coordinating node and the remote clusters are minimized when running cross-cluster search (CCS) requests.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for the query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified.
    * **`df` (Optional, string)**: The field to use as a default when no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports a list of values such as `open,hidden`.
    * **`ignore_throttled` (Optional, boolean)**: If `true`, concrete, expanded or aliased indices will be ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`include_named_queries_score` (Optional, boolean)**: If `true`, the response includes the score contribution from any named queries. This functionality reruns each named query on every hit in a search response. Typically, this adds a small overhead to a request. However, using computationally expensive named queries on a large number of hits may add significant overhead.
    * **`lenient` (Optional, boolean)**: If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified.
    * **`max_concurrent_shard_requests` (Optional, number)**: The number of concurrent shard requests per node that the search runs concurrently. This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests.
    * **`preference` (Optional, string)**: The nodes and shards used for the search. By default, Elasticsearch selects from eligible nodes and shards using adaptive replica selection, accounting for allocation awareness. Valid values are: * `_only_local` to run the search only on shards on the local node. * `_local` to, if possible, run the search on shards on the local node, or if not, select shards using the default method. * `_only_nodes:<node-id>,<node-id>` to run the search on only the specified nodes IDs. If suitable shards exist on more than one selected node, use shards on those nodes using the default method. If none of the specified nodes are available, select shards from any available node using the default method. * `_prefer_nodes:<node-id>,<node-id>` to if possible, run the search on the specified nodes IDs. If not, select shards using the default method. `_shards:<shard>,<shard>` to run the search only on the specified shards. You can combine this value with other `preference` values. However, the `_shards` value must come first. For example: `_shards:2,3|_local`. `<custom-string>` (any string that does not start with `_`) to route searches with the same `<custom-string>` to the same shards in the same order.
    * **`pre_filter_shard_size` (Optional, number)**: A threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on its rewrite method (if date filters are mandatory to match but the shard bounds and the query are disjoint). When unspecified, the pre-filter phase is executed if any of these conditions is met: * The request targets more than 128 shards. * The request targets one or more read-only index. * The primary sort of the query targets an indexed field.
    * **`request_cache` (Optional, boolean)**: If `true`, the caching of search results is enabled for requests where `size` is `0`. It defaults to index level settings.
    * **`routing` (Optional, string)**: A custom value that is used to route operations to a specific shard.
    * **`scroll` (Optional, string | -1 | 0)**: The period to retain the search context for scrolling. By default, this value cannot exceed `1d` (24 hours). You can change this limit by using the `search.max_keep_alive` cluster-level setting.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: Indicates how distributed term frequencies are calculated for relevance scoring.
    * **`suggest_field` (Optional, string)**: The field to use for suggestions.
    * **`suggest_mode` (Optional, Enum("missing" | "popular" | "always"))**: The suggest mode. This parameter can be used only when the `suggest_field` and `suggest_text` query string parameters are specified.
    * **`suggest_size` (Optional, number)**: The number of suggestions to return. This parameter can be used only when the `suggest_field` and `suggest_text` query string parameters are specified.
    * **`suggest_text` (Optional, string)**: The source text for which the suggestions should be returned. This parameter can be used only when the `suggest_field` and `suggest_text` query string parameters are specified.
    * **`typed_keys` (Optional, boolean)**: If `true`, aggregation and suggester names are be prefixed by their respective types in the response.
    * **`rest_total_hits_as_int` (Optional, boolean)**: Indicates whether `hits.total` should be rendered as an integer or an object in the rest search response.
    * **`_source_excludes` (Optional, string | string[])**: A list of source fields to exclude from the response. You can also use this parameter to exclude fields from the subset specified in `_source_includes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`_source_includes` (Optional, string | string[])**: A list of source fields to include in the response. If this parameter is specified, only these source fields are returned. You can exclude fields from this subset using the `_source_excludes` query parameter. If the `_source` parameter is `false`, this parameter is ignored.
    * **`q` (Optional, string)**: A query in the Lucene query string syntax. Query parameter searches do not support the full Elasticsearch Query DSL but are handy for testing. IMPORTANT: This parameter overrides the query parameter in the request body. If both parameters are specified, documents matching the query request body parameter are not returned.
    * **`force_synthetic_source` (Optional, boolean)**: Should this request force synthetic _source? Use this to test if the mapping supports synthetic _source and to get a sense of the worst case performance. Fetches with this enabled will be slower the enabling synthetic source natively in the index.



## search_mvt [_search_mvt]

Search a vector tile.

Search a vector tile for geospatial values.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-mvt)

```ts
client.searchMvt({ index, field, zoom, x, y })
```


### Arguments [_arguments_33]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams, indices, or aliases to search
    * **`field` (string)**: Field containing geospatial data to return
    * **`zoom` (number)**: Zoom level for the vector tile to search
    * **`x` (number)**: X coordinate for the vector tile to search
    * **`y` (number)**: Y coordinate for the vector tile to search
    * **`aggs` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**: Sub-aggregations for the geotile_grid. Supports the following aggregation types: - avg - cardinality - max - min - sum
    * **`buffer` (Optional, number)**: Size, in pixels, of a clipping buffer outside the tile. This allows renderers to avoid outline artifacts from geometries that extend past the extent of the tile.
    * **`exact_bounds` (Optional, boolean)**: If false, the meta layer’s feature is the bounding box of the tile. If true, the meta layer’s feature is a bounding box resulting from a geo_bounds aggregation. The aggregation runs on <field> values that intersect the <zoom>/<x>/<y> tile with wrap_longitude set to false. The resulting bounding box may be larger than the vector tile.
    * **`extent` (Optional, number)**: Size, in pixels, of a side of the tile. Vector tiles are square with equal sides.
    * **`fields` (Optional, string | string[])**: Fields to return in the `hits` layer. Supports wildcards (`*`). This parameter does not support fields with array values. Fields with array values may return inconsistent results.
    * **`grid_agg` (Optional, Enum("geotile" | "geohex"))**: Aggregation used to create a grid for the `field`.
    * **`grid_precision` (Optional, number)**: Additional zoom levels available through the aggs layer. For example, if <zoom> is 7 and grid_precision is 8, you can zoom in up to level 15. Accepts 0-8. If 0, results don’t include the aggs layer.
    * **`grid_type` (Optional, Enum("grid" | "point" | "centroid"))**: Determines the geometry type for features in the aggs layer. In the aggs layer, each feature represents a geotile_grid cell. If *grid* each feature is a Polygon of the cells bounding box. If *point* each feature is a Point that is the centroid of the cell.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Query DSL used to filter documents for the search.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Defines one or more runtime fields in the search request. These fields take precedence over mapped fields with the same name.
    * **`size` (Optional, number)**: Maximum number of features to return in the hits layer. Accepts 0-10000. If 0, results don’t include the hits layer.
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**: Sorts features in the hits layer. By default, the API calculates a bounding box for each feature. It sorts features based on this box’s diagonal length, from longest to shortest.
    * **`track_total_hits` (Optional, boolean | number)**: Number of hits matching the query to count accurately. If `true`, the exact number of hits is returned at the cost of some performance. If `false`, the response does not include the total number of hits matching the query.
    * **`with_labels` (Optional, boolean)**: If `true`, the hits and aggs layers will contain additional point features representing suggested label positions for the original features.



## search_shards [_search_shards]

Get the search shards.

Get the indices and shards that a search request would be run against. This information can be useful for working out issues or planning optimizations with routing and shard preferences. When filtered aliases are used, the filter is returned as part of the indices section.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-shards)

```ts
client.searchShards({ ... })
```


### Arguments [_arguments_34]

* **Request (object):**

    * **`index` (Optional, string | string[])**: Returns the indices and shards that a search request would be executed against.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`preference` (Optional, string)**: Specifies the node or shard the operation should be performed on. Random by default.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.



## search_template [_search_template]

Run a search with a search template.

[Endpoint documentation](docs-content://solutions/search/search-templates.md)

```ts
client.searchTemplate({ ... })
```


### Arguments [_arguments_35]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases to search. Supports wildcards (*).
    * **`explain` (Optional, boolean)**: If `true`, returns detailed information about score calculation as part of each hit.
    * **`id` (Optional, string)**: ID of the search template to use. If no source is specified, this parameter is required.
    * **`params` (Optional, Record<string, User-defined value>)**: Key-value pairs used to replace Mustache variables in the template. The key is the variable name. The value is the variable value.
    * **`profile` (Optional, boolean)**: If `true`, the query execution is profiled.
    * **`source` (Optional, string)**: An inline search template. Supports the same parameters as the search API’s request body. Also supports Mustache variables. If no id is specified, this parameter is required.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`ccs_minimize_roundtrips` (Optional, boolean)**: If `true`, network round-trips are minimized for cross-cluster search requests.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_throttled` (Optional, boolean)**: If `true`, specified concrete, expanded, or aliased indices are not included in the response when throttled.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`preference` (Optional, string)**: Specifies the node or shard the operation should be performed on. Random by default.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.
    * **`scroll` (Optional, string | -1 | 0)**: Specifies how long a consistent view of the index should be maintained for scrolled search.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: The type of the search operation.
    * **`rest_total_hits_as_int` (Optional, boolean)**: If true, hits.total are rendered as an integer in the response.
    * **`typed_keys` (Optional, boolean)**: If `true`, the response prefixes aggregation and suggester names with their respective types.



## terms_enum [_terms_enum]

Get terms in an index.

Discover terms that match a partial string in an index. This "terms enum" API is designed for low-latency look-ups used in auto-complete scenarios.

If the `complete` property in the response is false, the returned terms set may be incomplete and should be treated as approximate. This can occur due to a few reasons, such as a request timeout or a node error.

::::{note}
The terms enum API may return terms from deleted documents. Deleted documents are initially only marked as deleted. It is not until their segments are merged that documents are actually deleted. Until that happens, the terms enum API will return terms from these documents.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-terms-enum)

```ts
client.termsEnum({ index, field })
```


### Arguments [_arguments_36]

* **Request (object):**

    * **`index` (string)**: List of data streams, indices, and index aliases to search. Wildcard (*) expressions are supported.
    * **`field` (string)**: The string to match at the start of indexed terms. If not provided, all terms in the field are considered.
    * **`size` (Optional, number)**: How many matching terms to return.
    * **`timeout` (Optional, string | -1 | 0)**: The maximum length of time to spend collecting results. Defaults to "1s" (one second). If the timeout is exceeded the complete flag set to false in the response and the results may be partial or empty.
    * **`case_insensitive` (Optional, boolean)**: When true the provided search string is matched against index terms without case sensitivity.
    * **`index_filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Allows to filter an index shard if the provided query rewrites to match_none.
    * **`string` (Optional, string)**: The string after which terms in the index should be returned. Allows for a form of pagination if the last result from one request is passed as the search_after parameter for a subsequent request.
    * **`search_after` (Optional, string)**



## termvectors [_termvectors]

Get term vector information.

Get information and statistics about terms in the fields of a particular document.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-termvectors)

```ts
client.termvectors({ index })
```


### Arguments [_arguments_37]

* **Request (object):**

    * **`index` (string)**: Name of the index that contains the document.
    * **`id` (Optional, string)**: Unique identifier of the document.
    * **`doc` (Optional, object)**: An artificial document (a document not present in the index) for which you want to retrieve term vectors.
    * **`filter` (Optional, { max_doc_freq, max_num_terms, max_term_freq, max_word_length, min_doc_freq, min_term_freq, min_word_length })**: Filter terms based on their tf-idf scores.
    * **`per_field_analyzer` (Optional, Record<string, string>)**: Overrides the default per-field analyzer.
    * **`fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in the statistics. Used as the default list unless a specific field list is provided in the `completion_fields` or `fielddata_fields` parameters.
    * **`field_statistics` (Optional, boolean)**: If `true`, the response includes the document count, sum of document frequencies, and sum of total term frequencies.
    * **`offsets` (Optional, boolean)**: If `true`, the response includes term offsets.
    * **`payloads` (Optional, boolean)**: If `true`, the response includes term payloads.
    * **`positions` (Optional, boolean)**: If `true`, the response includes term positions.
    * **`preference` (Optional, string)**: Specifies the node or shard the operation should be performed on. Random by default.
    * **`realtime` (Optional, boolean)**: If true, the request is real-time as opposed to near-real-time.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.
    * **`term_statistics` (Optional, boolean)**: If `true`, the response includes term frequency and document frequency.
    * **`version` (Optional, number)**: If `true`, returns the document version as part of a hit.
    * **`version_type` (Optional, Enum("internal" | "external" | "external_gte" | "force"))**: Specific version type.



## update [_update]

Update a document.

Update a document by running a script or passing a partial document.

If the Elasticsearch security features are enabled, you must have the `index` or `write` index privilege for the target index or index alias.

The script can update, delete, or skip modifying the document. The API also supports passing a partial document, which is merged into the existing document. To fully replace an existing document, use the index API. This operation:

* Gets the document (collocated with the shard) from the index.
* Runs the specified script.
* Indexes the result.

The document must still be reindexed, but using this API removes some network roundtrips and reduces chances of version conflicts between the GET and the index operation.

The `_source` field must be enabled to use this API. In addition to `_source`, you can access the following variables through the `ctx` map: `_index`, `_type`, `_id`, `_version`, `_routing`, and `_now` (the current timestamp).

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-update)

```ts
client.update({ id, index })
```


### Arguments [_arguments_38]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the document to be updated.
    * **`index` (string)**: The name of the target index. By default, the index is created automatically if it doesn’t exist.
    * **`detect_noop` (Optional, boolean)**: If `true`, the `result` in the response is set to `noop` (no operation) when there are no changes to the document.
    * **`doc` (Optional, object)**: A partial update to an existing document. If both `doc` and `script` are specified, `doc` is ignored.
    * **`doc_as_upsert` (Optional, boolean)**: If `true`, use the contents of *doc* as the value of *upsert*. NOTE: Using ingest pipelines with `doc_as_upsert` is not supported.
    * **`script` (Optional, { source, id, params, lang, options })**: The script to run to update the document.
    * **`scripted_upsert` (Optional, boolean)**: If `true`, run the script whether or not the document exists.
    * **`_source` (Optional, boolean | { excludes, includes })**: If `false`, turn off source retrieval. You can also specify a list of the fields you want to retrieve.
    * **`upsert` (Optional, object)**: If the document does not already exist, the contents of *upsert* are inserted as a new document. If the document exists, the *script* is run.
    * **`if_primary_term` (Optional, number)**: Only perform the operation if the document has this primary term.
    * **`if_seq_no` (Optional, number)**: Only perform the operation if the document has this sequence number.
    * **`lang` (Optional, string)**: The script language.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If *true*, Elasticsearch refreshes the affected shards to make this operation visible to search. If *wait_for*, it waits for a refresh to make this operation visible to search. If *false*, it does nothing with refreshes.
    * **`require_alias` (Optional, boolean)**: If `true`, the destination must be an index alias.
    * **`retry_on_conflict` (Optional, number)**: The number of times the operation should be retried when a conflict occurs.
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for the following operations: dynamic mapping updates and waiting for active shards. Elasticsearch waits for at least the timeout period before failing. The actual wait time could be longer, particularly when multiple waits occur.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of copies of each shard that must be active before proceeding with the operation. Set to *all* or any positive integer up to the total number of shards in the index (`number_of_replicas`+1). The default value of `1` means it waits for each primary shard to be active.
    * **`_source_excludes` (Optional, string | string[])**: The source fields you want to exclude.
    * **`_source_includes` (Optional, string | string[])**: The source fields you want to retrieve.



## update_by_query [_update_by_query]

Update documents. Updates documents that match the specified query. If no query is specified, performs an update on every document in the data stream or index without modifying the source, which is useful for picking up mapping changes.

If the Elasticsearch security features are enabled, you must have the following index privileges for the target data stream, index, or alias:

* `read`
* `index` or `write`

You can specify the query criteria in the request URI or the request body using the same syntax as the search API.

When you submit an update by query request, Elasticsearch gets a snapshot of the data stream or index when it begins processing the request and updates matching documents using internal versioning. When the versions match, the document is updated and the version number is incremented. If a document changes between the time that the snapshot is taken and the update operation is processed, it results in a version conflict and the operation fails. You can opt to count version conflicts instead of halting and returning by setting `conflicts` to `proceed`. Note that if you opt to count version conflicts, the operation could attempt to update more documents from the source than `max_docs` until it has successfully updated `max_docs` documents or it has gone through every document in the source query.

::::{note}
Documents with a version equal to 0 cannot be updated using update by query because internal versioning does not support 0 as a valid version number.
::::


While processing an update by query request, Elasticsearch performs multiple search requests sequentially to find all of the matching documents. A bulk update request is performed for each batch of matching documents. Any query or update failures cause the update by query request to fail and the failures are shown in the response. Any update requests that completed successfully still stick, they are not rolled back.

**Throttling update requests**

To control the rate at which update by query issues batches of update operations, you can set `requests_per_second` to any positive decimal number. This pads each batch with a wait time to throttle the rate. Set `requests_per_second` to `-1` to turn off throttling.

Throttling uses a wait time between batches so that the internal scroll requests can be given a timeout that takes the request padding into account. The padding time is the difference between the batch size divided by the `requests_per_second` and the time spent writing. By default the batch size is 1000, so if `requests_per_second` is set to `500`:

```
target_time = 1000 / 500 per second = 2 seconds
wait_time = target_time - write_time = 2 seconds - .5 seconds = 1.5 seconds
```

Since the batch is issued as a single _bulk request, large batch sizes cause Elasticsearch to create many requests and wait before starting the next set. This is "bursty" instead of "smooth".

**Slicing**

Update by query supports sliced scroll to parallelize the update process. This can improve efficiency and provide a convenient way to break the request down into smaller parts.

Setting `slices` to `auto` chooses a reasonable number for most data streams and indices. This setting will use one slice per shard, up to a certain limit. If there are multiple source data streams or indices, it will choose the number of slices based on the index or backing index with the smallest number of shards.

Adding `slices` to `_update_by_query` just automates the manual process of creating sub-requests, which means it has some quirks:

* You can see these requests in the tasks APIs. These sub-requests are "child" tasks of the task for the request with slices.
* Fetching the status of the task for the request with `slices` only contains the status of completed slices.
* These sub-requests are individually addressable for things like cancellation and rethrottling.
* Rethrottling the request with `slices` will rethrottle the unfinished sub-request proportionally.
* Canceling the request with slices will cancel each sub-request.
* Due to the nature of slices each sub-request won’t get a perfectly even portion of the documents. All documents will be addressed, but some slices may be larger than others. Expect larger slices to have a more even distribution.
* Parameters like `requests_per_second` and `max_docs` on a request with slices are distributed proportionally to each sub-request. Combine that with the point above about distribution being uneven and you should conclude that using `max_docs` with `slices` might not result in exactly `max_docs` documents being updated.
* Each sub-request gets a slightly different snapshot of the source data stream or index though these are all taken at approximately the same time.

If you’re slicing manually or otherwise tuning automatic slicing, keep in mind that:

* Query performance is most efficient when the number of slices is equal to the number of shards in the index or backing index. If that number is large (for example, 500), choose a lower number as too many slices hurts performance. Setting slices higher than the number of shards generally does not improve efficiency and adds overhead.
* Update performance scales linearly across available resources with the number of slices.

Whether query or update performance dominates the runtime depends on the documents being reindexed and cluster resources.

**Update the document source**

Update by query supports scripts to update the document source. As with the update API, you can set `ctx.op` to change the operation that is performed.

Set `ctx.op = "noop"` if your script decides that it doesn’t have to make any changes. The update by query operation skips updating the document and increments the `noop` counter.

Set `ctx.op = "delete"` if your script decides that the document should be deleted. The update by query operation deletes the document and increments the `deleted` counter.

Update by query supports only `index`, `noop`, and `delete`. Setting `ctx.op` to anything else is an error. Setting any other field in `ctx` is an error. This API enables you to only modify the source of matching documents; you cannot move them.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-update-by-query)

```ts
client.updateByQuery({ index })
```


### Arguments [_arguments_39]

* **Request (object):**

    * **`index` (string | string[])**: A list of data streams, indices, and aliases to search. It supports wildcards (`*`). To search all data streams or indices, omit this parameter or use `*` or `_all`.
    * **`max_docs` (Optional, number)**: The maximum number of documents to update.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The documents to update using the Query DSL.
    * **`script` (Optional, { source, id, params, lang, options })**: The script to run to update the document source or metadata when updating.
    * **`slice` (Optional, { field, id, max })**: Slice the request manually using the provided slice ID and total number of slices.
    * **`conflicts` (Optional, Enum("abort" | "proceed"))**: The preferred behavior when update by query hits version conflicts: `abort` or `proceed`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`analyzer` (Optional, string)**: The analyzer to use for the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`analyze_wildcard` (Optional, boolean)**: If `true`, wildcard and prefix queries are analyzed. This parameter can be used only when the `q` query string parameter is specified.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for query string query: `AND` or `OR`. This parameter can be used only when the `q` query string parameter is specified.
    * **`df` (Optional, string)**: The field to use as default where no field prefix is given in the query string. This parameter can be used only when the `q` query string parameter is specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`from` (Optional, number)**: Starting offset (default: 0)
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`lenient` (Optional, boolean)**: If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored. This parameter can be used only when the `q` query string parameter is specified.
    * **`pipeline` (Optional, string)**: The ID of the pipeline to use to preprocess incoming documents. If the index has a default ingest pipeline specified, then setting the value to `_none` disables the default ingest pipeline for this request. If a final pipeline is configured it will always run, regardless of the value of this parameter.
    * **`preference` (Optional, string)**: The node or shard the operation should be performed on. It is random by default.
    * **`q` (Optional, string)**: A query in the Lucene query string syntax.
    * **`refresh` (Optional, boolean)**: If `true`, Elasticsearch refreshes affected shards to make the operation visible to search after the request completes. This is different than the update API’s `refresh` parameter, which causes just the shard that received the request to be refreshed.
    * **`request_cache` (Optional, boolean)**: If `true`, the request cache is used for this request. It defaults to the index-level setting.
    * **`requests_per_second` (Optional, float)**: The throttle for this request in sub-requests per second.
    * **`routing` (Optional, string)**: A custom value used to route operations to a specific shard.
    * **`scroll` (Optional, string | -1 | 0)**: The period to retain the search context for scrolling.
    * **`scroll_size` (Optional, number)**: The size of the scroll request that powers the operation.
    * **`search_timeout` (Optional, string | -1 | 0)**: An explicit timeout for each search request. By default, there is no timeout.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: The type of the search operation. Available options include `query_then_fetch` and `dfs_query_then_fetch`.
    * **`slices` (Optional, number | Enum("auto"))**: The number of slices this task should be divided into.
    * **`sort` (Optional, string[])**: A list of <field>:<direction> pairs.
    * **`stats` (Optional, string[])**: The specific `tag` of the request for logging and statistical purposes.
    * **`terminate_after` (Optional, number)**: The maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. IMPORTANT: Use with caution. Elasticsearch applies this parameter to each shard handling the request. When possible, let Elasticsearch perform early termination automatically. Avoid specifying this parameter for requests that target data streams with backing indices across multiple data tiers.
    * **`timeout` (Optional, string | -1 | 0)**: The period each update request waits for the following operations: dynamic mapping updates, waiting for active shards. By default, it is one minute. This guarantees Elasticsearch waits for at least the timeout before failing. The actual wait time could be longer, particularly when multiple waits occur.
    * **`version` (Optional, boolean)**: If `true`, returns the document version as part of a hit.
    * **`version_type` (Optional, boolean)**: Should the document increment the version number (internal) on hit or not (reindex)
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`). The `timeout` parameter controls how long each write request waits for unavailable shards to become available. Both work exactly the way they work in the bulk API.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks until the operation is complete. If `false`, Elasticsearch performs some preflight checks, launches the request, and returns a task ID that you can use to cancel or get the status of the task. Elasticsearch creates a record of this task as a document at `.tasks/task/${taskId}`.



## update_by_query_rethrottle [_update_by_query_rethrottle]

Throttle an update by query operation.

Change the number of requests per second for a particular update by query operation. Rethrottling that speeds up the query takes effect immediately but rethrotting that slows down the query takes effect after completing the current batch to prevent scroll timeouts.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-update-by-query)

```ts
client.updateByQueryRethrottle({ task_id })
```


### Arguments [_arguments_40]

* **Request (object):**

    * **`task_id` (string)**: The ID for the task.
    * **`requests_per_second` (Optional, float)**: The throttle for this request in sub-requests per second. To turn off throttling, set it to `-1`.



## async_search [_async_search]


### delete [_delete_2]

Delete an async search.

If the asynchronous search is still running, it is cancelled. Otherwise, the saved search results are deleted. If the Elasticsearch security features are enabled, the deletion of a specific async search is restricted to: the authenticated user that submitted the original search request; users that have the `cancel_task` cluster privilege.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit)

```ts
client.asyncSearch.delete({ id })
```


### Arguments [_arguments_41]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the async search.



### get [_get_2]

Get async search results.

Retrieve the results of a previously submitted asynchronous search request. If the Elasticsearch security features are enabled, access to the results of a specific async search is restricted to the user or API key that submitted it.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit)

```ts
client.asyncSearch.get({ id })
```


### Arguments [_arguments_42]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the async search.
    * **`keep_alive` (Optional, string | -1 | 0)**: Specifies how long the async search should be available in the cluster. When not specified, the `keep_alive` set with the corresponding submit async request will be used. Otherwise, it is possible to override the value and extend the validity of the request. When this period expires, the search, if still running, is cancelled. If the search is completed, its saved results are deleted.
    * **`typed_keys` (Optional, boolean)**: Specify whether aggregation and suggester names should be prefixed by their respective types in the response
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: Specifies to wait for the search to be completed up until the provided timeout. Final results will be returned if available before the timeout expires, otherwise the currently available results will be returned once the timeout expires. By default no timeout is set meaning that the currently available results will be returned without any additional wait.



### status [_status]

Get the async search status.

Get the status of a previously submitted async search request given its identifier, without retrieving search results. If the Elasticsearch security features are enabled, use of this API is restricted to the `monitoring_user` role.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit)

```ts
client.asyncSearch.status({ id })
```


### Arguments [_arguments_43]

* **Request (object):**

    * **`id` (string)**: A unique identifier for the async search.
    * **`keep_alive` (Optional, string | -1 | 0)**: Specifies how long the async search needs to be available. Ongoing async searches and any saved search results are deleted after this period.



### submit [_submit]

Run an async search.

When the primary sort of the results is an indexed field, shards get sorted based on minimum and maximum value that they hold for that field. Partial results become available following the sort criteria that was requested.

Warning: Asynchronous search does not support scroll or search requests that include only the suggest section.

By default, Elasticsearch does not allow you to store an async search response larger than 10Mb and an attempt to do this results in an error. The maximum allowed size for a stored async search response can be set by changing the `search.max_async_search_response_size` cluster level setting.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-async-search-submit)

```ts
client.asyncSearch.submit({ ... })
```


### Arguments [_arguments_44]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of index names to search; use `_all` or empty string to perform the operation on all indices
    * **`aggregations` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**
    * **`collapse` (Optional, { field, inner_hits, max_concurrent_group_searches, collapse })**
    * **`explain` (Optional, boolean)**: If true, returns detailed information about score computation as part of a hit.
    * **`ext` (Optional, Record<string, User-defined value>)**: Configuration of search extensions defined by Elasticsearch plugins.
    * **`from` (Optional, number)**: Starting document offset. By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the search_after parameter.
    * **`highlight` (Optional, { encoder, fields })**
    * **`track_total_hits` (Optional, boolean | number)**: Number of hits matching the query to count accurately. If true, the exact number of hits is returned at the cost of some performance. If false, the response does not include the total number of hits matching the query. Defaults to 10,000 hits.
    * **`indices_boost` (Optional, Record<string, number>[])**: Boosts the _score of documents from specified indices.
    * **`docvalue_fields` (Optional, { field, format, include_unmapped }[])**: Array of wildcard (*) patterns. The request returns doc values for field names matching these patterns in the hits.fields property of the response.
    * **`knn` (Optional, { field, query_vector, query_vector_builder, k, num_candidates, boost, filter, similarity, inner_hits, rescore_vector } | { field, query_vector, query_vector_builder, k, num_candidates, boost, filter, similarity, inner_hits, rescore_vector }[])**: Defines the approximate kNN search to run.
    * **`min_score` (Optional, number)**: Minimum _score for matching documents. Documents with a lower _score are not included in the search results.
    * **`post_filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**
    * **`profile` (Optional, boolean)**
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Defines the search definition using the Query DSL.
    * **`rescore` (Optional, { window_size, query, learning_to_rank } | { window_size, query, learning_to_rank }[])**
    * **`script_fields` (Optional, Record<string, { script, ignore_failure }>)**: Retrieve a script evaluation (based on different fields) for each hit.
    * **`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**
    * **`size` (Optional, number)**: The number of hits to return. By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the search_after parameter.
    * **`slice` (Optional, { field, id, max })**
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**
    * **`_source` (Optional, boolean | { excludes, includes })**: Indicates which source fields are returned for matching documents. These fields are returned in the hits._source property of the search response.
    * **`fields` (Optional, { field, format, include_unmapped }[])**: Array of wildcard (*) patterns. The request returns values for field names matching these patterns in the hits.fields property of the response.
    * **`suggest` (Optional, { text })**
    * **`terminate_after` (Optional, number)**: Maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. Defaults to 0, which does not terminate query execution early.
    * **`timeout` (Optional, string)**: Specifies the period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout.
    * **`track_scores` (Optional, boolean)**: If true, calculate and return document scores, even if the scores are not used for sorting.
    * **`version` (Optional, boolean)**: If true, returns document version as part of a hit.
    * **`seq_no_primary_term` (Optional, boolean)**: If true, returns sequence number and primary term of the last modification of each hit. See Optimistic concurrency control.
    * **`stored_fields` (Optional, string | string[])**: List of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the _source parameter defaults to false. You can pass _source: true to return both source fields and stored fields in the search response.
    * **`pit` (Optional, { id, keep_alive })**: Limits the search to a point in time (PIT). If you provide a PIT, you cannot specify an <index> in the request path.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Defines one or more runtime fields in the search request. These fields take precedence over mapped fields with the same name.
    * **`stats` (Optional, string[])**: Stats groups to associate with the search. Each group maintains a statistics aggregation for its associated searches. You can retrieve these stats using the indices stats API.
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: Blocks and waits until the search is completed up to a certain timeout. When the async search completes within the timeout, the response won’t include the ID as the results are not stored in the cluster.
    * **`keep_alive` (Optional, string | -1 | 0)**: Specifies how long the async search needs to be available. Ongoing async searches and any saved search results are deleted after this period.
    * **`keep_on_completion` (Optional, boolean)**: If `true`, results are stored for later retrieval when the search completes within the `wait_for_completion_timeout`.
    * **`allow_no_indices` (Optional, boolean)**: Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
    * **`allow_partial_search_results` (Optional, boolean)**: Indicate if an error should be returned if there is a partial search failure or timeout
    * **`analyzer` (Optional, string)**: The analyzer to use for the query string
    * **`analyze_wildcard` (Optional, boolean)**: Specify whether wildcard and prefix queries should be analyzed (default: false)
    * **`batched_reduce_size` (Optional, number)**: Affects how often partial results become available, which happens whenever shard results are reduced. A partial reduction is performed every time the coordinating node has received a certain number of new shard responses (5 by default).
    * **`ccs_minimize_roundtrips` (Optional, boolean)**: The default value is the only supported value.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for query string query (AND or OR)
    * **`df` (Optional, string)**: The field to use as default where no field prefix is given in the query string
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`ignore_throttled` (Optional, boolean)**: Whether specified concrete, expanded or aliased indices should be ignored when throttled
    * **`ignore_unavailable` (Optional, boolean)**: Whether specified concrete indices should be ignored when unavailable (missing or closed)
    * **`lenient` (Optional, boolean)**: Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
    * **`max_concurrent_shard_requests` (Optional, number)**: The number of concurrent shard requests per node this search executes concurrently. This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests
    * **`preference` (Optional, string)**: Specify the node or shard the operation should be performed on (default: random)
    * **`request_cache` (Optional, boolean)**: Specify if request cache should be used for this request or not, defaults to true
    * **`routing` (Optional, string)**: A list of specific routing values
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: Search operation type
    * **`suggest_field` (Optional, string)**: Specifies which field to use for suggestions.
    * **`suggest_mode` (Optional, Enum("missing" | "popular" | "always"))**: Specify suggest mode
    * **`suggest_size` (Optional, number)**: How many suggestions to return in response
    * **`suggest_text` (Optional, string)**: The source text for which the suggestions should be returned.
    * **`typed_keys` (Optional, boolean)**: Specify whether aggregation and suggester names should be prefixed by their respective types in the response
    * **`rest_total_hits_as_int` (Optional, boolean)**: Indicates whether hits.total should be rendered as an integer or an object in the rest search response
    * **`_source_excludes` (Optional, string | string[])**: A list of fields to exclude from the returned _source field
    * **`_source_includes` (Optional, string | string[])**: A list of fields to extract and return from the _source field
    * **`q` (Optional, string)**: Query in the Lucene query string syntax



## autoscaling [_autoscaling]


### delete_autoscaling_policy [_delete_autoscaling_policy]

Delete an autoscaling policy.

::::{note}
This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-autoscaling-delete-autoscaling-policy)

```ts
client.autoscaling.deleteAutoscalingPolicy({ name })
```


### Arguments [_arguments_45]

* **Request (object):**

    * **`name` (string)**: the name of the autoscaling policy
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_autoscaling_capacity [_get_autoscaling_capacity]

Get the autoscaling capacity.

::::{note}
This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


This API gets the current autoscaling capacity based on the configured autoscaling policy. It will return information to size the cluster appropriately to the current workload.

The `required_capacity` is calculated as the maximum of the `required_capacity` result of all individual deciders that are enabled for the policy.

The operator should verify that the `current_nodes` match the operator’s knowledge of the cluster to avoid making autoscaling decisions based on stale or incomplete information.

The response contains decider-specific information you can use to diagnose how and why autoscaling determined a certain capacity was required. This information is provided for diagnosis only. Do not use this information to make autoscaling decisions.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-autoscaling-get-autoscaling-capacity)

```ts
client.autoscaling.getAutoscalingCapacity({ ... })
```


### Arguments [_arguments_46]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_autoscaling_policy [_get_autoscaling_policy]

Get an autoscaling policy.

::::{note}
This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-autoscaling-get-autoscaling-capacity)

```ts
client.autoscaling.getAutoscalingPolicy({ name })
```


### Arguments [_arguments_47]

* **Request (object):**

    * **`name` (string)**: the name of the autoscaling policy
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### put_autoscaling_policy [_put_autoscaling_policy]

Create or update an autoscaling policy.

::::{note}
This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-autoscaling-put-autoscaling-policy)

```ts
client.autoscaling.putAutoscalingPolicy({ name })
```


### Arguments [_arguments_48]

* **Request (object):**

    * **`name` (string)**: the name of the autoscaling policy
    * **`policy` (Optional, { roles, deciders })**
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## cat [_cat]


### aliases [_aliases]

Get aliases.

Get the cluster’s index aliases, including filter and routing information. This API does not return data stream aliases.

::::{important}
CAT APIs are only intended for human consumption using the command line or the Kibana console. They are not intended for use by applications. For application consumption, use the aliases API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-aliases)

```ts
client.cat.aliases({ ... })
```


### Arguments [_arguments_49]

* **Request (object):**

    * **`name` (Optional, string | string[])**: A list of aliases to retrieve. Supports wildcards (`*`).  To retrieve all aliases, omit this parameter or use `*` or `_all`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. It supports a list of values, such as `open,hidden`.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicated that the request should never timeout, you can set it to `-1`.



### allocation [_allocation]

Get shard allocation information.

Get a snapshot of the number of shards allocated to each data node and their disk space.

::::{important}
CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-allocation)

```ts
client.cat.allocation({ ... })
```


### Arguments [_arguments_50]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: A list of node identifiers or names used to limit the returned information.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### component_templates [_component_templates]

Get component templates.

Get information about component templates in a cluster. Component templates are building blocks for constructing index templates that specify index mappings, settings, and aliases.

::::{important}
CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get component template API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-component-templates)

```ts
client.cat.componentTemplates({ ... })
```


### Arguments [_arguments_51]

* **Request (object):**

    * **`name` (Optional, string)**: The name of the component template. It accepts wildcard expressions. If it is omitted, all component templates are returned.
    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node.



### count [_count_2]

Get a document count.

Get quick access to a document count for a data stream, an index, or an entire cluster. The document count only includes live documents, not deleted documents which have not yet been removed by the merge process.

::::{important}
CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the count API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-count)

```ts
client.cat.count({ ... })
```


### Arguments [_arguments_52]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases used to limit the request. It supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.



### fielddata [_fielddata]

Get field data cache information.

Get the amount of heap memory currently used by the field data cache on every data node in the cluster.

::::{important}
cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes stats API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-fielddata)

```ts
client.cat.fielddata({ ... })
```


### Arguments [_arguments_53]

* **Request (object):**

    * **`fields` (Optional, string | string[])**: List of fields used to limit returned information. To retrieve all fields, omit this parameter.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.



### health [_health]

Get the cluster health status.

::::{important}
CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the cluster health API. This API is often used to check malfunctioning clusters. To help you track cluster health alongside log files and alerting systems, the API returns timestamps in two formats: `HH:MM:SS`, which is human-readable but includes no date information; `Unix epoch time`, which is machine-sortable and includes date information. The latter format is useful for cluster recoveries that take multiple days. You can use the cat health API to verify cluster health across multiple nodes. You also can use the API to track the recovery of a large cluster over a longer period of time.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-health)

```ts
client.cat.health({ ... })
```


### Arguments [_arguments_54]

* **Request (object):**

    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The unit used to display time values.
    * **`ts` (Optional, boolean)**: If true, returns `HH:MM:SS` and Unix epoch timestamps.



### help [_help]

Get CAT help.

Get help for the CAT APIs.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-cat)

```ts
client.cat.help()
```


### indices [_indices]

Get index information.

Get high-level information about indices in a cluster, including backing indices for data streams.

Use this request to get the following information for each index in a cluster: - shard count - document count - deleted document count - primary store size - total store size of all shards, including shard replicas

These metrics are retrieved directly from Lucene, which Elasticsearch uses internally to power indexing and search. As a result, all document counts include hidden nested documents. To get an accurate count of Elasticsearch documents, use the cat count or count APIs.

CAT APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use an index endpoint.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-indices)

```ts
client.cat.indices({ ... })
```


### Arguments [_arguments_55]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: The type of index that wildcard patterns can match.
    * **`health` (Optional, Enum("green" | "yellow" | "red"))**: The health status used to limit returned indices. By default, the response includes indices of any health status.
    * **`include_unloaded_segments` (Optional, boolean)**: If true, the response includes information from segments that are not loaded into memory.
    * **`pri` (Optional, boolean)**: If true, the response only includes information from primary shards.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The unit used to display time values.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### master [_master]

Get master node information.

Get information about the master node, including the ID, bound IP address, and name.

::::{important}
cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-master)

```ts
client.cat.master({ ... })
```


### Arguments [_arguments_56]

* **Request (object):**

    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### ml_data_frame_analytics [_ml_data_frame_analytics]

Get data frame analytics jobs.

Get configuration and usage information about data frame analytics jobs.

::::{important}
CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get data frame analytics jobs statistics API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-ml-data-frame-analytics)

```ts
client.cat.mlDataFrameAnalytics({ ... })
```


### Arguments [_arguments_57]

* **Request (object):**

    * **`id` (Optional, string)**: The ID of the data frame analytics to fetch
    * **`allow_no_match` (Optional, boolean)**: Whether to ignore if a wildcard expression matches no configs. (This includes `_all` string or when no configs have been specified)
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit in which to display byte values
    * **`h` (Optional, Enum("assignment_explanation" | "create_time" | "description" | "dest_index" | "failure_reason" | "id" | "model_memory_limit" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "progress" | "source_index" | "state" | "type" | "version") | Enum("assignment_explanation" | "create_time" | "description" | "dest_index" | "failure_reason" | "id" | "model_memory_limit" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "progress" | "source_index" | "state" | "type" | "version")[])**: List of column names to display.
    * **`s` (Optional, Enum("assignment_explanation" | "create_time" | "description" | "dest_index" | "failure_reason" | "id" | "model_memory_limit" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "progress" | "source_index" | "state" | "type" | "version") | Enum("assignment_explanation" | "create_time" | "description" | "dest_index" | "failure_reason" | "id" | "model_memory_limit" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "progress" | "source_index" | "state" | "type" | "version")[])**: List of column names or column aliases used to sort the response.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### ml_datafeeds [_ml_datafeeds]

Get datafeeds.

Get configuration and usage information about datafeeds. This API returns a maximum of 10,000 datafeeds. If the Elasticsearch security features are enabled, you must have `monitor_ml`, `monitor`, `manage_ml`, or `manage` cluster privileges to use this API.

::::{important}
CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get datafeed statistics API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-ml-datafeeds)

```ts
client.cat.mlDatafeeds({ ... })
```


### Arguments [_arguments_58]

* **Request (object):**

    * **`datafeed_id` (Optional, string)**: A numerical character string that uniquely identifies the datafeed.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

* Contains wildcard expressions and there are no datafeeds that match.
* Contains the `_all` string or no identifiers and there are no matches.
* Contains wildcard expressions and there are only partial matches.

If `true`, the API returns an empty datafeeds array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a 404 status code when there are no matches or only partial matches. ** *`h` (Optional, Enum("ae" | "bc" | "id" | "na" | "ne" | "ni" | "nn" | "sba" | "sc" | "seah" | "st" | "s") | Enum("ae" | "bc" | "id" | "na" | "ne" | "ni" | "nn" | "sba" | "sc" | "seah" | "st" | "s")[])**: List of column names to display. *** *`s` (Optional, Enum("ae" | "bc" | "id" | "na" | "ne" | "ni" | "nn" | "sba" | "sc" | "seah" | "st" | "s") | Enum("ae" | "bc" | "id" | "na" | "ne" | "ni" | "nn" | "sba" | "sc" | "seah" | "st" | "s")[])**: List of column names or column aliases used to sort the response. ** *`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The unit used to display time values.


### ml_jobs [_ml_jobs]

Get anomaly detection jobs.

Get configuration and usage information for anomaly detection jobs. This API returns a maximum of 10,000 jobs. If the Elasticsearch security features are enabled, you must have `monitor_ml`, `monitor`, `manage_ml`, or `manage` cluster privileges to use this API.

::::{important}
CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get anomaly detection job statistics API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-ml-jobs)

```ts
client.cat.mlJobs({ ... })
```


### Arguments [_arguments_59]

* **Request (object):**

    * **`job_id` (Optional, string)**: Identifier for the anomaly detection job.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

* Contains wildcard expressions and there are no jobs that match.
* Contains the `_all` string or no identifiers and there are no matches.
* Contains wildcard expressions and there are only partial matches.

If `true`, the API returns an empty jobs array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a 404 status code when there are no matches or only partial matches.

```json
`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb")): The unit used to display byte values. `h` (Optional, Enum("assignment_explanation" | "buckets.count" | "buckets.time.exp_avg" | "buckets.time.exp_avg_hour" | "buckets.time.max" | "buckets.time.min" | "buckets.time.total" | "data.buckets" | "data.earliest_record" | "data.empty_buckets" | "data.input_bytes" | "data.input_fields" | "data.input_records" | "data.invalid_dates" | "data.last" | "data.last_empty_bucket" | "data.last_sparse_bucket" | "data.latest_record" | "data.missing_fields" | "data.out_of_order_timestamps" | "data.processed_fields" | "data.processed_records" | "data.sparse_buckets" | "forecasts.memory.avg" | "forecasts.memory.max" | "forecasts.memory.min" | "forecasts.memory.total" | "forecasts.records.avg" | "forecasts.records.max" | "forecasts.records.min" | "forecasts.records.total" | "forecasts.time.avg" | "forecasts.time.max" | "forecasts.time.min" | "forecasts.time.total" | "forecasts.total" | "id" | "model.bucket_allocation_failures" | "model.by_fields" | "model.bytes" | "model.bytes_exceeded" | "model.categorization_status" | "model.categorized_doc_count" | "model.dead_category_count" | "model.failed_category_count" | "model.frequent_category_count" | "model.log_time" | "model.memory_limit" | "model.memory_status" | "model.over_fields" | "model.partition_fields" | "model.rare_category_count" | "model.timestamp" | "model.total_category_count" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "opened_time" | "state") | Enum("assignment_explanation" | "buckets.count" | "buckets.time.exp_avg" | "buckets.time.exp_avg_hour" | "buckets.time.max" | "buckets.time.min" | "buckets.time.total" | "data.buckets" | "data.earliest_record" | "data.empty_buckets" | "data.input_bytes" | "data.input_fields" | "data.input_records" | "data.invalid_dates" | "data.last" | "data.last_empty_bucket" | "data.last_sparse_bucket" | "data.latest_record" | "data.missing_fields" | "data.out_of_order_timestamps" | "data.processed_fields" | "data.processed_records" | "data.sparse_buckets" | "forecasts.memory.avg" | "forecasts.memory.max" | "forecasts.memory.min" | "forecasts.memory.total" | "forecasts.records.avg" | "forecasts.records.max" | "forecasts.records.min" | "forecasts.records.total" | "forecasts.time.avg" | "forecasts.time.max" | "forecasts.time.min" | "forecasts.time.total" | "forecasts.total" | "id" | "model.bucket_allocation_failures" | "model.by_fields" | "model.bytes" | "model.bytes_exceeded" | "model.categorization_status" | "model.categorized_doc_count" | "model.dead_category_count" | "model.failed_category_count" | "model.frequent_category_count" | "model.log_time" | "model.memory_limit" | "model.memory_status" | "model.over_fields" | "model.partition_fields" | "model.rare_category_count" | "model.timestamp" | "model.total_category_count" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "opened_time" | "state")[]): List of column names to display. `s` (Optional, Enum("assignment_explanation" | "buckets.count" | "buckets.time.exp_avg" | "buckets.time.exp_avg_hour" | "buckets.time.max" | "buckets.time.min" | "buckets.time.total" | "data.buckets" | "data.earliest_record" | "data.empty_buckets" | "data.input_bytes" | "data.input_fields" | "data.input_records" | "data.invalid_dates" | "data.last" | "data.last_empty_bucket" | "data.last_sparse_bucket" | "data.latest_record" | "data.missing_fields" | "data.out_of_order_timestamps" | "data.processed_fields" | "data.processed_records" | "data.sparse_buckets" | "forecasts.memory.avg" | "forecasts.memory.max" | "forecasts.memory.min" | "forecasts.memory.total" | "forecasts.records.avg" | "forecasts.records.max" | "forecasts.records.min" | "forecasts.records.total" | "forecasts.time.avg" | "forecasts.time.max" | "forecasts.time.min" | "forecasts.time.total" | "forecasts.total" | "id" | "model.bucket_allocation_failures" | "model.by_fields" | "model.bytes" | "model.bytes_exceeded" | "model.categorization_status" | "model.categorized_doc_count" | "model.dead_category_count" | "model.failed_category_count" | "model.frequent_category_count" | "model.log_time" | "model.memory_limit" | "model.memory_status" | "model.over_fields" | "model.partition_fields" | "model.rare_category_count" | "model.timestamp" | "model.total_category_count" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "opened_time" | "state") | Enum("assignment_explanation" | "buckets.count" | "buckets.time.exp_avg" | "buckets.time.exp_avg_hour" | "buckets.time.max" | "buckets.time.min" | "buckets.time.total" | "data.buckets" | "data.earliest_record" | "data.empty_buckets" | "data.input_bytes" | "data.input_fields" | "data.input_records" | "data.invalid_dates" | "data.last" | "data.last_empty_bucket" | "data.last_sparse_bucket" | "data.latest_record" | "data.missing_fields" | "data.out_of_order_timestamps" | "data.processed_fields" | "data.processed_records" | "data.sparse_buckets" | "forecasts.memory.avg" | "forecasts.memory.max" | "forecasts.memory.min" | "forecasts.memory.total" | "forecasts.records.avg" | "forecasts.records.max" | "forecasts.records.min" | "forecasts.records.total" | "forecasts.time.avg" | "forecasts.time.max" | "forecasts.time.min" | "forecasts.time.total" | "forecasts.total" | "id" | "model.bucket_allocation_failures" | "model.by_fields" | "model.bytes" | "model.bytes_exceeded" | "model.categorization_status" | "model.categorized_doc_count" | "model.dead_category_count" | "model.failed_category_count" | "model.frequent_category_count" | "model.log_time" | "model.memory_limit" | "model.memory_status" | "model.over_fields" | "model.partition_fields" | "model.rare_category_count" | "model.timestamp" | "model.total_category_count" | "node.address" | "node.ephemeral_id" | "node.id" | "node.name" | "opened_time" | "state")[]): List of column names or column aliases used to sort the response. `time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d")): The unit used to display time values.
```

### ml_trained_models [_ml_trained_models]

Get trained models.

Get configuration and usage information about inference trained models.

::::{important}
CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get trained models statistics API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-ml-trained-models)

```ts
client.cat.mlTrainedModels({ ... })
```


### Arguments [_arguments_60]

* **Request (object):**

    * **`model_id` (Optional, string)**: A unique identifier for the trained model.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request: contains wildcard expressions and there are no models that match; contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there are only partial matches. If `true`, the API returns an empty array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a 404 status code when there are no matches or only partial matches.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`h` (Optional, Enum("create_time" | "created_by" | "data_frame_analytics_id" | "description" | "heap_size" | "id" | "ingest.count" | "ingest.current" | "ingest.failed" | "ingest.pipelines" | "ingest.time" | "license" | "operations" | "version") | Enum("create_time" | "created_by" | "data_frame_analytics_id" | "description" | "heap_size" | "id" | "ingest.count" | "ingest.current" | "ingest.failed" | "ingest.pipelines" | "ingest.time" | "license" | "operations" | "version")[])**: A list of column names to display.
    * **`s` (Optional, Enum("create_time" | "created_by" | "data_frame_analytics_id" | "description" | "heap_size" | "id" | "ingest.count" | "ingest.current" | "ingest.failed" | "ingest.pipelines" | "ingest.time" | "license" | "operations" | "version") | Enum("create_time" | "created_by" | "data_frame_analytics_id" | "description" | "heap_size" | "id" | "ingest.count" | "ingest.current" | "ingest.failed" | "ingest.pipelines" | "ingest.time" | "license" | "operations" | "version")[])**: A list of column names or aliases used to sort the response.
    * **`from` (Optional, number)**: Skips the specified number of transforms.
    * **`size` (Optional, number)**: The maximum number of transforms to display.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### nodeattrs [_nodeattrs]

Get node attribute information.

Get information about custom node attributes. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-nodeattrs)

```ts
client.cat.nodeattrs({ ... })
```


### Arguments [_arguments_61]

* **Request (object):**

    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### nodes [_nodes]

Get node information.

Get information about the nodes in a cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-nodes)

```ts
client.cat.nodes({ ... })
```


### Arguments [_arguments_62]

* **Request (object):**

    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`full_id` (Optional, boolean | string)**: If `true`, return the full node ID. If `false`, return the shortened node ID.
    * **`include_unloaded_segments` (Optional, boolean)**: If true, the response includes information from segments that are not loaded into memory.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### pending_tasks [_pending_tasks]

Get pending task information.

Get information about cluster-level changes that have not yet taken effect. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the pending cluster tasks API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-pending-tasks)

```ts
client.cat.pendingTasks({ ... })
```


### Arguments [_arguments_63]

* **Request (object):**

    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### plugins [_plugins]

Get plugin information.

Get a list of plugins running on each node of a cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-plugins)

```ts
client.cat.plugins({ ... })
```


### Arguments [_arguments_64]

* **Request (object):**

    * **`include_bootstrap` (Optional, boolean)**: Include bootstrap plugins in the response
    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### recovery [_recovery]

Get shard recovery information.

Get information about ongoing and completed shard recoveries. Shard recovery is the process of initializing a shard copy, such as restoring a primary shard from a snapshot or syncing a replica shard from a primary shard. When a shard recovery completes, the recovered shard is available for search and indexing. For data streams, the API returns information about the stream’s backing indices. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the index recovery API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-recovery)

```ts
client.cat.recovery({ ... })
```


### Arguments [_arguments_65]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`active_only` (Optional, boolean)**: If `true`, the response only includes ongoing shard recoveries.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`detailed` (Optional, boolean)**: If `true`, the response includes detailed information about shard recoveries.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### repositories [_repositories]

Get snapshot repository information.

Get a list of snapshot repositories for a cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get snapshot repository API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-repositories)

```ts
client.cat.repositories({ ... })
```


### Arguments [_arguments_66]

* **Request (object):**

    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### segments [_segments]

Get segment information.

Get low-level information about the Lucene segments in index shards. For data streams, the API returns information about the backing indices. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the index segments API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-segments)

```ts
client.cat.segments({ ... })
```


### Arguments [_arguments_67]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### shards [_shards]

Get shard information.

Get information about the shards in a cluster. For data streams, the API returns information about the backing indices. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-shards)

```ts
client.cat.shards({ ... })
```


### Arguments [_arguments_68]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`bytes` (Optional, Enum("b" | "kb" | "mb" | "gb" | "tb" | "pb"))**: The unit used to display byte values.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### snapshots [_snapshots]

Get snapshot information.

Get information about the snapshots stored in one or more repositories. A snapshot is a backup of an index or running Elasticsearch cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get snapshot API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-snapshots)

```ts
client.cat.snapshots({ ... })
```


### Arguments [_arguments_69]

* **Request (object):**

    * **`repository` (Optional, string | string[])**: A list of snapshot repositories used to limit the request. Accepts wildcard expressions. `_all` returns all repositories. If any repository fails during the request, Elasticsearch returns an error.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, the response does not include information from unavailable snapshots.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.



### tasks [_tasks]

Get task information.

Get information about tasks currently running in the cluster. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the task management API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-tasks)

```ts
client.cat.tasks({ ... })
```


### Arguments [_arguments_70]

* **Request (object):**

    * **`actions` (Optional, string[])**: The task action names, which are used to limit the response.
    * **`detailed` (Optional, boolean)**: If `true`, the response includes detailed information about shard recoveries.
    * **`nodes` (Optional, string[])**: Unique node identifiers, which are used to limit the response.
    * **`parent_task_id` (Optional, string)**: The parent task identifier, which is used to limit the response.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Unit used to display time values.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks until the task has completed.



### templates [_templates]

Get index template information.

Get information about the index templates in a cluster. You can use index templates to apply index settings and field mappings to new indices at creation. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the get index template API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-templates)

```ts
client.cat.templates({ ... })
```


### Arguments [_arguments_71]

* **Request (object):**

    * **`name` (Optional, string)**: The name of the template to return. Accepts wildcard expressions. If omitted, all templates are returned.
    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### thread_pool [_thread_pool]

Get thread pool statistics.

Get thread pool statistics for each node in a cluster. Returned information includes all built-in thread pools and custom thread pools. IMPORTANT: cat APIs are only intended for human consumption using the command line or Kibana console. They are not intended for use by applications. For application consumption, use the nodes info API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-thread-pool)

```ts
client.cat.threadPool({ ... })
```


### Arguments [_arguments_72]

* **Request (object):**

    * **`thread_pool_patterns` (Optional, string | string[])**: A list of thread pool names used to limit the request. Accepts wildcard expressions.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The unit used to display time values.
    * **`local` (Optional, boolean)**: If `true`, the request computes the list of selected nodes from the local cluster state. If `false` the list of selected nodes are computed from the cluster state of the master node. In both cases the coordinating node will send requests for further information to each selected node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### transforms [_transforms]

Get transform information.

Get configuration and usage information about transforms.

CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get transform statistics API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-transforms)

```ts
client.cat.transforms({ ... })
```


### Arguments [_arguments_73]

* **Request (object):**

    * **`transform_id` (Optional, string)**: A transform identifier or a wildcard expression. If you do not specify one of these options, the API returns information for all transforms.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request: contains wildcard expressions and there are no transforms that match; contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there are only partial matches. If `true`, it returns an empty transforms array when there are no matches and the subset of results when there are partial matches. If `false`, the request returns a 404 status code when there are no matches or only partial matches.
    * **`from` (Optional, number)**: Skips the specified number of transforms.
    * **`h` (Optional, Enum("changes_last_detection_time" | "checkpoint" | "checkpoint_duration_time_exp_avg" | "checkpoint_progress" | "create_time" | "delete_time" | "description" | "dest_index" | "documents_deleted" | "documents_indexed" | "docs_per_second" | "documents_processed" | "frequency" | "id" | "index_failure" | "index_time" | "index_total" | "indexed_documents_exp_avg" | "last_search_time" | "max_page_search_size" | "pages_processed" | "pipeline" | "processed_documents_exp_avg" | "processing_time" | "reason" | "search_failure" | "search_time" | "search_total" | "source_index" | "state" | "transform_type" | "trigger_count" | "version") | Enum("changes_last_detection_time" | "checkpoint" | "checkpoint_duration_time_exp_avg" | "checkpoint_progress" | "create_time" | "delete_time" | "description" | "dest_index" | "documents_deleted" | "documents_indexed" | "docs_per_second" | "documents_processed" | "frequency" | "id" | "index_failure" | "index_time" | "index_total" | "indexed_documents_exp_avg" | "last_search_time" | "max_page_search_size" | "pages_processed" | "pipeline" | "processed_documents_exp_avg" | "processing_time" | "reason" | "search_failure" | "search_time" | "search_total" | "source_index" | "state" | "transform_type" | "trigger_count" | "version")[])**: List of column names to display.
    * **`s` (Optional, Enum("changes_last_detection_time" | "checkpoint" | "checkpoint_duration_time_exp_avg" | "checkpoint_progress" | "create_time" | "delete_time" | "description" | "dest_index" | "documents_deleted" | "documents_indexed" | "docs_per_second" | "documents_processed" | "frequency" | "id" | "index_failure" | "index_time" | "index_total" | "indexed_documents_exp_avg" | "last_search_time" | "max_page_search_size" | "pages_processed" | "pipeline" | "processed_documents_exp_avg" | "processing_time" | "reason" | "search_failure" | "search_time" | "search_total" | "source_index" | "state" | "transform_type" | "trigger_count" | "version") | Enum("changes_last_detection_time" | "checkpoint" | "checkpoint_duration_time_exp_avg" | "checkpoint_progress" | "create_time" | "delete_time" | "description" | "dest_index" | "documents_deleted" | "documents_indexed" | "docs_per_second" | "documents_processed" | "frequency" | "id" | "index_failure" | "index_time" | "index_total" | "indexed_documents_exp_avg" | "last_search_time" | "max_page_search_size" | "pages_processed" | "pipeline" | "processed_documents_exp_avg" | "processing_time" | "reason" | "search_failure" | "search_time" | "search_total" | "source_index" | "state" | "transform_type" | "trigger_count" | "version")[])**: List of column names or column aliases used to sort the response.
    * **`time` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The unit used to display time values.
    * **`size` (Optional, number)**: The maximum number of transforms to obtain.



## ccr [_ccr]


### delete_auto_follow_pattern [_delete_auto_follow_pattern]

Delete auto-follow patterns. Delete a collection of cross-cluster replication auto-follow patterns.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-delete-auto-follow-pattern)

```ts
client.ccr.deleteAutoFollowPattern({ name })
```


### Arguments [_arguments_74]

* **Request (object):**

    * **`name` (string)**: The name of the auto follow pattern.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### follow [_follow]

Create a follower. Create a cross-cluster replication follower index that follows a specific leader index. When the API returns, the follower index exists and cross-cluster replication starts replicating operations from the leader index to the follower index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-follow)

```ts
client.ccr.follow({ index, leader_index, remote_cluster })
```


### Arguments [_arguments_75]

* **Request (object):**

    * **`index` (string)**: The name of the follower index.
    * **`leader_index` (string)**: The name of the index in the leader cluster to follow.
    * **`remote_cluster` (string)**: The remote cluster containing the leader index.
    * **`data_stream_name` (Optional, string)**: If the leader index is part of a data stream, the name to which the local data stream for the followed index should be renamed.
    * **`max_outstanding_read_requests` (Optional, number)**: The maximum number of outstanding reads requests from the remote cluster.
    * **`max_outstanding_write_requests` (Optional, number)**: The maximum number of outstanding write requests on the follower.
    * **`max_read_request_operation_count` (Optional, number)**: The maximum number of operations to pull per read from the remote cluster.
    * **`max_read_request_size` (Optional, number | string)**: The maximum size in bytes of per read of a batch of operations pulled from the remote cluster.
    * **`max_retry_delay` (Optional, string | -1 | 0)**: The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying.
    * **`max_write_buffer_count` (Optional, number)**: The maximum number of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the number of queued operations goes below the limit.
    * **`max_write_buffer_size` (Optional, number | string)**: The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the total bytes of queued operations goes below the limit.
    * **`max_write_request_operation_count` (Optional, number)**: The maximum number of operations per bulk write request executed on the follower.
    * **`max_write_request_size` (Optional, number | string)**: The maximum total bytes of operations per bulk write request executed on the follower.
    * **`read_poll_timeout` (Optional, string | -1 | 0)**: The maximum time to wait for new operations on the remote cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again.
    * **`settings` (Optional, { index, mode, routing_path, soft_deletes, sort, number_of_shards, number_of_replicas, number_of_routing_shards, check_on_startup, codec, routing_partition_size, load_fixed_bitset_filters_eagerly, hidden, auto_expand_replicas, merge, search, refresh_interval, max_result_window, max_inner_result_window, max_rescore_window, max_docvalue_fields_search, max_script_fields, max_ngram_diff, max_shingle_diff, blocks, max_refresh_listeners, analyze, highlight, max_terms_count, max_regex_length, routing, gc_deletes, default_pipeline, final_pipeline, lifecycle, provided_name, creation_date, creation_date_string, uuid, version, verified_before_close, format, max_slices_per_scroll, translog, query_string, priority, top_metrics_max_size, analysis, settings, time_series, queries, similarity, mapping, indexing.slowlog, indexing_pressure, store })**: Settings to override from the leader index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: Specifies the number of shards to wait on being active before responding. This defaults to waiting on none of the shards to be active. A shard must be restored from the leader index before being active. Restoring a follower shard requires transferring all the remote Lucene segment files to the follower index.



### follow_info [_follow_info]

Get follower information. Get information about all cross-cluster replication follower indices. For example, the results include follower index names, leader index names, replication options, and whether the follower indices are active or paused.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-follow-info)

```ts
client.ccr.followInfo({ index })
```


### Arguments [_arguments_76]

* **Request (object):**

    * **`index` (string | string[])**: A list of index patterns; use `_all` to perform the operation on all indices
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### follow_stats [_follow_stats]

Get follower stats. Get cross-cluster replication follower stats. The API returns shard-level stats about the "following tasks" associated with each shard for the specified indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-follow-stats)

```ts
client.ccr.followStats({ index })
```


### Arguments [_arguments_77]

* **Request (object):**

    * **`index` (string | string[])**: A list of index patterns; use `_all` to perform the operation on all indices
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### forget_follower [_forget_follower]

Forget a follower. Remove the cross-cluster replication follower retention leases from the leader.

A following index takes out retention leases on its leader index. These leases are used to increase the likelihood that the shards of the leader index retain the history of operations that the shards of the following index need to run replication. When a follower index is converted to a regular index by the unfollow API (either by directly calling the API or by index lifecycle management tasks), these leases are removed. However, removal of the leases can fail, for example when the remote cluster containing the leader index is unavailable. While the leases will eventually expire on their own, their extended existence can cause the leader index to hold more history than necessary and prevent index lifecycle management from performing some operations on the leader index. This API exists to enable manually removing the leases when the unfollow API is unable to do so.

::::{note}
This API does not stop replication by a following index. If you use this API with a follower index that is still actively following, the following index will add back retention leases on the leader. The only purpose of this API is to handle the case of failure to remove the following retention leases after the unfollow API is invoked.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-forget-follower)

```ts
client.ccr.forgetFollower({ index })
```


### Arguments [_arguments_78]

* **Request (object):**

    * **`index` (string)**: the name of the leader index for which specified follower retention leases should be removed
    * **`follower_cluster` (Optional, string)**
    * **`follower_index` (Optional, string)**
    * **`follower_index_uuid` (Optional, string)**
    * **`leader_remote_cluster` (Optional, string)**
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_auto_follow_pattern [_get_auto_follow_pattern]

Get auto-follow patterns. Get cross-cluster replication auto-follow patterns.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-get-auto-follow-pattern-1)

```ts
client.ccr.getAutoFollowPattern({ ... })
```


### Arguments [_arguments_79]

* **Request (object):**

    * **`name` (Optional, string)**: Specifies the auto-follow pattern collection that you want to retrieve. If you do not specify a name, the API returns information for all collections.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### pause_auto_follow_pattern [_pause_auto_follow_pattern]

Pause an auto-follow pattern. Pause a cross-cluster replication auto-follow pattern. When the API returns, the auto-follow pattern is inactive. New indices that are created on the remote cluster and match the auto-follow patterns are ignored.

You can resume auto-following with the resume auto-follow pattern API. When it resumes, the auto-follow pattern is active again and automatically configures follower indices for newly created indices on the remote cluster that match its patterns. Remote indices that were created while the pattern was paused will also be followed, unless they have been deleted or closed in the interim.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-pause-auto-follow-pattern)

```ts
client.ccr.pauseAutoFollowPattern({ name })
```


### Arguments [_arguments_80]

* **Request (object):**

    * **`name` (string)**: The name of the auto follow pattern that should pause discovering new indices to follow.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### pause_follow [_pause_follow]

Pause a follower. Pause a cross-cluster replication follower index. The follower index will not fetch any additional operations from the leader index. You can resume following with the resume follower API. You can pause and resume a follower index to change the configuration of the following task.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-pause-follow)

```ts
client.ccr.pauseFollow({ index })
```


### Arguments [_arguments_81]

* **Request (object):**

    * **`index` (string)**: The name of the follower index that should pause following its leader index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### put_auto_follow_pattern [_put_auto_follow_pattern]

Create or update auto-follow patterns. Create a collection of cross-cluster replication auto-follow patterns for a remote cluster. Newly created indices on the remote cluster that match any of the patterns are automatically configured as follower indices. Indices on the remote cluster that were created before the auto-follow pattern was created will not be auto-followed even if they match the pattern.

This API can also be used to update auto-follow patterns. NOTE: Follower indices that were configured automatically before updating an auto-follow pattern will remain unchanged even if they do not match against the new patterns.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-put-auto-follow-pattern)

```ts
client.ccr.putAutoFollowPattern({ name, remote_cluster })
```


### Arguments [_arguments_82]

* **Request (object):**

    * **`name` (string)**: The name of the collection of auto-follow patterns.
    * **`remote_cluster` (string)**: The remote cluster containing the leader indices to match against.
    * **`follow_index_pattern` (Optional, string)**: The name of follower index. The template `{{leader_index}}` can be used to derive the name of the follower index from the name of the leader index. When following a data stream, use `{{leader_index}}`; CCR does not support changes to the names of a follower data stream’s backing indices.
    * **`leader_index_patterns` (Optional, string[])**: An array of simple index patterns to match against indices in the remote cluster specified by the remote_cluster field.
    * **`leader_index_exclusion_patterns` (Optional, string[])**: An array of simple index patterns that can be used to exclude indices from being auto-followed. Indices in the remote cluster whose names are matching one or more leader_index_patterns and one or more leader_index_exclusion_patterns won’t be followed.
    * **`max_outstanding_read_requests` (Optional, number)**: The maximum number of outstanding reads requests from the remote cluster.
    * **`settings` (Optional, Record<string, User-defined value>)**: Settings to override from the leader index. Note that certain settings can not be overrode (e.g., index.number_of_shards).
    * **`max_outstanding_write_requests` (Optional, number)**: The maximum number of outstanding reads requests from the remote cluster.
    * **`read_poll_timeout` (Optional, string | -1 | 0)**: The maximum time to wait for new operations on the remote cluster when the follower index is synchronized with the leader index. When the timeout has elapsed, the poll for operations will return to the follower so that it can update some statistics. Then the follower will immediately attempt to read from the leader again.
    * **`max_read_request_operation_count` (Optional, number)**: The maximum number of operations to pull per read from the remote cluster.
    * **`max_read_request_size` (Optional, number | string)**: The maximum size in bytes of per read of a batch of operations pulled from the remote cluster.
    * **`max_retry_delay` (Optional, string | -1 | 0)**: The maximum time to wait before retrying an operation that failed exceptionally. An exponential backoff strategy is employed when retrying.
    * **`max_write_buffer_count` (Optional, number)**: The maximum number of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the number of queued operations goes below the limit.
    * **`max_write_buffer_size` (Optional, number | string)**: The maximum total bytes of operations that can be queued for writing. When this limit is reached, reads from the remote cluster will be deferred until the total bytes of queued operations goes below the limit.
    * **`max_write_request_operation_count` (Optional, number)**: The maximum number of operations per bulk write request executed on the follower.
    * **`max_write_request_size` (Optional, number | string)**: The maximum total bytes of operations per bulk write request executed on the follower.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### resume_auto_follow_pattern [_resume_auto_follow_pattern]

Resume an auto-follow pattern. Resume a cross-cluster replication auto-follow pattern that was paused. The auto-follow pattern will resume configuring following indices for newly created indices that match its patterns on the remote cluster. Remote indices created while the pattern was paused will also be followed unless they have been deleted or closed in the interim.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-resume-auto-follow-pattern)

```ts
client.ccr.resumeAutoFollowPattern({ name })
```


### Arguments [_arguments_83]

* **Request (object):**

    * **`name` (string)**: The name of the auto follow pattern to resume discovering new indices to follow.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### resume_follow [_resume_follow]

Resume a follower. Resume a cross-cluster replication follower index that was paused. The follower index could have been paused with the pause follower API. Alternatively it could be paused due to replication that cannot be retried due to failures during following tasks. When this API returns, the follower index will resume fetching operations from the leader index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-resume-follow)

```ts
client.ccr.resumeFollow({ index })
```


### Arguments [_arguments_84]

* **Request (object):**

    * **`index` (string)**: The name of the follow index to resume following.
    * **`max_outstanding_read_requests` (Optional, number)**
    * **`max_outstanding_write_requests` (Optional, number)**
    * **`max_read_request_operation_count` (Optional, number)**
    * **`max_read_request_size` (Optional, string)**
    * **`max_retry_delay` (Optional, string | -1 | 0)**
    * **`max_write_buffer_count` (Optional, number)**
    * **`max_write_buffer_size` (Optional, string)**
    * **`max_write_request_operation_count` (Optional, number)**
    * **`max_write_request_size` (Optional, string)**
    * **`read_poll_timeout` (Optional, string | -1 | 0)**
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### stats [_stats]

Get cross-cluster replication stats. This API returns stats about auto-following and the same shard-level stats as the get follower stats API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-stats)

```ts
client.ccr.stats({ ... })
```


### Arguments [_arguments_85]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### unfollow [_unfollow]

Unfollow an index. Convert a cross-cluster replication follower index to a regular index. The API stops the following task associated with a follower index and removes index metadata and settings associated with cross-cluster replication. The follower index must be paused and closed before you call the unfollow API.

::::{note}
Currently cross-cluster replication does not support converting an existing regular index to a follower index. Converting a follower index to a regular index is an irreversible operation.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ccr-unfollow)

```ts
client.ccr.unfollow({ index })
```


### Arguments [_arguments_86]

* **Request (object):**

    * **`index` (string)**: The name of the follower index that should be turned into a regular index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



## cluster [_cluster]


### allocation_explain [_allocation_explain]

Explain the shard allocations. Get explanations for shard allocations in the cluster. For unassigned shards, it provides an explanation for why the shard is unassigned. For assigned shards, it provides an explanation for why the shard is remaining on its current node and has not moved or rebalanced to another node. This API can be very useful when attempting to diagnose why a shard is unassigned or why a shard continues to remain on its current node when you might expect otherwise.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-allocation-explain)

```ts
client.cluster.allocationExplain({ ... })
```


### Arguments [_arguments_87]

* **Request (object):**

    * **`current_node` (Optional, string)**: Specifies the node ID or the name of the node to only explain a shard that is currently located on the specified node.
    * **`index` (Optional, string)**: Specifies the name of the index that you would like an explanation for.
    * **`primary` (Optional, boolean)**: If true, returns explanation for the primary shard for the given shard ID.
    * **`shard` (Optional, number)**: Specifies the ID of the shard that you would like an explanation for.
    * **`include_disk_info` (Optional, boolean)**: If true, returns information about disk usage and shard sizes.
    * **`include_yes_decisions` (Optional, boolean)**: If true, returns YES decisions in explanation.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### delete_component_template [_delete_component_template]

Delete component templates. Component templates are building blocks for constructing index templates that specify index mappings, settings, and aliases.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-put-component-template)

```ts
client.cluster.deleteComponentTemplate({ name })
```


### Arguments [_arguments_88]

* **Request (object):**

    * **`name` (string | string[])**: List or wildcard expression of component template names used to limit the request.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### delete_voting_config_exclusions [_delete_voting_config_exclusions]

Clear cluster voting config exclusions. Remove master-eligible nodes from the voting configuration exclusion list.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-post-voting-config-exclusions)

```ts
client.cluster.deleteVotingConfigExclusions({ ... })
```


### Arguments [_arguments_89]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`wait_for_removal` (Optional, boolean)**: Specifies whether to wait for all excluded nodes to be removed from the cluster before clearing the voting configuration exclusions list. Defaults to true, meaning that all excluded nodes must be removed from the cluster before this API takes any action. If set to false then the voting configuration exclusions list is cleared even if some excluded nodes are still in the cluster.



### exists_component_template [_exists_component_template]

Check component templates. Returns information about whether a particular component template exists.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-put-component-template)

```ts
client.cluster.existsComponentTemplate({ name })
```


### Arguments [_arguments_90]

* **Request (object):**

    * **`name` (string | string[])**: List of component template names used to limit the request. Wildcard (*) expressions are supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`local` (Optional, boolean)**: If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node.



### get_component_template [_get_component_template]

Get component templates. Get information about component templates.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-put-component-template)

```ts
client.cluster.getComponentTemplate({ ... })
```


### Arguments [_arguments_91]

* **Request (object):**

    * **`name` (Optional, string)**: List of component template names used to limit the request. Wildcard (`*`) expressions are supported.
    * **`flat_settings` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`include_defaults` (Optional, boolean)**: Return all default configurations for the component template (default: false)
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only. If `false`, information is retrieved from the master node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_settings [_get_settings]

Get cluster-wide settings. By default, it returns only settings that have been explicitly defined.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-get-settings)

```ts
client.cluster.getSettings({ ... })
```


### Arguments [_arguments_92]

* **Request (object):**

    * **`flat_settings` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`include_defaults` (Optional, boolean)**: If `true`, returns default cluster settings from the local node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### health [_health_2]

Get the cluster health status. You can also use the API to get the health status of only specified data streams and indices. For data streams, the API retrieves the health status of the stream’s backing indices.

The cluster health status is: green, yellow or red. On the shard level, a red status indicates that the specific shard is not allocated in the cluster. Yellow means that the primary shard is allocated but replicas are not. Green means that all shards are allocated. The index level status is controlled by the worst shard status.

One of the main benefits of the API is the ability to wait until the cluster reaches a certain high watermark health level. The cluster status is controlled by the worst index status.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-health)

```ts
client.cluster.health({ ... })
```


### Arguments [_arguments_93]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and index aliases used to limit the request. Wildcard expressions (`*`) are supported. To target all data streams and indices in a cluster, omit this parameter or use _all or `*`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`level` (Optional, Enum("cluster" | "indices" | "shards"))**: Can be one of cluster, indices or shards. Controls the details level of the health information returned.
    * **`local` (Optional, boolean)**: If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: A number controlling to how many active shards to wait for, all to wait for all shards in the cluster to be active, or 0 to not wait.
    * **`wait_for_events` (Optional, Enum("immediate" | "urgent" | "high" | "normal" | "low" | "languid"))**: Can be one of immediate, urgent, high, normal, low, languid. Wait until all currently queued events with the given priority are processed.
    * **`wait_for_nodes` (Optional, string | number)**: The request waits until the specified number N of nodes is available. It also accepts >=N, ⇐N, >N and <N. Alternatively, it is possible to use ge(N), le(N), gt(N) and lt(N) notation.
    * **`wait_for_no_initializing_shards` (Optional, boolean)**: A boolean value which controls whether to wait (until the timeout provided) for the cluster to have no shard initializations. Defaults to false, which means it will not wait for initializing shards.
    * **`wait_for_no_relocating_shards` (Optional, boolean)**: A boolean value which controls whether to wait (until the timeout provided) for the cluster to have no shard relocations. Defaults to false, which means it will not wait for relocating shards.
    * **`wait_for_status` (Optional, Enum("green" | "yellow" | "red"))**: One of green, yellow or red. Will wait (until the timeout provided) until the status of the cluster changes to the one provided or better, i.e. green > yellow > red. By default, will not wait for any status.



### info [_info_2]

Get cluster info. Returns basic information about the cluster.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-info)

```ts
client.cluster.info({ target })
```


### Arguments [_arguments_94]

* **Request (object):**

    * **`target` (Enum("_all" | "http" | "ingest" | "thread_pool" | "script") | Enum("_all" | "http" | "ingest" | "thread_pool" | "script")[])**: Limits the information returned to the specific target. Supports a list, such as http,ingest.



### pending_tasks [_pending_tasks_2]

Get the pending cluster tasks. Get information about cluster-level changes (such as create index, update mapping, allocate or fail shard) that have not yet taken effect.

::::{note}
This API returns a list of any pending updates to the cluster state. These are distinct from the tasks reported by the task management API which include periodic tasks and tasks initiated by the user, such as node stats, search queries, or create index requests. However, if a user-initiated task such as a create index command causes a cluster state update, the activity of this task might be reported by both task api and pending cluster tasks API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-pending-tasks)

```ts
client.cluster.pendingTasks({ ... })
```


### Arguments [_arguments_95]

* **Request (object):**

    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only. If `false`, information is retrieved from the master node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### post_voting_config_exclusions [_post_voting_config_exclusions]

Update voting configuration exclusions. Update the cluster voting config exclusions by node IDs or node names. By default, if there are more than three master-eligible nodes in the cluster and you remove fewer than half of the master-eligible nodes in the cluster at once, the voting configuration automatically shrinks. If you want to shrink the voting configuration to contain fewer than three nodes or to remove half or more of the master-eligible nodes in the cluster at once, use this API to remove departing nodes from the voting configuration manually. The API adds an entry for each specified node to the cluster’s voting configuration exclusions list. It then waits until the cluster has reconfigured its voting configuration to exclude the specified nodes.

Clusters should have no voting configuration exclusions in normal operation. Once the excluded nodes have stopped, clear the voting configuration exclusions with `DELETE /_cluster/voting_config_exclusions`. This API waits for the nodes to be fully removed from the cluster before it returns. If your cluster has voting configuration exclusions for nodes that you no longer intend to remove, use `DELETE /_cluster/voting_config_exclusions?wait_for_removal=false` to clear the voting configuration exclusions without waiting for the nodes to leave the cluster.

A response to `POST /_cluster/voting_config_exclusions` with an HTTP status code of 200 OK guarantees that the node has been removed from the voting configuration and will not be reinstated until the voting configuration exclusions are cleared by calling `DELETE /_cluster/voting_config_exclusions`. If the call to `POST /_cluster/voting_config_exclusions` fails or returns a response with an HTTP status code other than 200 OK then the node may not have been removed from the voting configuration. In that case, you may safely retry the call.

::::{note}
Voting exclusions are required only when you remove at least half of the master-eligible nodes from a cluster in a short time period. They are not required when removing master-ineligible nodes or when removing fewer than half of the master-eligible nodes.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-post-voting-config-exclusions)

```ts
client.cluster.postVotingConfigExclusions({ ... })
```


### Arguments [_arguments_96]

* **Request (object):**

    * **`node_names` (Optional, string | string[])**: A list of the names of the nodes to exclude from the voting configuration. If specified, you may not also specify node_ids.
    * **`node_ids` (Optional, string | string[])**: A list of the persistent ids of the nodes to exclude from the voting configuration. If specified, you may not also specify node_names.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`timeout` (Optional, string | -1 | 0)**: When adding a voting configuration exclusion, the API waits for the specified nodes to be excluded from the voting configuration before returning. If the timeout expires before the appropriate condition is satisfied, the request fails and returns an error.



### put_component_template [_put_component_template]

Create or update a component template. Component templates are building blocks for constructing index templates that specify index mappings, settings, and aliases.

An index template can be composed of multiple component templates. To use a component template, specify it in an index template’s `composed_of` list. Component templates are only applied to new data streams and indices as part of a matching index template.

Settings and mappings specified directly in the index template or the create index request override any settings or mappings specified in a component template.

Component templates are only used during index creation. For data streams, this includes data stream creation and the creation of a stream’s backing indices. Changes to component templates do not affect existing indices, including a stream’s backing indices.

You can use C-style `/* *\/` block comments in component templates. You can include comments anywhere in the request body except before the opening curly bracket.

**Applying component templates**

You cannot directly apply a component template to a data stream or index. To be applied, a component template must be included in an index template’s `composed_of` list.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-put-component-template)

```ts
client.cluster.putComponentTemplate({ name, template })
```


### Arguments [_arguments_97]

* **Request (object):**

    * **`name` (string)**: Name of the component template to create. Elasticsearch includes the following built-in component templates: `logs-mappings`; `logs-settings`; `metrics-mappings`; `metrics-settings`;`synthetics-mapping`; `synthetics-settings`. Elastic Agent uses these templates to configure backing indices for its data streams. If you use Elastic Agent and want to overwrite one of these templates, set the `version` for your replacement template higher than the current version. If you don’t use Elastic Agent and want to disable all built-in component and index templates, set `stack.templates.enabled` to `false` using the cluster update settings API.
    * **`template` ({ aliases, mappings, settings, defaults, data_stream, lifecycle })**: The template to be applied which includes mappings, settings, or aliases configuration.
    * **`version` (Optional, number)**: Version number used to manage component templates externally. This number isn’t automatically generated or incremented by Elasticsearch. To unset a version, replace the template without specifying a version.
    * **`_meta` (Optional, Record<string, User-defined value>)**: Optional user metadata about the component template. It may have any contents. This map is not automatically generated by Elasticsearch. This information is stored in the cluster state, so keeping it short is preferable. To unset `_meta`, replace the template without specifying this information.
    * **`deprecated` (Optional, boolean)**: Marks this index template as deprecated. When creating or updating a non-deprecated index template that uses deprecated components, Elasticsearch will emit a deprecation warning.
    * **`create` (Optional, boolean)**: If `true`, this request cannot replace or update existing component templates.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### put_settings [_put_settings]

Update the cluster settings. Configure and update dynamic settings on a running cluster. You can also configure dynamic settings locally on an unstarted or shut down node in `elasticsearch.yml`.

Updates made with this API can be persistent, which apply across cluster restarts, or transient, which reset after a cluster restart. You can also reset transient or persistent settings by assigning them a null value.

If you configure the same setting using multiple methods, Elasticsearch applies the settings in following order of precedence: 1) Transient setting; 2) Persistent setting; 3) `elasticsearch.yml` setting; 4) Default setting value. For example, you can apply a transient setting to override a persistent setting or `elasticsearch.yml` setting. However, a change to an `elasticsearch.yml` setting will not override a defined transient or persistent setting.

::::{tip}
In Elastic Cloud, use the user settings feature to configure all cluster settings. This method automatically rejects unsafe settings that could break your cluster. If you run Elasticsearch on your own hardware, use this API to configure dynamic cluster settings. Only use `elasticsearch.yml` for static cluster settings and node settings. The API doesn’t require a restart and ensures a setting’s value is the same on all nodes.
::::


::::{warning}
Transient cluster settings are no longer recommended. Use persistent cluster settings instead. If a cluster becomes unstable, transient settings can clear unexpectedly, resulting in a potentially undesired cluster configuration.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-put-settings)

```ts
client.cluster.putSettings({ ... })
```


### Arguments [_arguments_98]

* **Request (object):**

    * **`persistent` (Optional, Record<string, User-defined value>)**
    * **`transient` (Optional, Record<string, User-defined value>)**
    * **`flat_settings` (Optional, boolean)**: Return settings in flat format (default: false)
    * **`master_timeout` (Optional, string | -1 | 0)**: Explicit operation timeout for connection to master node
    * **`timeout` (Optional, string | -1 | 0)**: Explicit operation timeout



### remote_info [_remote_info]

Get remote cluster information. Get all of the configured remote cluster information. This API returns connection and endpoint information keyed by the configured remote cluster alias.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-remote-info)

```ts
client.cluster.remoteInfo()
```


### reroute [_reroute]

Reroute the cluster. Manually change the allocation of individual shards in the cluster. For example, a shard can be moved from one node to another explicitly, an allocation can be canceled, and an unassigned shard can be explicitly allocated to a specific node.

It is important to note that after processing any reroute commands Elasticsearch will perform rebalancing as normal (respecting the values of settings such as `cluster.routing.rebalance.enable`) in order to remain in a balanced state. For example, if the requested allocation includes moving a shard from node1 to node2 then this may cause a shard to be moved from node2 back to node1 to even things out.

The cluster can be set to disable allocations using the `cluster.routing.allocation.enable` setting. If allocations are disabled then the only allocations that will be performed are explicit ones given using the reroute command, and consequent allocations due to rebalancing.

The cluster will attempt to allocate a shard a maximum of `index.allocation.max_retries` times in a row (defaults to `5`), before giving up and leaving the shard unallocated. This scenario can be caused by structural problems such as having an analyzer which refers to a stopwords file which doesn’t exist on all nodes.

Once the problem has been corrected, allocation can be manually retried by calling the reroute API with the `?retry_failed` URI query parameter, which will attempt a single retry round for these shards.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-reroute)

```ts
client.cluster.reroute({ ... })
```


### Arguments [_arguments_99]

* **Request (object):**

    * **`commands` (Optional, { cancel, move, allocate_replica, allocate_stale_primary, allocate_empty_primary }[])**: Defines the commands to perform.
    * **`dry_run` (Optional, boolean)**: If true, then the request simulates the operation. It will calculate the result of applying the commands to the current cluster state and return the resulting cluster state after the commands (and rebalancing) have been applied; it will not actually perform the requested changes.
    * **`explain` (Optional, boolean)**: If true, then the response contains an explanation of why the commands can or cannot run.
    * **`metric` (Optional, string | string[])**: Limits the information returned to the specified metrics.
    * **`retry_failed` (Optional, boolean)**: If true, then retries allocation of shards that are blocked due to too many subsequent allocation failures.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### state [_state]

Get the cluster state. Get comprehensive information about the state of the cluster.

The cluster state is an internal data structure which keeps track of a variety of information needed by every node, including the identity and attributes of the other nodes in the cluster; cluster-wide settings; index metadata, including the mapping and settings for each index; the location and status of every shard copy in the cluster.

The elected master node ensures that every node in the cluster has a copy of the same cluster state. This API lets you retrieve a representation of this internal state for debugging or diagnostic purposes. You may need to consult the Elasticsearch source code to determine the precise meaning of the response.

By default the API will route requests to the elected master node since this node is the authoritative source of cluster states. You can also retrieve the cluster state held on the node handling the API request by adding the `?local=true` query parameter.

Elasticsearch may need to expend significant effort to compute a response to this API in larger clusters, and the response may comprise a very large quantity of data. If you use this API repeatedly, your cluster may become unstable.

::::{warning}
The response is a representation of an internal data structure. Its format is not subject to the same compatibility guarantees as other more stable APIs and may change from version to version. Do not query this API using external monitoring tools. Instead, obtain the information you require using other more stable cluster APIs.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-state)

```ts
client.cluster.state({ ... })
```


### Arguments [_arguments_100]

* **Request (object):**

    * **`metric` (Optional, string | string[])**: Limit the information returned to the specified metrics
    * **`index` (Optional, string | string[])**: A list of index names; use `_all` or empty string to perform the operation on all indices
    * **`allow_no_indices` (Optional, boolean)**: Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`flat_settings` (Optional, boolean)**: Return settings in flat format (default: false)
    * **`ignore_unavailable` (Optional, boolean)**: Whether specified concrete indices should be ignored when unavailable (missing or closed)
    * **`local` (Optional, boolean)**: Return local information, do not retrieve the state from master node (default: false)
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master
    * **`wait_for_metadata_version` (Optional, number)**: Wait for the metadata version to be equal or greater than the specified metadata version
    * **`wait_for_timeout` (Optional, string | -1 | 0)**: The maximum time to wait for wait_for_metadata_version before timing out



### stats [_stats_2]

Get cluster statistics. Get basic index metrics (shard numbers, store size, memory usage) and information about the current nodes that form the cluster (number, roles, os, jvm versions, memory usage, cpu and installed plugins).

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cluster-stats)

```ts
client.cluster.stats({ ... })
```


### Arguments [_arguments_101]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: List of node filters used to limit returned information. Defaults to all nodes in the cluster.
    * **`include_remotes` (Optional, boolean)**: Include remote cluster data into the response
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for each node to respond. If a node does not respond before its timeout expires, the response does not include its stats. However, timed out nodes are included in the response’s `_nodes.failed` property. Defaults to no timeout.



## connector [_connector]


### check_in [_check_in]

Check in a connector.

Update the `last_seen` field in the connector and set it to the current timestamp.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-check-in)

```ts
client.connector.checkIn({ connector_id })
```


### Arguments [_arguments_102]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be checked in



### delete [_delete_3]

Delete a connector.

Removes a connector and associated sync jobs. This is a destructive action that is not recoverable. NOTE: This action doesn’t delete any API keys, ingest pipelines, or data indices associated with the connector. These need to be removed manually.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-delete)

```ts
client.connector.delete({ connector_id })
```


### Arguments [_arguments_103]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be deleted
    * **`delete_sync_jobs` (Optional, boolean)**: A flag indicating if associated sync jobs should be also removed. Defaults to false.
    * **`hard` (Optional, boolean)**: A flag indicating if the connector should be hard deleted.



### get [_get_3]

Get a connector.

Get the details about a connector.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-get)

```ts
client.connector.get({ connector_id })
```


### Arguments [_arguments_104]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector
    * **`include_deleted` (Optional, boolean)**: A flag to indicate if the desired connector should be fetched, even if it was soft-deleted.



### list [_list]

Get all connectors.

Get information about all connectors.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-list)

```ts
client.connector.list({ ... })
```


### Arguments [_arguments_105]

* **Request (object):**

    * **`from` (Optional, number)**: Starting offset (default: 0)
    * **`size` (Optional, number)**: Specifies a max number of results to get
    * **`index_name` (Optional, string | string[])**: A list of connector index names to fetch connector documents for
    * **`connector_name` (Optional, string | string[])**: A list of connector names to fetch connector documents for
    * **`service_type` (Optional, string | string[])**: A list of connector service types to fetch connector documents for
    * **`include_deleted` (Optional, boolean)**: A flag to indicate if the desired connector should be fetched, even if it was soft-deleted.
    * **`query` (Optional, string)**: A wildcard query string that filters connectors with matching name, description or index name



### post [_post]

Create a connector.

Connectors are Elasticsearch integrations that bring content from third-party data sources, which can be deployed on Elastic Cloud or hosted on your own infrastructure. Elastic managed connectors (Native connectors) are a managed service on Elastic Cloud. Self-managed connectors (Connector clients) are self-managed on your infrastructure.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-put)

```ts
client.connector.post({ ... })
```


### Arguments [_arguments_106]

* **Request (object):**

    * **`description` (Optional, string)**
    * **`index_name` (Optional, string)**
    * **`is_native` (Optional, boolean)**
    * **`language` (Optional, string)**
    * **`name` (Optional, string)**
    * **`service_type` (Optional, string)**



### put [_put]

Create or update a connector.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-put)

```ts
client.connector.put({ ... })
```


### Arguments [_arguments_107]

* **Request (object):**

    * **`connector_id` (Optional, string)**: The unique identifier of the connector to be created or updated. ID is auto-generated if not provided.
    * **`description` (Optional, string)**
    * **`index_name` (Optional, string)**
    * **`is_native` (Optional, boolean)**
    * **`language` (Optional, string)**
    * **`name` (Optional, string)**
    * **`service_type` (Optional, string)**



### sync_job_cancel [_sync_job_cancel]

Cancel a connector sync job.

Cancel a connector sync job, which sets the status to cancelling and updates `cancellation_requested_at` to the current time. The connector service is then responsible for setting the status of connector sync jobs to cancelled.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-cancel)

```ts
client.connector.syncJobCancel({ connector_sync_job_id })
```


### Arguments [_arguments_108]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier of the connector sync job



### sync_job_check_in [_sync_job_check_in]

Check in a connector sync job. Check in a connector sync job and set the `last_seen` field to the current time before updating it in the internal index.

To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-check-in)

```ts
client.connector.syncJobCheckIn({ connector_sync_job_id })
```


### Arguments [_arguments_109]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier of the connector sync job to be checked in.



### sync_job_claim [_sync_job_claim]

Claim a connector sync job. This action updates the job status to `in_progress` and sets the `last_seen` and `started_at` timestamps to the current time. Additionally, it can set the `sync_cursor` property for the sync job.

This API is not intended for direct connector management by users. It supports the implementation of services that utilize the connector protocol to communicate with Elasticsearch.

To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

```ts
client.connector.syncJobClaim({ connector_sync_job_id, worker_hostname })
```


### Arguments [_arguments_110]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier of the connector sync job.
    * **`worker_hostname` (string)**: The host name of the current system that will run the job.
    * **`sync_cursor` (Optional, User-defined value)**: The cursor object from the last incremental sync job. This should reference the `sync_cursor` field in the connector state for which the job runs.



### sync_job_delete [_sync_job_delete]

Delete a connector sync job.

Remove a connector sync job and its associated data. This is a destructive action that is not recoverable.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-delete)

```ts
client.connector.syncJobDelete({ connector_sync_job_id })
```


### Arguments [_arguments_111]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier of the connector sync job to be deleted



### sync_job_error [_sync_job_error]

Set a connector sync job error. Set the `error` field for a connector sync job and set its `status` to `error`.

To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-error)

```ts
client.connector.syncJobError({ connector_sync_job_id, error })
```


### Arguments [_arguments_112]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier for the connector sync job.
    * **`error` (string)**: The error for the connector sync job error field.



### sync_job_get [_sync_job_get]

Get a connector sync job.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-get)

```ts
client.connector.syncJobGet({ connector_sync_job_id })
```


### Arguments [_arguments_113]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier of the connector sync job



### sync_job_list [_sync_job_list]

Get all connector sync jobs.

Get information about all stored connector sync jobs listed by their creation date in ascending order.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-list)

```ts
client.connector.syncJobList({ ... })
```


### Arguments [_arguments_114]

* **Request (object):**

    * **`from` (Optional, number)**: Starting offset (default: 0)
    * **`size` (Optional, number)**: Specifies a max number of results to get
    * **`status` (Optional, Enum("canceling" | "canceled" | "completed" | "error" | "in_progress" | "pending" | "suspended"))**: A sync job status to fetch connector sync jobs for
    * **`connector_id` (Optional, string)**: A connector id to fetch connector sync jobs for
    * **`job_type` (Optional, Enum("full" | "incremental" | "access_control") | Enum("full" | "incremental" | "access_control")[])**: A list of job types to fetch the sync jobs for



### sync_job_post [_sync_job_post]

Create a connector sync job.

Create a connector sync job document in the internal index and initialize its counters and timestamps with default values.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-post)

```ts
client.connector.syncJobPost({ id })
```


### Arguments [_arguments_115]

* **Request (object):**

    * **`id` (string)**: The id of the associated connector
    * **`job_type` (Optional, Enum("full" | "incremental" | "access_control"))**
    * **`trigger_method` (Optional, Enum("on_demand" | "scheduled"))**



### sync_job_update_stats [_sync_job_update_stats]

Set the connector sync job stats. Stats include: `deleted_document_count`, `indexed_document_count`, `indexed_document_volume`, and `total_document_count`. You can also update `last_seen`. This API is mainly used by the connector service for updating sync job information.

To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-sync-job-update-stats)

```ts
client.connector.syncJobUpdateStats({ connector_sync_job_id, deleted_document_count, indexed_document_count, indexed_document_volume })
```


### Arguments [_arguments_116]

* **Request (object):**

    * **`connector_sync_job_id` (string)**: The unique identifier of the connector sync job.
    * **`deleted_document_count` (number)**: The number of documents the sync job deleted.
    * **`indexed_document_count` (number)**: The number of documents the sync job indexed.
    * **`indexed_document_volume` (number)**: The total size of the data (in MiB) the sync job indexed.
    * **`last_seen` (Optional, string | -1 | 0)**: The timestamp to use in the `last_seen` property for the connector sync job.
    * **`metadata` (Optional, Record<string, User-defined value>)**: The connector-specific metadata.
    * **`total_document_count` (Optional, number)**: The total number of documents in the target index after the sync job finished.



### update_active_filtering [_update_active_filtering]

Activate the connector draft filter.

Activates the valid draft filtering for a connector.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-filtering)

```ts
client.connector.updateActiveFiltering({ connector_id })
```


### Arguments [_arguments_117]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated



### update_api_key_id [_update_api_key_id]

Update the connector API key ID.

Update the `api_key_id` and `api_key_secret_id` fields of a connector. You can specify the ID of the API key used for authorization and the ID of the connector secret where the API key is stored. The connector secret ID is required only for Elastic managed (native) connectors. Self-managed connectors (connector clients) do not use this field.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-api-key-id)

```ts
client.connector.updateApiKeyId({ connector_id })
```


### Arguments [_arguments_118]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`api_key_id` (Optional, string)**
    * **`api_key_secret_id` (Optional, string)**



### update_configuration [_update_configuration]

Update the connector configuration.

Update the configuration field in the connector document.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-configuration)

```ts
client.connector.updateConfiguration({ connector_id })
```


### Arguments [_arguments_119]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`configuration` (Optional, Record<string, { category, default_value, depends_on, display, label, options, order, placeholder, required, sensitive, tooltip, type, ui_restrictions, validations, value }>)**
    * **`values` (Optional, Record<string, User-defined value>)**



### update_error [_update_error]

Update the connector error field.

Set the error field for the connector. If the error provided in the request body is non-null, the connector’s status is updated to error. Otherwise, if the error is reset to null, the connector status is updated to connected.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-error)

```ts
client.connector.updateError({ connector_id, error })
```


### Arguments [_arguments_120]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`error` (T | null)**



### update_features [_update_features]

Update the connector features. Update the connector features in the connector document. This API can be used to control the following aspects of a connector:

* document-level security
* incremental syncs
* advanced sync rules
* basic sync rules

Normally, the running connector service automatically manages these features. However, you can use this API to override the default behavior.

To sync data using self-managed connectors, you need to deploy the Elastic connector service on your own infrastructure. This service runs automatically on Elastic Cloud for Elastic managed connectors.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-features)

```ts
client.connector.updateFeatures({ connector_id, features })
```


### Arguments [_arguments_121]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated.
    * **`features` ({ document_level_security, incremental_sync, native_connector_api_keys, sync_rules })**



### update_filtering [_update_filtering]

Update the connector filtering.

Update the draft filtering configuration of a connector and marks the draft validation state as edited. The filtering draft is activated once validated by the running Elastic connector service. The filtering property is used to configure sync rules (both basic and advanced) for a connector.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-filtering)

```ts
client.connector.updateFiltering({ connector_id })
```


### Arguments [_arguments_122]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`filtering` (Optional, { active, domain, draft }[])**
    * **`rules` (Optional, { created_at, field, id, order, policy, rule, updated_at, value }[])**
    * **`advanced_snippet` (Optional, { created_at, updated_at, value })**



### update_filtering_validation [_update_filtering_validation]

Update the connector draft filtering validation.

Update the draft filtering validation info for a connector.

```ts
client.connector.updateFilteringValidation({ connector_id, validation })
```


### Arguments [_arguments_123]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`validation` ({ errors, state })**



### update_index_name [_update_index_name]

Update the connector index name.

Update the `index_name` field of a connector, specifying the index where the data ingested by the connector is stored.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-index-name)

```ts
client.connector.updateIndexName({ connector_id, index_name })
```


### Arguments [_arguments_124]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`index_name` (T | null)**



### update_name [_update_name]

Update the connector name and description.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-name)

```ts
client.connector.updateName({ connector_id })
```


### Arguments [_arguments_125]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`name` (Optional, string)**
    * **`description` (Optional, string)**



### update_native [_update_native]

Update the connector is_native flag.

```ts
client.connector.updateNative({ connector_id, is_native })
```


### Arguments [_arguments_126]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`is_native` (boolean)**



### update_pipeline [_update_pipeline]

Update the connector pipeline.

When you create a new connector, the configuration of an ingest pipeline is populated with default settings.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-pipeline)

```ts
client.connector.updatePipeline({ connector_id, pipeline })
```


### Arguments [_arguments_127]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`pipeline` ({ extract_binary_content, name, reduce_whitespace, run_ml_inference })**



### update_scheduling [_update_scheduling]

Update the connector scheduling.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-scheduling)

```ts
client.connector.updateScheduling({ connector_id, scheduling })
```


### Arguments [_arguments_128]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`scheduling` ({ access_control, full, incremental })**



### update_service_type [_update_service_type]

Update the connector service type.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-service-type)

```ts
client.connector.updateServiceType({ connector_id, service_type })
```


### Arguments [_arguments_129]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`service_type` (string)**



### update_status [_update_status]

Update the connector status.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-connector-update-status)

```ts
client.connector.updateStatus({ connector_id, status })
```


### Arguments [_arguments_130]

* **Request (object):**

    * **`connector_id` (string)**: The unique identifier of the connector to be updated
    * **`status` (Enum("created" | "needs_configuration" | "configured" | "connected" | "error"))**



## dangling_indices [_dangling_indices]


### delete_dangling_index [_delete_dangling_index]

Delete a dangling index. If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-dangling-indices-delete-dangling-index)

```ts
client.danglingIndices.deleteDanglingIndex({ index_uuid, accept_data_loss })
```


### Arguments [_arguments_131]

* **Request (object):**

    * **`index_uuid` (string)**: The UUID of the index to delete. Use the get dangling indices API to find the UUID.
    * **`accept_data_loss` (boolean)**: This parameter must be set to true to acknowledge that it will no longer be possible to recove data from the dangling index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master
    * **`timeout` (Optional, string | -1 | 0)**: Explicit operation timeout



### import_dangling_index [_import_dangling_index]

Import a dangling index.

If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-dangling-indices-import-dangling-index)

```ts
client.danglingIndices.importDanglingIndex({ index_uuid, accept_data_loss })
```


### Arguments [_arguments_132]

* **Request (object):**

    * **`index_uuid` (string)**: The UUID of the index to import. Use the get dangling indices API to locate the UUID.
    * **`accept_data_loss` (boolean)**: This parameter must be set to true to import a dangling index. Because Elasticsearch cannot know where the dangling index data came from or determine which shard copies are fresh and which are stale, it cannot guarantee that the imported data represents the latest state of the index when it was last in the cluster.
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master
    * **`timeout` (Optional, string | -1 | 0)**: Explicit operation timeout



### list_dangling_indices [_list_dangling_indices]

Get the dangling indices.

If Elasticsearch encounters index data that is absent from the current cluster state, those indices are considered to be dangling. For example, this can happen if you delete more than `cluster.indices.tombstones.size` indices while an Elasticsearch node is offline.

Use this API to list dangling indices, which you can then import or delete.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-dangling-indices-list-dangling-indices)

```ts
client.danglingIndices.listDanglingIndices()
```


## enrich [_enrich]


### delete_policy [_delete_policy]

Delete an enrich policy. Deletes an existing enrich policy and its enrich index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-delete-policy)

```ts
client.enrich.deletePolicy({ name })
```


### Arguments [_arguments_133]

* **Request (object):**

    * **`name` (string)**: Enrich policy to delete.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### execute_policy [_execute_policy]

Run an enrich policy. Create the enrich index for an existing enrich policy.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-execute-policy)

```ts
client.enrich.executePolicy({ name })
```


### Arguments [_arguments_134]

* **Request (object):**

    * **`name` (string)**: Enrich policy to execute.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks other enrich policy execution requests until complete.



### get_policy [_get_policy]

Get an enrich policy. Returns information about an enrich policy.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-get-policy)

```ts
client.enrich.getPolicy({ ... })
```


### Arguments [_arguments_135]

* **Request (object):**

    * **`name` (Optional, string | string[])**: List of enrich policy names used to limit the request. To return information for all enrich policies, omit this parameter.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### put_policy [_put_policy]

Create an enrich policy. Creates an enrich policy.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-put-policy)

```ts
client.enrich.putPolicy({ name })
```


### Arguments [_arguments_136]

* **Request (object):**

    * **`name` (string)**: Name of the enrich policy to create or update.
    * **`geo_match` (Optional, { enrich_fields, indices, match_field, query, name, elasticsearch_version })**: Matches enrich data to incoming documents based on a `geo_shape` query.
    * **`match` (Optional, { enrich_fields, indices, match_field, query, name, elasticsearch_version })**: Matches enrich data to incoming documents based on a `term` query.
    * **`range` (Optional, { enrich_fields, indices, match_field, query, name, elasticsearch_version })**: Matches a number, date, or IP address in incoming documents to a range in the enrich index based on a `term` query.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### stats [_stats_3]

Get enrich stats. Returns enrich coordinator statistics and information about enrich policies that are currently executing.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-enrich-stats)

```ts
client.enrich.stats({ ... })
```


### Arguments [_arguments_137]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



## eql [_eql]


### delete [_delete_4]

Delete an async EQL search. Delete an async EQL search or a stored synchronous EQL search. The API also deletes results for the search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-eql-search)

```ts
client.eql.delete({ id })
```


### Arguments [_arguments_138]

* **Request (object):**

    * **`id` (string)**: Identifier for the search to delete. A search ID is provided in the EQL search API’s response for an async search. A search ID is also provided if the request’s `keep_on_completion` parameter is `true`.



### get [_get_4]

Get async EQL search results. Get the current status and available results for an async EQL search or a stored synchronous EQL search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-eql-get)

```ts
client.eql.get({ id })
```


### Arguments [_arguments_139]

* **Request (object):**

    * **`id` (string)**: Identifier for the search.
    * **`keep_alive` (Optional, string | -1 | 0)**: Period for which the search and its results are stored on the cluster. Defaults to the keep_alive value set by the search’s EQL search API request.
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: Timeout duration to wait for the request to finish. Defaults to no timeout, meaning the request waits for complete search results.



### get_status [_get_status]

Get the async EQL status. Get the current status for an async EQL search or a stored synchronous EQL search without returning results.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-eql-get-status)

```ts
client.eql.getStatus({ id })
```


### Arguments [_arguments_140]

* **Request (object):**

    * **`id` (string)**: Identifier for the search.



### search [_search_2]

Get EQL search results. Returns search results for an Event Query Language (EQL) query. EQL assumes each document in a data stream or index corresponds to an event.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-eql-search)

```ts
client.eql.search({ index, query })
```


### Arguments [_arguments_141]

* **Request (object):**

    * **`index` (string | string[])**: The name of the index to scope the operation
    * **`query` (string)**: EQL query you wish to run.
    * **`case_sensitive` (Optional, boolean)**
    * **`event_category_field` (Optional, string)**: Field containing the event classification, such as process, file, or network.
    * **`tiebreaker_field` (Optional, string)**: Field used to sort hits with the same timestamp in ascending order
    * **`timestamp_field` (Optional, string)**: Field containing event timestamp. Default "@timestamp"
    * **`fetch_size` (Optional, number)**: Maximum number of events to search at a time for sequence queries.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type } | { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type }[])**: Query, written in Query DSL, used to filter the events on which the EQL query runs.
    * **`keep_alive` (Optional, string | -1 | 0)**
    * **`keep_on_completion` (Optional, boolean)**
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**
    * **`allow_partial_search_results` (Optional, boolean)**
    * **`allow_partial_sequence_results` (Optional, boolean)**
    * **`size` (Optional, number)**: For basic queries, the maximum number of matching events to return. Defaults to 10
    * **`fields` (Optional, { field, format, include_unmapped } | { field, format, include_unmapped }[])**: Array of wildcard (*) patterns. The response returns values for field names matching these patterns in the fields property of each hit.
    * **`result_position` (Optional, Enum("tail" | "head"))**
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**
    * **`max_samples_per_key` (Optional, number)**: By default, the response of a sample query contains up to `10` samples, with one sample per unique set of join keys. Use the `size` parameter to get a smaller or larger set of samples. To retrieve more than one sample per set of join keys, use the `max_samples_per_key` parameter. Pipes are not supported for sample queries.
    * **`allow_no_indices` (Optional, boolean)**
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**
    * **`ignore_unavailable` (Optional, boolean)**: If true, missing or closed indices are not included in the response.



## esql [_esql]


### async_query [_async_query]

Run an async ES|QL query. Asynchronously run an ES|QL (Elasticsearch query language) query, monitor its progress, and retrieve results when they become available.

The API accepts the same parameters and request body as the synchronous query API, along with additional async related properties.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-esql-async-query)

```ts
client.esql.asyncQuery({ query })
```


### Arguments [_arguments_142]

* **Request (object):**

    * **`query` (string)**: The ES|QL query API accepts an ES|QL query string in the query parameter, runs it, and returns the results.
    * **`columnar` (Optional, boolean)**: By default, ES|QL returns results as rows. For example, FROM returns each individual document as one row. For the JSON, YAML, CBOR and smile formats, ES|QL can return the results in a columnar fashion where one row represents all the values of a certain column in the results.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Specify a Query DSL query in the filter parameter to filter the set of documents that an ES|QL query runs on.
    * **`locale` (Optional, string)**
    * **`params` (Optional, number | number | string | boolean | null | User-defined value[])**: To avoid any attempts of hacking or code injection, extract the values in a separate list of parameters. Use question mark placeholders (?) in the query string for each of the parameters.
    * **`profile` (Optional, boolean)**: If provided and `true` the response will include an extra `profile` object with information on how the query was executed. This information is for human debugging and its format can change at any time but it can give some insight into the performance of each part of the query.
    * **`tables` (Optional, Record<string, Record<string, { integer, keyword, long, double }>>)**: Tables to use with the LOOKUP operation. The top level key is the table name and the next level key is the column name.
    * **`delimiter` (Optional, string)**: The character to use between values within a CSV row. It is valid only for the CSV format.
    * **`drop_null_columns` (Optional, boolean)**: Indicates whether columns that are entirely `null` will be removed from the `columns` and `values` portion of the results. If `true`, the response will include an extra section under the name `all_columns` which has the name of all the columns.
    * **`format` (Optional, Enum("csv" | "json" | "tsv" | "txt" | "yaml" | "cbor" | "smile" | "arrow"))**: A short version of the Accept header, for example `json` or `yaml`.
    * **`keep_alive` (Optional, string | -1 | 0)**: The period for which the query and its results are stored in the cluster. The default period is five days. When this period expires, the query and its results are deleted, even if the query is still ongoing. If the `keep_on_completion` parameter is false, Elasticsearch only stores async queries that do not complete within the period set by the `wait_for_completion_timeout` parameter, regardless of this value.
    * **`keep_on_completion` (Optional, boolean)**: Indicates whether the query and its results are stored in the cluster. If false, the query and its results are stored in the cluster only if the request does not complete during the period set by the `wait_for_completion_timeout` parameter.
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: The period to wait for the request to finish. By default, the request waits for 1 second for the query results. If the query completes during this period, results are returned Otherwise, a query ID is returned that can later be used to retrieve the results.



### async_query_delete [_async_query_delete]

Delete an async ES|QL query. If the query is still running, it is cancelled. Otherwise, the stored results are deleted.

If the Elasticsearch security features are enabled, only the following users can use this API to delete a query:

* The authenticated user that submitted the original query request
* Users with the `cancel_task` cluster privilege

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-esql-async-query-delete)

```ts
client.esql.asyncQueryDelete({ id })
```


### Arguments [_arguments_143]

* **Request (object):**

    * **`id` (string)**: The unique identifier of the query. A query ID is provided in the ES|QL async query API response for a query that does not complete in the designated time. A query ID is also provided when the request was submitted with the `keep_on_completion` parameter set to `true`.



### async_query_get [_async_query_get]

Get async ES|QL query results. Get the current status and available results or stored results for an ES|QL asynchronous query. If the Elasticsearch security features are enabled, only the user who first submitted the ES|QL query can retrieve the results using this API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-esql-async-query-get)

```ts
client.esql.asyncQueryGet({ id })
```


### Arguments [_arguments_144]

* **Request (object):**

    * **`id` (string)**: The unique identifier of the query. A query ID is provided in the ES|QL async query API response for a query that does not complete in the designated time. A query ID is also provided when the request was submitted with the `keep_on_completion` parameter set to `true`.
    * **`drop_null_columns` (Optional, boolean)**: Indicates whether columns that are entirely `null` will be removed from the `columns` and `values` portion of the results. If `true`, the response will include an extra section under the name `all_columns` which has the name of all the columns.
    * **`keep_alive` (Optional, string | -1 | 0)**: The period for which the query and its results are stored in the cluster. When this period expires, the query and its results are deleted, even if the query is still ongoing.
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: The period to wait for the request to finish. By default, the request waits for complete query results. If the request completes during the period specified in this parameter, complete query results are returned. Otherwise, the response returns an `is_running` value of `true` and no results.



### query [_query]

Run an ES|QL query. Get search results for an ES|QL (Elasticsearch query language) query.

[Endpoint documentation](docs-content://explore-analyze/query-filter/languages/esql-rest.md)

```ts
client.esql.query({ query })
```


### Arguments [_arguments_145]

* **Request (object):**

    * **`query` (string)**: The ES|QL query API accepts an ES|QL query string in the query parameter, runs it, and returns the results.
    * **`columnar` (Optional, boolean)**: By default, ES|QL returns results as rows. For example, FROM returns each individual document as one row. For the JSON, YAML, CBOR and smile formats, ES|QL can return the results in a columnar fashion where one row represents all the values of a certain column in the results.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Specify a Query DSL query in the filter parameter to filter the set of documents that an ES|QL query runs on.
    * **`locale` (Optional, string)**
    * **`params` (Optional, number | number | string | boolean | null | User-defined value[])**: To avoid any attempts of hacking or code injection, extract the values in a separate list of parameters. Use question mark placeholders (?) in the query string for each of the parameters.
    * **`profile` (Optional, boolean)**: If provided and `true` the response will include an extra `profile` object with information on how the query was executed. This information is for human debugging and its format can change at any time but it can give some insight into the performance of each part of the query.
    * **`tables` (Optional, Record<string, Record<string, { integer, keyword, long, double }>>)**: Tables to use with the LOOKUP operation. The top level key is the table name and the next level key is the column name.
    * **`format` (Optional, Enum("csv" | "json" | "tsv" | "txt" | "yaml" | "cbor" | "smile" | "arrow"))**: A short version of the Accept header, e.g. json, yaml.
    * **`delimiter` (Optional, string)**: The character to use between values within a CSV row. Only valid for the CSV format.
    * **`drop_null_columns` (Optional, boolean)**: Should columns that are entirely `null` be removed from the `columns` and `values` portion of the results? Defaults to `false`. If `true` then the response will include an extra section under the name `all_columns` which has the name of all columns.



## features [_features_17]


### get_features [_get_features]

Get the features. Get a list of features that can be included in snapshots using the `feature_states` field when creating a snapshot. You can use this API to determine which feature states to include when taking a snapshot. By default, all feature states are included in a snapshot if that snapshot includes the global state, or none if it does not.

A feature state includes one or more system indices necessary for a given feature to function. In order to ensure data integrity, all system indices that comprise a feature state are snapshotted and restored together.

The features listed by this API are a combination of built-in features and features defined by plugins. In order for a feature state to be listed in this API and recognized as a valid feature state by the create snapshot API, the plugin that defines that feature must be installed on the master node.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-features-get-features)

```ts
client.features.getFeatures({ ... })
```


### Arguments [_arguments_146]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### reset_features [_reset_features]

Reset the features. Clear all of the state information stored in system indices by Elasticsearch features, including the security and machine learning indices.

::::{warning}
Intended for development and testing use only. Do not reset features on a production cluster.
::::


Return a cluster to the same state as a new installation by resetting the feature state for all Elasticsearch features. This deletes all state information stored in system indices.

The response code is HTTP 200 if the state is successfully reset for all features. It is HTTP 500 if the reset operation failed for any feature.

Note that select features might provide a way to reset particular system indices. Using this API resets all features, both those that are built-in and implemented as plugins.

To list the features that will be affected, use the get features API.

::::{important}
The features installed on the node you submit this request to are the features that will be reset. Run on the master node if you have any doubts about which plugins are installed on individual nodes.
::::


[Endpoint documentation](docs-content://deploy-manage/tools/snapshot-and-restore.md)

```ts
client.features.resetFeatures({ ... })
```


### Arguments [_arguments_147]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



## fleet [_fleet]


### global_checkpoints [_global_checkpoints]

Get global checkpoints. Get the current global checkpoints for an index. This API is designed for internal use by the Fleet server project.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-fleet)

```ts
client.fleet.globalCheckpoints({ index })
```


### Arguments [_arguments_148]

* **Request (object):**

    * **`index` (string | string)**: A single index or index alias that resolves to a single index.
    * **`wait_for_advance` (Optional, boolean)**: A boolean value which controls whether to wait (until the timeout) for the global checkpoints to advance past the provided `checkpoints`.
    * **`wait_for_index` (Optional, boolean)**: A boolean value which controls whether to wait (until the timeout) for the target index to exist and all primary shards be active. Can only be true when `wait_for_advance` is true.
    * **`checkpoints` (Optional, number[])**: A comma separated list of previous global checkpoints. When used in combination with `wait_for_advance`, the API will only return once the global checkpoints advances past the checkpoints. Providing an empty list will cause Elasticsearch to immediately return the current global checkpoints.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a global checkpoints to advance past `checkpoints`.



### msearch [_msearch_2]

Run multiple Fleet searches. Run several Fleet searches with a single API request. The API follows the same structure as the multi search API. However, similar to the Fleet search API, it supports the `wait_for_checkpoints` parameter.

```ts
client.fleet.msearch({ ... })
```


### Arguments [_arguments_149]

* **Request (object):**

    * **`index` (Optional, string | string)**: A single target to search. If the target is an index alias, it must resolve to a single index.
    * **`searches` (Optional, { allow_no_indices, expand_wildcards, ignore_unavailable, index, preference, request_cache, routing, search_type, ccs_minimize_roundtrips, allow_partial_search_results, ignore_throttled } | { aggregations, collapse, query, explain, ext, stored_fields, docvalue_fields, knn, from, highlight, indices_boost, min_score, post_filter, profile, rescore, script_fields, search_after, size, sort, _source, fields, terminate_after, stats, timeout, track_scores, track_total_hits, version, runtime_mappings, seq_no_primary_term, pit, suggest }[])**
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar.
    * **`ccs_minimize_roundtrips` (Optional, boolean)**: If true, network roundtrips between the coordinating node and remote clusters are minimized for cross-cluster search requests.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard expressions can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
    * **`ignore_throttled` (Optional, boolean)**: If true, concrete, expanded or aliased indices are ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If true, missing or closed indices are not included in the response.
    * **`max_concurrent_searches` (Optional, number)**: Maximum number of concurrent searches the multi search API can execute.
    * **`max_concurrent_shard_requests` (Optional, number)**: Maximum number of concurrent shard requests that each sub-search request executes per node.
    * **`pre_filter_shard_size` (Optional, number)**: Defines a threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on its rewrite method i.e., if date filters are mandatory to match but the shard bounds and the query are disjoint.
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**: Indicates whether global term and document frequencies should be used when scoring returned documents.
    * **`rest_total_hits_as_int` (Optional, boolean)**: If true, hits.total are returned as an integer in the response. Defaults to false, which returns an object.
    * **`typed_keys` (Optional, boolean)**: Specifies whether aggregation and suggester names should be prefixed by their respective types in the response.
    * **`wait_for_checkpoints` (Optional, number[])**: A comma separated list of checkpoints. When configured, the search API will only be executed on a shard after the relevant checkpoint has become visible for search. Defaults to an empty list which will cause Elasticsearch to immediately execute the search.
    * **`allow_partial_search_results` (Optional, boolean)**: If true, returns partial results if there are shard request timeouts or [shard failures](docs-content://deploy-manage/distributed-architecture/reading-and-writing-documents.md#shard-failures). If false, returns an error with no partial results. Defaults to the configured cluster setting `search.default_allow_partial_results` which is true by default.



### search [_search_3]

Run a Fleet search. The purpose of the Fleet search API is to provide an API where the search will be run only after the provided checkpoint has been processed and is visible for searches inside of Elasticsearch.

```ts
client.fleet.search({ index })
```


### Arguments [_arguments_150]

* **Request (object):**

    * **`index` (string | string)**: A single target to search. If the target is an index alias, it must resolve to a single index.
    * **`aggregations` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**
    * **`collapse` (Optional, { field, inner_hits, max_concurrent_group_searches, collapse })**
    * **`explain` (Optional, boolean)**: If true, returns detailed information about score computation as part of a hit.
    * **`ext` (Optional, Record<string, User-defined value>)**: Configuration of search extensions defined by Elasticsearch plugins.
    * **`from` (Optional, number)**: Starting document offset. By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the search_after parameter.
    * **`highlight` (Optional, { encoder, fields })**
    * **`track_total_hits` (Optional, boolean | number)**: Number of hits matching the query to count accurately. If true, the exact number of hits is returned at the cost of some performance. If false, the response does not include the total number of hits matching the query. Defaults to 10,000 hits.
    * **`indices_boost` (Optional, Record<string, number>[])**: Boosts the _score of documents from specified indices.
    * **`docvalue_fields` (Optional, { field, format, include_unmapped }[])**: Array of wildcard (*) patterns. The request returns doc values for field names matching these patterns in the hits.fields property of the response.
    * **`min_score` (Optional, number)**: Minimum _score for matching documents. Documents with a lower _score are not included in the search results.
    * **`post_filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**
    * **`profile` (Optional, boolean)**
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Defines the search definition using the Query DSL.
    * **`rescore` (Optional, { window_size, query, learning_to_rank } | { window_size, query, learning_to_rank }[])**
    * **`script_fields` (Optional, Record<string, { script, ignore_failure }>)**: Retrieve a script evaluation (based on different fields) for each hit.
    * **`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**
    * **`size` (Optional, number)**: The number of hits to return. By default, you cannot page through more than 10,000 hits using the from and size parameters. To page through more hits, use the search_after parameter.
    * **`slice` (Optional, { field, id, max })**
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**
    * **`_source` (Optional, boolean | { excludes, includes })**: Indicates which source fields are returned for matching documents. These fields are returned in the hits._source property of the search response.
    * **`fields` (Optional, { field, format, include_unmapped }[])**: Array of wildcard (*) patterns. The request returns values for field names matching these patterns in the hits.fields property of the response.
    * **`suggest` (Optional, { text })**
    * **`terminate_after` (Optional, number)**: Maximum number of documents to collect for each shard. If a query reaches this limit, Elasticsearch terminates the query early. Elasticsearch collects documents before sorting. Defaults to 0, which does not terminate query execution early.
    * **`timeout` (Optional, string)**: Specifies the period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout.
    * **`track_scores` (Optional, boolean)**: If true, calculate and return document scores, even if the scores are not used for sorting.
    * **`version` (Optional, boolean)**: If true, returns document version as part of a hit.
    * **`seq_no_primary_term` (Optional, boolean)**: If true, returns sequence number and primary term of the last modification of each hit. See Optimistic concurrency control.
    * **`stored_fields` (Optional, string | string[])**: List of stored fields to return as part of a hit. If no fields are specified, no stored fields are included in the response. If this field is specified, the _source parameter defaults to false. You can pass _source: true to return both source fields and stored fields in the search response.
    * **`pit` (Optional, { id, keep_alive })**: Limits the search to a point in time (PIT). If you provide a PIT, you cannot specify an <index> in the request path.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Defines one or more runtime fields in the search request. These fields take precedence over mapped fields with the same name.
    * **`stats` (Optional, string[])**: Stats groups to associate with the search. Each group maintains a statistics aggregation for its associated searches. You can retrieve these stats using the indices stats API.
    * **`allow_no_indices` (Optional, boolean)**
    * **`analyzer` (Optional, string)**
    * **`analyze_wildcard` (Optional, boolean)**
    * **`batched_reduce_size` (Optional, number)**
    * **`ccs_minimize_roundtrips` (Optional, boolean)**
    * **`default_operator` (Optional, Enum("and" | "or"))**
    * **`df` (Optional, string)**
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**
    * **`ignore_throttled` (Optional, boolean)**
    * **`ignore_unavailable` (Optional, boolean)**
    * **`lenient` (Optional, boolean)**
    * **`max_concurrent_shard_requests` (Optional, number)**
    * **`preference` (Optional, string)**
    * **`pre_filter_shard_size` (Optional, number)**
    * **`request_cache` (Optional, boolean)**
    * **`routing` (Optional, string)**
    * **`scroll` (Optional, string | -1 | 0)**
    * **`search_type` (Optional, Enum("query_then_fetch" | "dfs_query_then_fetch"))**
    * **`suggest_field` (Optional, string)**: Specifies which field to use for suggestions.
    * **`suggest_mode` (Optional, Enum("missing" | "popular" | "always"))**
    * **`suggest_size` (Optional, number)**
    * **`suggest_text` (Optional, string)**: The source text for which the suggestions should be returned.
    * **`typed_keys` (Optional, boolean)**
    * **`rest_total_hits_as_int` (Optional, boolean)**
    * **`_source_excludes` (Optional, string | string[])**
    * **`_source_includes` (Optional, string | string[])**
    * **`q` (Optional, string)**
    * **`wait_for_checkpoints` (Optional, number[])**: A comma separated list of checkpoints. When configured, the search API will only be executed on a shard after the relevant checkpoint has become visible for search. Defaults to an empty list which will cause Elasticsearch to immediately execute the search.
    * **`allow_partial_search_results` (Optional, boolean)**: If true, returns partial results if there are shard request timeouts or [shard failures](docs-content://deploy-manage/distributed-architecture/reading-and-writing-documents.md#shard-failures). If false, returns an error with no partial results. Defaults to the configured cluster setting `search.default_allow_partial_results` which is true by default.



## graph [_graph]


### explore [_explore]

Explore graph analytics. Extract and summarize information about the documents and terms in an Elasticsearch data stream or index. The easiest way to understand the behavior of this API is to use the Graph UI to explore connections. An initial request to the `_explore` API contains a seed query that identifies the documents of interest and specifies the fields that define the vertices and connections you want to include in the graph. Subsequent requests enable you to spider out from one more vertices of interest. You can exclude vertices that have already been returned.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-graph)

```ts
client.graph.explore({ index })
```


### Arguments [_arguments_151]

* **Request (object):**

    * **`index` (string | string[])**: Name of the index.
    * **`connections` (Optional, { connections, query, vertices })**: Specifies or more fields from which you want to extract terms that are associated with the specified vertices.
    * **`controls` (Optional, { sample_diversity, sample_size, timeout, use_significance })**: Direct the Graph API how to build the graph.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: A seed query that identifies the documents of interest. Can be any valid Elasticsearch query.
    * **`vertices` (Optional, { exclude, field, include, min_doc_count, shard_min_doc_count, size }[])**: Specifies one or more fields that contain the terms you want to include in the graph as vertices.
    * **`routing` (Optional, string)**: Custom value used to route operations to a specific shard.
    * **`timeout` (Optional, string | -1 | 0)**: Specifies the period of time to wait for a response from each shard. If no response is received before the timeout expires, the request fails and returns an error. Defaults to no timeout.



## ilm [_ilm]


### delete_lifecycle [_delete_lifecycle]

Delete a lifecycle policy. You cannot delete policies that are currently in use. If the policy is being used to manage any indices, the request fails and returns an error.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-delete-lifecycle)

```ts
client.ilm.deleteLifecycle({ policy })
```


### Arguments [_arguments_152]

* **Request (object):**

    * **`policy` (string)**: Identifier for the policy.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### explain_lifecycle [_explain_lifecycle]

Explain the lifecycle state. Get the current lifecycle status for one or more indices. For data streams, the API retrieves the current lifecycle status for the stream’s backing indices.

The response indicates when the index entered each lifecycle state, provides the definition of the running phase, and information about any failures.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-explain-lifecycle)

```ts
client.ilm.explainLifecycle({ index })
```


### Arguments [_arguments_153]

* **Request (object):**

    * **`index` (string)**: List of data streams, indices, and aliases to target. Supports wildcards (`*`). To target all data streams and indices, use `*` or `_all`.
    * **`only_errors` (Optional, boolean)**: Filters the returned indices to only indices that are managed by ILM and are in an error state, either due to an encountering an error while executing the policy, or attempting to use a policy that does not exist.
    * **`only_managed` (Optional, boolean)**: Filters the returned indices to only indices that are managed by ILM.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_lifecycle [_get_lifecycle]

Get lifecycle policies.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-get-lifecycle)

```ts
client.ilm.getLifecycle({ ... })
```


### Arguments [_arguments_154]

* **Request (object):**

    * **`policy` (Optional, string)**: Identifier for the policy.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_status [_get_status_2]

Get the ILM status. Get the current index lifecycle management status.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-get-status)

```ts
client.ilm.getStatus()
```


### migrate_to_data_tiers [_migrate_to_data_tiers]

Migrate to data tiers routing. Switch the indices, ILM policies, and legacy, composable, and component templates from using custom node attributes and attribute-based allocation filters to using data tiers. Optionally, delete one legacy index template. Using node roles enables ILM to automatically move the indices between data tiers.

Migrating away from custom node attributes routing can be manually performed. This API provides an automated way of performing three out of the four manual steps listed in the migration guide:

1. Stop setting the custom hot attribute on new indices.
2. Remove custom allocation settings from existing ILM policies.
3. Replace custom allocation settings from existing indices with the corresponding tier preference.

ILM must be stopped before performing the migration. Use the stop ILM and get ILM status APIs to wait until the reported operation mode is `STOPPED`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-migrate-to-data-tiers)

```ts
client.ilm.migrateToDataTiers({ ... })
```


### Arguments [_arguments_155]

* **Request (object):**

    * **`legacy_template_to_delete` (Optional, string)**
    * **`node_attribute` (Optional, string)**
    * **`dry_run` (Optional, boolean)**: If true, simulates the migration from node attributes based allocation filters to data tiers, but does not perform the migration. This provides a way to retrieve the indices and ILM policies that need to be migrated.



### move_to_step [_move_to_step]

Move to a lifecycle step. Manually move an index into a specific step in the lifecycle policy and run that step.

::::{warning}
This operation can result in the loss of data. Manually moving an index into a specific step runs that step even if it has already been performed. This is a potentially destructive action and this should be considered an expert level API.
::::


You must specify both the current step and the step to be executed in the body of the request. The request will fail if the current step does not match the step currently running for the index This is to prevent the index from being moved from an unexpected step into the next step.

When specifying the target (`next_step`) to which the index will be moved, either the name or both the action and name fields are optional. If only the phase is specified, the index will move to the first step of the first action in the target phase. If the phase and action are specified, the index will move to the first step of the specified action in the specified phase. Only actions specified in the ILM policy are considered valid. An index cannot move to a step that is not part of its policy.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-move-to-step)

```ts
client.ilm.moveToStep({ index, current_step, next_step })
```


### Arguments [_arguments_156]

* **Request (object):**

    * **`index` (string)**: The name of the index whose lifecycle step is to change
    * **`current_step` ({ action, name, phase })**: The step that the index is expected to be in.
    * **`next_step` ({ action, name, phase })**: The step that you want to run.



### put_lifecycle [_put_lifecycle]

Create or update a lifecycle policy. If the specified policy exists, it is replaced and the policy version is incremented.

::::{note}
Only the latest version of the policy is stored, you cannot revert to previous versions.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-put-lifecycle)

```ts
client.ilm.putLifecycle({ policy })
```


### Arguments [_arguments_157]

* **Request (object):**

    * **`policy` (string)**: Identifier for the policy.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### remove_policy [_remove_policy]

Remove policies from an index. Remove the assigned lifecycle policies from an index or a data stream’s backing indices. It also stops managing the indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-remove-policy)

```ts
client.ilm.removePolicy({ index })
```


### Arguments [_arguments_158]

* **Request (object):**

    * **`index` (string)**: The name of the index to remove policy on



### retry [_retry]

Retry a policy. Retry running the lifecycle policy for an index that is in the ERROR step. The API sets the policy back to the step where the error occurred and runs the step. Use the explain lifecycle state API to determine whether an index is in the ERROR step.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-retry)

```ts
client.ilm.retry({ index })
```


### Arguments [_arguments_159]

* **Request (object):**

    * **`index` (string)**: The name of the indices (comma-separated) whose failed lifecycle step is to be retry



### start [_start]

Start the ILM plugin. Start the index lifecycle management plugin if it is currently stopped. ILM is started automatically when the cluster is formed. Restarting ILM is necessary only when it has been stopped using the stop ILM API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-start)

```ts
client.ilm.start({ ... })
```


### Arguments [_arguments_160]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### stop [_stop]

Stop the ILM plugin. Halt all lifecycle management operations and stop the index lifecycle management plugin. This is useful when you are performing maintenance on the cluster and need to prevent ILM from performing any actions on your indices.

The API returns as soon as the stop request has been acknowledged, but the plugin might continue to run until in-progress operations complete and the plugin can be safely stopped. Use the get ILM status API to check whether ILM is running.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ilm-stop)

```ts
client.ilm.stop({ ... })
```


### Arguments [_arguments_161]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## indices [_indices_2]


### add_block [_add_block]

Add an index block. Limits the operations allowed on an index by blocking specific operation types.

[Index block settings](elasticsearch://reference/elasticsearch/index-settings/index-block.md)

```ts
client.indices.addBlock({ index, block })
```


### Arguments [_arguments_162]

* **Request (object):**

    * **`index` (string)**: A comma separated list of indices to add a block to
    * **`block` (Enum("metadata" | "read" | "read_only" | "write"))**: The block to add (one of read, write, read_only or metadata)
    * **`allow_no_indices` (Optional, boolean)**: Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`ignore_unavailable` (Optional, boolean)**: Whether specified concrete indices should be ignored when unavailable (missing or closed)
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master
    * **`timeout` (Optional, string | -1 | 0)**: Explicit operation timeout



### analyze [_analyze]

Get tokens from text analysis. The analyze API performs analysis on a text string and returns the resulting tokens.

Generating excessive amount of tokens may cause a node to run out of memory. The `index.analyze.max_token_count` setting enables you to limit the number of tokens that can be produced. If more than this limit of tokens gets generated, an error occurs. The `_analyze` endpoint without a specified index will always use `10000` as its limit.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-analyze)

```ts
client.indices.analyze({ ... })
```


### Arguments [_arguments_163]

* **Request (object):**

    * **`index` (Optional, string)**: Index used to derive the analyzer. If specified, the `analyzer` or field parameter overrides this value. If no index is specified or the index does not have a default analyzer, the analyze API uses the standard analyzer.
    * **`analyzer` (Optional, string)**: The name of the analyzer that should be applied to the provided `text`. This could be a built-in analyzer, or an analyzer that’s been configured in the index.
    * **`attributes` (Optional, string[])**: Array of token attributes used to filter the output of the `explain` parameter.
    * **`char_filter` (Optional, string | { type, escaped_tags } | { type, mappings, mappings_path } | { type, flags, pattern, replacement } | { type, mode, name } | { type, normalize_kana, normalize_kanji }[])**: Array of character filters used to preprocess characters before the tokenizer.
    * **`explain` (Optional, boolean)**: If `true`, the response includes token attributes and additional details.
    * **`field` (Optional, string)**: Field used to derive the analyzer. To use this parameter, you must specify an index. If specified, the `analyzer` parameter overrides this value.
    * **`filter` (Optional, string | { type, preserve_original } | { type, common_words, common_words_path, ignore_case, query_mode } | { type, filter, script } | { type, delimiter, encoding } | { type, max_gram, min_gram, side, preserve_original } | { type, articles, articles_path, articles_case } | { type, max_output_size, separator } | { type, dedup, dictionary, locale, longest_only } | { type } | { type, mode, types } | { type, keep_words, keep_words_case, keep_words_path } | { type, ignore_case, keywords, keywords_path, keywords_pattern } | { type } | { type, max, min } | { type, consume_all_tokens, max_token_count } | { type, language } | { type, filters, preserve_original } | { type, max_gram, min_gram, preserve_original } | { type, stoptags } | { type, patterns, preserve_original } | { type, all, flags, pattern, replacement } | { type } | { type, script } | { type } | { type } | { type, filler_token, max_shingle_size, min_shingle_size, output_unigrams, output_unigrams_if_no_shingles, token_separator } | { type, language } | { type, rules, rules_path } | { type, language } | { type, ignore_case, remove_trailing, stopwords, stopwords_path } | { type, expand, format, lenient, synonyms, synonyms_path, synonyms_set, tokenizer, updateable } | { type, expand, format, lenient, synonyms, synonyms_path, synonyms_set, tokenizer, updateable } | { type } | { type, length } | { type, only_on_same_position } | { type } | { type, adjust_offsets, catenate_all, catenate_numbers, catenate_words, generate_number_parts, generate_word_parts, ignore_keywords, preserve_original, protected_words, protected_words_path, split_on_case_change, split_on_numerics, stem_english_possessive, type_table, type_table_path } | { type, catenate_all, catenate_numbers, catenate_words, generate_number_parts, generate_word_parts, preserve_original, protected_words, protected_words_path, split_on_case_change, split_on_numerics, stem_english_possessive, type_table, type_table_path } | { type, minimum_length } | { type, use_romaji } | { type, stoptags } | { type, alternate, case_first, case_level, country, decomposition, hiragana_quaternary_mode, language, numeric, rules, strength, variable_top, variant } | { type, unicode_set_filter } | { type, name } | { type, dir, id } | { type, encoder, languageset, max_code_len, name_type, replace, rule_type } | { type }[])**: Array of token filters used to apply after the tokenizer.
    * **`normalizer` (Optional, string)**: Normalizer to use to convert text into a single token.
    * **`text` (Optional, string | string[])**: Text to analyze. If an array of strings is provided, it is analyzed as a multi-value field.
    * **`tokenizer` (Optional, string | { type, tokenize_on_chars, max_token_length } | { type, max_token_length } | { type, custom_token_chars, max_gram, min_gram, token_chars } | { type, buffer_size } | { type } | { type } | { type, custom_token_chars, max_gram, min_gram, token_chars } | { type, buffer_size, delimiter, replacement, reverse, skip } | { type, flags, group, pattern } | { type, pattern } | { type, pattern } | { type, max_token_length } | { type } | { type, max_token_length } | { type, max_token_length } | { type, rule_files } | { type, discard_punctuation, mode, nbest_cost, nbest_examples, user_dictionary, user_dictionary_rules, discard_compound_token } | { type, decompound_mode, discard_punctuation, user_dictionary, user_dictionary_rules })**: Tokenizer to use to convert text into tokens.



### cancel_migrate_reindex [_cancel_migrate_reindex]

Cancel a migration reindex operation.

Cancel a migration reindex attempt for a data stream or index.

```ts
client.indices.cancelMigrateReindex({ index })
```


### Arguments [_arguments_164]

* **Request (object):**

    * **`index` (string | string[])**: The index or data stream name



### clear_cache [_clear_cache]

Clear the cache. Clear the cache of one or more indices. For data streams, the API clears the caches of the stream’s backing indices.

By default, the clear cache API clears all caches. To clear only specific caches, use the `fielddata`, `query`, or `request` parameters. To clear the cache only of specific fields, use the `fields` parameter.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-clear-cache)

```ts
client.indices.clearCache({ ... })
```


### Arguments [_arguments_165]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`fielddata` (Optional, boolean)**: If `true`, clears the fields cache. Use the `fields` parameter to clear the cache of specific fields only.
    * **`fields` (Optional, string | string[])**: List of field names used to limit the `fielddata` parameter.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`query` (Optional, boolean)**: If `true`, clears the query cache.
    * **`request` (Optional, boolean)**: If `true`, clears the request cache.



### clone [_clone]

Clone an index. Clone an existing index into a new index. Each original primary shard is cloned into a new primary shard in the new index.

::::{important}
Elasticsearch does not apply index templates to the resulting index. The API also does not copy index metadata from the original index. Index metadata includes aliases, index lifecycle management phase definitions, and cross-cluster replication (CCR) follower information. For example, if you clone a CCR follower index, the resulting clone will not be a follower index.
::::


The clone API copies most index settings from the source index to the resulting index, with the exception of `index.number_of_replicas` and `index.auto_expand_replicas`. To set the number of replicas in the resulting index, configure these settings in the clone request.

Cloning works as follows:

* First, it creates a new target index with the same definition as the source index.
* Then it hard-links segments from the source index into the target index. If the file system does not support hard-linking, all segments are copied into the new index, which is a much more time consuming process.
* Finally, it recovers the target index as though it were a closed index which had just been re-opened.

::::{important}
Indices can only be cloned if they meet the following requirements:
::::


* The index must be marked as read-only and have a cluster health status of green.
* The target index must not exist.
* The source index must have the same number of primary shards as the target index.
* The node handling the clone process must have sufficient free disk space to accommodate a second copy of the existing index.

The current write index on a data stream cannot be cloned. In order to clone the current write index, the data stream must first be rolled over so that a new write index is created and then the previous write index can be cloned.

::::{note}
Mappings cannot be specified in the `_clone` request. The mappings of the source index will be used for the target index.
::::


**Monitor the cloning process**

The cloning process can be monitored with the cat recovery API or the cluster health API can be used to wait until all primary shards have been allocated by setting the `wait_for_status` parameter to `yellow`.

The `_clone` API returns as soon as the target index has been added to the cluster state, before any shards have been allocated. At this point, all shards are in the state unassigned. If, for any reason, the target index can’t be allocated, its primary shard will remain unassigned until it can be allocated on that node.

Once the primary shard is allocated, it moves to state initializing, and the clone process begins. When the clone operation completes, the shard will become active. At that point, Elasticsearch will try to allocate any replicas and may decide to relocate the primary shard to another node.

**Wait for active shards**

Because the clone operation creates a new index to clone the shards to, the wait for active shards setting on index creation applies to the clone index action as well.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-clone)

```ts
client.indices.clone({ index, target })
```


### Arguments [_arguments_166]

* **Request (object):**

    * **`index` (string)**: Name of the source index to clone.
    * **`target` (string)**: Name of the target index to create.
    * **`aliases` (Optional, Record<string, { filter, index_routing, is_hidden, is_write_index, routing, search_routing }>)**: Aliases for the resulting index.
    * **`settings` (Optional, Record<string, User-defined value>)**: Configuration options for the target index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### close [_close]

Close an index. A closed index is blocked for read or write operations and does not allow all operations that opened indices allow. It is not possible to index documents or to search for documents in a closed index. Closed indices do not have to maintain internal data structures for indexing or searching documents, which results in a smaller overhead on the cluster.

When opening or closing an index, the master node is responsible for restarting the index shards to reflect the new state of the index. The shards will then go through the normal recovery process. The data of opened and closed indices is automatically replicated by the cluster to ensure that enough shard copies are safely kept around at all times.

You can open and close multiple indices. An error is thrown if the request explicitly refers to a missing index. This behaviour can be turned off using the `ignore_unavailable=true` parameter.

By default, you must explicitly name the indices you are opening or closing. To open or close indices with `_all`, `*`, or other wildcard expressions, change the` action.destructive_requires_name` setting to `false`. This setting can also be changed with the cluster update settings API.

Closed indices consume a significant amount of disk-space which can cause problems in managed environments. Closing indices can be turned off with the cluster settings API by setting `cluster.indices.close.enable` to `false`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-close)

```ts
client.indices.close({ index })
```


### Arguments [_arguments_167]

* **Request (object):**

    * **`index` (string | string[])**: List or wildcard expression of index names used to limit the request.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### create [_create_2]

Create an index. You can use the create index API to add a new index to an Elasticsearch cluster. When creating an index, you can specify the following:

* Settings for the index.
* Mappings for fields in the index.
* Index aliases

**Wait for active shards**

By default, index creation will only return a response to the client when the primary copies of each shard have been started, or the request times out. The index creation response will indicate what happened. For example, `acknowledged` indicates whether the index was successfully created in the cluster, `while shards_acknowledged` indicates whether the requisite number of shard copies were started for each shard in the index before timing out. Note that it is still possible for either `acknowledged` or `shards_acknowledged` to be `false`, but for the index creation to be successful. These values simply indicate whether the operation completed before the timeout. If `acknowledged` is false, the request timed out before the cluster state was updated with the newly created index, but it probably will be created sometime soon. If `shards_acknowledged` is false, then the request timed out before the requisite number of shards were started (by default just the primaries), even if the cluster state was successfully updated to reflect the newly created index (that is to say, `acknowledged` is `true`).

You can change the default of only waiting for the primary shards to start through the index setting `index.write.wait_for_active_shards`. Note that changing this setting will also affect the `wait_for_active_shards` value on all subsequent write operations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-create)

```ts
client.indices.create({ index })
```


### Arguments [_arguments_168]

* **Request (object):**

    * **`index` (string)**: Name of the index you wish to create.
    * **`aliases` (Optional, Record<string, { filter, index_routing, is_hidden, is_write_index, routing, search_routing }>)**: Aliases for the index.
    * **`mappings` (Optional, { all_field, date_detection, dynamic, dynamic_date_formats, dynamic_templates, _field_names, index_field, _meta, numeric_detection, properties, _routing, _size, _source, runtime, enabled, subobjects, _data_stream_timestamp })**: Mapping for fields in the index. If specified, this mapping can include:

        * Field names
        * Field data types
        * Mapping parameters

    * **`settings` (Optional, { index, mode, routing_path, soft_deletes, sort, number_of_shards, number_of_replicas, number_of_routing_shards, check_on_startup, codec, routing_partition_size, load_fixed_bitset_filters_eagerly, hidden, auto_expand_replicas, merge, search, refresh_interval, max_result_window, max_inner_result_window, max_rescore_window, max_docvalue_fields_search, max_script_fields, max_ngram_diff, max_shingle_diff, blocks, max_refresh_listeners, analyze, highlight, max_terms_count, max_regex_length, routing, gc_deletes, default_pipeline, final_pipeline, lifecycle, provided_name, creation_date, creation_date_string, uuid, version, verified_before_close, format, max_slices_per_scroll, translog, query_string, priority, top_metrics_max_size, analysis, settings, time_series, queries, similarity, mapping, indexing.slowlog, indexing_pressure, store })**: Configuration options for the index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### create_data_stream [_create_data_stream]

Create a data stream. Creates a data stream. You must have a matching index template with data stream enabled.

[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.createDataStream({ name })
```


### Arguments [_arguments_169]

* **Request (object):**

    * **`name` (string)**: Name of the data stream, which must meet the following criteria: Lowercase only; Cannot include `\`, `/`, `*`, `?`, `"`, `<`, `>`, `|`, `,`, `#`, `:`, or a space character; Cannot start with `-`, `_`, `+`, or `.ds-`; Cannot be `.` or `..`; Cannot be longer than 255 bytes. Multi-byte characters count towards this limit faster.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### create_from [_create_from]

Create an index from a source index.

Copy the mappings and settings from the source index to a destination index while allowing request settings and mappings to override the source values.

```ts
client.indices.createFrom({ source, dest })
```


### Arguments [_arguments_170]

* **Request (object):**

    * **`source` (string)**: The source index or data stream name
    * **`dest` (string)**: The destination index or data stream name
    * **`create_from` (Optional, { mappings_override, settings_override, remove_index_blocks })**



### data_streams_stats [_data_streams_stats]

Get data stream stats. Retrieves statistics for one or more data streams.

[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.dataStreamsStats({ ... })
```


### Arguments [_arguments_171]

* **Request (object):**

    * **`name` (Optional, string)**: List of data streams used to limit the request. Wildcard expressions (`*`) are supported. To target all data streams in a cluster, omit this parameter or use `*`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of data stream that wildcard patterns can match. Supports a list of values, such as `open,hidden`.



### delete [_delete_5]

Delete indices. Deleting an index deletes its documents, shards, and metadata. It does not delete related Kibana components, such as data views, visualizations, or dashboards.

You cannot delete the current write index of a data stream. To delete the index, you must roll over the data stream so a new write index is created. You can then use the delete index API to delete the previous write index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete)

```ts
client.indices.delete({ index })
```


### Arguments [_arguments_172]

* **Request (object):**

    * **`index` (string | string[])**: List of indices to delete. You cannot specify index aliases. By default, this parameter does not support wildcards (`*`) or `_all`. To use wildcards or `_all`, set the `action.destructive_requires_name` cluster setting to `false`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### delete_alias [_delete_alias]

Delete an alias. Removes a data stream or index from an alias.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete-alias)

```ts
client.indices.deleteAlias({ index, name })
```


### Arguments [_arguments_173]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams or indices used to limit the request. Supports wildcards (`*`).
    * **`name` (string | string[])**: List of aliases to remove. Supports wildcards (`*`). To remove all aliases, use `*` or `_all`.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### delete_data_lifecycle [_delete_data_lifecycle]

Delete data stream lifecycles. Removes the data stream lifecycle from a data stream, rendering it not managed by the data stream lifecycle.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete-data-lifecycle)

```ts
client.indices.deleteDataLifecycle({ name })
```


### Arguments [_arguments_174]

* **Request (object):**

    * **`name` (string | string[])**: A list of data streams of which the data stream lifecycle will be deleted; use `*` to get all data streams
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether wildcard expressions should get expanded to open or closed indices (default: open)
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master
    * **`timeout` (Optional, string | -1 | 0)**: Explicit timestamp for the document



### delete_data_stream [_delete_data_stream]

Delete data streams. Deletes one or more data streams and their backing indices.

[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.deleteDataStream({ name })
```


### Arguments [_arguments_175]

* **Request (object):**

    * **`name` (string | string[])**: List of data streams to delete. Wildcard (`*`) expressions are supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of data stream that wildcard patterns can match. Supports a list of values,such as `open,hidden`.



### delete_index_template [_delete_index_template]

Delete an index template. The provided <index-template> may contain multiple template names separated by a comma. If multiple template names are specified then there is no wildcard support and the provided names should match completely with existing templates.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete-index-template)

```ts
client.indices.deleteIndexTemplate({ name })
```


### Arguments [_arguments_176]

* **Request (object):**

    * **`name` (string | string[])**: List of index template names used to limit the request. Wildcard (*) expressions are supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### delete_template [_delete_template]

Delete a legacy index template.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete-template)

```ts
client.indices.deleteTemplate({ name })
```


### Arguments [_arguments_177]

* **Request (object):**

    * **`name` (string)**: The name of the legacy index template to delete. Wildcard (`*`) expressions are supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### disk_usage [_disk_usage]

Analyze the index disk usage. Analyze the disk usage of each field of an index or data stream. This API might not support indices created in previous Elasticsearch versions. The result of a small index can be inaccurate as some parts of an index might not be analyzed by the API.

::::{note}
The total size of fields of the analyzed shards of the index in the response is usually smaller than the index `store_size` value because some small metadata files are ignored and some parts of data files might not be scanned by the API. Since stored fields are stored together in a compressed format, the sizes of stored fields are also estimates and can be inaccurate. The stored size of the `_id` field is likely underestimated while the `_source` field is overestimated.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-disk-usage)

```ts
client.indices.diskUsage({ index })
```


### Arguments [_arguments_178]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams, indices, and aliases used to limit the request. It’s recommended to execute this API with a single index (or the latest backing index of a data stream) as the API consumes resources significantly.
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`.
    * **`flush` (Optional, boolean)**: If `true`, the API performs a flush before analysis. If `false`, the response may not include uncommitted data.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, missing or closed indices are not included in the response.
    * **`run_expensive_tasks` (Optional, boolean)**: Analyzing field disk usage is resource-intensive. To use the API, this parameter must be set to `true`.



### downsample [_downsample]

Downsample an index. Aggregate a time series (TSDS) index and store pre-computed statistical summaries (`min`, `max`, `sum`, `value_count` and `avg`) for each metric field grouped by a configured time interval. For example, a TSDS index that contains metrics sampled every 10 seconds can be downsampled to an hourly index. All documents within an hour interval are summarized and stored as a single document in the downsample index.

::::{note}
Only indices in a time series data stream are supported. Neither field nor document level security can be defined on the source index. The source index must be read only (`index.blocks.write: true`).
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-downsample)

```ts
client.indices.downsample({ index, target_index })
```


### Arguments [_arguments_179]

* **Request (object):**

    * **`index` (string)**: Name of the time series index to downsample.
    * **`target_index` (string)**: Name of the index to create.
    * **`config` (Optional, { fixed_interval })**



### exists [_exists_2]

Check indices. Check if one or more indices, index aliases, or data streams exist.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-exists)

```ts
client.indices.exists({ index })
```


### Arguments [_arguments_180]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams, indices, and aliases. Supports wildcards (`*`).
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`flat_settings` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`include_defaults` (Optional, boolean)**: If `true`, return all default settings in the response.
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only.



### exists_alias [_exists_alias]

Check aliases. Checks if one or more data stream or index aliases exist.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-update-aliases)

```ts
client.indices.existsAlias({ name })
```


### Arguments [_arguments_181]

* **Request (object):**

    * **`name` (string | string[])**: List of aliases to check. Supports wildcards (`*`).
    * **`index` (Optional, string | string[])**: List of data streams or indices used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, requests that include a missing data stream or index in the target indices or data streams return an error.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### exists_index_template [_exists_index_template]

Check index templates. Check whether index templates exist.

[Endpoint documentation](docs-content://manage-data/data-store/templates.md)

```ts
client.indices.existsIndexTemplate({ name })
```


### Arguments [_arguments_182]

* **Request (object):**

    * **`name` (string)**: List of index template names used to limit the request. Wildcard (*) expressions are supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### exists_template [_exists_template]

Check existence of index templates. Get information about whether index templates exist. Index templates define settings, mappings, and aliases that can be applied automatically to new indices.

::::{important}
This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-exists-template)

```ts
client.indices.existsTemplate({ name })
```


### Arguments [_arguments_183]

* **Request (object):**

    * **`name` (string | string[])**: A list of index template names used to limit the request. Wildcard (`*`) expressions are supported.
    * **`flat_settings` (Optional, boolean)**: Indicates whether to use a flat format for the response.
    * **`local` (Optional, boolean)**: Indicates whether to get information from the local node only.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### explain_data_lifecycle [_explain_data_lifecycle]

Get the status for a data stream lifecycle. Get information about an index or data stream’s current data stream lifecycle status, such as time since index creation, time since rollover, the lifecycle configuration managing the index, or any errors encountered during lifecycle execution.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-explain-data-lifecycle)

```ts
client.indices.explainDataLifecycle({ index })
```


### Arguments [_arguments_184]

* **Request (object):**

    * **`index` (string | string[])**: The name of the index to explain
    * **`include_defaults` (Optional, boolean)**: indicates if the API should return the default values the system uses for the index’s lifecycle
    * **`master_timeout` (Optional, string | -1 | 0)**: Specify timeout for connection to master



### field_usage_stats [_field_usage_stats]

Get field usage stats. Get field usage information for each shard and field of an index. Field usage statistics are automatically captured when queries are running on a cluster. A shard-level search request that accesses a given field, even if multiple times during that request, is counted as a single use.

The response body reports the per-shard usage count of the data structures that back the fields in the index. A given request will increment each count by a maximum value of 1, even if the request accesses the same field multiple times.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-field-usage-stats)

```ts
client.indices.fieldUsageStats({ index })
```


### Arguments [_arguments_185]

* **Request (object):**

    * **`index` (string | string[])**: List or wildcard expression of index names used to limit the request.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, missing or closed indices are not included in the response.
    * **`fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in the statistics.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to all or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### flush [_flush]

Flush data streams or indices. Flushing a data stream or index is the process of making sure that any data that is currently only stored in the transaction log is also permanently stored in the Lucene index. When restarting, Elasticsearch replays any unflushed operations from the transaction log into the Lucene index to bring it back into the state that it was in before the restart. Elasticsearch automatically triggers flushes as needed, using heuristics that trade off the size of the unflushed transaction log against the cost of performing each flush.

After each operation has been flushed it is permanently stored in the Lucene index. This may mean that there is no need to maintain an additional copy of it in the transaction log. The transaction log is made up of multiple files, called generations, and Elasticsearch will delete any generation files when they are no longer needed, freeing up disk space.

It is also possible to trigger a flush on one or more indices using the flush API, although it is rare for users to need to call this API directly. If you call the flush API after indexing some documents then a successful response indicates that Elasticsearch has flushed all the documents that were indexed before the flush API was called.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-flush)

```ts
client.indices.flush({ ... })
```


### Arguments [_arguments_186]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases to flush. Supports wildcards (`*`). To flush all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`force` (Optional, boolean)**: If `true`, the request forces a flush even if there are no changes to commit to the index.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`wait_if_ongoing` (Optional, boolean)**: If `true`, the flush operation blocks until execution when another flush operation is running. If `false`, Elasticsearch returns an error if you request a flush when another flush operation is running.



### forcemerge [_forcemerge]

Force a merge. Perform the force merge operation on the shards of one or more indices. For data streams, the API forces a merge on the shards of the stream’s backing indices.

Merging reduces the number of segments in each shard by merging some of them together and also frees up the space used by deleted documents. Merging normally happens automatically, but sometimes it is useful to trigger a merge manually.

::::{warning}
We recommend force merging only a read-only index (meaning the index is no longer receiving writes). When documents are updated or deleted, the old version is not immediately removed but instead soft-deleted and marked with a "tombstone". These soft-deleted documents are automatically cleaned up during regular segment merges. But force merge can cause very large (greater than 5 GB) segments to be produced, which are not eligible for regular merges. So the number of soft-deleted documents can then grow rapidly, resulting in higher disk usage and worse search performance. If you regularly force merge an index receiving writes, this can also make snapshots more expensive, since the new documents can’t be backed up incrementally.
::::


**Blocks during a force merge**

Calls to this API block until the merge is complete (unless request contains `wait_for_completion=false`). If the client connection is lost before completion then the force merge process will continue in the background. Any new requests to force merge the same indices will also block until the ongoing force merge is complete.

**Running force merge asynchronously**

If the request contains `wait_for_completion=false`, Elasticsearch performs some preflight checks, launches the request, and returns a task you can use to get the status of the task. However, you can not cancel this task as the force merge task is not cancelable. Elasticsearch creates a record of this task as a document at `_tasks/<task_id>`. When you are done with a task, you should delete the task document so Elasticsearch can reclaim the space.

**Force merging multiple indices**

You can force merge multiple indices with a single request by targeting:

* One or more data streams that contain multiple backing indices
* Multiple indices
* One or more aliases
* All data streams and indices in a cluster

Each targeted shard is force-merged separately using the force_merge threadpool. By default each node only has a single `force_merge` thread which means that the shards on that node are force-merged one at a time. If you expand the `force_merge` threadpool on a node then it will force merge its shards in parallel

Force merge makes the storage for the shard being merged temporarily increase, as it may require free space up to triple its size in case `max_num_segments parameter` is set to `1`, to rewrite all segments into a new one.

**Data streams and time-based indices**

Force-merging is useful for managing a data stream’s older backing indices and other time-based indices, particularly after a rollover. In these cases, each index only receives indexing traffic for a certain period of time. Once an index receive no more writes, its shards can be force-merged to a single segment. This can be a good idea because single-segment shards can sometimes use simpler and more efficient data structures to perform searches. For example:

```
POST /.ds-my-data-stream-2099.03.07-000001/_forcemerge?max_num_segments=1
```

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-forcemerge)

```ts
client.indices.forcemerge({ ... })
```


### Arguments [_arguments_187]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of index names; use `_all` or empty string to perform the operation on all indices
    * **`allow_no_indices` (Optional, boolean)**: Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`flush` (Optional, boolean)**: Specify whether the index should be flushed after performing the operation (default: true)
    * **`ignore_unavailable` (Optional, boolean)**: Whether specified concrete indices should be ignored when unavailable (missing or closed)
    * **`max_num_segments` (Optional, number)**: The number of segments the index should be merged into (default: dynamic)
    * **`only_expunge_deletes` (Optional, boolean)**: Specify whether the operation should only expunge deleted documents
    * **`wait_for_completion` (Optional, boolean)**: Should the request wait until the force merge is completed.



### get [_get_5]

Get index information. Get information about one or more indices. For data streams, the API returns information about the stream’s backing indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get)

```ts
client.indices.get({ index })
```


### Arguments [_arguments_188]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams, indices, and index aliases used to limit the request. Wildcard expressions (*) are supported.
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard expressions can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as open,hidden.
    * **`flat_settings` (Optional, boolean)**: If true, returns settings in flat format.
    * **`ignore_unavailable` (Optional, boolean)**: If false, requests that target a missing index return an error.
    * **`include_defaults` (Optional, boolean)**: If true, return all default settings in the response.
    * **`local` (Optional, boolean)**: If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`features` (Optional, { name, description } | { name, description }[])**: Return only information on specified index features



### get_alias [_get_alias]

Get aliases. Retrieves information for one or more data stream or index aliases.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-alias)

```ts
client.indices.getAlias({ ... })
```


### Arguments [_arguments_189]

* **Request (object):**

    * **`name` (Optional, string | string[])**: List of aliases to retrieve. Supports wildcards (`*`). To retrieve all aliases, omit this parameter or use `*` or `_all`.
    * **`index` (Optional, string | string[])**: List of data streams or indices used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_data_lifecycle [_get_data_lifecycle]

Get data stream lifecycles. Retrieves the data stream lifecycle configuration of one or more data streams.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-data-lifecycle)

```ts
client.indices.getDataLifecycle({ name })
```


### Arguments [_arguments_190]

* **Request (object):**

    * **`name` (string | string[])**: List of data streams to limit the request. Supports wildcards (`*`). To target all data streams, omit this parameter or use `*` or `_all`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of data stream that wildcard patterns can match. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`include_defaults` (Optional, boolean)**: If `true`, return all default settings in the response.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_data_lifecycle_stats [_get_data_lifecycle_stats]

Get data stream lifecycle stats. Get statistics about the data streams that are managed by a data stream lifecycle.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-data-lifecycle-stats)

```ts
client.indices.getDataLifecycleStats()
```


### get_data_stream [_get_data_stream]

Get data streams. Retrieves information about one or more data streams.

[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.getDataStream({ ... })
```


### Arguments [_arguments_191]

* **Request (object):**

    * **`name` (Optional, string | string[])**: List of data stream names used to limit the request. Wildcard (`*`) expressions are supported. If omitted, all data streams are returned.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of data stream that wildcard patterns can match. Supports a list of values, such as `open,hidden`.
    * **`include_defaults` (Optional, boolean)**: If true, returns all relevant default configurations for the index template.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`verbose` (Optional, boolean)**: Whether the maximum timestamp for each data stream should be calculated and returned.



### get_field_mapping [_get_field_mapping]

Get mapping definitions. Retrieves mapping definitions for one or more fields. For data streams, the API retrieves field mappings for the stream’s backing indices.

This API is useful if you don’t need a complete mapping or if an index mapping contains a large number of fields.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-mapping)

```ts
client.indices.getFieldMapping({ fields })
```


### Arguments [_arguments_192]

* **Request (object):**

    * **`fields` (string | string[])**: List or wildcard expression of fields used to limit returned information. Supports wildcards (`*`).
    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`include_defaults` (Optional, boolean)**: If `true`, return all default settings in the response.
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only.



### get_index_template [_get_index_template]

Get index templates. Get information about one or more index templates.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-index-template)

```ts
client.indices.getIndexTemplate({ ... })
```


### Arguments [_arguments_193]

* **Request (object):**

    * **`name` (Optional, string)**: List of index template names used to limit the request. Wildcard (*) expressions are supported.
    * **`local` (Optional, boolean)**: If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node.
    * **`flat_settings` (Optional, boolean)**: If true, returns settings in flat format.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`include_defaults` (Optional, boolean)**: If true, returns all relevant default configurations for the index template.



### get_mapping [_get_mapping]

Get mapping definitions. For data streams, the API retrieves mappings for the stream’s backing indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-mapping)

```ts
client.indices.getMapping({ ... })
```


### Arguments [_arguments_194]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_migrate_reindex_status [_get_migrate_reindex_status]

Get the migration reindexing status.

Get the status of a migration reindex attempt for a data stream or index.

```ts
client.indices.getMigrateReindexStatus({ index })
```


### Arguments [_arguments_195]

* **Request (object):**

    * **`index` (string | string[])**: The index or data stream name.



### get_settings [_get_settings_2]

Get index settings. Get setting information for one or more indices. For data streams, it returns setting information for the stream’s backing indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-settings)

```ts
client.indices.getSettings({ ... })
```


### Arguments [_arguments_196]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`name` (Optional, string | string[])**: List or wildcard expression of settings to retrieve.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with foo but no index starts with `bar`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`.
    * **`flat_settings` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`include_defaults` (Optional, boolean)**: If `true`, return all default settings in the response.
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only. If `false`, information is retrieved from the master node.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_template [_get_template]

Get index templates. Get information about one or more index templates.

::::{important}
This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-template)

```ts
client.indices.getTemplate({ ... })
```


### Arguments [_arguments_197]

* **Request (object):**

    * **`name` (Optional, string | string[])**: List of index template names used to limit the request. Wildcard (`*`) expressions are supported. To return all index templates, omit this parameter or use a value of `_all` or `*`.
    * **`flat_settings` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`local` (Optional, boolean)**: If `true`, the request retrieves information from the local node only.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### migrate_reindex [_migrate_reindex]

Reindex legacy backing indices.

Reindex all legacy backing indices for a data stream. This operation occurs in a persistent task. The persistent task ID is returned immediately and the reindexing work is completed in that task.

```ts
client.indices.migrateReindex({ ... })
```


### Arguments [_arguments_198]

* **Request (object):**

    * **`reindex` (Optional, { mode, source })**



### migrate_to_data_stream [_migrate_to_data_stream]

Convert an index alias to a data stream. Converts an index alias to a data stream. You must have a matching index template that is data stream enabled. The alias must meet the following criteria: The alias must have a write index; All indices for the alias must have a `@timestamp` field mapping of a `date` or `date_nanos` field type; The alias must not have any filters; The alias must not use custom routing. If successful, the request removes the alias and creates a data stream with the same name. The indices for the alias become hidden backing indices for the stream. The write index for the alias becomes the write index for the stream.

[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.migrateToDataStream({ name })
```


### Arguments [_arguments_199]

* **Request (object):**

    * **`name` (string)**: Name of the index alias to convert to a data stream.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### modify_data_stream [_modify_data_stream]

Update data streams. Performs one or more data stream modification actions in a single atomic operation.

[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.modifyDataStream({ actions })
```


### Arguments [_arguments_200]

* **Request (object):**

    * **`actions` ({ add_backing_index, remove_backing_index }[])**: Actions to perform.



### open [_open]

Open a closed index. For data streams, the API opens any closed backing indices.

A closed index is blocked for read/write operations and does not allow all operations that opened indices allow. It is not possible to index documents or to search for documents in a closed index. This allows closed indices to not have to maintain internal data structures for indexing or searching documents, resulting in a smaller overhead on the cluster.

When opening or closing an index, the master is responsible for restarting the index shards to reflect the new state of the index. The shards will then go through the normal recovery process. The data of opened or closed indices is automatically replicated by the cluster to ensure that enough shard copies are safely kept around at all times.

You can open and close multiple indices. An error is thrown if the request explicitly refers to a missing index. This behavior can be turned off by using the `ignore_unavailable=true` parameter.

By default, you must explicitly name the indices you are opening or closing. To open or close indices with `_all`, `*`, or other wildcard expressions, change the `action.destructive_requires_name` setting to `false`. This setting can also be changed with the cluster update settings API.

Closed indices consume a significant amount of disk-space which can cause problems in managed environments. Closing indices can be turned off with the cluster settings API by setting `cluster.indices.close.enable` to `false`.

Because opening or closing an index allocates its shards, the `wait_for_active_shards` setting on index creation applies to the `_open` and `_close` index actions as well.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-open)

```ts
client.indices.open({ index })
```


### Arguments [_arguments_201]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). By default, you must explicitly name the indices you using to limit the request. To limit a request using `_all`, `*`, or other wildcard expressions, change the `action.destructive_requires_name` setting to false. You can update this setting in the `elasticsearch.yml` file or using the cluster update settings API.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### promote_data_stream [_promote_data_stream]

Promote a data stream. Promote a data stream from a replicated data stream managed by cross-cluster replication (CCR) to a regular data stream.

With CCR auto following, a data stream from a remote cluster can be replicated to the local cluster. These data streams can’t be rolled over in the local cluster. These replicated data streams roll over only if the upstream data stream rolls over. In the event that the remote cluster is no longer available, the data stream in the local cluster can be promoted to a regular data stream, which allows these data streams to be rolled over in the local cluster.

::::{note}
When promoting a data stream, ensure the local cluster has a data stream enabled index template that matches the data stream. If this is missing, the data stream will not be able to roll over until a matching index template is created. This will affect the lifecycle management of the data stream and interfere with the data stream size and retention.
::::


[Endpoint documentation](docs-content://manage-data/data-store/data-streams.md)

```ts
client.indices.promoteDataStream({ name })
```


### Arguments [_arguments_202]

* **Request (object):**

    * **`name` (string)**: The name of the data stream
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### put_alias [_put_alias]

Create or update an alias. Adds a data stream or index to an alias.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-update-aliases)

```ts
client.indices.putAlias({ index, name })
```


### Arguments [_arguments_203]

* **Request (object):**

    * **`index` (string | string[])**: List of data streams or indices to add. Supports wildcards (`*`). Wildcard patterns that match both data streams and indices return an error.
    * **`name` (string)**: Alias to update. If the alias doesn’t exist, the request creates it. Index alias names support date math.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Query used to limit documents the alias can access.
    * **`index_routing` (Optional, string)**: Value used to route indexing operations to a specific shard. If specified, this overwrites the `routing` value for indexing operations. Data stream aliases don’t support this parameter.
    * **`is_write_index` (Optional, boolean)**: If `true`, sets the write index or data stream for the alias. If an alias points to multiple indices or data streams and `is_write_index` isn’t set, the alias rejects write requests. If an index alias points to one index and `is_write_index` isn’t set, the index automatically acts as the write index. Data stream aliases don’t automatically set a write data stream, even if the alias points to one data stream.
    * **`routing` (Optional, string)**: Value used to route indexing and search operations to a specific shard. Data stream aliases don’t support this parameter.
    * **`search_routing` (Optional, string)**: Value used to route search operations to a specific shard. If specified, this overwrites the `routing` value for search operations. Data stream aliases don’t support this parameter.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### put_data_lifecycle [_put_data_lifecycle]

Update data stream lifecycles. Update the data stream lifecycle of the specified data streams.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-put-data-lifecycle)

```ts
client.indices.putDataLifecycle({ name })
```


### Arguments [_arguments_204]

* **Request (object):**

    * **`name` (string | string[])**: List of data streams used to limit the request. Supports wildcards (`*`). To target all data streams use `*` or `_all`.
    * **`lifecycle` (Optional, { data_retention, downsampling, enabled })**
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of data stream that wildcard patterns can match. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `hidden`, `open`, `closed`, `none`.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### put_index_template [_put_index_template]

Create or update an index template. Index templates define settings, mappings, and aliases that can be applied automatically to new indices.

Elasticsearch applies templates to new indices based on an wildcard pattern that matches the index name. Index templates are applied during data stream or index creation. For data streams, these settings and mappings are applied when the stream’s backing indices are created. Settings and mappings specified in a create index API request override any settings or mappings specified in an index template. Changes to index templates do not affect existing indices, including the existing backing indices of a data stream.

You can use C-style `/* *\/` block comments in index templates. You can include comments anywhere in the request body, except before the opening curly bracket.

**Multiple matching templates**

If multiple index templates match the name of a new index or data stream, the template with the highest priority is used.

Multiple templates with overlapping index patterns at the same priority are not allowed and an error will be thrown when attempting to create a template matching an existing index template at identical priorities.

**Composing aliases, mappings, and settings**

When multiple component templates are specified in the `composed_of` field for an index template, they are merged in the order specified, meaning that later component templates override earlier component templates. Any mappings, settings, or aliases from the parent index template are merged in next. Finally, any configuration on the index request itself is merged. Mapping definitions are merged recursively, which means that later mapping components can introduce new field mappings and update the mapping configuration. If a field mapping is already contained in an earlier component, its definition will be completely overwritten by the later one. This recursive merging strategy applies not only to field mappings, but also root options like `dynamic_templates` and `meta`. If an earlier component contains a `dynamic_templates` block, then by default new `dynamic_templates` entries are appended onto the end. If an entry already exists with the same key, then it is overwritten by the new definition.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-put-index-template)

```ts
client.indices.putIndexTemplate({ name })
```


### Arguments [_arguments_205]

* **Request (object):**

    * **`name` (string)**: Index or template name
    * **`index_patterns` (Optional, string | string[])**: Name of the index template to create.
    * **`composed_of` (Optional, string[])**: An ordered list of component template names. Component templates are merged in the order specified, meaning that the last component template specified has the highest precedence.
    * **`template` (Optional, { aliases, mappings, settings, lifecycle })**: Template to be applied. It may optionally include an `aliases`, `mappings`, or `settings` configuration.
    * **`data_stream` (Optional, { hidden, allow_custom_routing })**: If this object is included, the template is used to create data streams and their backing indices. Supports an empty object. Data streams require a matching index template with a `data_stream` object.
    * **`priority` (Optional, number)**: Priority to determine index template precedence when a new data stream or index is created. The index template with the highest priority is chosen. If no priority is specified the template is treated as though it is of priority 0 (lowest priority). This number is not automatically generated by Elasticsearch.
    * **`version` (Optional, number)**: Version number used to manage index templates externally. This number is not automatically generated by Elasticsearch. External systems can use these version numbers to simplify template management. To unset a version, replace the template without specifying one.
    * **`_meta` (Optional, Record<string, User-defined value>)**: Optional user metadata about the index template. It may have any contents. It is not automatically generated or used by Elasticsearch. This user-defined object is stored in the cluster state, so keeping it short is preferable To unset the metadata, replace the template without specifying it.
    * **`allow_auto_create` (Optional, boolean)**: This setting overrides the value of the `action.auto_create_index` cluster setting. If set to `true` in a template, then indices can be automatically created using that template even if auto-creation of indices is disabled via `actions.auto_create_index`. If set to `false`, then indices or data streams matching the template must always be explicitly created, and may never be automatically created.
    * **`ignore_missing_component_templates` (Optional, string[])**: The configuration option ignore_missing_component_templates can be used when an index template references a component template that might not exist
    * **`deprecated` (Optional, boolean)**: Marks this index template as deprecated. When creating or updating a non-deprecated index template that uses deprecated components, Elasticsearch will emit a deprecation warning.
    * **`create` (Optional, boolean)**: If `true`, this request cannot replace or update existing index templates.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`cause` (Optional, string)**: User defined reason for creating/updating the index template



### put_mapping [_put_mapping]

Update field mappings. Add new fields to an existing data stream or index. You can also use this API to change the search settings of existing fields and add new properties to existing object fields. For data streams, these changes are applied to all backing indices by default.

**Add multi-fields to an existing field**

Multi-fields let you index the same field in different ways. You can use this API to update the fields mapping parameter and enable multi-fields for an existing field. WARNING: If an index (or data stream) contains documents when you add a multi-field, those documents will not have values for the new multi-field. You can populate the new multi-field with the update by query API.

**Change supported mapping parameters for an existing field**

The documentation for each mapping parameter indicates whether you can update it for an existing field using this API. For example, you can use the update mapping API to update the `ignore_above` parameter.

**Change the mapping of an existing field**

Except for supported mapping parameters, you can’t change the mapping or field type of an existing field. Changing an existing field could invalidate data that’s already indexed.

If you need to change the mapping of a field in a data stream’s backing indices, refer to documentation about modifying data streams. If you need to change the mapping of a field in other indices, create a new index with the correct mapping and reindex your data into that index.

**Rename a field**

Renaming a field would invalidate data already indexed under the old field name. Instead, add an alias field to create an alternate field name.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-put-mapping)

```ts
client.indices.putMapping({ index })
```


### Arguments [_arguments_206]

* **Request (object):**

    * **`index` (string | string[])**: A list of index names the mapping should be added to (supports wildcards); use `_all` or omit to add the mapping on all indices.
    * **`date_detection` (Optional, boolean)**: Controls whether dynamic date detection is enabled.
    * **`dynamic` (Optional, Enum("strict" | "runtime" | true | false))**: Controls whether new fields are added dynamically.
    * **`dynamic_date_formats` (Optional, string[])**: If date detection is enabled then new string fields are checked against *dynamic_date_formats* and if the value matches then a new date field is added instead of string.
    * **`dynamic_templates` (Optional, Record<string, { mapping, runtime, match, path_match, unmatch, path_unmatch, match_mapping_type, unmatch_mapping_type, match_pattern }> | Record<string, { mapping, runtime, match, path_match, unmatch, path_unmatch, match_mapping_type, unmatch_mapping_type, match_pattern }>[])**: Specify dynamic templates for the mapping.
    * **`_field_names` (Optional, { enabled })**: Control whether field names are enabled for the index.
    * **`_meta` (Optional, Record<string, User-defined value>)**: A mapping type can have custom meta data associated with it. These are not used at all by Elasticsearch, but can be used to store application-specific metadata.
    * **`numeric_detection` (Optional, boolean)**: Automatically map strings into numeric data types for all fields.
    * **`properties` (Optional, Record<string, { type } | { boost, fielddata, index, null_value, type } | { type, enabled, null_value, boost, coerce, script, on_script_error, ignore_malformed, time_series_metric, analyzer, eager_global_ordinals, index, index_options, index_phrases, index_prefixes, norms, position_increment_gap, search_analyzer, search_quote_analyzer, term_vector, format, precision_step, locale } | { relations, eager_global_ordinals, type } | { boost, eager_global_ordinals, index, index_options, script, on_script_error, normalizer, norms, null_value, similarity, split_queries_on_whitespace, time_series_dimension, type } | { type, fields, meta, copy_to } | { type } | { positive_score_impact, type } | { positive_score_impact, type } | { analyzer, index, index_options, max_shingle_size, norms, search_analyzer, search_quote_analyzer, similarity, term_vector, type } | { analyzer, boost, eager_global_ordinals, fielddata, fielddata_frequency_filter, index, index_options, index_phrases, index_prefixes, norms, position_increment_gap, search_analyzer, search_quote_analyzer, similarity, term_vector, type } | { type } | { type, null_value } | { boost, format, ignore_malformed, index, null_value, precision_step, type } | { boost, fielddata, format, ignore_malformed, index, null_value, precision_step, locale, type } | { type, default_metric, metrics, time_series_metric } | { type, dims, element_type, index, index_options, similarity } | { boost, depth_limit, doc_values, eager_global_ordinals, index, index_options, null_value, similarity, split_queries_on_whitespace, type } | { enabled, include_in_parent, include_in_root, type } | { enabled, subobjects, type } | { type, enabled, priority, time_series_dimension } | { type, meta, inference_id } | { type } | { analyzer, contexts, max_input_length, preserve_position_increments, preserve_separators, search_analyzer, type } | { value, type } | { type, index } | { path, type } | { ignore_malformed, type } | { boost, index, ignore_malformed, null_value, on_script_error, script, time_series_dimension, type } | { type } | { analyzer, boost, index, null_value, enable_position_increments, type } | { ignore_malformed, ignore_z_value, null_value, index, on_script_error, script, type } | { coerce, ignore_malformed, ignore_z_value, orientation, strategy, type } | { ignore_malformed, ignore_z_value, null_value, type } | { coerce, ignore_malformed, ignore_z_value, orientation, type } | { type, null_value } | { type, null_value } | { type, null_value } | { type, null_value } | { type, null_value } | { type, null_value } | { type, null_value, scaling_factor } | { type, null_value } | { type, null_value } | { format, type } | { type } | { type } | { type } | { type } | { type } | { type, norms, index_options, index, null_value, rules, language, country, variant, strength, decomposition, alternate, case_level, case_first, numeric, variable_top, hiragana_quaternary_mode }>)**: Mapping for a field. For new fields, this mapping can include:

        * Field name
        * Field data type
        * Mapping parameters

    * **`_routing` (Optional, { required })**: Enable making a routing value required on indexed documents.
    * **`_source` (Optional, { compress, compress_threshold, enabled, excludes, includes, mode })**: Control whether the _source field is enabled on the index.
    * **`runtime` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Mapping of runtime fields for the index.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`write_index_only` (Optional, boolean)**: If `true`, the mappings are applied only to the current write index for the target.



### put_settings [_put_settings_2]

Update index settings. Changes dynamic index settings in real time. For data streams, index setting changes are applied to all backing indices by default.

To revert a setting to the default value, use a null value. The list of per-index settings that can be updated dynamically on live indices can be found in index module documentation. To preserve existing settings from being updated, set the `preserve_existing` parameter to `true`.

::::{note}
You can only define new analyzers on closed indices. To add an analyzer, you must close the index, define the analyzer, and reopen the index. You cannot close the write index of a data stream. To update the analyzer for a data stream’s write index and future backing indices, update the analyzer in the index template used by the stream. Then roll over the data stream to apply the new analyzer to the stream’s write index and future backing indices. This affects searches and any new data added to the stream after the rollover. However, it does not affect the data stream’s backing indices or their existing data. To change the analyzer for existing backing indices, you must create a new data stream and reindex your data into it.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-put-settings)

```ts
client.indices.putSettings({ ... })
```


### Arguments [_arguments_207]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`settings` (Optional, { index, mode, routing_path, soft_deletes, sort, number_of_shards, number_of_replicas, number_of_routing_shards, check_on_startup, codec, routing_partition_size, load_fixed_bitset_filters_eagerly, hidden, auto_expand_replicas, merge, search, refresh_interval, max_result_window, max_inner_result_window, max_rescore_window, max_docvalue_fields_search, max_script_fields, max_ngram_diff, max_shingle_diff, blocks, max_refresh_listeners, analyze, highlight, max_terms_count, max_regex_length, routing, gc_deletes, default_pipeline, final_pipeline, lifecycle, provided_name, creation_date, creation_date_string, uuid, version, verified_before_close, format, max_slices_per_scroll, translog, query_string, priority, top_metrics_max_size, analysis, settings, time_series, queries, similarity, mapping, indexing.slowlog, indexing_pressure, store })**
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`.
    * **`flat_settings` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, returns settings in flat format.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`preserve_existing` (Optional, boolean)**: If `true`, existing index settings remain unchanged.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### put_template [_put_template]

Create or update an index template. Index templates define settings, mappings, and aliases that can be applied automatically to new indices. Elasticsearch applies templates to new indices based on an index pattern that matches the index name.

::::{important}
This documentation is about legacy index templates, which are deprecated and will be replaced by the composable templates introduced in Elasticsearch 7.8.
::::


Composable templates always take precedence over legacy templates. If no composable template matches a new index, matching legacy templates are applied according to their order.

Index templates are only applied during index creation. Changes to index templates do not affect existing indices. Settings and mappings specified in create index API requests override any settings or mappings specified in an index template.

You can use C-style `/* *\/` block comments in index templates. You can include comments anywhere in the request body, except before the opening curly bracket.

**Indices matching multiple templates**

Multiple index templates can potentially match an index, in this case, both the settings and mappings are merged into the final configuration of the index. The order of the merging can be controlled using the order parameter, with lower order being applied first, and higher orders overriding them. NOTE: Multiple matching templates with the same order value will result in a non-deterministic merging order.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-put-template)

```ts
client.indices.putTemplate({ name })
```


### Arguments [_arguments_208]

* **Request (object):**

    * **`name` (string)**: The name of the template
    * **`aliases` (Optional, Record<string, { filter, index_routing, is_hidden, is_write_index, routing, search_routing }>)**: Aliases for the index.
    * **`index_patterns` (Optional, string | string[])**: Array of wildcard expressions used to match the names of indices during creation.
    * **`mappings` (Optional, { all_field, date_detection, dynamic, dynamic_date_formats, dynamic_templates, _field_names, index_field, _meta, numeric_detection, properties, _routing, _size, _source, runtime, enabled, subobjects, _data_stream_timestamp })**: Mapping for fields in the index.
    * **`order` (Optional, number)**: Order in which Elasticsearch applies this template if index matches multiple templates.


Templates with lower *order* values are merged first. Templates with higher *order* values are merged later, overriding templates with lower values. ** *`settings` (Optional, { index, mode, routing_path, soft_deletes, sort, number_of_shards, number_of_replicas, number_of_routing_shards, check_on_startup, codec, routing_partition_size, load_fixed_bitset_filters_eagerly, hidden, auto_expand_replicas, merge, search, refresh_interval, max_result_window, max_inner_result_window, max_rescore_window, max_docvalue_fields_search, max_script_fields, max_ngram_diff, max_shingle_diff, blocks, max_refresh_listeners, analyze, highlight, max_terms_count, max_regex_length, routing, gc_deletes, default_pipeline, final_pipeline, lifecycle, provided_name, creation_date, creation_date_string, uuid, version, verified_before_close, format, max_slices_per_scroll, translog, query_string, priority, top_metrics_max_size, analysis, settings, time_series, queries, similarity, mapping, indexing.slowlog, indexing_pressure, store })**: Configuration options for the index. *** *`version` (Optional, number)**: Version number used to manage index templates externally. This number is not automatically generated by Elasticsearch. To unset a version, replace the template without specifying one. *** *`create` (Optional, boolean)**: If true, this request cannot replace or update existing index templates. *** *`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. ** *`cause` (Optional, string)**


### recovery [_recovery_2]

Get index recovery information. Get information about ongoing and completed shard recoveries for one or more indices. For data streams, the API returns information for the stream’s backing indices.

All recoveries, whether ongoing or complete, are kept in the cluster state and may be reported on at any time.

Shard recovery is the process of initializing a shard copy, such as restoring a primary shard from a snapshot or creating a replica shard from a primary shard. When a shard recovery completes, the recovered shard is available for search and indexing.

Recovery automatically occurs during the following processes:

* When creating an index for the first time.
* When a node rejoins the cluster and starts up any missing primary shard copies using the data that it holds in its data path.
* Creation of new replica shard copies from the primary.
* Relocation of a shard copy to a different node in the same cluster.
* A snapshot restore operation.
* A clone, shrink, or split operation.

You can determine the cause of a shard recovery using the recovery or cat recovery APIs.

The index recovery API reports information about completed recoveries only for shard copies that currently exist in the cluster. It only reports the last recovery for each shard copy and does not report historical information about earlier recoveries, nor does it report information about the recoveries of shard copies that no longer exist. This means that if a shard copy completes a recovery and then Elasticsearch relocates it onto a different node then the information about the original recovery will not be shown in the recovery API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-recovery)

```ts
client.indices.recovery({ ... })
```


### Arguments [_arguments_209]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`active_only` (Optional, boolean)**: If `true`, the response only includes ongoing shard recoveries.
    * **`detailed` (Optional, boolean)**: If `true`, the response includes detailed information about shard recoveries.



### refresh [_refresh]

Refresh an index. A refresh makes recent operations performed on one or more indices available for search. For data streams, the API runs the refresh operation on the stream’s backing indices.

By default, Elasticsearch periodically refreshes indices every second, but only on indices that have received one search request or more in the last 30 seconds. You can change this default interval with the `index.refresh_interval` setting.

Refresh requests are synchronous and do not return a response until the refresh operation completes.

Refreshes are resource-intensive. To ensure good cluster performance, it’s recommended to wait for Elasticsearch’s periodic refresh rather than performing an explicit refresh when possible.

If your application workflow indexes documents and then runs a search to retrieve the indexed document, it’s recommended to use the index API’s `refresh=wait_for` query parameter option. This option ensures the indexing operation waits for a periodic refresh before running the search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-refresh)

```ts
client.indices.refresh({ ... })
```


### Arguments [_arguments_210]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.



### reload_search_analyzers [_reload_search_analyzers]

Reload search analyzers. Reload an index’s search analyzers and their resources. For data streams, the API reloads search analyzers and resources for the stream’s backing indices.

::::{important}
After reloading the search analyzers you should clear the request cache to make sure it doesn’t contain responses derived from the previous versions of the analyzer.
::::


You can use the reload search analyzers API to pick up changes to synonym files used in the `synonym_graph` or `synonym` token filter of a search analyzer. To be eligible, the token filter must have an `updateable` flag of `true` and only be used in search analyzers.

::::{note}
This API does not perform a reload for each shard of an index. Instead, it performs a reload for each node containing index shards. As a result, the total shard count returned by the API can differ from the number of index shards. Because reloading affects every node with an index shard, it is important to update the synonym file on every data node in the cluster—​including nodes that don’t contain a shard replica—​before using this API. This ensures the synonym file is updated everywhere in the cluster in case shards are relocated in the future.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-reload-search-analyzers)

```ts
client.indices.reloadSearchAnalyzers({ index })
```


### Arguments [_arguments_211]

* **Request (object):**

    * **`index` (string | string[])**: A list of index names to reload analyzers for
    * **`allow_no_indices` (Optional, boolean)**: Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`ignore_unavailable` (Optional, boolean)**: Whether specified concrete indices should be ignored when unavailable (missing or closed)



### resolve_cluster [_resolve_cluster]

Resolve the cluster. Resolve the specified index expressions to return information about each cluster, including the local cluster, if included. Multiple patterns and remote clusters are supported.

This endpoint is useful before doing a cross-cluster search in order to determine which remote clusters should be included in a search.

You use the same index expression with this endpoint as you would for cross-cluster search. Index and cluster exclusions are also supported with this endpoint.

For each cluster in the index expression, information is returned about:

* Whether the querying ("local") cluster is currently connected to each remote cluster in the index expression scope.
* Whether each remote cluster is configured with `skip_unavailable` as `true` or `false`.
* Whether there are any indices, aliases, or data streams on that cluster that match the index expression.
* Whether the search is likely to have errors returned when you do the cross-cluster search (including any authorization errors if you do not have permission to query the index).
* Cluster version information, including the Elasticsearch server version.

For example, `GET /_resolve/cluster/my-index-*,cluster*:my-index-*` returns information about the local cluster and all remotely configured clusters that start with the alias `cluster*`. Each cluster returns information about whether it has any indices, aliases or data streams that match `my-index-*`.

**Advantages of using this endpoint before a cross-cluster search**

You may want to exclude a cluster or index from a search when:

* A remote cluster is not currently connected and is configured with `skip_unavailable=false`. Running a cross-cluster search under those conditions will cause the entire search to fail.
* A cluster has no matching indices, aliases or data streams for the index expression (or your user does not have permissions to search them). For example, suppose your index expression is `logs*,remote1:logs*` and the remote1 cluster has no indices, aliases or data streams that match `logs*`. In that case, that cluster will return no results from that cluster if you include it in a cross-cluster search.
* The index expression (combined with any query parameters you specify) will likely cause an exception to be thrown when you do the search. In these cases, the "error" field in the `_resolve/cluster` response will be present. (This is also where security/permission errors will be shown.)
* A remote cluster is an older version that does not support the feature you want to use in your search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-resolve-cluster)

```ts
client.indices.resolveCluster({ name })
```


### Arguments [_arguments_212]

* **Request (object):**

    * **`name` (string | string[])**: Comma-separated name(s) or index pattern(s) of the indices, aliases, and data streams to resolve. Resources on remote clusters can be specified using the `<cluster>`:`<name>` syntax.
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_throttled` (Optional, boolean)**: If true, concrete, expanded or aliased indices are ignored when frozen. Defaults to false.
    * **`ignore_unavailable` (Optional, boolean)**: If false, the request returns an error if it targets a missing or closed index. Defaults to false.



### resolve_index [_resolve_index]

Resolve indices. Resolve the names and/or index patterns for indices, aliases, and data streams. Multiple patterns and remote clusters are supported.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-resolve-index)

```ts
client.indices.resolveIndex({ name })
```


### Arguments [_arguments_213]

* **Request (object):**

    * **`name` (string | string[])**: Comma-separated name(s) or index pattern(s) of the indices, aliases, and data streams to resolve. Resources on remote clusters can be specified using the `<cluster>`:`<name>` syntax.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting `foo*,bar*` returns an error if an index starts with `foo` but no index starts with `bar`.



### rollover [_rollover]

Roll over to a new index. TIP: It is recommended to use the index lifecycle rollover action to automate rollovers.

The rollover API creates a new index for a data stream or index alias. The API behavior depends on the rollover target.

**Roll over a data stream**

If you roll over a data stream, the API creates a new write index for the stream. The stream’s previous write index becomes a regular backing index. A rollover also increments the data stream’s generation.

**Roll over an index alias with a write index**

::::{tip}
Prior to Elasticsearch 7.9, you’d typically use an index alias with a write index to manage time series data. Data streams replace this functionality, require less maintenance, and automatically integrate with data tiers.
::::


If an index alias points to multiple indices, one of the indices must be a write index. The rollover API creates a new write index for the alias with `is_write_index` set to `true`. The API also `sets is_write_index` to `false` for the previous write index.

**Roll over an index alias with one index**

If you roll over an index alias that points to only one index, the API creates a new index for the alias and removes the original index from the alias.

::::{note}
A rollover creates a new index and is subject to the `wait_for_active_shards` setting.
::::


**Increment index names for an alias**

When you roll over an index alias, you can specify a name for the new index. If you don’t specify a name and the current index ends with `-` and a number, such as `my-index-000001` or `my-index-3`, the new index name increments that number. For example, if you roll over an alias with a current index of `my-index-000001`, the rollover creates a new index named `my-index-000002`. This number is always six characters and zero-padded, regardless of the previous index’s name.

If you use an index alias for time series data, you can use date math in the index name to track the rollover date. For example, you can create an alias that points to an index named `<my-index-{now/d}-000001>`. If you create the index on May 6, 2099, the index’s name is `my-index-2099.05.06-000001`. If you roll over the alias on May 7, 2099, the new index’s name is `my-index-2099.05.07-000002`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-rollover)

```ts
client.indices.rollover({ alias })
```


### Arguments [_arguments_214]

* **Request (object):**

    * **`alias` (string)**: Name of the data stream or index alias to roll over.
    * **`new_index` (Optional, string)**: Name of the index to create. Supports date math. Data streams do not support this parameter.
    * **`aliases` (Optional, Record<string, { filter, index_routing, is_hidden, is_write_index, routing, search_routing }>)**: Aliases for the target index. Data streams do not support this parameter.
    * **`conditions` (Optional, { min_age, max_age, max_age_millis, min_docs, max_docs, max_size, max_size_bytes, min_size, min_size_bytes, max_primary_shard_size, max_primary_shard_size_bytes, min_primary_shard_size, min_primary_shard_size_bytes, max_primary_shard_docs, min_primary_shard_docs })**: Conditions for the rollover. If specified, Elasticsearch only performs the rollover if the current index satisfies these conditions. If this parameter is not specified, Elasticsearch performs the rollover unconditionally. If conditions are specified, at least one of them must be a `max_*` condition. The index will rollover if any `max_*` condition is satisfied and all `min_*` conditions are satisfied.
    * **`mappings` (Optional, { all_field, date_detection, dynamic, dynamic_date_formats, dynamic_templates, _field_names, index_field, _meta, numeric_detection, properties, _routing, _size, _source, runtime, enabled, subobjects, _data_stream_timestamp })**: Mapping for fields in the index. If specified, this mapping can include field names, field data types, and mapping paramaters.
    * **`settings` (Optional, Record<string, User-defined value>)**: Configuration options for the index. Data streams do not support this parameter.
    * **`dry_run` (Optional, boolean)**: If `true`, checks whether the current index satisfies the specified conditions but does not perform a rollover.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to all or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### segments [_segments_2]

Get index segments. Get low-level information about the Lucene segments in index shards. For data streams, the API returns information about the stream’s backing indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-segments)

```ts
client.indices.segments({ ... })
```


### Arguments [_arguments_215]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request. Supports wildcards (`*`). To target all data streams and indices, omit this parameter or use `*` or `_all`.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.



### shard_stores [_shard_stores]

Get index shard stores. Get store information about replica shards in one or more indices. For data streams, the API retrieves store information for the stream’s backing indices.

The index shard stores API returns the following information:

* The node on which each replica shard exists.
* The allocation ID for each replica shard.
* A unique ID for each replica shard.
* Any errors encountered while opening the shard index or from an earlier failure.

By default, the API returns store information only for primary shards that are unassigned or have one or more unassigned replica shards.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-shard-stores)

```ts
client.indices.shardStores({ ... })
```


### Arguments [_arguments_216]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases used to limit the request.
    * **`allow_no_indices` (Optional, boolean)**: If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams.
    * **`ignore_unavailable` (Optional, boolean)**: If true, missing or closed indices are not included in the response.
    * **`status` (Optional, Enum("green" | "yellow" | "red" | "all") | Enum("green" | "yellow" | "red" | "all")[])**: List of shard health statuses used to limit the request.



### shrink [_shrink]

Shrink an index. Shrink an index into a new index with fewer primary shards.

Before you can shrink an index:

* The index must be read-only.
* A copy of every shard in the index must reside on the same node.
* The index must have a green health status.

To make shard allocation easier, we recommend you also remove the index’s replica shards. You can later re-add replica shards as part of the shrink operation.

The requested number of primary shards in the target index must be a factor of the number of shards in the source index. For example an index with 8 primary shards can be shrunk into 4, 2 or 1 primary shards or an index with 15 primary shards can be shrunk into 5, 3 or 1. If the number of shards in the index is a prime number it can only be shrunk into a single primary shard Before shrinking, a (primary or replica) copy of every shard in the index must be present on the same node.

The current write index on a data stream cannot be shrunk. In order to shrink the current write index, the data stream must first be rolled over so that a new write index is created and then the previous write index can be shrunk.

A shrink operation:

* Creates a new target index with the same definition as the source index, but with a smaller number of primary shards.
* Hard-links segments from the source index into the target index. If the file system does not support hard-linking, then all segments are copied into the new index, which is a much more time consuming process. Also if using multiple data paths, shards on different data paths require a full copy of segment files if they are not on the same disk since hardlinks do not work across disks.
* Recovers the target index as though it were a closed index which had just been re-opened. Recovers shards to the `.routing.allocation.initial_recovery._id` index setting.

::::{important}
Indices can only be shrunk if they satisfy the following requirements:
::::


* The target index must not exist.
* The source index must have more primary shards than the target index.
* The number of primary shards in the target index must be a factor of the number of primary shards in the source index. The source index must have more primary shards than the target index.
* The index must not contain more than 2,147,483,519 documents in total across all shards that will be shrunk into a single shard on the target index as this is the maximum number of docs that can fit into a single shard.
* The node handling the shrink process must have sufficient free disk space to accommodate a second copy of the existing index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-shrink)

```ts
client.indices.shrink({ index, target })
```


### Arguments [_arguments_217]

* **Request (object):**

    * **`index` (string)**: Name of the source index to shrink.
    * **`target` (string)**: Name of the target index to create.
    * **`aliases` (Optional, Record<string, { filter, index_routing, is_hidden, is_write_index, routing, search_routing }>)**: The key is the alias name. Index alias names support date math.
    * **`settings` (Optional, Record<string, User-defined value>)**: Configuration options for the target index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### simulate_index_template [_simulate_index_template]

Simulate an index. Get the index configuration that would be applied to the specified index from an existing index template.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-simulate-index-template)

```ts
client.indices.simulateIndexTemplate({ name })
```


### Arguments [_arguments_218]

* **Request (object):**

    * **`name` (string)**: Name of the index to simulate
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`include_defaults` (Optional, boolean)**: If true, returns all relevant default configurations for the index template.



### simulate_template [_simulate_template]

Simulate an index template. Get the index configuration that would be applied by a particular index template.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-simulate-template)

```ts
client.indices.simulateTemplate({ ... })
```


### Arguments [_arguments_219]

* **Request (object):**

    * **`name` (Optional, string)**: Name of the index template to simulate. To test a template configuration before you add it to the cluster, omit this parameter and specify the template configuration in the request body.
    * **`allow_auto_create` (Optional, boolean)**: This setting overrides the value of the `action.auto_create_index` cluster setting. If set to `true` in a template, then indices can be automatically created using that template even if auto-creation of indices is disabled via `actions.auto_create_index`. If set to `false`, then indices or data streams matching the template must always be explicitly created, and may never be automatically created.
    * **`index_patterns` (Optional, string | string[])**: Array of wildcard (`*`) expressions used to match the names of data streams and indices during creation.
    * **`composed_of` (Optional, string[])**: An ordered list of component template names. Component templates are merged in the order specified, meaning that the last component template specified has the highest precedence.
    * **`template` (Optional, { aliases, mappings, settings, lifecycle })**: Template to be applied. It may optionally include an `aliases`, `mappings`, or `settings` configuration.
    * **`data_stream` (Optional, { hidden, allow_custom_routing })**: If this object is included, the template is used to create data streams and their backing indices. Supports an empty object. Data streams require a matching index template with a `data_stream` object.
    * **`priority` (Optional, number)**: Priority to determine index template precedence when a new data stream or index is created. The index template with the highest priority is chosen. If no priority is specified the template is treated as though it is of priority 0 (lowest priority). This number is not automatically generated by Elasticsearch.
    * **`version` (Optional, number)**: Version number used to manage index templates externally. This number is not automatically generated by Elasticsearch.
    * **`_meta` (Optional, Record<string, User-defined value>)**: Optional user metadata about the index template. May have any contents. This map is not automatically generated by Elasticsearch.
    * **`ignore_missing_component_templates` (Optional, string[])**: The configuration option ignore_missing_component_templates can be used when an index template references a component template that might not exist
    * **`deprecated` (Optional, boolean)**: Marks this index template as deprecated. When creating or updating a non-deprecated index template that uses deprecated components, Elasticsearch will emit a deprecation warning.
    * **`create` (Optional, boolean)**: If true, the template passed in the body is only used if no existing templates match the same index patterns. If false, the simulation uses the template with the highest priority. Note that the template is not permanently added or updated in either case; it is only used for the simulation.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`include_defaults` (Optional, boolean)**: If true, returns all relevant default configurations for the index template.



### split [_split]

Split an index. Split an index into a new index with more primary shards. * Before you can split an index:

* The index must be read-only.
* The cluster health status must be green.

You can do make an index read-only with the following request using the add index block API:

```
PUT /my_source_index/_block/write
```

The current write index on a data stream cannot be split. In order to split the current write index, the data stream must first be rolled over so that a new write index is created and then the previous write index can be split.

The number of times the index can be split (and the number of shards that each original shard can be split into) is determined by the `index.number_of_routing_shards` setting. The number of routing shards specifies the hashing space that is used internally to distribute documents across shards with consistent hashing. For instance, a 5 shard index with `number_of_routing_shards` set to 30 (5 x 2 x 3) could be split by a factor of 2 or 3.

A split operation:

* Creates a new target index with the same definition as the source index, but with a larger number of primary shards.
* Hard-links segments from the source index into the target index. If the file system doesn’t support hard-linking, all segments are copied into the new index, which is a much more time consuming process.
* Hashes all documents again, after low level files are created, to delete documents that belong to a different shard.
* Recovers the target index as though it were a closed index which had just been re-opened.

::::{important}
Indices can only be split if they satisfy the following requirements:
::::


* The target index must not exist.
* The source index must have fewer primary shards than the target index.
* The number of primary shards in the target index must be a multiple of the number of primary shards in the source index.
* The node handling the split process must have sufficient free disk space to accommodate a second copy of the existing index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-split)

```ts
client.indices.split({ index, target })
```


### Arguments [_arguments_220]

* **Request (object):**

    * **`index` (string)**: Name of the source index to split.
    * **`target` (string)**: Name of the target index to create.
    * **`aliases` (Optional, Record<string, { filter, index_routing, is_hidden, is_write_index, routing, search_routing }>)**: Aliases for the resulting index.
    * **`settings` (Optional, Record<string, User-defined value>)**: Configuration options for the target index.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_active_shards` (Optional, number | Enum("all" | "index-setting"))**: The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index (`number_of_replicas+1`).



### stats [_stats_4]

Get index statistics. For data streams, the API retrieves statistics for the stream’s backing indices.

By default, the returned statistics are index-level with `primaries` and `total` aggregations. `primaries` are the values for only the primary shards. `total` are the accumulated values for both primary and replica shards.

To get shard-level statistics, set the `level` parameter to `shards`.

::::{note}
When moving to another node, the shard-level statistics for a shard are cleared. Although the shard is no longer part of the node, that node retains any node-level statistics to which the shard contributed.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-stats)

```ts
client.indices.stats({ ... })
```


### Arguments [_arguments_221]

* **Request (object):**

    * **`metric` (Optional, string | string[])**: Limit the information returned the specific metrics.
    * **`index` (Optional, string | string[])**: A list of index names; use `_all` or empty string to perform the operation on all indices
    * **`completion_fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in fielddata and suggest statistics.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`.
    * **`fielddata_fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in fielddata statistics.
    * **`fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in the statistics.
    * **`forbid_closed_indices` (Optional, boolean)**: If true, statistics are not collected from closed indices.
    * **`groups` (Optional, string | string[])**: List of search groups to include in the search statistics.
    * **`include_segment_file_sizes` (Optional, boolean)**: If true, the call reports the aggregated disk usage of each one of the Lucene index files (only applies if segment stats are requested).
    * **`include_unloaded_segments` (Optional, boolean)**: If true, the response includes information from segments that are not loaded into memory.
    * **`level` (Optional, Enum("cluster" | "indices" | "shards"))**: Indicates whether statistics are aggregated at the cluster, index, or shard level.



### update_aliases [_update_aliases]

Create or update an alias. Adds a data stream or index to an alias.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-update-aliases)

```ts
client.indices.updateAliases({ ... })
```


### Arguments [_arguments_222]

* **Request (object):**

    * **`actions` (Optional, { add_backing_index, remove_backing_index }[])**: Actions to perform.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### validate_query [_validate_query]

Validate a query. Validates a query without running it.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-validate-query)

```ts
client.indices.validateQuery({ ... })
```


### Arguments [_arguments_223]

* **Request (object):**

    * **`index` (Optional, string | string[])**: List of data streams, indices, and aliases to search. Supports wildcards (`*`). To search all data streams or indices, omit this parameter or use `*` or `_all`.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Query in the Lucene query string syntax.
    * **`allow_no_indices` (Optional, boolean)**: If `false`, the request returns an error if any wildcard expression, index alias, or `_all` value targets only missing or closed indices. This behavior applies even if the request targets other open indices.
    * **`all_shards` (Optional, boolean)**: If `true`, the validation is executed on all shards instead of one random shard per index.
    * **`analyzer` (Optional, string)**: Analyzer to use for the query string. This parameter can only be used when the `q` query string parameter is specified.
    * **`analyze_wildcard` (Optional, boolean)**: If `true`, wildcard and prefix queries are analyzed.
    * **`default_operator` (Optional, Enum("and" | "or"))**: The default operator for query string query: `AND` or `OR`.
    * **`df` (Optional, string)**: Field to use as default where no field prefix is given in the query string. This parameter can only be used when the `q` query string parameter is specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values, such as `open,hidden`. Valid values are: `all`, `open`, `closed`, `hidden`, `none`.
    * **`explain` (Optional, boolean)**: If `true`, the response returns detailed information if an error has occurred.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error if it targets a missing or closed index.
    * **`lenient` (Optional, boolean)**: If `true`, format-based query failures (such as providing text to a numeric field) in the query string will be ignored.
    * **`rewrite` (Optional, boolean)**: If `true`, returns a more detailed explanation showing the actual Lucene query that will be executed.
    * **`q` (Optional, string)**: Query in the Lucene query string syntax.



## inference [_inference]


### delete [_delete_6]

Delete an inference endpoint

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-inference-delete)

```ts
client.inference.delete({ inference_id })
```


### Arguments [_arguments_224]

* **Request (object):**

    * **`inference_id` (string)**: The inference Id
    * **`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The task type
    * **`dry_run` (Optional, boolean)**: When true, the endpoint is not deleted, and a list of ingest processors which reference this endpoint is returned
    * **`force` (Optional, boolean)**: When true, the inference endpoint is forcefully deleted even if it is still being used by ingest processors or semantic text fields



### get [_get_6]

Get an inference endpoint

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-inference-get)

```ts
client.inference.get({ ... })
```


### Arguments [_arguments_225]

* **Request (object):**

    * **`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The task type
    * **`inference_id` (Optional, string)**: The inference Id



### inference [_inference_2]

Perform inference on the service

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-inference-inference)

```ts
client.inference.inference({ inference_id, input })
```


### Arguments [_arguments_226]

* **Request (object):**

    * **`inference_id` (string)**: The inference Id
    * **`input` (string | string[])**: Inference input. Either a string or an array of strings.
    * **`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The task type
    * **`query` (Optional, string)**: Query input, required for rerank task. Not required for other tasks.
    * **`task_settings` (Optional, User-defined value)**: Optional task settings
    * **`timeout` (Optional, string | -1 | 0)**: Specifies the amount of time to wait for the inference request to complete.



### put [_put_2]

Create an inference endpoint. When you create an inference endpoint, the associated machine learning model is automatically deployed if it is not already running. After creating the endpoint, wait for the model deployment to complete before using it. To verify the deployment status, use the get trained model statistics API. Look for `"state": "fully_allocated"` in the response and ensure that the `"allocation_count"` matches the `"target_allocation_count"`. Avoid creating multiple endpoints for the same model unless required, as each endpoint consumes significant resources.

::::{important}
The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Mistral, Azure OpenAI, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-inference-put)

```ts
client.inference.put({ inference_id })
```


### Arguments [_arguments_227]

* **Request (object):**

    * **`inference_id` (string)**: The inference Id
    * **`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The task type
    * **`inference_config` (Optional, { service, service_settings, task_settings })**



### stream_inference [_stream_inference]

Perform streaming inference. Get real-time responses for completion tasks by delivering answers incrementally, reducing response times during computation. This API works only with the completion task type.

::::{important}
The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Azure, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs.
::::


This API requires the `monitor_inference` cluster privilege (the built-in `inference_admin` and `inference_user` roles grant this privilege). You must use a client that supports streaming.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-inference-stream-inference)

```ts
client.inference.streamInference({ inference_id, input })
```


### Arguments [_arguments_228]

* **Request (object):**

    * **`inference_id` (string)**: The unique identifier for the inference endpoint.
    * **`input` (string | string[])**: The text on which you want to perform the inference task. It can be a single string or an array.


::::{note}
Inference endpoints for the completion task type currently only support a single string as input. *** *`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The type of task that the model performs.
::::



### unified_inference [_unified_inference]

Perform inference on the service using the Unified Schema

```ts
client.inference.unifiedInference({ inference_id, messages })
```


### Arguments [_arguments_229]

* **Request (object):**

    * **`inference_id` (string)**: The inference Id
    * **`messages` ({ content, role, tool_call_id, tool_calls }[])**: A list of objects representing the conversation.
    * **`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The task type
    * **`model` (Optional, string)**: The ID of the model to use.
    * **`max_completion_tokens` (Optional, number)**: The upper bound limit for the number of tokens that can be generated for a completion request.
    * **`stop` (Optional, string[])**: A sequence of strings to control when the model should stop generating additional tokens.
    * **`temperature` (Optional, float)**: The sampling temperature to use.
    * **`tool_choice` (Optional, string | { type, function })**: Controls which tool is called by the model.
    * **`tools` (Optional, { type, function }[])**: A list of tools that the model can call.
    * **`top_p` (Optional, float)**: Nucleus sampling, an alternative to sampling with temperature.
    * **`timeout` (Optional, string | -1 | 0)**: Specifies the amount of time to wait for the inference request to complete.



### update [_update_2]

Update an inference endpoint.

Modify `task_settings`, secrets (within `service_settings`), or `num_allocations` for an inference endpoint, depending on the specific endpoint service and `task_type`.

::::{important}
The inference APIs enable you to use certain services, such as built-in machine learning models (ELSER, E5), models uploaded through Eland, Cohere, OpenAI, Azure, Google AI Studio, Google Vertex AI, Anthropic, Watsonx.ai, or Hugging Face. For built-in models and models uploaded through Eland, the inference APIs offer an alternative way to use and manage trained models. However, if you do not plan to use the inference APIs to use these models or if you want to use non-NLP models, use the machine learning trained model APIs.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-inference-update)

```ts
client.inference.update({ inference_id })
```


### Arguments [_arguments_230]

* **Request (object):**

    * **`inference_id` (string)**: The unique identifier of the inference endpoint.
    * **`task_type` (Optional, Enum("sparse_embedding" | "text_embedding" | "rerank" | "completion"))**: The type of inference task that the model performs.
    * **`inference_config` (Optional, { service, service_settings, task_settings })**



## ingest [_ingest]


### delete_geoip_database [_delete_geoip_database]

Delete GeoIP database configurations. Delete one or more IP geolocation database configurations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-delete-ip-location-database)

```ts
client.ingest.deleteGeoipDatabase({ id })
```


### Arguments [_arguments_231]

* **Request (object):**

    * **`id` (string | string[])**: A list of geoip database configurations to delete
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### delete_ip_location_database [_delete_ip_location_database]

Delete IP geolocation database configurations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-delete-ip-location-database)

```ts
client.ingest.deleteIpLocationDatabase({ id })
```


### Arguments [_arguments_232]

* **Request (object):**

    * **`id` (string | string[])**: A list of IP location database configurations.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out.



### delete_pipeline [_delete_pipeline]

Delete pipelines. Delete one or more ingest pipelines.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-delete-pipeline)

```ts
client.ingest.deletePipeline({ id })
```


### Arguments [_arguments_233]

* **Request (object):**

    * **`id` (string)**: Pipeline ID or wildcard expression of pipeline IDs used to limit the request. To delete all ingest pipelines in a cluster, use a value of `*`.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### geo_ip_stats [_geo_ip_stats]

Get GeoIP statistics. Get download statistics for GeoIP2 databases that are used with the GeoIP processor.

[Endpoint documentation](elasticsearch://reference/ingestion-tools/enrich-processor/geoip-processor.md)

```ts
client.ingest.geoIpStats()
```


### get_geoip_database [_get_geoip_database]

Get GeoIP database configurations. Get information about one or more IP geolocation database configurations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-get-ip-location-database)

```ts
client.ingest.getGeoipDatabase({ ... })
```


### Arguments [_arguments_234]

* **Request (object):**

    * **`id` (Optional, string | string[])**: List of database configuration IDs to retrieve. Wildcard (`*`) expressions are supported. To get all database configurations, omit this parameter or use `*`.



### get_ip_location_database [_get_ip_location_database]

Get IP geolocation database configurations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-get-ip-location-database)

```ts
client.ingest.getIpLocationDatabase({ ... })
```


### Arguments [_arguments_235]

* **Request (object):**

    * **`id` (Optional, string | string[])**: List of database configuration IDs to retrieve. Wildcard (`*`) expressions are supported. To get all database configurations, omit this parameter or use `*`.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out.



### get_pipeline [_get_pipeline]

Get pipelines. Get information about one or more ingest pipelines. This API returns a local reference of the pipeline.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-get-pipeline)

```ts
client.ingest.getPipeline({ ... })
```


### Arguments [_arguments_236]

* **Request (object):**

    * **`id` (Optional, string)**: List of pipeline IDs to retrieve. Wildcard (`*`) expressions are supported. To get all ingest pipelines, omit this parameter or use `*`.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`summary` (Optional, boolean)**: Return pipelines without their definitions (default: false)



### processor_grok [_processor_grok]

Run a grok processor. Extract structured fields out of a single text field within a document. You must choose which field to extract matched fields from, as well as the grok pattern you expect will match. A grok pattern is like a regular expression that supports aliased expressions that can be reused.

[Endpoint documentation](elasticsearch://reference/ingestion-tools/enrich-processor/grok-processor.md)

```ts
client.ingest.processorGrok()
```


### put_geoip_database [_put_geoip_database]

Create or update a GeoIP database configuration. Refer to the create or update IP geolocation database configuration API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-put-ip-location-database)

```ts
client.ingest.putGeoipDatabase({ id, name, maxmind })
```


### Arguments [_arguments_237]

* **Request (object):**

    * **`id` (string)**: ID of the database configuration to create or update.
    * **`name` (string)**: The provider-assigned name of the IP geolocation database to download.
    * **`maxmind` ({ account_id })**: The configuration necessary to identify which IP geolocation provider to use to download the database, as well as any provider-specific configuration necessary for such downloading. At present, the only supported provider is maxmind, and the maxmind provider requires that an account_id (string) is configured.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### put_ip_location_database [_put_ip_location_database]

Create or update an IP geolocation database configuration.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-put-ip-location-database)

```ts
client.ingest.putIpLocationDatabase({ id })
```


### Arguments [_arguments_238]

* **Request (object):**

    * **`id` (string)**: The database configuration identifier.
    * **`configuration` (Optional, { name, maxmind, ipinfo })**
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. A value of `-1` indicates that the request should never time out.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata. If no response is received before the timeout expires, the cluster metadata update still applies but the response indicates that it was not completely acknowledged. A value of `-1` indicates that the request should never time out.



### put_pipeline [_put_pipeline]

Create or update a pipeline. Changes made using this API take effect immediately.

[Endpoint documentation](docs-content://manage-data/ingest/transform-enrich/ingest-pipelines.md)

```ts
client.ingest.putPipeline({ id })
```


### Arguments [_arguments_239]

* **Request (object):**

    * **`id` (string)**: ID of the ingest pipeline to create or update.
    * **`_meta` (Optional, Record<string, User-defined value>)**: Optional metadata about the ingest pipeline. May have any contents. This map is not automatically generated by Elasticsearch.
    * **`description` (Optional, string)**: Description of the ingest pipeline.
    * **`on_failure` (Optional, { append, attachment, bytes, circle, community_id, convert, csv, date, date_index_name, dissect, dot_expander, drop, enrich, fail, fingerprint, foreach, ip_location, geo_grid, geoip, grok, gsub, html_strip, inference, join, json, kv, lowercase, network_direction, pipeline, redact, registered_domain, remove, rename, reroute, script, set, set_security_user, sort, split, terminate, trim, uppercase, urldecode, uri_parts, user_agent }[])**: Processors to run immediately after a processor failure. Each processor supports a processor-level `on_failure` value. If a processor without an `on_failure` value fails, Elasticsearch uses this pipeline-level parameter as a fallback. The processors in this parameter run sequentially in the order specified. Elasticsearch will not attempt to run the pipeline’s remaining processors.
    * **`processors` (Optional, { append, attachment, bytes, circle, community_id, convert, csv, date, date_index_name, dissect, dot_expander, drop, enrich, fail, fingerprint, foreach, ip_location, geo_grid, geoip, grok, gsub, html_strip, inference, join, json, kv, lowercase, network_direction, pipeline, redact, registered_domain, remove, rename, reroute, script, set, set_security_user, sort, split, terminate, trim, uppercase, urldecode, uri_parts, user_agent }[])**: Processors used to perform transformations on documents before indexing. Processors run sequentially in the order specified.
    * **`version` (Optional, number)**: Version number used by external systems to track ingest pipelines. This parameter is intended for external systems only. Elasticsearch does not use or validate pipeline version numbers.
    * **`deprecated` (Optional, boolean)**: Marks this ingest pipeline as deprecated. When a deprecated ingest pipeline is referenced as the default or final pipeline when creating or updating a non-deprecated index template, Elasticsearch will emit a deprecation warning.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`if_version` (Optional, number)**: Required version for optimistic concurrency control for pipeline updates



### simulate [_simulate]

Simulate a pipeline. Run an ingest pipeline against a set of provided documents. You can either specify an existing pipeline to use with the provided documents or supply a pipeline definition in the body of the request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ingest-simulate)

```ts
client.ingest.simulate({ docs })
```


### Arguments [_arguments_240]

* **Request (object):**

    * **`docs` ({ _id, _index, _source }[])**: Sample documents to test in the pipeline.
    * **`id` (Optional, string)**: Pipeline to test. If you don’t specify a `pipeline` in the request body, this parameter is required.
    * **`pipeline` (Optional, { description, on_failure, processors, version, deprecated, _meta })**: Pipeline to test. If you don’t specify the `pipeline` request path parameter, this parameter is required. If you specify both this and the request path parameter, the API only uses the request path parameter.
    * **`verbose` (Optional, boolean)**: If `true`, the response includes output data for each processor in the executed pipeline.



## license [_license]


### delete [_delete_7]

Delete the license. When the license expires, your subscription level reverts to Basic.

If the operator privileges feature is enabled, only operator users can use this API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-delete)

```ts
client.license.delete({ ... })
```


### Arguments [_arguments_241]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get [_get_7]

Get license information. Get information about your Elastic license including its type, its status, when it was issued, and when it expires.

::::{note}
If the master node is generating a new cluster state, the get license API may return a `404 Not Found` response. If you receive an unexpected 404 response after cluster startup, wait a short period and retry the request.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-get)

```ts
client.license.get({ ... })
```


### Arguments [_arguments_242]

* **Request (object):**

    * **`accept_enterprise` (Optional, boolean)**: If `true`, this parameter returns enterprise for Enterprise license types. If `false`, this parameter returns platinum for both platinum and enterprise license types. This behavior is maintained for backwards compatibility. This parameter is deprecated and will always be set to true in 8.x.
    * **`local` (Optional, boolean)**: Specifies whether to retrieve local information. The default value is `false`, which means the information is retrieved from the master node.



### get_basic_status [_get_basic_status]

Get the basic license status.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-get-basic-status)

```ts
client.license.getBasicStatus()
```


### get_trial_status [_get_trial_status]

Get the trial status.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-get-trial-status)

```ts
client.license.getTrialStatus()
```


### post [_post_2]

Update the license. You can update your license at runtime without shutting down your nodes. License updates take effect immediately. If the license you are installing does not support all of the features that were available with your previous license, however, you are notified in the response. You must then re-submit the API request with the acknowledge parameter set to true.

::::{note}
If Elasticsearch security features are enabled and you are installing a gold or higher license, you must enable TLS on the transport networking layer before you install the license. If the operator privileges feature is enabled, only operator users can use this API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-post)

```ts
client.license.post({ ... })
```


### Arguments [_arguments_243]

* **Request (object):**

    * **`license` (Optional, { expiry_date_in_millis, issue_date_in_millis, start_date_in_millis, issued_to, issuer, max_nodes, max_resource_units, signature, type, uid })**
    * **`licenses` (Optional, { expiry_date_in_millis, issue_date_in_millis, start_date_in_millis, issued_to, issuer, max_nodes, max_resource_units, signature, type, uid }[])**: A sequence of one or more JSON documents containing the license information.
    * **`acknowledge` (Optional, boolean)**: Specifies whether you acknowledge the license changes.
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### post_start_basic [_post_start_basic]

Start a basic license. Start an indefinite basic license, which gives access to all the basic features.

::::{note}
In order to start a basic license, you must not currently have a basic license.
::::


If the basic license does not support all of the features that are available with your current license, however, you are notified in the response. You must then re-submit the API request with the `acknowledge` parameter set to `true`.

To check the status of your basic license, use the get basic license API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-post-start-basic)

```ts
client.license.postStartBasic({ ... })
```


### Arguments [_arguments_244]

* **Request (object):**

    * **`acknowledge` (Optional, boolean)**: whether the user has acknowledged acknowledge messages (default: false)
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### post_start_trial [_post_start_trial]

Start a trial. Start a 30-day trial, which gives access to all subscription features.

::::{note}
You are allowed to start a trial only if your cluster has not already activated a trial for the current major product version. For example, if you have already activated a trial for v8.0, you cannot start a new trial until v9.0. You can, however, request an extended trial at [https://www.elastic.co/trialextension](https://www.elastic.co/trialextension).
::::


To check the status of your trial, use the get trial status API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-license-post-start-trial)

```ts
client.license.postStartTrial({ ... })
```


### Arguments [_arguments_245]

* **Request (object):**

    * **`acknowledge` (Optional, boolean)**: whether the user has acknowledged acknowledge messages (default: false)
    * **`type_query_string` (Optional, string)**
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



## logstash [_logstash]


### delete_pipeline [_delete_pipeline_2]

Delete a Logstash pipeline. Delete a pipeline that is used for Logstash Central Management. If the request succeeds, you receive an empty response with an appropriate status code.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-logstash-delete-pipeline)

```ts
client.logstash.deletePipeline({ id })
```


### Arguments [_arguments_246]

* **Request (object):**

    * **`id` (string)**: An identifier for the pipeline.



### get_pipeline [_get_pipeline_2]

Get Logstash pipelines. Get pipelines that are used for Logstash Central Management.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-logstash-get-pipeline)

```ts
client.logstash.getPipeline({ ... })
```


### Arguments [_arguments_247]

* **Request (object):**

    * **`id` (Optional, string | string[])**: A list of pipeline identifiers.



### put_pipeline [_put_pipeline_2]

Create or update a Logstash pipeline.

Create a pipeline that is used for Logstash Central Management. If the specified pipeline exists, it is replaced.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-logstash-put-pipeline)

```ts
client.logstash.putPipeline({ id })
```


### Arguments [_arguments_248]

* **Request (object):**

    * **`id` (string)**: An identifier for the pipeline.
    * **`pipeline` (Optional, { description, on_failure, processors, version, deprecated, _meta })**



## migration [_migration]


### deprecations [_deprecations]

Get deprecation information. Get information about different cluster, node, and index level settings that use deprecated features that will be removed or changed in the next major version.

::::{tip}
This APIs is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-migration-deprecations)

```ts
client.migration.deprecations({ ... })
```


### Arguments [_arguments_249]

* **Request (object):**

    * **`index` (Optional, string)**: Comma-separate list of data streams or indices to check. Wildcard (*) expressions are supported.



### get_feature_upgrade_status [_get_feature_upgrade_status]

Get feature migration information. Version upgrades sometimes require changes to how features store configuration information and data in system indices. Check which features need to be migrated and the status of any migrations that are in progress.

::::{tip}
This API is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-migration-get-feature-upgrade-status)

```ts
client.migration.getFeatureUpgradeStatus()
```


### post_feature_upgrade [_post_feature_upgrade]

Start the feature migration. Version upgrades sometimes require changes to how features store configuration information and data in system indices. This API starts the automatic migration process.

Some functionality might be temporarily unavailable during the migration process.

::::{tip}
The API is designed for indirect use by the Upgrade Assistant. We strongly recommend you use the Upgrade Assistant.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-migration-get-feature-upgrade-status)

```ts
client.migration.postFeatureUpgrade()
```


## ml [_ml]


### clear_trained_model_deployment_cache [_clear_trained_model_deployment_cache]

Clear trained model deployment cache. Cache will be cleared on all nodes where the trained model is assigned. A trained model deployment may have an inference cache enabled. As requests are handled by each allocated node, their responses may be cached on that individual node. Calling this API clears the caches without restarting the deployment.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-clear-trained-model-deployment-cache)

```ts
client.ml.clearTrainedModelDeploymentCache({ model_id })
```


### Arguments [_arguments_250]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.



### close_job [_close_job]

Close anomaly detection jobs. A job can be opened and closed multiple times throughout its lifecycle. A closed job cannot receive data or perform analysis operations, but you can still explore and navigate results. When you close a job, it runs housekeeping tasks such as pruning the model history, flushing buffers, calculating final results and persisting the model snapshots. Depending upon the size of the job, it could take several minutes to close and the equivalent time to re-open. After it is closed, the job has a minimal overhead on the cluster except for maintaining its meta data. Therefore it is a best practice to close jobs that are no longer required to process data. If you close an anomaly detection job whose datafeed is running, the request first tries to stop the datafeed. This behavior is equivalent to calling stop datafeed API with the same timeout and force parameters as the close job request. When a datafeed that has a specified end date stops, it automatically closes its associated job.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-close-job)

```ts
client.ml.closeJob({ job_id })
```


### Arguments [_arguments_251]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job. It can be a job identifier, a group name, or a wildcard expression. You can close multiple anomaly detection jobs in a single API request by using a group name, a list of jobs, or a wildcard expression. You can close all jobs by using `_all` or by specifying `*` as the job identifier.
    * **`allow_no_match` (Optional, boolean)**: Refer to the description for the `allow_no_match` query parameter.
    * **`force` (Optional, boolean)**: Refer to the descriptiion for the `force` query parameter.
    * **`timeout` (Optional, string | -1 | 0)**: Refer to the description for the `timeout` query parameter.



### delete_calendar [_delete_calendar]

Delete a calendar. Removes all scheduled events from a calendar, then deletes it.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-calendar)

```ts
client.ml.deleteCalendar({ calendar_id })
```


### Arguments [_arguments_252]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar.



### delete_calendar_event [_delete_calendar_event]

Delete events from a calendar.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-calendar-event)

```ts
client.ml.deleteCalendarEvent({ calendar_id, event_id })
```


### Arguments [_arguments_253]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar.
    * **`event_id` (string)**: Identifier for the scheduled event. You can obtain this identifier by using the get calendar events API.



### delete_calendar_job [_delete_calendar_job]

Delete anomaly jobs from a calendar.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-calendar-job)

```ts
client.ml.deleteCalendarJob({ calendar_id, job_id })
```


### Arguments [_arguments_254]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar.
    * **`job_id` (string | string[])**: An identifier for the anomaly detection jobs. It can be a job identifier, a group name, or a list of jobs or groups.



### delete_data_frame_analytics [_delete_data_frame_analytics]

Delete a data frame analytics job.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-data-frame-analytics)

```ts
client.ml.deleteDataFrameAnalytics({ id })
```


### Arguments [_arguments_255]

* **Request (object):**

    * **`id` (string)**: Identifier for the data frame analytics job.
    * **`force` (Optional, boolean)**: If `true`, it deletes a job that is not stopped; this method is quicker than stopping and deleting the job.
    * **`timeout` (Optional, string | -1 | 0)**: The time to wait for the job to be deleted.



### delete_datafeed [_delete_datafeed]

Delete a datafeed.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-datafeed)

```ts
client.ml.deleteDatafeed({ datafeed_id })
```


### Arguments [_arguments_256]

* **Request (object):**

    * **`datafeed_id` (string)**: A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`force` (Optional, boolean)**: Use to forcefully delete a started datafeed; this method is quicker than stopping and deleting the datafeed.



### delete_expired_data [_delete_expired_data]

Delete expired ML data. Deletes all job results, model snapshots and forecast data that have exceeded their retention days period. Machine learning state documents that are not associated with any job are also deleted. You can limit the request to a single or set of anomaly detection jobs by using a job identifier, a group name, a list of jobs, or a wildcard expression. You can delete expired data for all anomaly detection jobs by using _all, by specifying * as the <job_id>, or by omitting the <job_id>.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-expired-data)

```ts
client.ml.deleteExpiredData({ ... })
```


### Arguments [_arguments_257]

* **Request (object):**

    * **`job_id` (Optional, string)**: Identifier for an anomaly detection job. It can be a job identifier, a group name, or a wildcard expression.
    * **`requests_per_second` (Optional, float)**: The desired requests per second for the deletion processes. The default behavior is no throttling.
    * **`timeout` (Optional, string | -1 | 0)**: How long can the underlying delete processes run until they are canceled.



### delete_filter [_delete_filter]

Delete a filter. If an anomaly detection job references the filter, you cannot delete the filter. You must update or delete the job before you can delete the filter.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-filter)

```ts
client.ml.deleteFilter({ filter_id })
```


### Arguments [_arguments_258]

* **Request (object):**

    * **`filter_id` (string)**: A string that uniquely identifies a filter.



### delete_forecast [_delete_forecast]

Delete forecasts from a job. By default, forecasts are retained for 14 days. You can specify a different retention period with the `expires_in` parameter in the forecast jobs API. The delete forecast API enables you to delete one or more forecasts before they expire.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-forecast)

```ts
client.ml.deleteForecast({ job_id })
```


### Arguments [_arguments_259]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`forecast_id` (Optional, string)**: A list of forecast identifiers. If you do not specify this optional parameter or if you specify `_all` or `*` the API deletes all forecasts from the job.
    * **`allow_no_forecasts` (Optional, boolean)**: Specifies whether an error occurs when there are no forecasts. In particular, if this parameter is set to `false` and there are no forecasts associated with the job, attempts to delete all forecasts return an error.
    * **`timeout` (Optional, string | -1 | 0)**: Specifies the period of time to wait for the completion of the delete operation. When this period of time elapses, the API fails and returns an error.



### delete_job [_delete_job]

Delete an anomaly detection job. All job configuration, model state and results are deleted. It is not currently possible to delete multiple jobs using wildcards or a comma separated list. If you delete a job that has a datafeed, the request first tries to delete the datafeed. This behavior is equivalent to calling the delete datafeed API with the same timeout and force parameters as the delete job request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-job)

```ts
client.ml.deleteJob({ job_id })
```


### Arguments [_arguments_260]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`force` (Optional, boolean)**: Use to forcefully delete an opened job; this method is quicker than closing and deleting the job.
    * **`delete_user_annotations` (Optional, boolean)**: Specifies whether annotations that have been added by the user should be deleted along with any auto-generated annotations when the job is reset.
    * **`wait_for_completion` (Optional, boolean)**: Specifies whether the request should return immediately or wait until the job deletion completes.



### delete_model_snapshot [_delete_model_snapshot]

Delete a model snapshot. You cannot delete the active model snapshot. To delete that snapshot, first revert to a different one. To identify the active model snapshot, refer to the `model_snapshot_id` in the results from the get jobs API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-model-snapshot)

```ts
client.ml.deleteModelSnapshot({ job_id, snapshot_id })
```


### Arguments [_arguments_261]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`snapshot_id` (string)**: Identifier for the model snapshot.



### delete_trained_model [_delete_trained_model]

Delete an unreferenced trained model. The request deletes a trained inference model that is not referenced by an ingest pipeline.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-trained-model)

```ts
client.ml.deleteTrainedModel({ model_id })
```


### Arguments [_arguments_262]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.
    * **`force` (Optional, boolean)**: Forcefully deletes a trained model that is referenced by ingest pipelines or has a started deployment.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### delete_trained_model_alias [_delete_trained_model_alias]

Delete a trained model alias. This API deletes an existing model alias that refers to a trained model. If the model alias is missing or refers to a model other than the one identified by the `model_id`, this API returns an error.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-delete-trained-model-alias)

```ts
client.ml.deleteTrainedModelAlias({ model_alias, model_id })
```


### Arguments [_arguments_263]

* **Request (object):**

    * **`model_alias` (string)**: The model alias to delete.
    * **`model_id` (string)**: The trained model ID to which the model alias refers.



### estimate_model_memory [_estimate_model_memory]

Estimate job model memory usage. Makes an estimation of the memory usage for an anomaly detection job model. It is based on analysis configuration details for the job and cardinality estimates for the fields it references.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-ml)

```ts
client.ml.estimateModelMemory({ ... })
```


### Arguments [_arguments_264]

* **Request (object):**

    * **`analysis_config` (Optional, { bucket_span, categorization_analyzer, categorization_field_name, categorization_filters, detectors, influencers, latency, model_prune_window, multivariate_by_fields, per_partition_categorization, summary_count_field_name })**: For a list of the properties that you can specify in the `analysis_config` component of the body of this API.
    * **`max_bucket_cardinality` (Optional, Record<string, number>)**: Estimates of the highest cardinality in a single bucket that is observed for influencer fields over the time period that the job analyzes data. To produce a good answer, values must be provided for all influencer fields. Providing values for fields that are not listed as `influencers` has no effect on the estimation.
    * **`overall_cardinality` (Optional, Record<string, number>)**: Estimates of the cardinality that is observed for fields over the whole time period that the job analyzes data. To produce a good answer, values must be provided for fields referenced in the `by_field_name`, `over_field_name` and `partition_field_name` of any detectors. Providing values for other fields has no effect on the estimation. It can be omitted from the request if no detectors have a `by_field_name`, `over_field_name` or `partition_field_name`.



### evaluate_data_frame [_evaluate_data_frame]

Evaluate data frame analytics. The API packages together commonly used evaluation metrics for various types of machine learning features. This has been designed for use on indexes created by data frame analytics. Evaluation requires both a ground truth field and an analytics result field to be present.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-evaluate-data-frame)

```ts
client.ml.evaluateDataFrame({ evaluation, index })
```


### Arguments [_arguments_265]

* **Request (object):**

    * **`evaluation` ({ classification, outlier_detection, regression })**: Defines the type of evaluation you want to perform.
    * **`index` (string)**: Defines the `index` in which the evaluation will be performed.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: A query clause that retrieves a subset of data from the source index.



### explain_data_frame_analytics [_explain_data_frame_analytics]

Explain data frame analytics config. This API provides explanations for a data frame analytics config that either exists already or one that has not been created yet. The following explanations are provided: * which fields are included or not in the analysis and why, * how much memory is estimated to be required. The estimate can be used when deciding the appropriate value for model_memory_limit setting later on. If you have object fields or fields that are excluded via source filtering, they are not included in the explanation.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-explain-data-frame-analytics)

```ts
client.ml.explainDataFrameAnalytics({ ... })
```


### Arguments [_arguments_266]

* **Request (object):**

    * **`id` (Optional, string)**: Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`source` (Optional, { index, query, runtime_mappings, _source })**: The configuration of how to source the analysis data. It requires an index. Optionally, query and _source may be specified.
    * **`dest` (Optional, { index, results_field })**: The destination configuration, consisting of index and optionally results_field (ml by default).
    * **`analysis` (Optional, { classification, outlier_detection, regression })**: The analysis configuration, which contains the information necessary to perform one of the following types of analysis: classification, outlier detection, or regression.
    * **`description` (Optional, string)**: A description of the job.
    * **`model_memory_limit` (Optional, string)**: The approximate maximum amount of memory resources that are permitted for analytical processing. If your `elasticsearch.yml` file contains an `xpack.ml.max_model_memory_limit` setting, an error occurs when you try to create data frame analytics jobs that have `model_memory_limit` values greater than that setting.
    * **`max_num_threads` (Optional, number)**: The maximum number of threads to be used by the analysis. Using more threads may decrease the time necessary to complete the analysis at the cost of using more CPU. Note that the process may use additional threads for operational functionality other than the analysis itself.
    * **`analyzed_fields` (Optional, { includes, excludes })**: Specify includes and/or excludes patterns to select which fields will be included in the analysis. The patterns specified in excludes are applied last, therefore excludes takes precedence. In other words, if the same field is specified in both includes and excludes, then the field will not be included in the analysis.
    * **`allow_lazy_start` (Optional, boolean)**: Specifies whether this job can start when there is insufficient machine learning node capacity for it to be immediately assigned to a node.



### flush_job [_flush_job]

Force buffered data to be processed. The flush jobs API is only applicable when sending data for analysis using the post data API. Depending on the content of the buffer, then it might additionally calculate new results. Both flush and close operations are similar, however the flush is more efficient if you are expecting to send more data for analysis. When flushing, the job remains open and is available to continue analyzing data. A close operation additionally prunes and persists the model state to disk and the job must be opened again before analyzing further data.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-flush-job)

```ts
client.ml.flushJob({ job_id })
```


### Arguments [_arguments_267]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`advance_time` (Optional, string | Unit)**: Refer to the description for the `advance_time` query parameter.
    * **`calc_interim` (Optional, boolean)**: Refer to the description for the `calc_interim` query parameter.
    * **`end` (Optional, string | Unit)**: Refer to the description for the `end` query parameter.
    * **`skip_time` (Optional, string | Unit)**: Refer to the description for the `skip_time` query parameter.
    * **`start` (Optional, string | Unit)**: Refer to the description for the `start` query parameter.



### forecast [_forecast]

Predict future behavior of a time series.

Forecasts are not supported for jobs that perform population analysis; an error occurs if you try to create a forecast for a job that has an `over_field_name` in its configuration. Forcasts predict future behavior based on historical data.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-forecast)

```ts
client.ml.forecast({ job_id })
```


### Arguments [_arguments_268]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job. The job must be open when you create a forecast; otherwise, an error occurs.
    * **`duration` (Optional, string | -1 | 0)**: Refer to the description for the `duration` query parameter.
    * **`expires_in` (Optional, string | -1 | 0)**: Refer to the description for the `expires_in` query parameter.
    * **`max_model_memory` (Optional, string)**: Refer to the description for the `max_model_memory` query parameter.



### get_buckets [_get_buckets]

Get anomaly detection job results for buckets. The API presents a chronological view of the records, grouped by bucket.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-buckets)

```ts
client.ml.getBuckets({ job_id })
```


### Arguments [_arguments_269]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`timestamp` (Optional, string | Unit)**: The timestamp of a single bucket result. If you do not specify this parameter, the API returns information about all buckets.
    * **`anomaly_score` (Optional, number)**: Refer to the description for the `anomaly_score` query parameter.
    * **`desc` (Optional, boolean)**: Refer to the description for the `desc` query parameter.
    * **`end` (Optional, string | Unit)**: Refer to the description for the `end` query parameter.
    * **`exclude_interim` (Optional, boolean)**: Refer to the description for the `exclude_interim` query parameter.
    * **`expand` (Optional, boolean)**: Refer to the description for the `expand` query parameter.
    * **`page` (Optional, { from, size })**
    * **`sort` (Optional, string)**: Refer to the desription for the `sort` query parameter.
    * **`start` (Optional, string | Unit)**: Refer to the description for the `start` query parameter.
    * **`from` (Optional, number)**: Skips the specified number of buckets.
    * **`size` (Optional, number)**: Specifies the maximum number of buckets to obtain.



### get_calendar_events [_get_calendar_events]

Get info about events in calendars.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-calendar-events)

```ts
client.ml.getCalendarEvents({ calendar_id })
```


### Arguments [_arguments_270]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar. You can get information for multiple calendars by using a list of ids or a wildcard expression. You can get information for all calendars by using `_all` or `*` or by omitting the calendar identifier.
    * **`end` (Optional, string | Unit)**: Specifies to get events with timestamps earlier than this time.
    * **`from` (Optional, number)**: Skips the specified number of events.
    * **`job_id` (Optional, string)**: Specifies to get events for a specific anomaly detection job identifier or job group. It must be used with a calendar identifier of `_all` or `*`.
    * **`size` (Optional, number)**: Specifies the maximum number of events to obtain.
    * **`start` (Optional, string | Unit)**: Specifies to get events with timestamps after this time.



### get_calendars [_get_calendars]

Get calendar configuration info.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-calendars)

```ts
client.ml.getCalendars({ ... })
```


### Arguments [_arguments_271]

* **Request (object):**

    * **`calendar_id` (Optional, string)**: A string that uniquely identifies a calendar. You can get information for multiple calendars by using a list of ids or a wildcard expression. You can get information for all calendars by using `_all` or `*` or by omitting the calendar identifier.
    * **`page` (Optional, { from, size })**: This object is supported only when you omit the calendar identifier.
    * **`from` (Optional, number)**: Skips the specified number of calendars. This parameter is supported only when you omit the calendar identifier.
    * **`size` (Optional, number)**: Specifies the maximum number of calendars to obtain. This parameter is supported only when you omit the calendar identifier.



### get_categories [_get_categories]

Get anomaly detection job results for categories.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-categories)

```ts
client.ml.getCategories({ job_id })
```


### Arguments [_arguments_272]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`category_id` (Optional, string)**: Identifier for the category, which is unique in the job. If you specify neither the category ID nor the partition_field_value, the API returns information about all categories. If you specify only the partition_field_value, it returns information about all categories for the specified partition.
    * **`page` (Optional, { from, size })**: Configures pagination. This parameter has the `from` and `size` properties.
    * **`from` (Optional, number)**: Skips the specified number of categories.
    * **`partition_field_value` (Optional, string)**: Only return categories for the specified partition.
    * **`size` (Optional, number)**: Specifies the maximum number of categories to obtain.



### get_data_frame_analytics [_get_data_frame_analytics]

Get data frame analytics job configuration info. You can get information for multiple data frame analytics jobs in a single API request by using a list of data frame analytics jobs or a wildcard expression.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-data-frame-analytics)

```ts
client.ml.getDataFrameAnalytics({ ... })
```


### Arguments [_arguments_273]

* **Request (object):**

    * **`id` (Optional, string)**: Identifier for the data frame analytics job. If you do not specify this option, the API returns information for the first hundred data frame analytics jobs.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no data frame analytics jobs that match.
        2. Contains the `_all` string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


The default value returns an empty data_frame_analytics array when there are no matches and the subset of results when there are partial matches. If this parameter is `false`, the request returns a 404 status code when there are no matches or only partial matches. ** *`from` (Optional, number)**: Skips the specified number of data frame analytics jobs. *** *`size` (Optional, number)**: Specifies the maximum number of data frame analytics jobs to obtain. ** *`exclude_generated` (Optional, boolean)**: Indicates if certain fields should be removed from the configuration on retrieval. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster.


### get_data_frame_analytics_stats [_get_data_frame_analytics_stats]

Get data frame analytics jobs usage info.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-data-frame-analytics-stats)

```ts
client.ml.getDataFrameAnalyticsStats({ ... })
```


### Arguments [_arguments_274]

* **Request (object):**

    * **`id` (Optional, string)**: Identifier for the data frame analytics job. If you do not specify this option, the API returns information for the first hundred data frame analytics jobs.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no data frame analytics jobs that match.
        2. Contains the `_all` string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


The default value returns an empty data_frame_analytics array when there are no matches and the subset of results when there are partial matches. If this parameter is `false`, the request returns a 404 status code when there are no matches or only partial matches. ** *`from` (Optional, number)**: Skips the specified number of data frame analytics jobs. *** *`size` (Optional, number)**: Specifies the maximum number of data frame analytics jobs to obtain. ** *`verbose` (Optional, boolean)**: Defines whether the stats response should be verbose.


### get_datafeed_stats [_get_datafeed_stats]

Get datafeeds usage info. You can get statistics for multiple datafeeds in a single API request by using a list of datafeeds or a wildcard expression. You can get statistics for all datafeeds by using `_all`, by specifying `*` as the `<feed_id>`, or by omitting the `<feed_id>`. If the datafeed is stopped, the only information you receive is the `datafeed_id` and the `state`. This API returns a maximum of 10,000 datafeeds.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-datafeed-stats)

```ts
client.ml.getDatafeedStats({ ... })
```


### Arguments [_arguments_275]

* **Request (object):**

    * **`datafeed_id` (Optional, string | string[])**: Identifier for the datafeed. It can be a datafeed identifier or a wildcard expression. If you do not specify one of these options, the API returns information about all datafeeds.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no datafeeds that match.
        2. Contains the `_all` string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


The default value is `true`, which returns an empty `datafeeds` array when there are no matches and the subset of results when there are partial matches. If this parameter is `false`, the request returns a `404` status code when there are no matches or only partial matches.


### get_datafeeds [_get_datafeeds]

Get datafeeds configuration info. You can get information for multiple datafeeds in a single API request by using a list of datafeeds or a wildcard expression. You can get information for all datafeeds by using `_all`, by specifying `*` as the `<feed_id>`, or by omitting the `<feed_id>`. This API returns a maximum of 10,000 datafeeds.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-datafeeds)

```ts
client.ml.getDatafeeds({ ... })
```


### Arguments [_arguments_276]

* **Request (object):**

    * **`datafeed_id` (Optional, string | string[])**: Identifier for the datafeed. It can be a datafeed identifier or a wildcard expression. If you do not specify one of these options, the API returns information about all datafeeds.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no datafeeds that match.
        2. Contains the `_all` string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


The default value is `true`, which returns an empty `datafeeds` array when there are no matches and the subset of results when there are partial matches. If this parameter is `false`, the request returns a `404` status code when there are no matches or only partial matches. *** *`exclude_generated` (Optional, boolean)**: Indicates if certain fields should be removed from the configuration on retrieval. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster.


### get_filters [_get_filters]

Get filters. You can get a single filter or all filters.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-filters)

```ts
client.ml.getFilters({ ... })
```


### Arguments [_arguments_277]

* **Request (object):**

    * **`filter_id` (Optional, string | string[])**: A string that uniquely identifies a filter.
    * **`from` (Optional, number)**: Skips the specified number of filters.
    * **`size` (Optional, number)**: Specifies the maximum number of filters to obtain.



### get_influencers [_get_influencers]

Get anomaly detection job results for influencers. Influencers are the entities that have contributed to, or are to blame for, the anomalies. Influencer results are available only if an `influencer_field_name` is specified in the job configuration.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-influencers)

```ts
client.ml.getInfluencers({ job_id })
```


### Arguments [_arguments_278]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`page` (Optional, { from, size })**: Configures pagination. This parameter has the `from` and `size` properties.
    * **`desc` (Optional, boolean)**: If true, the results are sorted in descending order.
    * **`end` (Optional, string | Unit)**: Returns influencers with timestamps earlier than this time. The default value means it is unset and results are not limited to specific timestamps.
    * **`exclude_interim` (Optional, boolean)**: If true, the output excludes interim results. By default, interim results are included.
    * **`influencer_score` (Optional, number)**: Returns influencers with anomaly scores greater than or equal to this value.
    * **`from` (Optional, number)**: Skips the specified number of influencers.
    * **`size` (Optional, number)**: Specifies the maximum number of influencers to obtain.
    * **`sort` (Optional, string)**: Specifies the sort field for the requested influencers. By default, the influencers are sorted by the `influencer_score` value.
    * **`start` (Optional, string | Unit)**: Returns influencers with timestamps after this time. The default value means it is unset and results are not limited to specific timestamps.



### get_job_stats [_get_job_stats]

Get anomaly detection jobs usage info.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-job-stats)

```ts
client.ml.getJobStats({ ... })
```


### Arguments [_arguments_279]

* **Request (object):**

    * **`job_id` (Optional, string)**: Identifier for the anomaly detection job. It can be a job identifier, a group name, a list of jobs, or a wildcard expression. If you do not specify one of these options, the API returns information for all anomaly detection jobs.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no jobs that match.
        2. Contains the _all string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


If `true`, the API returns an empty `jobs` array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a `404` status code when there are no matches or only partial matches.


### get_jobs [_get_jobs]

Get anomaly detection jobs configuration info. You can get information for multiple anomaly detection jobs in a single API request by using a group name, a list of jobs, or a wildcard expression. You can get information for all anomaly detection jobs by using `_all`, by specifying `*` as the `<job_id>`, or by omitting the `<job_id>`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-jobs)

```ts
client.ml.getJobs({ ... })
```


### Arguments [_arguments_280]

* **Request (object):**

    * **`job_id` (Optional, string | string[])**: Identifier for the anomaly detection job. It can be a job identifier, a group name, or a wildcard expression. If you do not specify one of these options, the API returns information for all anomaly detection jobs.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no jobs that match.
        2. Contains the _all string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


The default value is `true`, which returns an empty `jobs` array when there are no matches and the subset of results when there are partial matches. If this parameter is `false`, the request returns a `404` status code when there are no matches or only partial matches. *** *`exclude_generated` (Optional, boolean)**: Indicates if certain fields should be removed from the configuration on retrieval. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster.


### get_memory_stats [_get_memory_stats]

Get machine learning memory usage info. Get information about how machine learning jobs and trained models are using memory, on each node, both within the JVM heap, and natively, outside of the JVM.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-memory-stats)

```ts
client.ml.getMemoryStats({ ... })
```


### Arguments [_arguments_281]

* **Request (object):**

    * **`node_id` (Optional, string)**: The names of particular nodes in the cluster to target. For example, `nodeId1,nodeId2` or `ml:true`
    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_model_snapshot_upgrade_stats [_get_model_snapshot_upgrade_stats]

Get anomaly detection job model snapshot upgrade usage info.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-model-snapshot-upgrade-stats)

```ts
client.ml.getModelSnapshotUpgradeStats({ job_id, snapshot_id })
```


### Arguments [_arguments_282]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`snapshot_id` (string)**: A numerical character string that uniquely identifies the model snapshot. You can get information for multiple snapshots by using a list or a wildcard expression. You can get all snapshots by using `_all`, by specifying `*` as the snapshot ID, or by omitting the snapshot ID.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        * Contains wildcard expressions and there are no jobs that match.
        * Contains the _all string or no identifiers and there are no matches.
        * Contains wildcard expressions and there are only partial matches.


The default value is true, which returns an empty jobs array when there are no matches and the subset of results when there are partial matches. If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches.


### get_model_snapshots [_get_model_snapshots]

Get model snapshots info.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-model-snapshots)

```ts
client.ml.getModelSnapshots({ job_id })
```


### Arguments [_arguments_283]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`snapshot_id` (Optional, string)**: A numerical character string that uniquely identifies the model snapshot. You can get information for multiple snapshots by using a list or a wildcard expression. You can get all snapshots by using `_all`, by specifying `*` as the snapshot ID, or by omitting the snapshot ID.
    * **`desc` (Optional, boolean)**: Refer to the description for the `desc` query parameter.
    * **`end` (Optional, string | Unit)**: Refer to the description for the `end` query parameter.
    * **`page` (Optional, { from, size })**
    * **`sort` (Optional, string)**: Refer to the description for the `sort` query parameter.
    * **`start` (Optional, string | Unit)**: Refer to the description for the `start` query parameter.
    * **`from` (Optional, number)**: Skips the specified number of snapshots.
    * **`size` (Optional, number)**: Specifies the maximum number of snapshots to obtain.



### get_overall_buckets [_get_overall_buckets]

Get overall bucket results.

Retrievs overall bucket results that summarize the bucket results of multiple anomaly detection jobs.

The `overall_score` is calculated by combining the scores of all the buckets within the overall bucket span. First, the maximum `anomaly_score` per anomaly detection job in the overall bucket is calculated. Then the `top_n` of those scores are averaged to result in the `overall_score`. This means that you can fine-tune the `overall_score` so that it is more or less sensitive to the number of jobs that detect an anomaly at the same time. For example, if you set `top_n` to `1`, the `overall_score` is the maximum bucket score in the overall bucket. Alternatively, if you set `top_n` to the number of jobs, the `overall_score` is high only when all jobs detect anomalies in that overall bucket. If you set the `bucket_span` parameter (to a value greater than its default), the `overall_score` is the maximum `overall_score` of the overall buckets that have a span equal to the jobs' largest bucket span.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-overall-buckets)

```ts
client.ml.getOverallBuckets({ job_id })
```


### Arguments [_arguments_284]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job. It can be a job identifier, a group name, a list of jobs or groups, or a wildcard expression.


You can summarize the bucket results for all anomaly detection jobs by using `_all` or by specifying `*` as the `<job_id>`. ** *`allow_no_match` (Optional, boolean)**: Refer to the description for the `allow_no_match` query parameter. *** *`bucket_span` (Optional, string | -1 | 0)**: Refer to the description for the `bucket_span` query parameter. *** *`end` (Optional, string | Unit)**: Refer to the description for the `end` query parameter. *** *`exclude_interim` (Optional, boolean)**: Refer to the description for the `exclude_interim` query parameter. *** *`overall_score` (Optional, number | string)**: Refer to the description for the `overall_score` query parameter. *** *`start` (Optional, string | Unit)**: Refer to the description for the `start` query parameter. ** *`top_n` (Optional, number)**: Refer to the description for the `top_n` query parameter.


### get_records [_get_records]

Get anomaly records for an anomaly detection job. Records contain the detailed analytical results. They describe the anomalous activity that has been identified in the input data based on the detector configuration. There can be many anomaly records depending on the characteristics and size of the input data. In practice, there are often too many to be able to manually process them. The machine learning features therefore perform a sophisticated aggregation of the anomaly records into buckets. The number of record results depends on the number of anomalies found in each bucket, which relates to the number of time series being modeled and the number of detectors.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-records)

```ts
client.ml.getRecords({ job_id })
```


### Arguments [_arguments_285]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`desc` (Optional, boolean)**: Refer to the description for the `desc` query parameter.
    * **`end` (Optional, string | Unit)**: Refer to the description for the `end` query parameter.
    * **`exclude_interim` (Optional, boolean)**: Refer to the description for the `exclude_interim` query parameter.
    * **`page` (Optional, { from, size })**
    * **`record_score` (Optional, number)**: Refer to the description for the `record_score` query parameter.
    * **`sort` (Optional, string)**: Refer to the description for the `sort` query parameter.
    * **`start` (Optional, string | Unit)**: Refer to the description for the `start` query parameter.
    * **`from` (Optional, number)**: Skips the specified number of records.
    * **`size` (Optional, number)**: Specifies the maximum number of records to obtain.



### get_trained_models [_get_trained_models]

Get trained model configuration info.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-trained-models)

```ts
client.ml.getTrainedModels({ ... })
```


### Arguments [_arguments_286]

* **Request (object):**

    * **`model_id` (Optional, string | string[])**: The unique identifier of the trained model or a model alias.


You can get information for multiple trained models in a single API request by using a list of model IDs or a wildcard expression. *** *`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

* Contains wildcard expressions and there are no models that match.
* Contains the _all string or no identifiers and there are no matches.
* Contains wildcard expressions and there are only partial matches.

If true, it returns an empty array when there are no matches and the subset of results when there are partial matches. ** *`decompress_definition` (Optional, boolean)**: Specifies whether the included model definition should be returned as a JSON map (true) or in a custom compressed format (false). *** *`exclude_generated` (Optional, boolean)**: Indicates if certain fields should be removed from the configuration on retrieval. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster. *** *`from` (Optional, number)**: Skips the specified number of models. *** *`include` (Optional, Enum("definition" | "feature_importance_baseline" | "hyperparameters" | "total_feature_importance" | "definition_status"))**: A comma delimited string of optional fields to include in the response body. *** *`include_model_definition` (Optional, boolean)**: parameter is deprecated! Use [include=definition] instead *** *`size` (Optional, number)**: Specifies the maximum number of models to obtain. ** *`tags` (Optional, string | string[])**: A comma delimited string of tags. A trained model can have many tags, or none. When supplied, only trained models that contain all the supplied tags are returned.


### get_trained_models_stats [_get_trained_models_stats]

Get trained models usage info. You can get usage information for multiple trained models in a single API request by using a list of model IDs or a wildcard expression.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-get-trained-models-stats)

```ts
client.ml.getTrainedModelsStats({ ... })
```


### Arguments [_arguments_287]

* **Request (object):**

    * **`model_id` (Optional, string | string[])**: The unique identifier of the trained model or a model alias. It can be a list or a wildcard expression.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        * Contains wildcard expressions and there are no models that match.
        * Contains the _all string or no identifiers and there are no matches.
        * Contains wildcard expressions and there are only partial matches.


If true, it returns an empty array when there are no matches and the subset of results when there are partial matches. ** *`from` (Optional, number)**: Skips the specified number of models. ** *`size` (Optional, number)**: Specifies the maximum number of models to obtain.


### infer_trained_model [_infer_trained_model]

Evaluate a trained model.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-infer-trained-model)

```ts
client.ml.inferTrainedModel({ model_id, docs })
```


### Arguments [_arguments_288]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.
    * **`docs` (Record<string, User-defined value>[])**: An array of objects to pass to the model for inference. The objects should contain a fields matching your configured trained model input. Typically, for NLP models, the field name is `text_field`. Currently, for NLP models, only a single value is allowed.
    * **`inference_config` (Optional, { regression, classification, text_classification, zero_shot_classification, fill_mask, ner, pass_through, text_embedding, text_expansion, question_answering })**: The inference configuration updates to apply on the API call
    * **`timeout` (Optional, string | -1 | 0)**: Controls the amount of time to wait for inference results.



### info [_info_3]

Get machine learning information. Get defaults and limits used by machine learning. This endpoint is designed to be used by a user interface that needs to fully understand machine learning configurations where some options are not specified, meaning that the defaults should be used. This endpoint may be used to find out what those defaults are. It also provides information about the maximum size of machine learning jobs that could run in the current cluster configuration.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-info)

```ts
client.ml.info()
```


### open_job [_open_job]

Open anomaly detection jobs. An anomaly detection job must be opened to be ready to receive and analyze data. It can be opened and closed multiple times throughout its lifecycle. When you open a new job, it starts with an empty model. When you open an existing job, the most recent model state is automatically loaded. The job is ready to resume its analysis from where it left off, once new data is received.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-open-job)

```ts
client.ml.openJob({ job_id })
```


### Arguments [_arguments_289]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`timeout` (Optional, string | -1 | 0)**: Refer to the description for the `timeout` query parameter.



### post_calendar_events [_post_calendar_events]

Add scheduled events to the calendar.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-post-calendar-events)

```ts
client.ml.postCalendarEvents({ calendar_id, events })
```


### Arguments [_arguments_290]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar.
    * **`events` ({ calendar_id, event_id, description, end_time, start_time, skip_result, skip_model_update, force_time_shift }[])**: A list of one of more scheduled events. The event’s start and end times can be specified as integer milliseconds since the epoch or as a string in ISO 8601 format.



### post_data [_post_data]

Send data to an anomaly detection job for analysis.

::::{important}
For each job, data can be accepted from only a single connection at a time. It is not currently possible to post data to multiple jobs using wildcards or a list.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-post-data)

```ts
client.ml.postData({ job_id })
```


### Arguments [_arguments_291]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job. The job must have a state of open to receive and process the data.
    * **`data` (Optional, TData[])**
    * **`reset_end` (Optional, string | Unit)**: Specifies the end of the bucket resetting range.
    * **`reset_start` (Optional, string | Unit)**: Specifies the start of the bucket resetting range.



### preview_data_frame_analytics [_preview_data_frame_analytics]

Preview features used by data frame analytics. Previews the extracted features used by a data frame analytics config.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-preview-data-frame-analytics)

```ts
client.ml.previewDataFrameAnalytics({ ... })
```


### Arguments [_arguments_292]

* **Request (object):**

    * **`id` (Optional, string)**: Identifier for the data frame analytics job.
    * **`config` (Optional, { source, analysis, model_memory_limit, max_num_threads, analyzed_fields })**: A data frame analytics config as described in create data frame analytics jobs. Note that `id` and `dest` don’t need to be provided in the context of this API.



### preview_datafeed [_preview_datafeed]

Preview a datafeed. This API returns the first "page" of search results from a datafeed. You can preview an existing datafeed or provide configuration details for a datafeed and anomaly detection job in the API. The preview shows the structure of the data that will be passed to the anomaly detection engine. IMPORTANT: When Elasticsearch security features are enabled, the preview uses the credentials of the user that called the API. However, when the datafeed starts it uses the roles of the last user that created or updated the datafeed. To get a preview that accurately reflects the behavior of the datafeed, use the appropriate credentials. You can also use secondary authorization headers to supply the credentials.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-preview-datafeed)

```ts
client.ml.previewDatafeed({ ... })
```


### Arguments [_arguments_293]

* **Request (object):**

    * **`datafeed_id` (Optional, string)**: A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters. NOTE: If you use this path parameter, you cannot provide datafeed or anomaly detection job configuration details in the request body.
    * **`datafeed_config` (Optional, { aggregations, chunking_config, datafeed_id, delayed_data_check_config, frequency, indices, indices_options, job_id, max_empty_searches, query, query_delay, runtime_mappings, script_fields, scroll_size })**: The datafeed definition to preview.
    * **`job_config` (Optional, { allow_lazy_open, analysis_config, analysis_limits, background_persist_interval, custom_settings, daily_model_snapshot_retention_after_days, data_description, datafeed_config, description, groups, job_id, job_type, model_plot_config, model_snapshot_retention_days, renormalization_window_days, results_index_name, results_retention_days })**: The configuration details for the anomaly detection job that is associated with the datafeed. If the `datafeed_config` object does not include a `job_id` that references an existing anomaly detection job, you must supply this `job_config` object. If you include both a `job_id` and a `job_config`, the latter information is used. You cannot specify a `job_config` object unless you also supply a `datafeed_config` object.
    * **`start` (Optional, string | Unit)**: The start time from where the datafeed preview should begin
    * **`end` (Optional, string | Unit)**: The end time when the datafeed preview should stop



### put_calendar [_put_calendar]

Create a calendar.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-calendar)

```ts
client.ml.putCalendar({ calendar_id })
```


### Arguments [_arguments_294]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar.
    * **`job_ids` (Optional, string[])**: An array of anomaly detection job identifiers.
    * **`description` (Optional, string)**: A description of the calendar.



### put_calendar_job [_put_calendar_job]

Add anomaly detection job to calendar.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-calendar-job)

```ts
client.ml.putCalendarJob({ calendar_id, job_id })
```


### Arguments [_arguments_295]

* **Request (object):**

    * **`calendar_id` (string)**: A string that uniquely identifies a calendar.
    * **`job_id` (string | string[])**: An identifier for the anomaly detection jobs. It can be a job identifier, a group name, or a list of jobs or groups.



### put_data_frame_analytics [_put_data_frame_analytics]

Create a data frame analytics job. This API creates a data frame analytics job that performs an analysis on the source indices and stores the outcome in a destination index. By default, the query used in the source configuration is `{"match_all": {}}`.

If the destination index does not exist, it is created automatically when you start the job.

If you supply only a subset of the regression or classification parameters, hyperparameter optimization occurs. It determines a value for each of the undefined parameters.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-data-frame-analytics)

```ts
client.ml.putDataFrameAnalytics({ id, analysis, dest, source })
```


### Arguments [_arguments_296]

* **Request (object):**

    * **`id` (string)**: Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`analysis` ({ classification, outlier_detection, regression })**: The analysis configuration, which contains the information necessary to perform one of the following types of analysis: classification, outlier detection, or regression.
    * **`dest` ({ index, results_field })**: The destination configuration.
    * **`source` ({ index, query, runtime_mappings, _source })**: The configuration of how to source the analysis data.
    * **`allow_lazy_start` (Optional, boolean)**: Specifies whether this job can start when there is insufficient machine learning node capacity for it to be immediately assigned to a node. If set to `false` and a machine learning node with capacity to run the job cannot be immediately found, the API returns an error. If set to `true`, the API does not return an error; the job waits in the `starting` state until sufficient machine learning node capacity is available. This behavior is also affected by the cluster-wide `xpack.ml.max_lazy_ml_nodes` setting.
    * **`analyzed_fields` (Optional, { includes, excludes })**: Specifies `includes` and/or `excludes` patterns to select which fields will be included in the analysis. The patterns specified in `excludes` are applied last, therefore `excludes` takes precedence. In other words, if the same field is specified in both `includes` and `excludes`, then the field will not be included in the analysis. If `analyzed_fields` is not set, only the relevant fields will be included. For example, all the numeric fields for outlier detection. The supported fields vary for each type of analysis. Outlier detection requires numeric or `boolean` data to analyze. The algorithms don’t support missing values therefore fields that have data types other than numeric or boolean are ignored. Documents where included fields contain missing values, null values, or an array are also ignored. Therefore the `dest` index may contain documents that don’t have an outlier score. Regression supports fields that are numeric, `boolean`, `text`, `keyword`, and `ip` data types. It is also tolerant of missing values. Fields that are supported are included in the analysis, other fields are ignored. Documents where included fields contain an array with two or more values are also ignored. Documents in the `dest` index that don’t contain a results field are not included in the regression analysis. Classification supports fields that are numeric, `boolean`, `text`, `keyword`, and `ip` data types. It is also tolerant of missing values. Fields that are supported are included in the analysis, other fields are ignored. Documents where included fields contain an array with two or more values are also ignored. Documents in the `dest` index that don’t contain a results field are not included in the classification analysis. Classification analysis can be improved by mapping ordinal variable values to a single number. For example, in case of age ranges, you can model the values as `0-14 = 0`, `15-24 = 1`, `25-34 = 2`, and so on.
    * **`description` (Optional, string)**: A description of the job.
    * **`max_num_threads` (Optional, number)**: The maximum number of threads to be used by the analysis. Using more threads may decrease the time necessary to complete the analysis at the cost of using more CPU. Note that the process may use additional threads for operational functionality other than the analysis itself.
    * **`_meta` (Optional, Record<string, User-defined value>)**
    * **`model_memory_limit` (Optional, string)**: The approximate maximum amount of memory resources that are permitted for analytical processing. If your `elasticsearch.yml` file contains an `xpack.ml.max_model_memory_limit` setting, an error occurs when you try to create data frame analytics jobs that have `model_memory_limit` values greater than that setting.
    * **`headers` (Optional, Record<string, string | string[]>)**
    * **`version` (Optional, string)**



### put_datafeed [_put_datafeed]

Create a datafeed. Datafeeds retrieve data from Elasticsearch for analysis by an anomaly detection job. You can associate only one datafeed with each anomaly detection job. The datafeed contains a query that runs at a defined interval (`frequency`). If you are concerned about delayed data, you can add a delay (`query_delay') at each interval. By default, the datafeed uses the following query: `{"match_all": {"boost": 1}}`.

When Elasticsearch security features are enabled, your datafeed remembers which roles the user who created it had at the time of creation and runs the query using those same roles. If you provide secondary authorization headers, those credentials are used instead. You must use Kibana, this API, or the create anomaly detection jobs API to create a datafeed. Do not add a datafeed directly to the `.ml-config` index. Do not give users `write` privileges on the `.ml-config` index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-datafeed)

```ts
client.ml.putDatafeed({ datafeed_id })
```


### Arguments [_arguments_297]

* **Request (object):**

    * **`datafeed_id` (string)**: A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`aggregations` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**: If set, the datafeed performs aggregation searches. Support for aggregations is limited and should be used only with low cardinality data.
    * **`chunking_config` (Optional, { mode, time_span })**: Datafeeds might be required to search over long time periods, for several months or years. This search is split into time chunks in order to ensure the load on Elasticsearch is managed. Chunking configuration controls how the size of these time chunks are calculated; it is an advanced configuration option.
    * **`delayed_data_check_config` (Optional, { check_window, enabled })**: Specifies whether the datafeed checks for missing data and the size of the window. The datafeed can optionally search over indices that have already been read in an effort to determine whether any data has subsequently been added to the index. If missing data is found, it is a good indication that the `query_delay` is set too low and the data is being indexed after the datafeed has passed that moment in time. This check runs only on real-time datafeeds.
    * **`frequency` (Optional, string | -1 | 0)**: The interval at which scheduled queries are made while the datafeed runs in real time. The default value is either the bucket span for short bucket spans, or, for longer bucket spans, a sensible fraction of the bucket span. When `frequency` is shorter than the bucket span, interim results for the last (partial) bucket are written then eventually overwritten by the full bucket results. If the datafeed uses aggregations, this value must be divisible by the interval of the date histogram aggregation.
    * **`indices` (Optional, string | string[])**: An array of index names. Wildcards are supported. If any of the indices are in remote clusters, the machine learning nodes must have the `remote_cluster_client` role.
    * **`indices_options` (Optional, { allow_no_indices, expand_wildcards, ignore_unavailable, ignore_throttled })**: Specifies index expansion options that are used during search
    * **`job_id` (Optional, string)**: Identifier for the anomaly detection job.
    * **`max_empty_searches` (Optional, number)**: If a real-time datafeed has never seen any data (including during any initial training period), it automatically stops and closes the associated job after this many real-time searches return no documents. In other words, it stops after `frequency` times `max_empty_searches` of real-time operation. If not set, a datafeed with no end time that sees no data remains started until it is explicitly stopped. By default, it is not set.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The Elasticsearch query domain-specific language (DSL). This value corresponds to the query object in an Elasticsearch search POST body. All the options that are supported by Elasticsearch can be used, as this object is passed verbatim to Elasticsearch.
    * **`query_delay` (Optional, string | -1 | 0)**: The number of seconds behind real time that data is queried. For example, if data from 10:04 a.m. might not be searchable in Elasticsearch until 10:06 a.m., set this property to 120 seconds. The default value is randomly selected between `60s` and `120s`. This randomness improves the query performance when there are multiple jobs running on the same node.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Specifies runtime fields for the datafeed search.
    * **`script_fields` (Optional, Record<string, { script, ignore_failure }>)**: Specifies scripts that evaluate custom expressions and returns script fields to the datafeed. The detector configuration objects in a job can contain functions that use these script fields.
    * **`scroll_size` (Optional, number)**: The size parameter that is used in Elasticsearch searches when the datafeed does not use aggregations. The maximum value is the value of `index.max_result_window`, which is 10,000 by default.
    * **`headers` (Optional, Record<string, string | string[]>)**
    * **`allow_no_indices` (Optional, boolean)**: If true, wildcard indices expressions that resolve into no concrete indices are ignored. This includes the `_all` string or when no indices are specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values.
    * **`ignore_throttled` (Optional, boolean)**: If true, concrete, expanded, or aliased indices are ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If true, unavailable indices (missing or closed) are ignored.



### put_filter [_put_filter]

Create a filter. A filter contains a list of strings. It can be used by one or more anomaly detection jobs. Specifically, filters are referenced in the `custom_rules` property of detector configuration objects.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-filter)

```ts
client.ml.putFilter({ filter_id })
```


### Arguments [_arguments_298]

* **Request (object):**

    * **`filter_id` (string)**: A string that uniquely identifies a filter.
    * **`description` (Optional, string)**: A description of the filter.
    * **`items` (Optional, string[])**: The items of the filter. A wildcard `*` can be used at the beginning or the end of an item. Up to 10000 items are allowed in each filter.



### put_job [_put_job]

Create an anomaly detection job. If you include a `datafeed_config`, you must have read index privileges on the source index. If you include a `datafeed_config` but do not provide a query, the datafeed uses `{"match_all": {"boost": 1}}`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-job)

```ts
client.ml.putJob({ job_id, analysis_config, data_description })
```


### Arguments [_arguments_299]

* **Request (object):**

    * **`job_id` (string)**: The identifier for the anomaly detection job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`analysis_config` ({ bucket_span, categorization_analyzer, categorization_field_name, categorization_filters, detectors, influencers, latency, model_prune_window, multivariate_by_fields, per_partition_categorization, summary_count_field_name })**: Specifies how to analyze the data. After you create a job, you cannot change the analysis configuration; all the properties are informational.
    * **`data_description` ({ format, time_field, time_format, field_delimiter })**: Defines the format of the input data when you send data to the job by using the post data API. Note that when configure a datafeed, these properties are automatically set. When data is received via the post data API, it is not stored in Elasticsearch. Only the results for anomaly detection are retained.
    * **`allow_lazy_open` (Optional, boolean)**: Advanced configuration option. Specifies whether this job can open when there is insufficient machine learning node capacity for it to be immediately assigned to a node. By default, if a machine learning node with capacity to run the job cannot immediately be found, the open anomaly detection jobs API returns an error. However, this is also subject to the cluster-wide `xpack.ml.max_lazy_ml_nodes` setting. If this option is set to true, the open anomaly detection jobs API does not return an error and the job waits in the opening state until sufficient machine learning node capacity is available.
    * **`analysis_limits` (Optional, { categorization_examples_limit, model_memory_limit })**: Limits can be applied for the resources required to hold the mathematical models in memory. These limits are approximate and can be set per job. They do not control the memory used by other processes, for example the Elasticsearch Java processes.
    * **`background_persist_interval` (Optional, string | -1 | 0)**: Advanced configuration option. The time between each periodic persistence of the model. The default value is a randomized value between 3 to 4 hours, which avoids all jobs persisting at exactly the same time. The smallest allowed value is 1 hour. For very large models (several GB), persistence could take 10-20 minutes, so do not set the `background_persist_interval` value too low.
    * **`custom_settings` (Optional, User-defined value)**: Advanced configuration option. Contains custom meta data about the job.
    * **`daily_model_snapshot_retention_after_days` (Optional, number)**: Advanced configuration option, which affects the automatic removal of old model snapshots for this job. It specifies a period of time (in days) after which only the first snapshot per day is retained. This period is relative to the timestamp of the most recent snapshot for this job. Valid values range from 0 to `model_snapshot_retention_days`.
    * **`datafeed_config` (Optional, { aggregations, chunking_config, datafeed_id, delayed_data_check_config, frequency, indices, indices_options, job_id, max_empty_searches, query, query_delay, runtime_mappings, script_fields, scroll_size })**: Defines a datafeed for the anomaly detection job. If Elasticsearch security features are enabled, your datafeed remembers which roles the user who created it had at the time of creation and runs the query using those same roles. If you provide secondary authorization headers, those credentials are used instead.
    * **`description` (Optional, string)**: A description of the job.
    * **`groups` (Optional, string[])**: A list of job groups. A job can belong to no groups or many.
    * **`model_plot_config` (Optional, { annotations_enabled, enabled, terms })**: This advanced configuration option stores model information along with the results. It provides a more detailed view into anomaly detection. If you enable model plot it can add considerable overhead to the performance of the system; it is not feasible for jobs with many entities. Model plot provides a simplified and indicative view of the model and its bounds. It does not display complex features such as multivariate correlations or multimodal data. As such, anomalies may occasionally be reported which cannot be seen in the model plot. Model plot config can be configured when the job is created or updated later. It must be disabled if performance issues are experienced.
    * **`model_snapshot_retention_days` (Optional, number)**: Advanced configuration option, which affects the automatic removal of old model snapshots for this job. It specifies the maximum period of time (in days) that snapshots are retained. This period is relative to the timestamp of the most recent snapshot for this job. By default, snapshots ten days older than the newest snapshot are deleted.
    * **`renormalization_window_days` (Optional, number)**: Advanced configuration option. The period over which adjustments to the score are applied, as new data is seen. The default value is the longer of 30 days or 100 bucket spans.
    * **`results_index_name` (Optional, string)**: A text string that affects the name of the machine learning results index. By default, the job generates an index named `.ml-anomalies-shared`.
    * **`results_retention_days` (Optional, number)**: Advanced configuration option. The period of time (in days) that results are retained. Age is calculated relative to the timestamp of the latest bucket result. If this property has a non-null value, once per day at 00:30 (server time), results that are the specified number of days older than the latest bucket result are deleted from Elasticsearch. The default value is null, which means all results are retained. Annotations generated by the system also count as results for retention purposes; they are deleted after the same number of days as results. Annotations added by users are retained forever.
    * **`allow_no_indices` (Optional, boolean)**: If `true`, wildcard indices expressions that resolve into no concrete indices are ignored. This includes the `_all` string or when no indices are specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values. Valid values are:

* `all`: Match any data stream or index, including hidden ones.
* `closed`: Match closed, non-hidden indices. Also matches any non-hidden data stream. Data streams cannot be closed.
* `hidden`: Match hidden data streams and hidden indices. Must be combined with `open`, `closed`, or both.
* `none`: Wildcard patterns are not accepted.
* `open`: Match open, non-hidden indices. Also matches any non-hidden data stream.

    * **`ignore_throttled` (Optional, boolean)**: If `true`, concrete, expanded or aliased indices are ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, unavailable indices (missing or closed) are ignored.



### put_trained_model [_put_trained_model]

Create a trained model. Enable you to supply a trained model that is not created by data frame analytics.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-trained-model)

```ts
client.ml.putTrainedModel({ model_id })
```


### Arguments [_arguments_300]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.
    * **`compressed_definition` (Optional, string)**: The compressed (GZipped and Base64 encoded) inference definition of the model. If compressed_definition is specified, then definition cannot be specified.
    * **`definition` (Optional, { preprocessors, trained_model })**: The inference definition for the model. If definition is specified, then compressed_definition cannot be specified.
    * **`description` (Optional, string)**: A human-readable description of the inference trained model.
    * **`inference_config` (Optional, { regression, classification, text_classification, zero_shot_classification, fill_mask, ner, pass_through, text_embedding, text_expansion, question_answering })**: The default configuration for inference. This can be either a regression or classification configuration. It must match the underlying definition.trained_model’s target_type. For pre-packaged models such as ELSER the config is not required.
    * **`input` (Optional, { field_names })**: The input field names for the model definition.
    * **`metadata` (Optional, User-defined value)**: An object map that contains metadata about the model.
    * **`model_type` (Optional, Enum("tree_ensemble" | "lang_ident" | "pytorch"))**: The model type.
    * **`model_size_bytes` (Optional, number)**: The estimated memory usage in bytes to keep the trained model in memory. This property is supported only if defer_definition_decompression is true or the model definition is not supplied.
    * **`platform_architecture` (Optional, string)**: The platform architecture (if applicable) of the trained mode. If the model only works on one platform, because it is heavily optimized for a particular processor architecture and OS combination, then this field specifies which. The format of the string must match the platform identifiers used by Elasticsearch, so one of, `linux-x86_64`, `linux-aarch64`, `darwin-x86_64`, `darwin-aarch64`, or `windows-x86_64`. For portable models (those that work independent of processor architecture or OS features), leave this field unset.
    * **`tags` (Optional, string[])**: An array of tags to organize the model.
    * **`prefix_strings` (Optional, { ingest, search })**: Optional prefix strings applied at inference
    * **`defer_definition_decompression` (Optional, boolean)**: If set to `true` and a `compressed_definition` is provided, the request defers definition decompression and skips relevant validations.
    * **`wait_for_completion` (Optional, boolean)**: Whether to wait for all child operations (e.g. model download) to complete.



### put_trained_model_alias [_put_trained_model_alias]

Create or update a trained model alias. A trained model alias is a logical name used to reference a single trained model. You can use aliases instead of trained model identifiers to make it easier to reference your models. For example, you can use aliases in inference aggregations and processors. An alias must be unique and refer to only a single trained model. However, you can have multiple aliases for each trained model. If you use this API to update an alias such that it references a different trained model ID and the model uses a different type of data frame analytics, an error occurs. For example, this situation occurs if you have a trained model for regression analysis and a trained model for classification analysis; you cannot reassign an alias from one type of trained model to another. If you use this API to update an alias and there are very few input fields in common between the old and new trained models for the model alias, the API returns a warning.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-trained-model-alias)

```ts
client.ml.putTrainedModelAlias({ model_alias, model_id })
```


### Arguments [_arguments_301]

* **Request (object):**

    * **`model_alias` (string)**: The alias to create or update. This value cannot end in numbers.
    * **`model_id` (string)**: The identifier for the trained model that the alias refers to.
    * **`reassign` (Optional, boolean)**: Specifies whether the alias gets reassigned to the specified trained model if it is already assigned to a different model. If the alias is already assigned and this parameter is false, the API returns an error.



### put_trained_model_definition_part [_put_trained_model_definition_part]

Create part of a trained model definition.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-trained-model-definition-part)

```ts
client.ml.putTrainedModelDefinitionPart({ model_id, part, definition, total_definition_length, total_parts })
```


### Arguments [_arguments_302]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.
    * **`part` (number)**: The definition part number. When the definition is loaded for inference the definition parts are streamed in the order of their part number. The first part must be `0` and the final part must be `total_parts - 1`.
    * **`definition` (string)**: The definition part for the model. Must be a base64 encoded string.
    * **`total_definition_length` (number)**: The total uncompressed definition length in bytes. Not base64 encoded.
    * **`total_parts` (number)**: The total number of parts that will be uploaded. Must be greater than 0.



### put_trained_model_vocabulary [_put_trained_model_vocabulary]

Create a trained model vocabulary. This API is supported only for natural language processing (NLP) models. The vocabulary is stored in the index as described in `inference_config.*.vocabulary` of the trained model definition.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-put-trained-model-vocabulary)

```ts
client.ml.putTrainedModelVocabulary({ model_id, vocabulary })
```


### Arguments [_arguments_303]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.
    * **`vocabulary` (string[])**: The model vocabulary, which must not be empty.
    * **`merges` (Optional, string[])**: The optional model merges if required by the tokenizer.
    * **`scores` (Optional, number[])**: The optional vocabulary value scores if required by the tokenizer.



### reset_job [_reset_job]

Reset an anomaly detection job. All model state and results are deleted. The job is ready to start over as if it had just been created. It is not currently possible to reset multiple jobs using wildcards or a comma separated list.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-reset-job)

```ts
client.ml.resetJob({ job_id })
```


### Arguments [_arguments_304]

* **Request (object):**

    * **`job_id` (string)**: The ID of the job to reset.
    * **`wait_for_completion` (Optional, boolean)**: Should this request wait until the operation has completed before returning.
    * **`delete_user_annotations` (Optional, boolean)**: Specifies whether annotations that have been added by the user should be deleted along with any auto-generated annotations when the job is reset.



### revert_model_snapshot [_revert_model_snapshot]

Revert to a snapshot. The machine learning features react quickly to anomalous input, learning new behaviors in data. Highly anomalous input increases the variance in the models whilst the system learns whether this is a new step-change in behavior or a one-off event. In the case where this anomalous input is known to be a one-off, then it might be appropriate to reset the model state to a time before this event. For example, you might consider reverting to a saved snapshot after Black Friday or a critical system failure.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-revert-model-snapshot)

```ts
client.ml.revertModelSnapshot({ job_id, snapshot_id })
```


### Arguments [_arguments_305]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`snapshot_id` (string)**: You can specify `empty` as the <snapshot_id>. Reverting to the empty snapshot means the anomaly detection job starts learning a new model from scratch when it is started.
    * **`delete_intervening_results` (Optional, boolean)**: Refer to the description for the `delete_intervening_results` query parameter.



### set_upgrade_mode [_set_upgrade_mode]

Set upgrade_mode for ML indices. Sets a cluster wide upgrade_mode setting that prepares machine learning indices for an upgrade. When upgrading your cluster, in some circumstances you must restart your nodes and reindex your machine learning indices. In those circumstances, there must be no machine learning jobs running. You can close the machine learning jobs, do the upgrade, then open all the jobs again. Alternatively, you can use this API to temporarily halt tasks associated with the jobs and datafeeds and prevent new jobs from opening. You can also use this API during upgrades that do not require you to reindex your machine learning indices, though stopping jobs is not a requirement in that case. You can see the current value for the upgrade_mode setting by using the get machine learning info API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-set-upgrade-mode)

```ts
client.ml.setUpgradeMode({ ... })
```


### Arguments [_arguments_306]

* **Request (object):**

    * **`enabled` (Optional, boolean)**: When `true`, it enables `upgrade_mode` which temporarily halts all job and datafeed tasks and prohibits new job and datafeed tasks from starting.
    * **`timeout` (Optional, string | -1 | 0)**: The time to wait for the request to be completed.



### start_data_frame_analytics [_start_data_frame_analytics]

Start a data frame analytics job. A data frame analytics job can be started and stopped multiple times throughout its lifecycle. If the destination index does not exist, it is created automatically the first time you start the data frame analytics job. The `index.number_of_shards` and `index.number_of_replicas` settings for the destination index are copied from the source index. If there are multiple source indices, the destination index copies the highest setting values. The mappings for the destination index are also copied from the source indices. If there are any mapping conflicts, the job fails to start. If the destination index exists, it is used as is. You can therefore set up the destination index in advance with custom settings and mappings.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-start-data-frame-analytics)

```ts
client.ml.startDataFrameAnalytics({ id })
```


### Arguments [_arguments_307]

* **Request (object):**

    * **`id` (string)**: Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`timeout` (Optional, string | -1 | 0)**: Controls the amount of time to wait until the data frame analytics job starts.



### start_datafeed [_start_datafeed]

Start datafeeds.

A datafeed must be started in order to retrieve data from Elasticsearch. A datafeed can be started and stopped multiple times throughout its lifecycle.

Before you can start a datafeed, the anomaly detection job must be open. Otherwise, an error occurs.

If you restart a stopped datafeed, it continues processing input data from the next millisecond after it was stopped. If new data was indexed for that exact millisecond between stopping and starting, it will be ignored.

When Elasticsearch security features are enabled, your datafeed remembers which roles the last user to create or update it had at the time of creation or update and runs the query using those same roles. If you provided secondary authorization headers when you created or updated the datafeed, those credentials are used instead.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-start-datafeed)

```ts
client.ml.startDatafeed({ datafeed_id })
```


### Arguments [_arguments_308]

* **Request (object):**

    * **`datafeed_id` (string)**: A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`end` (Optional, string | Unit)**: Refer to the description for the `end` query parameter.
    * **`start` (Optional, string | Unit)**: Refer to the description for the `start` query parameter.
    * **`timeout` (Optional, string | -1 | 0)**: Refer to the description for the `timeout` query parameter.



### start_trained_model_deployment [_start_trained_model_deployment]

Start a trained model deployment. It allocates the model to every machine learning node.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-start-trained-model-deployment)

```ts
client.ml.startTrainedModelDeployment({ model_id })
```


### Arguments [_arguments_309]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model. Currently, only PyTorch models are supported.
    * **`cache_size` (Optional, number | string)**: The inference cache size (in memory outside the JVM heap) per node for the model. The default value is the same size as the `model_size_bytes`. To disable the cache, `0b` can be provided.
    * **`deployment_id` (Optional, string)**: A unique identifier for the deployment of the model.
    * **`number_of_allocations` (Optional, number)**: The number of model allocations on each node where the model is deployed. All allocations on a node share the same copy of the model in memory but use a separate set of threads to evaluate the model. Increasing this value generally increases the throughput. If this setting is greater than the number of hardware threads it will automatically be changed to a value less than the number of hardware threads.
    * **`priority` (Optional, Enum("normal" | "low"))**: The deployment priority.
    * **`queue_capacity` (Optional, number)**: Specifies the number of inference requests that are allowed in the queue. After the number of requests exceeds this value, new requests are rejected with a 429 error.
    * **`threads_per_allocation` (Optional, number)**: Sets the number of threads used by each model allocation during inference. This generally increases the inference speed. The inference process is a compute-bound process; any number greater than the number of available hardware threads on the machine does not increase the inference speed. If this setting is greater than the number of hardware threads it will automatically be changed to a value less than the number of hardware threads.
    * **`timeout` (Optional, string | -1 | 0)**: Specifies the amount of time to wait for the model to deploy.
    * **`wait_for` (Optional, Enum("started" | "starting" | "fully_allocated"))**: Specifies the allocation status to wait for before returning.



### stop_data_frame_analytics [_stop_data_frame_analytics]

Stop data frame analytics jobs. A data frame analytics job can be started and stopped multiple times throughout its lifecycle.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-stop-data-frame-analytics)

```ts
client.ml.stopDataFrameAnalytics({ id })
```


### Arguments [_arguments_310]

* **Request (object):**

    * **`id` (string)**: Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no data frame analytics jobs that match.
        2. Contains the _all string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


The default value is true, which returns an empty data_frame_analytics array when there are no matches and the subset of results when there are partial matches. If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. ** *`force` (Optional, boolean)**: If true, the data frame analytics job is stopped forcefully. ** *`timeout` (Optional, string | -1 | 0)**: Controls the amount of time to wait until the data frame analytics job stops. Defaults to 20 seconds.


### stop_datafeed [_stop_datafeed]

Stop datafeeds. A datafeed that is stopped ceases to retrieve data from Elasticsearch. A datafeed can be started and stopped multiple times throughout its lifecycle.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-stop-datafeed)

```ts
client.ml.stopDatafeed({ datafeed_id })
```


### Arguments [_arguments_311]

* **Request (object):**

    * **`datafeed_id` (string)**: Identifier for the datafeed. You can stop multiple datafeeds in a single API request by using a comma-separated list of datafeeds or a wildcard expression. You can close all datafeeds by using `_all` or by specifying `*` as the identifier.
    * **`allow_no_match` (Optional, boolean)**: Refer to the description for the `allow_no_match` query parameter.
    * **`force` (Optional, boolean)**: Refer to the description for the `force` query parameter.
    * **`timeout` (Optional, string | -1 | 0)**: Refer to the description for the `timeout` query parameter.



### stop_trained_model_deployment [_stop_trained_model_deployment]

Stop a trained model deployment.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-stop-trained-model-deployment)

```ts
client.ml.stopTrainedModelDeployment({ model_id })
```


### Arguments [_arguments_312]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request: contains wildcard expressions and there are no deployments that match; contains the  `_all` string or no identifiers and there are no matches; or contains wildcard expressions and there are only partial matches. By default, it returns an empty array when there are no matches and the subset of results when there are partial matches. If `false`, the request returns a 404 status code when there are no matches or only partial matches.
    * **`force` (Optional, boolean)**: Forcefully stops the deployment, even if it is used by ingest pipelines. You can’t use these pipelines until you restart the model deployment.



### update_data_frame_analytics [_update_data_frame_analytics]

Update a data frame analytics job.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-update-data-frame-analytics)

```ts
client.ml.updateDataFrameAnalytics({ id })
```


### Arguments [_arguments_313]

* **Request (object):**

    * **`id` (string)**: Identifier for the data frame analytics job. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`description` (Optional, string)**: A description of the job.
    * **`model_memory_limit` (Optional, string)**: The approximate maximum amount of memory resources that are permitted for analytical processing. If your `elasticsearch.yml` file contains an `xpack.ml.max_model_memory_limit` setting, an error occurs when you try to create data frame analytics jobs that have `model_memory_limit` values greater than that setting.
    * **`max_num_threads` (Optional, number)**: The maximum number of threads to be used by the analysis. Using more threads may decrease the time necessary to complete the analysis at the cost of using more CPU. Note that the process may use additional threads for operational functionality other than the analysis itself.
    * **`allow_lazy_start` (Optional, boolean)**: Specifies whether this job can start when there is insufficient machine learning node capacity for it to be immediately assigned to a node.



### update_datafeed [_update_datafeed]

Update a datafeed. You must stop and start the datafeed for the changes to be applied. When Elasticsearch security features are enabled, your datafeed remembers which roles the user who updated it had at the time of the update and runs the query using those same roles. If you provide secondary authorization headers, those credentials are used instead.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-update-datafeed)

```ts
client.ml.updateDatafeed({ datafeed_id })
```


### Arguments [_arguments_314]

* **Request (object):**

    * **`datafeed_id` (string)**: A numerical character string that uniquely identifies the datafeed. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It must start and end with alphanumeric characters.
    * **`aggregations` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**: If set, the datafeed performs aggregation searches. Support for aggregations is limited and should be used only with low cardinality data.
    * **`chunking_config` (Optional, { mode, time_span })**: Datafeeds might search over long time periods, for several months or years. This search is split into time chunks in order to ensure the load on Elasticsearch is managed. Chunking configuration controls how the size of these time chunks are calculated; it is an advanced configuration option.
    * **`delayed_data_check_config` (Optional, { check_window, enabled })**: Specifies whether the datafeed checks for missing data and the size of the window. The datafeed can optionally search over indices that have already been read in an effort to determine whether any data has subsequently been added to the index. If missing data is found, it is a good indication that the `query_delay` is set too low and the data is being indexed after the datafeed has passed that moment in time. This check runs only on real-time datafeeds.
    * **`frequency` (Optional, string | -1 | 0)**: The interval at which scheduled queries are made while the datafeed runs in real time. The default value is either the bucket span for short bucket spans, or, for longer bucket spans, a sensible fraction of the bucket span. When `frequency` is shorter than the bucket span, interim results for the last (partial) bucket are written then eventually overwritten by the full bucket results. If the datafeed uses aggregations, this value must be divisible by the interval of the date histogram aggregation.
    * **`indices` (Optional, string[])**: An array of index names. Wildcards are supported. If any of the indices are in remote clusters, the machine learning nodes must have the `remote_cluster_client` role.
    * **`indices_options` (Optional, { allow_no_indices, expand_wildcards, ignore_unavailable, ignore_throttled })**: Specifies index expansion options that are used during search.
    * **`job_id` (Optional, string)**
    * **`max_empty_searches` (Optional, number)**: If a real-time datafeed has never seen any data (including during any initial training period), it automatically stops and closes the associated job after this many real-time searches return no documents. In other words, it stops after `frequency` times `max_empty_searches` of real-time operation. If not set, a datafeed with no end time that sees no data remains started until it is explicitly stopped. By default, it is not set.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The Elasticsearch query domain-specific language (DSL). This value corresponds to the query object in an Elasticsearch search POST body. All the options that are supported by Elasticsearch can be used, as this object is passed verbatim to Elasticsearch. Note that if you change the query, the analyzed data is also changed. Therefore, the time required to learn might be long and the understandability of the results is unpredictable. If you want to make significant changes to the source data, it is recommended that you clone the job and datafeed and make the amendments in the clone. Let both run in parallel and close one when you are satisfied with the results of the job.
    * **`query_delay` (Optional, string | -1 | 0)**: The number of seconds behind real time that data is queried. For example, if data from 10:04 a.m. might not be searchable in Elasticsearch until 10:06 a.m., set this property to 120 seconds. The default value is randomly selected between `60s` and `120s`. This randomness improves the query performance when there are multiple jobs running on the same node.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: Specifies runtime fields for the datafeed search.
    * **`script_fields` (Optional, Record<string, { script, ignore_failure }>)**: Specifies scripts that evaluate custom expressions and returns script fields to the datafeed. The detector configuration objects in a job can contain functions that use these script fields.
    * **`scroll_size` (Optional, number)**: The size parameter that is used in Elasticsearch searches when the datafeed does not use aggregations. The maximum value is the value of `index.max_result_window`.
    * **`allow_no_indices` (Optional, boolean)**: If `true`, wildcard indices expressions that resolve into no concrete indices are ignored. This includes the `_all` string or when no indices are specified.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports a list of values. Valid values are:

* `all`: Match any data stream or index, including hidden ones.
* `closed`: Match closed, non-hidden indices. Also matches any non-hidden data stream. Data streams cannot be closed.
* `hidden`: Match hidden data streams and hidden indices. Must be combined with `open`, `closed`, or both.
* `none`: Wildcard patterns are not accepted.
* `open`: Match open, non-hidden indices. Also matches any non-hidden data stream.

    * **`ignore_throttled` (Optional, boolean)**: If `true`, concrete, expanded or aliased indices are ignored when frozen.
    * **`ignore_unavailable` (Optional, boolean)**: If `true`, unavailable indices (missing or closed) are ignored.



### update_filter [_update_filter]

Update a filter. Updates the description of a filter, adds items, or removes items from the list.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-update-filter)

```ts
client.ml.updateFilter({ filter_id })
```


### Arguments [_arguments_315]

* **Request (object):**

    * **`filter_id` (string)**: A string that uniquely identifies a filter.
    * **`add_items` (Optional, string[])**: The items to add to the filter.
    * **`description` (Optional, string)**: A description for the filter.
    * **`remove_items` (Optional, string[])**: The items to remove from the filter.



### update_job [_update_job]

Update an anomaly detection job. Updates certain properties of an anomaly detection job.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-update-job)

```ts
client.ml.updateJob({ job_id })
```


### Arguments [_arguments_316]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the job.
    * **`allow_lazy_open` (Optional, boolean)**: Advanced configuration option. Specifies whether this job can open when there is insufficient machine learning node capacity for it to be immediately assigned to a node. If `false` and a machine learning node with capacity to run the job cannot immediately be found, the open anomaly detection jobs API returns an error. However, this is also subject to the cluster-wide `xpack.ml.max_lazy_ml_nodes` setting. If this option is set to `true`, the open anomaly detection jobs API does not return an error and the job waits in the opening state until sufficient machine learning node capacity is available.
    * **`analysis_limits` (Optional, { model_memory_limit })**
    * **`background_persist_interval` (Optional, string | -1 | 0)**: Advanced configuration option. The time between each periodic persistence of the model. The default value is a randomized value between 3 to 4 hours, which avoids all jobs persisting at exactly the same time. The smallest allowed value is 1 hour. For very large models (several GB), persistence could take 10-20 minutes, so do not set the value too low. If the job is open when you make the update, you must stop the datafeed, close the job, then reopen the job and restart the datafeed for the changes to take effect.
    * **`custom_settings` (Optional, Record<string, User-defined value>)**: Advanced configuration option. Contains custom meta data about the job. For example, it can contain custom URL information as shown in Adding custom URLs to machine learning results.
    * **`categorization_filters` (Optional, string[])**
    * **`description` (Optional, string)**: A description of the job.
    * **`model_plot_config` (Optional, { annotations_enabled, enabled, terms })**
    * **`model_prune_window` (Optional, string | -1 | 0)**
    * **`daily_model_snapshot_retention_after_days` (Optional, number)**: Advanced configuration option, which affects the automatic removal of old model snapshots for this job. It specifies a period of time (in days) after which only the first snapshot per day is retained. This period is relative to the timestamp of the most recent snapshot for this job. Valid values range from 0 to `model_snapshot_retention_days`. For jobs created before version 7.8.0, the default value matches `model_snapshot_retention_days`.
    * **`model_snapshot_retention_days` (Optional, number)**: Advanced configuration option, which affects the automatic removal of old model snapshots for this job. It specifies the maximum period of time (in days) that snapshots are retained. This period is relative to the timestamp of the most recent snapshot for this job.
    * **`renormalization_window_days` (Optional, number)**: Advanced configuration option. The period over which adjustments to the score are applied, as new data is seen.
    * **`results_retention_days` (Optional, number)**: Advanced configuration option. The period of time (in days) that results are retained. Age is calculated relative to the timestamp of the latest bucket result. If this property has a non-null value, once per day at 00:30 (server time), results that are the specified number of days older than the latest bucket result are deleted from Elasticsearch. The default value is null, which means all results are retained.
    * **`groups` (Optional, string[])**: A list of job groups. A job can belong to no groups or many.
    * **`detectors` (Optional, { detector_index, description, custom_rules }[])**: An array of detector update objects.
    * **`per_partition_categorization` (Optional, { enabled, stop_on_warn })**: Settings related to how categorization interacts with partition fields.



### update_model_snapshot [_update_model_snapshot]

Update a snapshot. Updates certain properties of a snapshot.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-update-model-snapshot)

```ts
client.ml.updateModelSnapshot({ job_id, snapshot_id })
```


### Arguments [_arguments_317]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`snapshot_id` (string)**: Identifier for the model snapshot.
    * **`description` (Optional, string)**: A description of the model snapshot.
    * **`retain` (Optional, boolean)**: If `true`, this snapshot will not be deleted during automatic cleanup of snapshots older than `model_snapshot_retention_days`. However, this snapshot will be deleted when the job is deleted.



### update_trained_model_deployment [_update_trained_model_deployment]

Update a trained model deployment.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-update-trained-model-deployment)

```ts
client.ml.updateTrainedModelDeployment({ model_id })
```


### Arguments [_arguments_318]

* **Request (object):**

    * **`model_id` (string)**: The unique identifier of the trained model. Currently, only PyTorch models are supported.
    * **`number_of_allocations` (Optional, number)**: The number of model allocations on each node where the model is deployed. All allocations on a node share the same copy of the model in memory but use a separate set of threads to evaluate the model. Increasing this value generally increases the throughput. If this setting is greater than the number of hardware threads it will automatically be changed to a value less than the number of hardware threads.



### upgrade_job_snapshot [_upgrade_job_snapshot]

Upgrade a snapshot. Upgrades an anomaly detection model snapshot to the latest major version. Over time, older snapshot formats are deprecated and removed. Anomaly detection jobs support only snapshots that are from the current or previous major version. This API provides a means to upgrade a snapshot to the current major version. This aids in preparing the cluster for an upgrade to the next major version. Only one snapshot per anomaly detection job can be upgraded at a time and the upgraded snapshot cannot be the current snapshot of the anomaly detection job.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ml-upgrade-job-snapshot)

```ts
client.ml.upgradeJobSnapshot({ job_id, snapshot_id })
```


### Arguments [_arguments_319]

* **Request (object):**

    * **`job_id` (string)**: Identifier for the anomaly detection job.
    * **`snapshot_id` (string)**: A numerical character string that uniquely identifies the model snapshot.
    * **`wait_for_completion` (Optional, boolean)**: When true, the API won’t respond until the upgrade is complete. Otherwise, it responds as soon as the upgrade task is assigned to a node.
    * **`timeout` (Optional, string | -1 | 0)**: Controls the time to wait for the request to complete.



## nodes [_nodes_2]


### clear_repositories_metering_archive [_clear_repositories_metering_archive]

Clear the archived repositories metering. Clear the archived repositories metering information in the cluster.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-nodes-clear-repositories-metering-archive)

```ts
client.nodes.clearRepositoriesMeteringArchive({ node_id, max_archive_version })
```


### Arguments [_arguments_320]

* **Request (object):**

    * **`node_id` (string | string[])**: List of node IDs or names used to limit returned information.
    * **`max_archive_version` (number)**: Specifies the maximum `archive_version` to be cleared from the archive.



### get_repositories_metering_info [_get_repositories_metering_info]

Get cluster repositories metering. Get repositories metering information for a cluster. This API exposes monotonically non-decreasing counters and it is expected that clients would durably store the information needed to compute aggregations over a period of time. Additionally, the information exposed by this API is volatile, meaning that it will not be present after node restarts.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-nodes-get-repositories-metering-info)

```ts
client.nodes.getRepositoriesMeteringInfo({ node_id })
```


### Arguments [_arguments_321]

* **Request (object):**

    * **`node_id` (string | string[])**: List of node IDs or names used to limit returned information. All the nodes selective options are explained [here](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-cluster).



### hot_threads [_hot_threads]

Get the hot threads for nodes. Get a breakdown of the hot threads on each selected node in the cluster. The output is plain text with a breakdown of the top hot threads for each node.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-nodes-hot-threads)

```ts
client.nodes.hotThreads({ ... })
```


### Arguments [_arguments_322]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: List of node IDs or names used to limit returned information.
    * **`ignore_idle_threads` (Optional, boolean)**: If true, known idle threads (e.g. waiting in a socket select, or to get a task from an empty queue) are filtered out.
    * **`interval` (Optional, string | -1 | 0)**: The interval to do the second sampling of threads.
    * **`snapshots` (Optional, number)**: Number of samples of thread stacktrace.
    * **`threads` (Optional, number)**: Specifies the number of hot threads to provide information for.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`type` (Optional, Enum("cpu" | "wait" | "block" | "gpu" | "mem"))**: The type to sample.
    * **`sort` (Optional, Enum("cpu" | "wait" | "block" | "gpu" | "mem"))**: The sort order for *cpu* type (default: total)



### info [_info_4]

Get node information. By default, the API returns all attributes and core settings for cluster nodes.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-nodes-info)

```ts
client.nodes.info({ ... })
```


### Arguments [_arguments_323]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: List of node IDs or names used to limit returned information.
    * **`metric` (Optional, string | string[])**: Limits the information returned to the specific metrics. Supports a list, such as http,ingest.
    * **`flat_settings` (Optional, boolean)**: If true, returns settings in flat format.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### reload_secure_settings [_reload_secure_settings]

Reload the keystore on nodes in the cluster.

Secure settings are stored in an on-disk keystore. Certain of these settings are reloadable. That is, you can change them on disk and reload them without restarting any nodes in the cluster. When you have updated reloadable secure settings in your keystore, you can use this API to reload those settings on each node.

When the Elasticsearch keystore is password protected and not simply obfuscated, you must provide the password for the keystore when you reload the secure settings. Reloading the settings for the whole cluster assumes that the keystores for all nodes are protected with the same password; this method is allowed only when inter-node communications are encrypted. Alternatively, you can reload the secure settings on each node by locally accessing the API and passing the node-specific Elasticsearch keystore password.

[Endpoint documentation](docs-content://deploy-manage/security/secure-settings.md)

```ts
client.nodes.reloadSecureSettings({ ... })
```


### Arguments [_arguments_324]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: The names of particular nodes in the cluster to target.
    * **`secure_settings_password` (Optional, string)**: The password for the Elasticsearch keystore.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### stats [_stats_5]

Get node statistics. Get statistics for nodes in a cluster. By default, all stats are returned. You can limit the returned information by using metrics.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-nodes-stats)

```ts
client.nodes.stats({ ... })
```


### Arguments [_arguments_325]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: List of node IDs or names used to limit returned information.
    * **`metric` (Optional, string | string[])**: Limit the information returned to the specified metrics
    * **`index_metric` (Optional, string | string[])**: Limit the information returned for indices metric to the specific index metrics. It can be used only if indices (or all) metric is specified.
    * **`completion_fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in fielddata and suggest statistics.
    * **`fielddata_fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in fielddata statistics.
    * **`fields` (Optional, string | string[])**: List or wildcard expressions of fields to include in the statistics.
    * **`groups` (Optional, boolean)**: List of search groups to include in the search statistics.
    * **`include_segment_file_sizes` (Optional, boolean)**: If true, the call reports the aggregated disk usage of each one of the Lucene index files (only applies if segment stats are requested).
    * **`level` (Optional, Enum("cluster" | "indices" | "shards"))**: Indicates whether statistics are aggregated at the cluster, index, or shard level.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`types` (Optional, string[])**: A list of document types for the indexing index metric.
    * **`include_unloaded_segments` (Optional, boolean)**: If `true`, the response includes information from segments that are not loaded into memory.



### usage [_usage]

Get feature usage information.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-nodes-usage)

```ts
client.nodes.usage({ ... })
```


### Arguments [_arguments_326]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: A list of node IDs or names to limit the returned information; use `_local` to return information from the node you’re connecting to, leave empty to get information from all nodes
    * **`metric` (Optional, string | string[])**: Limits the information returned to the specific metrics. A list of the following options: `_all`, `rest_actions`.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## query_rules [_query_rules]


### delete_rule [_delete_rule]

Delete a query rule. Delete a query rule within a query ruleset. This is a destructive action that is only recoverable by re-adding the same rule with the create or update query rule API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-delete-rule)

```ts
client.queryRules.deleteRule({ ruleset_id, rule_id })
```


### Arguments [_arguments_327]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset containing the rule to delete
    * **`rule_id` (string)**: The unique identifier of the query rule within the specified ruleset to delete



### delete_ruleset [_delete_ruleset]

Delete a query ruleset. Remove a query ruleset and its associated data. This is a destructive action that is not recoverable.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-delete-ruleset)

```ts
client.queryRules.deleteRuleset({ ruleset_id })
```


### Arguments [_arguments_328]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset to delete



### get_rule [_get_rule]

Get a query rule. Get details about a query rule within a query ruleset.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-get-rule)

```ts
client.queryRules.getRule({ ruleset_id, rule_id })
```


### Arguments [_arguments_329]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset containing the rule to retrieve
    * **`rule_id` (string)**: The unique identifier of the query rule within the specified ruleset to retrieve



### get_ruleset [_get_ruleset]

Get a query ruleset. Get details about a query ruleset.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-get-ruleset)

```ts
client.queryRules.getRuleset({ ruleset_id })
```


### Arguments [_arguments_330]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset



### list_rulesets [_list_rulesets]

Get all query rulesets. Get summarized information about the query rulesets.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-list-rulesets)

```ts
client.queryRules.listRulesets({ ... })
```


### Arguments [_arguments_331]

* **Request (object):**

    * **`from` (Optional, number)**: The offset from the first result to fetch.
    * **`size` (Optional, number)**: The maximum number of results to retrieve.



### put_rule [_put_rule]

Create or update a query rule. Create or update a query rule within a query ruleset.

::::{important}
Due to limitations within pinned queries, you can only pin documents using ids or docs, but cannot use both in single rule. It is advised to use one or the other in query rulesets, to avoid errors. Additionally, pinned queries have a maximum limit of 100 pinned hits. If multiple matching rules pin more than 100 documents, only the first 100 documents are pinned in the order they are specified in the ruleset.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-put-rule)

```ts
client.queryRules.putRule({ ruleset_id, rule_id, type, criteria, actions })
```


### Arguments [_arguments_332]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset containing the rule to be created or updated.
    * **`rule_id` (string)**: The unique identifier of the query rule within the specified ruleset to be created or updated.
    * **`type` (Enum("pinned" | "exclude"))**: The type of rule.
    * **`criteria` ({ type, metadata, values } | { type, metadata, values }[])**: The criteria that must be met for the rule to be applied. If multiple criteria are specified for a rule, all criteria must be met for the rule to be applied.
    * **`actions` ({ ids, docs })**: The actions to take when the rule is matched. The format of this action depends on the rule type.
    * **`priority` (Optional, number)**



### put_ruleset [_put_ruleset]

Create or update a query ruleset. There is a limit of 100 rules per ruleset. This limit can be increased by using the `xpack.applications.rules.max_rules_per_ruleset` cluster setting.

::::{important}
Due to limitations within pinned queries, you can only select documents using `ids` or `docs`, but cannot use both in single rule. It is advised to use one or the other in query rulesets, to avoid errors. Additionally, pinned queries have a maximum limit of 100 pinned hits. If multiple matching rules pin more than 100 documents, only the first 100 documents are pinned in the order they are specified in the ruleset.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-put-ruleset)

```ts
client.queryRules.putRuleset({ ruleset_id, rules })
```


### Arguments [_arguments_333]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset to be created or updated.
    * **`rules` ({ rule_id, type, criteria, actions, priority } | { rule_id, type, criteria, actions, priority }[])**



### test [_test]

Test a query ruleset. Evaluate match criteria against a query ruleset to identify the rules that would match that criteria.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-query-rules-test)

```ts
client.queryRules.test({ ruleset_id, match_criteria })
```


### Arguments [_arguments_334]

* **Request (object):**

    * **`ruleset_id` (string)**: The unique identifier of the query ruleset to be created or updated
    * **`match_criteria` (Record<string, User-defined value>)**: The match criteria to apply to rules in the given query ruleset. Match criteria should match the keys defined in the `criteria.metadata` field of the rule.



## rollup [_rollup]


### delete_job [_delete_job_2]

Delete a rollup job.

A job must be stopped before it can be deleted. If you attempt to delete a started job, an error occurs. Similarly, if you attempt to delete a nonexistent job, an exception occurs.

::::{important}
When you delete a job, you remove only the process that is actively monitoring and rolling up data. The API does not delete any previously rolled up data. This is by design; a user may wish to roll up a static data set. Because the data set is static, after it has been fully rolled up there is no need to keep the indexing rollup job around (as there will be no new data). Thus the job can be deleted, leaving behind the rolled up data for analysis. If you wish to also remove the rollup data and the rollup index contains the data for only a single job, you can delete the whole rollup index. If the rollup index stores data from several jobs, you must issue a delete-by-query that targets the rollup job’s identifier in the rollup index. For example:
::::


```
POST my_rollup_index/_delete_by_query
{
  "query": {
    "term": {
      "_rollup.id": "the_rollup_job_id"
    }
  }
}
```

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-delete-job)

```ts
client.rollup.deleteJob({ id })
```


### Arguments [_arguments_335]

* **Request (object):**

    * **`id` (string)**: Identifier for the job.



### get_jobs [_get_jobs_2]

Get rollup job information. Get the configuration, stats, and status of rollup jobs.

::::{note}
This API returns only active (both `STARTED` and `STOPPED`) jobs. If a job was created, ran for a while, then was deleted, the API does not return any details about it. For details about a historical rollup job, the rollup capabilities API may be more useful.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-get-jobs)

```ts
client.rollup.getJobs({ ... })
```


### Arguments [_arguments_336]

* **Request (object):**

    * **`id` (Optional, string)**: Identifier for the rollup job. If it is `_all` or omitted, the API returns all rollup jobs.



### get_rollup_caps [_get_rollup_caps]

Get the rollup job capabilities. Get the capabilities of any rollup jobs that have been configured for a specific index or index pattern.

This API is useful because a rollup job is often configured to rollup only a subset of fields from the source index. Furthermore, only certain aggregations can be configured for various fields, leading to a limited subset of functionality depending on that configuration. This API enables you to inspect an index and determine:

1. Does this index have associated rollup data somewhere in the cluster?
2. If yes to the first question, what fields were rolled up, what aggregations can be performed, and where does the data live?

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-get-rollup-caps)

```ts
client.rollup.getRollupCaps({ ... })
```


### Arguments [_arguments_337]

* **Request (object):**

    * **`id` (Optional, string)**: Index, indices or index-pattern to return rollup capabilities for. `_all` may be used to fetch rollup capabilities from all jobs.



### get_rollup_index_caps [_get_rollup_index_caps]

Get the rollup index capabilities. Get the rollup capabilities of all jobs inside of a rollup index. A single rollup index may store the data for multiple rollup jobs and may have a variety of capabilities depending on those jobs. This API enables you to determine:

* What jobs are stored in an index (or indices specified via a pattern)?
* What target indices were rolled up, what fields were used in those rollups, and what aggregations can be performed on each job?

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-get-rollup-index-caps)

```ts
client.rollup.getRollupIndexCaps({ index })
```


### Arguments [_arguments_338]

* **Request (object):**

    * **`index` (string | string[])**: Data stream or index to check for rollup capabilities. Wildcard (`*`) expressions are supported.



### put_job [_put_job_2]

Create a rollup job.

::::{warning}
From 8.15.0, calling this API in a cluster with no rollup usage will fail with a message about the deprecation and planned removal of rollup features. A cluster needs to contain either a rollup job or a rollup index in order for this API to be allowed to run.
::::


The rollup job configuration contains all the details about how the job should run, when it indexes documents, and what future queries will be able to run against the rollup index.

There are three main sections to the job configuration: the logistical details about the job (for example, the cron schedule), the fields that are used for grouping, and what metrics to collect for each group.

Jobs are created in a `STOPPED` state. You can start them with the start rollup jobs API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-put-job)

```ts
client.rollup.putJob({ id, cron, groups, index_pattern, page_size, rollup_index })
```


### Arguments [_arguments_339]

* **Request (object):**

    * **`id` (string)**: Identifier for the rollup job. This can be any alphanumeric string and uniquely identifies the data that is associated with the rollup job. The ID is persistent; it is stored with the rolled up data. If you create a job, let it run for a while, then delete the job, the data that the job rolled up is still be associated with this job ID. You cannot create a new job with the same ID since that could lead to problems with mismatched job configurations.
    * **`cron` (string)**: A cron string which defines the intervals when the rollup job should be executed. When the interval triggers, the indexer attempts to rollup the data in the index pattern. The cron pattern is unrelated to the time interval of the data being rolled up. For example, you may wish to create hourly rollups of your document but to only run the indexer on a daily basis at midnight, as defined by the cron. The cron pattern is defined just like a Watcher cron schedule.
    * **`groups` ({ date_histogram, histogram, terms })**: Defines the grouping fields and aggregations that are defined for this rollup job. These fields will then be available later for aggregating into buckets. These aggs and fields can be used in any combination. Think of the groups configuration as defining a set of tools that can later be used in aggregations to partition the data. Unlike raw data, we have to think ahead to which fields and aggregations might be used. Rollups provide enough flexibility that you simply need to determine which fields are needed, not in what order they are needed.
    * **`index_pattern` (string)**: The index or index pattern to roll up. Supports wildcard-style patterns (`logstash-*`). The job attempts to rollup the entire index or index-pattern.
    * **`page_size` (number)**: The number of bucket results that are processed on each iteration of the rollup indexer. A larger value tends to execute faster, but requires more memory during processing. This value has no effect on how the data is rolled up; it is merely used for tweaking the speed or memory cost of the indexer.
    * **`rollup_index` (string)**: The index that contains the rollup results. The index can be shared with other rollup jobs. The data is stored so that it doesn’t interfere with unrelated jobs.
    * **`metrics` (Optional, { field, metrics }[])**: Defines the metrics to collect for each grouping tuple. By default, only the doc_counts are collected for each group. To make rollup useful, you will often add metrics like averages, mins, maxes, etc. Metrics are defined on a per-field basis and for each field you configure which metric should be collected.
    * **`timeout` (Optional, string | -1 | 0)**: Time to wait for the request to complete.
    * **`headers` (Optional, Record<string, string | string[]>)**



### rollup_search [_rollup_search]

Search rolled-up data. The rollup search endpoint is needed because, internally, rolled-up documents utilize a different document structure than the original data. It rewrites standard Query DSL into a format that matches the rollup documents then takes the response and rewrites it back to what a client would expect given the original query.

The request body supports a subset of features from the regular search API. The following functionality is not available:

`size`: Because rollups work on pre-aggregated data, no search hits can be returned and so size must be set to zero or omitted entirely. `highlighter`, `suggestors`, `post_filter`, `profile`, `explain`: These are similarly disallowed.

**Searching both historical rollup and non-rollup data**

The rollup search API has the capability to search across both "live" non-rollup data and the aggregated rollup data. This is done by simply adding the live indices to the URI. For example:

```
GET sensor-1,sensor_rollup/_rollup_search
{
  "size": 0,
  "aggregations": {
     "max_temperature": {
      "max": {
        "field": "temperature"
      }
    }
  }
}
```

The rollup search endpoint does two things when the search runs:

* The original request is sent to the non-rollup index unaltered.
* A rewritten version of the original request is sent to the rollup index.

When the two responses are received, the endpoint rewrites the rollup response and merges the two together. During the merging process, if there is any overlap in buckets between the two responses, the buckets from the non-rollup index are used.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-rollup-search)

```ts
client.rollup.rollupSearch({ index })
```


### Arguments [_arguments_340]

* **Request (object):**

    * **`index` (string | string[])**: A list of data streams and indices used to limit the request. This parameter has the following rules:

* At least one data stream, index, or wildcard expression must be specified. This target can include a rollup or non-rollup index. For data streams, the stream’s backing indices can only serve as non-rollup indices. Omitting the parameter or using `_all` are not permitted.
* Multiple non-rollup indices may be specified.
* Only one rollup index may be specified. If more than one are supplied, an exception occurs.
* Wildcard expressions (`*`) may be used. If they match more than one rollup index, an exception occurs. However, you can use an expression to match multiple non-rollup indices or data streams.

    * **`aggregations` (Optional, Record<string, { aggregations, meta, adjacency_matrix, auto_date_histogram, avg, avg_bucket, boxplot, bucket_script, bucket_selector, bucket_sort, bucket_count_ks_test, bucket_correlation, cardinality, categorize_text, children, composite, cumulative_cardinality, cumulative_sum, date_histogram, date_range, derivative, diversified_sampler, extended_stats, extended_stats_bucket, frequent_item_sets, filter, filters, geo_bounds, geo_centroid, geo_distance, geohash_grid, geo_line, geotile_grid, geohex_grid, global, histogram, ip_range, ip_prefix, inference, line, matrix_stats, max, max_bucket, median_absolute_deviation, min, min_bucket, missing, moving_avg, moving_percentiles, moving_fn, multi_terms, nested, normalize, parent, percentile_ranks, percentiles, percentiles_bucket, range, rare_terms, rate, reverse_nested, random_sampler, sampler, scripted_metric, serial_diff, significant_terms, significant_text, stats, stats_bucket, string_stats, sum, sum_bucket, terms, time_series, top_hits, t_test, top_metrics, value_count, weighted_avg, variable_width_histogram }>)**: Specifies aggregations.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: Specifies a DSL query that is subject to some limitations.
    * **`size` (Optional, number)**: Must be zero if set, as rollups work on pre-aggregated data.
    * **`rest_total_hits_as_int` (Optional, boolean)**: Indicates whether hits.total should be rendered as an integer or an object in the rest search response
    * **`typed_keys` (Optional, boolean)**: Specify whether aggregation and suggester names should be prefixed by their respective types in the response



### start_job [_start_job]

Start rollup jobs. If you try to start a job that does not exist, an exception occurs. If you try to start a job that is already started, nothing happens.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-start-job)

```ts
client.rollup.startJob({ id })
```


### Arguments [_arguments_341]

* **Request (object):**

    * **`id` (string)**: Identifier for the rollup job.



### stop_job [_stop_job]

Stop rollup jobs. If you try to stop a job that does not exist, an exception occurs. If you try to stop a job that is already stopped, nothing happens.

Since only a stopped job can be deleted, it can be useful to block the API until the indexer has fully stopped. This is accomplished with the `wait_for_completion` query parameter, and optionally a timeout. For example:

```
POST _rollup/job/sensor/_stop?wait_for_completion=true&timeout=10s
```

The parameter blocks the API call from returning until either the job has moved to STOPPED or the specified time has elapsed. If the specified time elapses without the job moving to STOPPED, a timeout exception occurs.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-rollup-stop-job)

```ts
client.rollup.stopJob({ id })
```


### Arguments [_arguments_342]

* **Request (object):**

    * **`id` (string)**: Identifier for the rollup job.
    * **`timeout` (Optional, string | -1 | 0)**: If `wait_for_completion` is `true`, the API blocks for (at maximum) the specified duration while waiting for the job to stop. If more than `timeout` time has passed, the API throws a timeout exception. NOTE: Even if a timeout occurs, the stop request is still processing and eventually moves the job to STOPPED. The timeout simply means the API call itself timed out while waiting for the status change.
    * **`wait_for_completion` (Optional, boolean)**: If set to `true`, causes the API to block until the indexer state completely stops. If set to `false`, the API returns immediately and the indexer is stopped asynchronously in the background.



## search_application [_search_application]


### delete [_delete_8]

Delete a search application. Remove a search application and its associated alias. Indices attached to the search application are not removed.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-delete)

```ts
client.searchApplication.delete({ name })
```


### Arguments [_arguments_343]

* **Request (object):**

    * **`name` (string)**: The name of the search application to delete



### delete_behavioral_analytics [_delete_behavioral_analytics]

Delete a behavioral analytics collection. The associated data stream is also deleted.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-delete-behavioral-analytics)

```ts
client.searchApplication.deleteBehavioralAnalytics({ name })
```


### Arguments [_arguments_344]

* **Request (object):**

    * **`name` (string)**: The name of the analytics collection to be deleted



### get [_get_8]

Get search application details.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-get)

```ts
client.searchApplication.get({ name })
```


### Arguments [_arguments_345]

* **Request (object):**

    * **`name` (string)**: The name of the search application



### get_behavioral_analytics [_get_behavioral_analytics]

Get behavioral analytics collections.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-get-behavioral-analytics)

```ts
client.searchApplication.getBehavioralAnalytics({ ... })
```


### Arguments [_arguments_346]

* **Request (object):**

    * **`name` (Optional, string[])**: A list of analytics collections to limit the returned information



### list [_list_2]

Get search applications. Get information about search applications.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-list)

```ts
client.searchApplication.list({ ... })
```


### Arguments [_arguments_347]

* **Request (object):**

    * **`q` (Optional, string)**: Query in the Lucene query string syntax.
    * **`from` (Optional, number)**: Starting offset.
    * **`size` (Optional, number)**: Specifies a max number of results to get.



### post_behavioral_analytics_event [_post_behavioral_analytics_event]

Create a behavioral analytics collection event.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-post-behavioral-analytics-event)

```ts
client.searchApplication.postBehavioralAnalyticsEvent({ collection_name, event_type })
```


### Arguments [_arguments_348]

* **Request (object):**

    * **`collection_name` (string)**: The name of the behavioral analytics collection.
    * **`event_type` (Enum("page_view" | "search" | "search_click"))**: The analytics event type.
    * **`payload` (Optional, User-defined value)**
    * **`debug` (Optional, boolean)**: Whether the response type has to include more details



### put [_put_3]

Create or update a search application.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-put)

```ts
client.searchApplication.put({ name })
```


### Arguments [_arguments_349]

* **Request (object):**

    * **`name` (string)**: The name of the search application to be created or updated.
    * **`search_application` (Optional, { indices, analytics_collection_name, template })**
    * **`create` (Optional, boolean)**: If `true`, this request cannot replace or update existing Search Applications.



### put_behavioral_analytics [_put_behavioral_analytics]

Create a behavioral analytics collection.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-put-behavioral-analytics)

```ts
client.searchApplication.putBehavioralAnalytics({ name })
```


### Arguments [_arguments_350]

* **Request (object):**

    * **`name` (string)**: The name of the analytics collection to be created or updated.



### render_query [_render_query]

Render a search application query. Generate an Elasticsearch query using the specified query parameters and the search template associated with the search application or a default template if none is specified. If a parameter used in the search template is not specified in `params`, the parameter’s default value will be used. The API returns the specific Elasticsearch query that would be generated and run by calling the search application search API.

You must have `read` privileges on the backing alias of the search application.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-render-query)

```ts
client.searchApplication.renderQuery({ name })
```


### Arguments [_arguments_351]

* **Request (object):**

    * **`name` (string)**: The name of the search application to render teh query for.
    * **`params` (Optional, Record<string, User-defined value>)**



### search [_search_4]

Run a search application search. Generate and run an Elasticsearch query that uses the specified query parameteter and the search template associated with the search application or default template. Unspecified template parameters are assigned their default values if applicable.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-search-application-search)

```ts
client.searchApplication.search({ name })
```


### Arguments [_arguments_352]

* **Request (object):**

    * **`name` (string)**: The name of the search application to be searched.
    * **`params` (Optional, Record<string, User-defined value>)**: Query parameters specific to this request, which will override any defaults specified in the template.
    * **`typed_keys` (Optional, boolean)**: Determines whether aggregation names are prefixed by their respective types in the response.



## searchable_snapshots [_searchable_snapshots]


### cache_stats [_cache_stats]

Get cache statistics. Get statistics about the shared cache for partially mounted indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-searchable-snapshots-cache-stats)

```ts
client.searchableSnapshots.cacheStats({ ... })
```


### Arguments [_arguments_353]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: The names of the nodes in the cluster to target.
    * **`master_timeout` (Optional, string | -1 | 0)**



### clear_cache [_clear_cache_2]

Clear the cache. Clear indices and data streams from the shared cache for partially mounted indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-searchable-snapshots-clear-cache)

```ts
client.searchableSnapshots.clearCache({ ... })
```


### Arguments [_arguments_354]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams, indices, and aliases to clear from the cache. It supports wildcards (`*`).
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Whether to expand wildcard expression to concrete indices that are open, closed or both.
    * **`allow_no_indices` (Optional, boolean)**: Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
    * **`ignore_unavailable` (Optional, boolean)**: Whether specified concrete indices should be ignored when unavailable (missing or closed)



### mount [_mount]

Mount a snapshot. Mount a snapshot as a searchable snapshot index. Do not use this API for snapshots managed by index lifecycle management (ILM). Manually mounting ILM-managed snapshots can interfere with ILM processes.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-searchable-snapshots-mount)

```ts
client.searchableSnapshots.mount({ repository, snapshot, index })
```


### Arguments [_arguments_355]

* **Request (object):**

    * **`repository` (string)**: The name of the repository containing the snapshot of the index to mount.
    * **`snapshot` (string)**: The name of the snapshot of the index to mount.
    * **`index` (string)**: The name of the index contained in the snapshot whose data is to be mounted. If no `renamed_index` is specified, this name will also be used to create the new index.
    * **`renamed_index` (Optional, string)**: The name of the index that will be created.
    * **`index_settings` (Optional, Record<string, User-defined value>)**: The settings that should be added to the index when it is mounted.
    * **`ignore_index_settings` (Optional, string[])**: The names of settings that should be removed from the index when it is mounted.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`wait_for_completion` (Optional, boolean)**: If true, the request blocks until the operation is complete.
    * **`storage` (Optional, string)**: The mount option for the searchable snapshot index.



### stats [_stats_6]

Get searchable snapshot statistics.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-searchable-snapshots-stats)

```ts
client.searchableSnapshots.stats({ ... })
```


### Arguments [_arguments_356]

* **Request (object):**

    * **`index` (Optional, string | string[])**: A list of data streams and indices to retrieve statistics for.
    * **`level` (Optional, Enum("cluster" | "indices" | "shards"))**: Return stats aggregated at cluster, index or shard level



## security [_security]


### activate_user_profile [_activate_user_profile]

Activate a user profile.

Create or update a user profile on behalf of another user.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search, and Elastic Security solutions. Individual users and external applications should not call this API directly. The calling application must have either an `access_token` or a combination of `username` and `password` for the user that the profile document is intended for. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


This API creates or updates a profile document for end users with information that is extracted from the user’s authentication object including `username`, `full_name,` `roles`, and the authentication realm. For example, in the JWT `access_token` case, the profile user’s `username` is extracted from the JWT token claim pointed to by the `claims.principal` setting of the JWT realm that authenticated the token.

When updating a profile document, the API enables the document if it was disabled. Any updates do not change existing content for either the `labels` or `data` fields.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-activate-user-profile)

```ts
client.security.activateUserProfile({ grant_type })
```


### Arguments [_arguments_357]

* **Request (object):**

    * **`grant_type` (Enum("password" | "access_token"))**: The type of grant.
    * **`access_token` (Optional, string)**: The user’s Elasticsearch access token or JWT. Both `access` and `id` JWT token types are supported and they depend on the underlying JWT realm configuration. If you specify the `access_token` grant type, this parameter is required. It is not valid with other grant types.
    * **`password` (Optional, string)**: The user’s password. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types.
    * **`username` (Optional, string)**: The username that identifies the user. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types.



### authenticate [_authenticate]

Authenticate a user.

Authenticates a user and returns information about the authenticated user. Include the user information in a [basic auth header](https://en.wikipedia.org/wiki/Basic_access_authentication). A successful call returns a JSON structure that shows user information such as their username, the roles that are assigned to the user, any assigned metadata, and information about the realms that authenticated and authorized the user. If the user cannot be authenticated, this API returns a 401 status code.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-authenticate)

```ts
client.security.authenticate()
```


### bulk_delete_role [_bulk_delete_role]

Bulk delete roles.

The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The bulk delete roles API cannot delete roles that are defined in roles files.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-bulk-delete-role)

```ts
client.security.bulkDeleteRole({ names })
```


### Arguments [_arguments_358]

* **Request (object):**

    * **`names` (string[])**: An array of role names to delete
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### bulk_put_role [_bulk_put_role]

Bulk create or update roles.

The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The bulk create or update roles API cannot update roles that are defined in roles files.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-bulk-put-role)

```ts
client.security.bulkPutRole({ roles })
```


### Arguments [_arguments_359]

* **Request (object):**

    * **`roles` (Record<string, { cluster, indices, remote_indices, remote_cluster, global, applications, metadata, run_as, description, restriction, transient_metadata }>)**: A dictionary of role name to RoleDescriptor objects to add or update
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### bulk_update_api_keys [_bulk_update_api_keys]

Bulk update API keys. Update the attributes for multiple API keys.

::::{important}
It is not possible to use an API key as the authentication credential for this API. To update API keys, the owner user’s credentials are required.
::::


This API is similar to the update API key API but enables you to apply the same update to multiple API keys in one API call. This operation can greatly improve performance over making individual updates.

It is not possible to update expired or invalidated API keys.

This API supports updates to API key access scope, metadata and expiration. The access scope of each API key is derived from the `role_descriptors` you specify in the request and a snapshot of the owner user’s permissions at the time of the request. The snapshot of the owner’s permissions is updated automatically on every call.

::::{important}
If you don’t specify `role_descriptors` in the request, a call to this API might still change an API key’s access scope. This change can occur if the owner user’s permissions have changed since the API key was created or last modified.
::::


A successful request returns a JSON structure that contains the IDs of all updated API keys, the IDs of API keys that already had the requested changes and did not require an update, and error details for any failed update.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-bulk-update-api-keys)

```ts
client.security.bulkUpdateApiKeys({ ids })
```


### Arguments [_arguments_360]

* **Request (object):**

    * **`ids` (string | string[])**: The API key identifiers.
    * **`expiration` (Optional, string | -1 | 0)**: Expiration time for the API keys. By default, API keys never expire. This property can be omitted to leave the value unchanged.
    * **`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary nested metadata to associate with the API keys. Within the `metadata` object, top-level keys beginning with an underscore (`_`) are reserved for system usage. Any information specified with this parameter fully replaces metadata previously associated with the API key.
    * **`role_descriptors` (Optional, Record<string, { cluster, indices, remote_indices, remote_cluster, global, applications, metadata, run_as, description, restriction, transient_metadata }>)**: The role descriptors to assign to the API keys. An API key’s effective permissions are an intersection of its assigned privileges and the point-in-time snapshot of permissions of the owner user. You can assign new privileges by specifying them in this parameter. To remove assigned privileges, supply the `role_descriptors` parameter as an empty object `{}`. If an API key has no assigned privileges, it inherits the owner user’s full permissions. The snapshot of the owner’s permissions is always updated, whether you supply the `role_descriptors` parameter. The structure of a role descriptor is the same as the request for the create API keys API.



### change_password [_change_password]

Change passwords.

Change the passwords of users in the native realm and built-in users.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-change-password)

```ts
client.security.changePassword({ ... })
```


### Arguments [_arguments_361]

* **Request (object):**

    * **`username` (Optional, string)**: The user whose password you want to change. If you do not specify this parameter, the password is changed for the current user.
    * **`password` (Optional, string)**: The new password value. Passwords must be at least 6 characters long.
    * **`password_hash` (Optional, string)**: A hash of the new password value. This must be produced using the same hashing algorithm as has been configured for password storage. For more details, see the explanation of the `xpack.security.authc.password_hashing.algorithm` setting.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### clear_api_key_cache [_clear_api_key_cache]

Clear the API key cache.

Evict a subset of all entries from the API key cache. The cache is also automatically cleared on state changes of the security index.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-clear-api-key-cache)

```ts
client.security.clearApiKeyCache({ ids })
```


### Arguments [_arguments_362]

* **Request (object):**

    * **`ids` (string | string[])**: List of API key IDs to evict from the API key cache. To evict all API keys, use `*`. Does not support other wildcard patterns.



### clear_cached_privileges [_clear_cached_privileges]

Clear the privileges cache.

Evict privileges from the native application privilege cache. The cache is also automatically cleared for applications that have their privileges updated.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-clear-cached-privileges)

```ts
client.security.clearCachedPrivileges({ application })
```


### Arguments [_arguments_363]

* **Request (object):**

    * **`application` (string)**: A list of applications. To clear all applications, use an asterism (`*`). It does not support other wildcard patterns.



### clear_cached_realms [_clear_cached_realms]

Clear the user cache.

Evict users from the user cache. You can completely clear the cache or evict specific users.

User credentials are cached in memory on each node to avoid connecting to a remote authentication service or hitting the disk for every incoming request. There are realm settings that you can use to configure the user cache. For more information, refer to the documentation about controlling the user cache.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-clear-cached-realms)

```ts
client.security.clearCachedRealms({ realms })
```


### Arguments [_arguments_364]

* **Request (object):**

    * **`realms` (string | string[])**: A list of realms. To clear all realms, use an asterisk (`*`). It does not support other wildcard patterns.
    * **`usernames` (Optional, string[])**: A list of the users to clear from the cache. If you do not specify this parameter, the API evicts all users from the user cache.



### clear_cached_roles [_clear_cached_roles]

Clear the roles cache.

Evict roles from the native role cache.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-clear-cached-roles)

```ts
client.security.clearCachedRoles({ name })
```


### Arguments [_arguments_365]

* **Request (object):**

    * **`name` (string | string[])**: A list of roles to evict from the role cache. To evict all roles, use an asterisk (`*`). It does not support other wildcard patterns.



### clear_cached_service_tokens [_clear_cached_service_tokens]

Clear service account token caches.

Evict a subset of all entries from the service account token caches. Two separate caches exist for service account tokens: one cache for tokens backed by the `service_tokens` file, and another for tokens backed by the `.security` index. This API clears matching entries from both caches.

The cache for service account tokens backed by the `.security` index is cleared automatically on state changes of the security index. The cache for tokens backed by the `service_tokens` file is cleared automatically on file changes.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-clear-cached-service-tokens)

```ts
client.security.clearCachedServiceTokens({ namespace, service, name })
```


### Arguments [_arguments_366]

* **Request (object):**

    * **`namespace` (string)**: The namespace, which is a top-level grouping of service accounts.
    * **`service` (string)**: The name of the service, which must be unique within its namespace.
    * **`name` (string | string[])**: A list of token names to evict from the service account token caches. Use a wildcard (`*`) to evict all tokens that belong to a service account. It does not support other wildcard patterns.



### create_api_key [_create_api_key]

Create an API key.

Create an API key for access without requiring basic authentication.

::::{important}
If the credential that is used to authenticate this request is an API key, the derived API key cannot have any privileges. If you specify privileges, the API returns an error.
::::


A successful request returns a JSON structure that contains the API key, its unique id, and its name. If applicable, it also returns expiration information for the API key in milliseconds.

::::{note}
By default, API keys never expire. You can specify expiration information when you create the API keys.
::::


The API keys are created by the Elasticsearch API key service, which is automatically enabled. To configure or turn off the API key service, refer to API key service setting documentation.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-api-key)

```ts
client.security.createApiKey({ ... })
```


### Arguments [_arguments_367]

* **Request (object):**

    * **`expiration` (Optional, string | -1 | 0)**: The expiration time for the API key. By default, API keys never expire.
    * **`name` (Optional, string)**: A name for the API key.
    * **`role_descriptors` (Optional, Record<string, { cluster, indices, remote_indices, remote_cluster, global, applications, metadata, run_as, description, restriction, transient_metadata }>)**: An array of role descriptors for this API key. When it is not specified or it is an empty array, the API key will have a point in time snapshot of permissions of the authenticated user. If you supply role descriptors, the resultant permissions are an intersection of API keys permissions and the authenticated user’s permissions thereby limiting the access scope for API keys. The structure of role descriptor is the same as the request for the create role API. For more details, refer to the create or update roles API.


::::{note}
Due to the way in which this permission intersection is calculated, it is not possible to create an API key that is a child of another API key, unless the derived key is created without any privileges. In this case, you must explicitly specify a role descriptor with no privileges. The derived API key can be used for authentication; it will not have authority to call Elasticsearch APIs. ** *`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary metadata that you want to associate with the API key. It supports nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage. ** *`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.
::::



### create_cross_cluster_api_key [_create_cross_cluster_api_key]

Create a cross-cluster API key.

Create an API key of the `cross_cluster` type for the API key based remote cluster access. A `cross_cluster` API key cannot be used to authenticate through the REST interface.

::::{important}
To authenticate this request you must use a credential that is not an API key. Even if you use an API key that has the required privilege, the API returns an error.
::::


Cross-cluster API keys are created by the Elasticsearch API key service, which is automatically enabled.

::::{note}
Unlike REST API keys, a cross-cluster API key does not capture permissions of the authenticated user. The API key’s effective permission is exactly as specified with the `access` property.
::::


A successful request returns a JSON structure that contains the API key, its unique ID, and its name. If applicable, it also returns expiration information for the API key in milliseconds.

By default, API keys never expire. You can specify expiration information when you create the API keys.

Cross-cluster API keys can only be updated with the update cross-cluster API key API. Attempting to update them with the update REST API key API or the bulk update REST API keys API will result in an error.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-cross-cluster-api-key)

```ts
client.security.createCrossClusterApiKey({ access, name })
```


### Arguments [_arguments_368]

* **Request (object):**

    * **`access` ({ replication, search })**: The access to be granted to this API key. The access is composed of permissions for cross-cluster search and cross-cluster replication. At least one of them must be specified.


::::{note}
No explicit privileges should be specified for either search or replication access. The creation process automatically converts the access specification to a role descriptor which has relevant privileges assigned accordingly. ** *`name` (string)**: Specifies the name for this API key. *** *`expiration` (Optional, string | -1 | 0)**: Expiration time for the API key. By default, API keys never expire. ** *`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary metadata that you want to associate with the API key. It supports nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage.
::::



### create_service_token [_create_service_token]

Create a service account token.

Create a service accounts token for access without requiring basic authentication.

::::{note}
Service account tokens never expire. You must actively delete them if they are no longer needed.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-create-service-token)

```ts
client.security.createServiceToken({ namespace, service })
```


### Arguments [_arguments_369]

* **Request (object):**

    * **`namespace` (string)**: The name of the namespace, which is a top-level grouping of service accounts.
    * **`service` (string)**: The name of the service.
    * **`name` (Optional, string)**: The name for the service account token. If omitted, a random name will be generated.


Token names must be at least one and no more than 256 characters. They can contain alphanumeric characters (a-z, A-Z, 0-9), dashes (`-`), and underscores (`_`), but cannot begin with an underscore.

::::{note}
Token names must be unique in the context of the associated service account. They must also be globally unique with their fully qualified names, which are comprised of the service account principal and token name, such as `<namespace>/<service>/<token-name>`. *** *`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` then refresh the affected shards to make this operation visible to search, if `wait_for` (the default) then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.
::::



### delegate_pki [_delegate_pki]

Delegate PKI authentication.

This API implements the exchange of an X509Certificate chain for an Elasticsearch access token. The certificate chain is validated, according to RFC 5280, by sequentially considering the trust configuration of every installed PKI realm that has `delegation.enabled` set to `true`. A successfully trusted client certificate is also subject to the validation of the subject distinguished name according to thw `username_pattern` of the respective realm.

This API is called by smart and trusted proxies, such as Kibana, which terminate the user’s TLS session but still want to authenticate the user by using a PKI realm—-​as if the user connected directly to Elasticsearch.

::::{important}
The association between the subject public key in the target certificate and the corresponding private key is not validated. This is part of the TLS authentication process and it is delegated to the proxy that calls this API. The proxy is trusted to have performed the TLS authentication and this API translates that authentication into an Elasticsearch access token.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-delegate-pki)

```ts
client.security.delegatePki({ x509_certificate_chain })
```


### Arguments [_arguments_370]

* **Request (object):**

    * **`x509_certificate_chain` (string[])**: The X509Certificate chain, which is represented as an ordered string array. Each string in the array is a base64-encoded (Section 4 of RFC4648 - not base64url-encoded) of the certificate’s DER encoding.


The first element is the target certificate that contains the subject distinguished name that is requesting access. This may be followed by additional certificates; each subsequent certificate is used to certify the previous one.


### delete_privileges [_delete_privileges]

Delete application privileges.

To use this API, you must have one of the following privileges:

* The `manage_security` cluster privilege (or a greater privilege such as `all`).
* The "Manage Application Privileges" global privilege for the application being referenced in the request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-delete-privileges)

```ts
client.security.deletePrivileges({ application, name })
```


### Arguments [_arguments_371]

* **Request (object):**

    * **`application` (string)**: The name of the application. Application privileges are always associated with exactly one application.
    * **`name` (string | string[])**: The name of the privilege.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### delete_role [_delete_role]

Delete roles.

Delete roles in the native realm. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The delete roles API cannot remove roles that are defined in roles files.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-delete-role)

```ts
client.security.deleteRole({ name })
```


### Arguments [_arguments_372]

* **Request (object):**

    * **`name` (string)**: The name of the role.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### delete_role_mapping [_delete_role_mapping]

Delete role mappings.

Role mappings define which roles are assigned to each user. The role mapping APIs are generally the preferred way to manage role mappings rather than using role mapping files. The delete role mappings API cannot remove role mappings that are defined in role mapping files.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-delete-role-mapping)

```ts
client.security.deleteRoleMapping({ name })
```


### Arguments [_arguments_373]

* **Request (object):**

    * **`name` (string)**: The distinct name that identifies the role mapping. The name is used solely as an identifier to facilitate interaction via the API; it does not affect the behavior of the mapping in any way.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### delete_service_token [_delete_service_token]

Delete service account tokens.

Delete service account tokens for a service in a specified namespace.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-delete-service-token)

```ts
client.security.deleteServiceToken({ namespace, service, name })
```


### Arguments [_arguments_374]

* **Request (object):**

    * **`namespace` (string)**: The namespace, which is a top-level grouping of service accounts.
    * **`service` (string)**: The service name.
    * **`name` (string)**: The name of the service account token.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` then refresh the affected shards to make this operation visible to search, if `wait_for` (the default) then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### delete_user [_delete_user]

Delete users.

Delete users from the native realm.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-delete-user)

```ts
client.security.deleteUser({ username })
```


### Arguments [_arguments_375]

* **Request (object):**

    * **`username` (string)**: An identifier for the user.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### disable_user [_disable_user]

Disable users.

Disable users in the native realm. By default, when you create users, they are enabled. You can use this API to revoke a user’s access to Elasticsearch.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-disable-user)

```ts
client.security.disableUser({ username })
```


### Arguments [_arguments_376]

* **Request (object):**

    * **`username` (string)**: An identifier for the user.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### disable_user_profile [_disable_user_profile]

Disable a user profile.

Disable user profiles so that they are not visible in user profile searches.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


When you activate a user profile, its automatically enabled and visible in user profile searches. You can use the disable user profile API to disable a user profile so it’s not visible in these searches. To re-enable a disabled user profile, use the enable user profile API .

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-disable-user-profile)

```ts
client.security.disableUserProfile({ uid })
```


### Arguments [_arguments_377]

* **Request (object):**

    * **`uid` (string)**: Unique identifier for the user profile.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If *true*, Elasticsearch refreshes the affected shards to make this operation visible to search. If *wait_for*, it waits for a refresh to make this operation visible to search. If *false*, it does nothing with refreshes.



### enable_user [_enable_user]

Enable users.

Enable users in the native realm. By default, when you create users, they are enabled.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-enable-user)

```ts
client.security.enableUser({ username })
```


### Arguments [_arguments_378]

* **Request (object):**

    * **`username` (string)**: An identifier for the user.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### enable_user_profile [_enable_user_profile]

Enable a user profile.

Enable user profiles to make them visible in user profile searches.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


When you activate a user profile, it’s automatically enabled and visible in user profile searches. If you later disable the user profile, you can use the enable user profile API to make the profile visible in these searches again.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-enable-user-profile)

```ts
client.security.enableUserProfile({ uid })
```


### Arguments [_arguments_379]

* **Request (object):**

    * **`uid` (string)**: A unique identifier for the user profile.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If *true*, Elasticsearch refreshes the affected shards to make this operation visible to search. If *wait_for*, it waits for a refresh to make this operation visible to search. If *false*, nothing is done with refreshes.



### enroll_kibana [_enroll_kibana]

Enroll Kibana.

Enable a Kibana instance to configure itself for communication with a secured Elasticsearch cluster.

::::{note}
This API is currently intended for internal use only by Kibana. Kibana uses this API internally to configure itself for communications with an Elasticsearch cluster that already has security features enabled.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-enroll-kibana)

```ts
client.security.enrollKibana()
```


### enroll_node [_enroll_node]

Enroll a node.

Enroll a new node to allow it to join an existing cluster with security features enabled.

The response contains all the necessary information for the joining node to bootstrap discovery and security related settings so that it can successfully join the cluster. The response contains key and certificate material that allows the caller to generate valid signed certificates for the HTTP layer of all nodes in the cluster.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-enroll-node)

```ts
client.security.enrollNode()
```


### get_api_key [_get_api_key]

Get API key information.

Retrieves information for one or more API keys. NOTE: If you have only the `manage_own_api_key` privilege, this API returns only the API keys that you own. If you have `read_security`, `manage_api_key` or greater privileges (including `manage_security`), this API returns all API keys regardless of ownership.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-api-key)

```ts
client.security.getApiKey({ ... })
```


### Arguments [_arguments_380]

* **Request (object):**

    * **`id` (Optional, string)**: An API key id. This parameter cannot be used with any of `name`, `realm_name` or `username`.
    * **`name` (Optional, string)**: An API key name. This parameter cannot be used with any of `id`, `realm_name` or `username`. It supports prefix search with wildcard.
    * **`owner` (Optional, boolean)**: A boolean flag that can be used to query API keys owned by the currently authenticated user. The `realm_name` or `username` parameters cannot be specified when this parameter is set to `true` as they are assumed to be the currently authenticated ones.
    * **`realm_name` (Optional, string)**: The name of an authentication realm. This parameter cannot be used with either `id` or `name` or when `owner` flag is set to `true`.
    * **`username` (Optional, string)**: The username of a user. This parameter cannot be used with either `id` or `name` or when `owner` flag is set to `true`.
    * **`with_limited_by` (Optional, boolean)**: Return the snapshot of the owner user’s role descriptors associated with the API key. An API key’s actual permission is the intersection of its assigned role descriptors and the owner user’s role descriptors.
    * **`active_only` (Optional, boolean)**: A boolean flag that can be used to query API keys that are currently active. An API key is considered active if it is neither invalidated, nor expired at query time. You can specify this together with other parameters such as `owner` or `name`. If `active_only` is false, the response will include both active and inactive (expired or invalidated) keys.
    * **`with_profile_uid` (Optional, boolean)**: Determines whether to also retrieve the profile uid, for the API key owner principal, if it exists.



### get_builtin_privileges [_get_builtin_privileges]

Get builtin privileges.

Get the list of cluster privileges and index privileges that are available in this version of Elasticsearch.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-builtin-privileges)

```ts
client.security.getBuiltinPrivileges()
```


### get_privileges [_get_privileges]

Get application privileges.

To use this API, you must have one of the following privileges:

* The `read_security` cluster privilege (or a greater privilege such as `manage_security` or `all`).
* The "Manage Application Privileges" global privilege for the application being referenced in the request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-privileges)

```ts
client.security.getPrivileges({ ... })
```


### Arguments [_arguments_381]

* **Request (object):**

    * **`application` (Optional, string)**: The name of the application. Application privileges are always associated with exactly one application. If you do not specify this parameter, the API returns information about all privileges for all applications.
    * **`name` (Optional, string | string[])**: The name of the privilege. If you do not specify this parameter, the API returns information about all privileges for the requested application.



### get_role [_get_role]

Get roles.

Get roles in the native realm. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The get roles API cannot retrieve roles that are defined in roles files.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-role)

```ts
client.security.getRole({ ... })
```


### Arguments [_arguments_382]

* **Request (object):**

    * **`name` (Optional, string | string[])**: The name of the role. You can specify multiple roles as a list. If you do not specify this parameter, the API returns information about all roles.



### get_role_mapping [_get_role_mapping]

Get role mappings.

Role mappings define which roles are assigned to each user. The role mapping APIs are generally the preferred way to manage role mappings rather than using role mapping files. The get role mappings API cannot retrieve role mappings that are defined in role mapping files.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-role-mapping)

```ts
client.security.getRoleMapping({ ... })
```


### Arguments [_arguments_383]

* **Request (object):**

    * **`name` (Optional, string | string[])**: The distinct name that identifies the role mapping. The name is used solely as an identifier to facilitate interaction via the API; it does not affect the behavior of the mapping in any way. You can specify multiple mapping names as a list. If you do not specify this parameter, the API returns information about all role mappings.



### get_service_accounts [_get_service_accounts]

Get service accounts.

Get a list of service accounts that match the provided path parameters.

::::{note}
Currently, only the `elastic/fleet-server` service account is available.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-service-accounts)

```ts
client.security.getServiceAccounts({ ... })
```


### Arguments [_arguments_384]

* **Request (object):**

    * **`namespace` (Optional, string)**: The name of the namespace. Omit this parameter to retrieve information about all service accounts. If you omit this parameter, you must also omit the `service` parameter.
    * **`service` (Optional, string)**: The service name. Omit this parameter to retrieve information about all service accounts that belong to the specified `namespace`.



### get_service_credentials [_get_service_credentials]

Get service account credentials.

To use this API, you must have at least the `read_security` cluster privilege (or a greater privilege such as `manage_service_account` or `manage_security`).

The response includes service account tokens that were created with the create service account tokens API as well as file-backed tokens from all nodes of the cluster.

::::{note}
For tokens backed by the `service_tokens` file, the API collects them from all nodes of the cluster. Tokens with the same name from different nodes are assumed to be the same token and are only counted once towards the total number of service tokens.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-service-credentials)

```ts
client.security.getServiceCredentials({ namespace, service })
```


### Arguments [_arguments_385]

* **Request (object):**

    * **`namespace` (string)**: The name of the namespace.
    * **`service` (string)**: The service name.



### get_settings [_get_settings_3]

Get security index settings.

Get the user-configurable settings for the security internal index (`.security` and associated indices). Only a subset of the index settings — those that are user-configurable—will be shown. This includes:

* `index.auto_expand_replicas`
* `index.number_of_replicas`

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-settings)

```ts
client.security.getSettings({ ... })
```


### Arguments [_arguments_386]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_token [_get_token]

Get a token.

Create a bearer token for access without requiring basic authentication. The tokens are created by the Elasticsearch Token Service, which is automatically enabled when you configure TLS on the HTTP interface. Alternatively, you can explicitly enable the `xpack.security.authc.token.enabled` setting. When you are running in production mode, a bootstrap check prevents you from enabling the token service unless you also enable TLS on the HTTP interface.

The get token API takes the same parameters as a typical OAuth 2.0 token API except for the use of a JSON request body.

A successful get token API call returns a JSON structure that contains the access token, the amount of time (seconds) that the token expires in, the type, and the scope if available.

The tokens returned by the get token API have a finite period of time for which they are valid and after that time period, they can no longer be used. That time period is defined by the `xpack.security.authc.token.timeout` setting. If you want to invalidate a token immediately, you can do so by using the invalidate token API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-token)

```ts
client.security.getToken({ ... })
```


### Arguments [_arguments_387]

* **Request (object):**

    * **`grant_type` (Optional, Enum("password" | "client_credentials" | "_kerberos" | "refresh_token"))**: The type of grant. Supported grant types are: `password`, `_kerberos`, `client_credentials`, and `refresh_token`.
    * **`scope` (Optional, string)**: The scope of the token. Currently tokens are only issued for a scope of FULL regardless of the value sent with the request.
    * **`password` (Optional, string)**: The user’s password. If you specify the `password` grant type, this parameter is required. This parameter is not valid with any other supported grant type.
    * **`kerberos_ticket` (Optional, string)**: The base64 encoded kerberos ticket. If you specify the `_kerberos` grant type, this parameter is required. This parameter is not valid with any other supported grant type.
    * **`refresh_token` (Optional, string)**: The string that was returned when you created the token, which enables you to extend its life. If you specify the `refresh_token` grant type, this parameter is required. This parameter is not valid with any other supported grant type.
    * **`username` (Optional, string)**: The username that identifies the user. If you specify the `password` grant type, this parameter is required. This parameter is not valid with any other supported grant type.



### get_user [_get_user]

Get users.

Get information about users in the native realm and built-in users.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-user)

```ts
client.security.getUser({ ... })
```


### Arguments [_arguments_388]

* **Request (object):**

    * **`username` (Optional, string | string[])**: An identifier for the user. You can specify multiple usernames as a list. If you omit this parameter, the API retrieves information about all users.
    * **`with_profile_uid` (Optional, boolean)**: Determines whether to retrieve the user profile UID, if it exists, for the users.



### get_user_privileges [_get_user_privileges]

Get user privileges.

Get the security privileges for the logged in user. All users can use this API, but only to determine their own privileges. To check the privileges of other users, you must use the run as feature. To check whether a user has a specific list of privileges, use the has privileges API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-user-privileges)

```ts
client.security.getUserPrivileges({ ... })
```


### Arguments [_arguments_389]

* **Request (object):**

    * **`application` (Optional, string)**: The name of the application. Application privileges are always associated with exactly one application. If you do not specify this parameter, the API returns information about all privileges for all applications.
    * **`priviledge` (Optional, string)**: The name of the privilege. If you do not specify this parameter, the API returns information about all privileges for the requested application.
    * **`username` (Optional, string | null)**



### get_user_profile [_get_user_profile]

Get a user profile.

Get a user’s profile using the unique profile ID.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-get-user-profile)

```ts
client.security.getUserProfile({ uid })
```


### Arguments [_arguments_390]

* **Request (object):**

    * **`uid` (string | string[])**: A unique identifier for the user profile.
    * **`data` (Optional, string | string[])**: A list of filters for the `data` field of the profile document. To return all content use `data=*`. To return a subset of content use `data=<key>` to retrieve content nested under the specified `<key>`. By default returns no `data` content.



### grant_api_key [_grant_api_key]

Grant an API key.

Create an API key on behalf of another user. This API is similar to the create API keys API, however it creates the API key for a user that is different than the user that runs the API. The caller must have authentication credentials for the user on whose behalf the API key will be created. It is not possible to use this API to create an API key without that user’s credentials. The supported user authentication credential types are:

* username and password
* Elasticsearch access tokens
* JWTs

The user, for whom the authentication credentials is provided, can optionally "run as" (impersonate) another user. In this case, the API key will be created on behalf of the impersonated user.

This API is intended be used by applications that need to create and manage API keys for end users, but cannot guarantee that those users have permission to create API keys on their own behalf. The API keys are created by the Elasticsearch API key service, which is automatically enabled.

A successful grant API key API call returns a JSON structure that contains the API key, its unique id, and its name. If applicable, it also returns expiration information for the API key in milliseconds.

By default, API keys never expire. You can specify expiration information when you create the API keys.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-grant-api-key)

```ts
client.security.grantApiKey({ api_key, grant_type })
```


### Arguments [_arguments_391]

* **Request (object):**

    * **`api_key` ({ name, expiration, role_descriptors, metadata })**: The API key.
    * **`grant_type` (Enum("access_token" | "password"))**: The type of grant. Supported grant types are: `access_token`, `password`.
    * **`access_token` (Optional, string)**: The user’s access token. If you specify the `access_token` grant type, this parameter is required. It is not valid with other grant types.
    * **`username` (Optional, string)**: The user name that identifies the user. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types.
    * **`password` (Optional, string)**: The user’s password. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types.
    * **`run_as` (Optional, string)**: The name of the user to be impersonated.



### has_privileges [_has_privileges]

Check user privileges.

Determine whether the specified user has a specified list of privileges. All users can use this API, but only to determine their own privileges. To check the privileges of other users, you must use the run as feature.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-has-privileges)

```ts
client.security.hasPrivileges({ ... })
```


### Arguments [_arguments_392]

* **Request (object):**

    * **`user` (Optional, string)**: Username
    * **`application` (Optional, { application, privileges, resources }[])**
    * **`cluster` (Optional, Enum("all" | "cancel_task" | "create_snapshot" | "cross_cluster_replication" | "cross_cluster_search" | "delegate_pki" | "grant_api_key" | "manage" | "manage_api_key" | "manage_autoscaling" | "manage_behavioral_analytics" | "manage_ccr" | "manage_data_frame_transforms" | "manage_data_stream_global_retention" | "manage_enrich" | "manage_ilm" | "manage_index_templates" | "manage_inference" | "manage_ingest_pipelines" | "manage_logstash_pipelines" | "manage_ml" | "manage_oidc" | "manage_own_api_key" | "manage_pipeline" | "manage_rollup" | "manage_saml" | "manage_search_application" | "manage_search_query_rules" | "manage_search_synonyms" | "manage_security" | "manage_service_account" | "manage_slm" | "manage_token" | "manage_transform" | "manage_user_profile" | "manage_watcher" | "monitor" | "monitor_data_frame_transforms" | "monitor_data_stream_global_retention" | "monitor_enrich" | "monitor_inference" | "monitor_ml" | "monitor_rollup" | "monitor_snapshot" | "monitor_stats" | "monitor_text_structure" | "monitor_transform" | "monitor_watcher" | "none" | "post_behavioral_analytics_event" | "read_ccr" | "read_fleet_secrets" | "read_ilm" | "read_pipeline" | "read_security" | "read_slm" | "transport_client" | "write_connector_secrets" | "write_fleet_secrets")[])**: A list of the cluster privileges that you want to check.
    * **`index` (Optional, { names, privileges, allow_restricted_indices }[])**



### has_privileges_user_profile [_has_privileges_user_profile]

Check user profile privileges.

Determine whether the users associated with the specified user profile IDs have all the requested privileges.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-has-privileges-user-profile)

```ts
client.security.hasPrivilegesUserProfile({ uids, privileges })
```


### Arguments [_arguments_393]

* **Request (object):**

    * **`uids` (string[])**: A list of profile IDs. The privileges are checked for associated users of the profiles.
    * **`privileges` ({ application, cluster, index })**: An object containing all the privileges to be checked.



### invalidate_api_key [_invalidate_api_key]

Invalidate API keys.

This API invalidates API keys created by the create API key or grant API key APIs. Invalidated API keys fail authentication, but they can still be viewed using the get API key information and query API key information APIs, for at least the configured retention period, until they are automatically deleted.

To use this API, you must have at least the `manage_security`, `manage_api_key`, or `manage_own_api_key` cluster privileges. The `manage_security` privilege allows deleting any API key, including both REST and cross cluster API keys. The `manage_api_key` privilege allows deleting any REST API key, but not cross cluster API keys. The `manage_own_api_key` only allows deleting REST API keys that are owned by the user. In addition, with the `manage_own_api_key` privilege, an invalidation request must be issued in one of the three formats:

* Set the parameter `owner=true`.
* Or, set both `username` and `realm_name` to match the user’s identity.
* Or, if the request is issued by an API key, that is to say an API key invalidates itself, specify its ID in the `ids` field.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-invalidate-api-key)

```ts
client.security.invalidateApiKey({ ... })
```


### Arguments [_arguments_394]

* **Request (object):**

    * **`id` (Optional, string)**
    * **`ids` (Optional, string[])**: A list of API key ids. This parameter cannot be used with any of `name`, `realm_name`, or `username`.
    * **`name` (Optional, string)**: An API key name. This parameter cannot be used with any of `ids`, `realm_name` or `username`.
    * **`owner` (Optional, boolean)**: Query API keys owned by the currently authenticated user. The `realm_name` or `username` parameters cannot be specified when this parameter is set to `true` as they are assumed to be the currently authenticated ones.


::::{note}
At least one of `ids`, `name`, `username`, and `realm_name` must be specified if `owner` is `false`. ** *`realm_name` (Optional, string)**: The name of an authentication realm. This parameter cannot be used with either `ids` or `name`, or when `owner` flag is set to `true`. ** *`username` (Optional, string)**: The username of a user. This parameter cannot be used with either `ids` or `name` or when `owner` flag is set to `true`.
::::



### invalidate_token [_invalidate_token]

Invalidate a token.

The access tokens returned by the get token API have a finite period of time for which they are valid. After that time period, they can no longer be used. The time period is defined by the `xpack.security.authc.token.timeout` setting.

The refresh tokens returned by the get token API are only valid for 24 hours. They can also be used exactly once. If you want to invalidate one or more access or refresh tokens immediately, use this invalidate token API.

::::{note}
While all parameters are optional, at least one of them is required. More specifically, either one of `token` or `refresh_token` parameters is required. If none of these two are specified, then `realm_name` and/or `username` need to be specified.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-invalidate-token)

```ts
client.security.invalidateToken({ ... })
```


### Arguments [_arguments_395]

* **Request (object):**

    * **`token` (Optional, string)**: An access token. This parameter cannot be used if any of `refresh_token`, `realm_name`, or `username` are used.
    * **`refresh_token` (Optional, string)**: A refresh token. This parameter cannot be used if any of `refresh_token`, `realm_name`, or `username` are used.
    * **`realm_name` (Optional, string)**: The name of an authentication realm. This parameter cannot be used with either `refresh_token` or `token`.
    * **`username` (Optional, string)**: The username of a user. This parameter cannot be used with either `refresh_token` or `token`.



### oidc_authenticate [_oidc_authenticate]

Authenticate OpenID Connect.

Exchange an OpenID Connect authentication response message for an Elasticsearch internal access token and refresh token that can be subsequently used for authentication.

Elasticsearch exposes all the necessary OpenID Connect related functionality with the OpenID Connect APIs. These APIs are used internally by Kibana in order to provide OpenID Connect based authentication, but can also be used by other, custom web applications or other clients.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-oidc-authenticate)

```ts
client.security.oidcAuthenticate({ nonce, redirect_uri, state })
```


### Arguments [_arguments_396]

* **Request (object):**

    * **`nonce` (string)**: Associate a client session with an ID token and mitigate replay attacks. This value needs to be the same as the one that was provided to the `/_security/oidc/prepare` API or the one that was generated by Elasticsearch and included in the response to that call.
    * **`redirect_uri` (string)**: The URL to which the OpenID Connect Provider redirected the User Agent in response to an authentication request after a successful authentication. This URL must be provided as-is (URL encoded), taken from the body of the response or as the value of a location header in the response from the OpenID Connect Provider.
    * **`state` (string)**: Maintain state between the authentication request and the response. This value needs to be the same as the one that was provided to the `/_security/oidc/prepare` API or the one that was generated by Elasticsearch and included in the response to that call.
    * **`realm` (Optional, string)**: The name of the OpenID Connect realm. This property is useful in cases where multiple realms are defined.



### oidc_logout [_oidc_logout]

Logout of OpenID Connect.

Invalidate an access token and a refresh token that were generated as a response to the `/_security/oidc/authenticate` API.

If the OpenID Connect authentication realm in Elasticsearch is accordingly configured, the response to this call will contain a URI pointing to the end session endpoint of the OpenID Connect Provider in order to perform single logout.

Elasticsearch exposes all the necessary OpenID Connect related functionality with the OpenID Connect APIs. These APIs are used internally by Kibana in order to provide OpenID Connect based authentication, but can also be used by other, custom web applications or other clients.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-oidc-logout)

```ts
client.security.oidcLogout({ access_token })
```


### Arguments [_arguments_397]

* **Request (object):**

    * **`access_token` (string)**: The access token to be invalidated.
    * **`refresh_token` (Optional, string)**: The refresh token to be invalidated.



### oidc_prepare_authentication [_oidc_prepare_authentication]

Prepare OpenID connect authentication.

Create an oAuth 2.0 authentication request as a URL string based on the configuration of the OpenID Connect authentication realm in Elasticsearch.

The response of this API is a URL pointing to the Authorization Endpoint of the configured OpenID Connect Provider, which can be used to redirect the browser of the user in order to continue the authentication process.

Elasticsearch exposes all the necessary OpenID Connect related functionality with the OpenID Connect APIs. These APIs are used internally by Kibana in order to provide OpenID Connect based authentication, but can also be used by other, custom web applications or other clients.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-oidc-prepare-authentication)

```ts
client.security.oidcPrepareAuthentication({ ... })
```


### Arguments [_arguments_398]

* **Request (object):**

    * **`iss` (Optional, string)**: In the case of a third party initiated single sign on, this is the issuer identifier for the OP that the RP is to send the authentication request to. It cannot be specified when **realm** is specified. One of **realm** or **iss** is required.
    * **`login_hint` (Optional, string)**: In the case of a third party initiated single sign on, it is a string value that is included in the authentication request as the **login_hint** parameter. This parameter is not valid when **realm** is specified.
    * **`nonce` (Optional, string)**: The value used to associate a client session with an ID token and to mitigate replay attacks. If the caller of the API does not provide a value, Elasticsearch will generate one with sufficient entropy and return it in the response.
    * **`realm` (Optional, string)**: The name of the OpenID Connect realm in Elasticsearch the configuration of which should be used in order to generate the authentication request. It cannot be specified when **iss** is specified. One of **realm** or **iss** is required.
    * **`state` (Optional, string)**: The value used to maintain state between the authentication request and the response, typically used as a Cross-Site Request Forgery mitigation. If the caller of the API does not provide a value, Elasticsearch will generate one with sufficient entropy and return it in the response.



### put_privileges [_put_privileges]

Create or update application privileges.

To use this API, you must have one of the following privileges:

* The `manage_security` cluster privilege (or a greater privilege such as `all`).
* The "Manage Application Privileges" global privilege for the application being referenced in the request.

Application names are formed from a prefix, with an optional suffix that conform to the following rules:

* The prefix must begin with a lowercase ASCII letter.
* The prefix must contain only ASCII letters or digits.
* The prefix must be at least 3 characters long.
* If the suffix exists, it must begin with either a dash `-` or `_`.
* The suffix cannot contain any of the following characters: `\`, `/`, `*`, `?`, `"`, `<`, `>`, `|`, `,`, `*`.
* No part of the name can contain whitespace.

Privilege names must begin with a lowercase ASCII letter and must contain only ASCII letters and digits along with the characters `_`, `-`, and `.`.

Action names can contain any number of printable ASCII characters and must contain at least one of the following characters: `/`, `*`, `:`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-put-privileges)

```ts
client.security.putPrivileges({ ... })
```


### Arguments [_arguments_399]

* **Request (object):**

    * **`privileges` (Optional, Record<string, Record<string, { allocate, delete, downsample, freeze, forcemerge, migrate, readonly, rollover, set_priority, searchable_snapshot, shrink, unfollow, wait_for_snapshot }>>)**
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### put_role [_put_role]

Create or update roles.

The role management APIs are generally the preferred way to manage roles in the native realm, rather than using file-based role management. The create or update roles API cannot update roles that are defined in roles files. File-based role management is not available in Elastic Serverless.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-put-role)

```ts
client.security.putRole({ name })
```


### Arguments [_arguments_400]

* **Request (object):**

    * **`name` (string)**: The name of the role that is being created or updated. On Elasticsearch Serverless, the role name must begin with a letter or digit and can only contain letters, digits and the characters *_*, *-*, and *.*. Each role must have a unique name, as this will serve as the identifier for that role.
    * **`applications` (Optional, { application, privileges, resources }[])**: A list of application privilege entries.
    * **`cluster` (Optional, Enum("all" | "cancel_task" | "create_snapshot" | "cross_cluster_replication" | "cross_cluster_search" | "delegate_pki" | "grant_api_key" | "manage" | "manage_api_key" | "manage_autoscaling" | "manage_behavioral_analytics" | "manage_ccr" | "manage_data_frame_transforms" | "manage_data_stream_global_retention" | "manage_enrich" | "manage_ilm" | "manage_index_templates" | "manage_inference" | "manage_ingest_pipelines" | "manage_logstash_pipelines" | "manage_ml" | "manage_oidc" | "manage_own_api_key" | "manage_pipeline" | "manage_rollup" | "manage_saml" | "manage_search_application" | "manage_search_query_rules" | "manage_search_synonyms" | "manage_security" | "manage_service_account" | "manage_slm" | "manage_token" | "manage_transform" | "manage_user_profile" | "manage_watcher" | "monitor" | "monitor_data_frame_transforms" | "monitor_data_stream_global_retention" | "monitor_enrich" | "monitor_inference" | "monitor_ml" | "monitor_rollup" | "monitor_snapshot" | "monitor_stats" | "monitor_text_structure" | "monitor_transform" | "monitor_watcher" | "none" | "post_behavioral_analytics_event" | "read_ccr" | "read_fleet_secrets" | "read_ilm" | "read_pipeline" | "read_security" | "read_slm" | "transport_client" | "write_connector_secrets" | "write_fleet_secrets")[])**: A list of cluster privileges. These privileges define the cluster-level actions for users with this role.
    * **`global` (Optional, Record<string, User-defined value>)**: An object defining global privileges. A global privilege is a form of cluster privilege that is request-aware. Support for global privileges is currently limited to the management of application privileges.
    * **`indices` (Optional, { field_security, names, privileges, query, allow_restricted_indices }[])**: A list of indices permissions entries.
    * **`remote_indices` (Optional, { clusters, field_security, names, privileges, query, allow_restricted_indices }[])**: A list of remote indices permissions entries.


::::{note}
Remote indices are effective for remote clusters configured with the API key based model. They have no effect for remote clusters configured with the certificate based model. ** *`remote_cluster` (Optional, { clusters, privileges }[])**: A list of remote cluster permissions entries. *** *`metadata` (Optional, Record<string, User-defined value>)**: Optional metadata. Within the metadata object, keys that begin with an underscore (`_`) are reserved for system use. *** *`run_as` (Optional, string[])**: A list of users that the owners of this role can impersonate. **Note**: in Serverless, the run-as feature is disabled. For API compatibility, you can still specify an empty `run_as` field, but a non-empty list will be rejected. *** *`description` (Optional, string)**: Optional description of the role descriptor *** *`transient_metadata` (Optional, Record<string, User-defined value>)**: Indicates roles that might be incompatible with the current cluster license, specifically roles with document and field level security. When the cluster license doesn’t allow certain features for a given role, this parameter is updated dynamically to list the incompatible features. If `enabled` is `false`, the role is ignored, but is still listed in the response from the authenticate API. ** *`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.
::::



### put_role_mapping [_put_role_mapping]

Create or update role mappings.

Role mappings define which roles are assigned to each user. Each mapping has rules that identify users and a list of roles that are granted to those users. The role mapping APIs are generally the preferred way to manage role mappings rather than using role mapping files. The create or update role mappings API cannot update role mappings that are defined in role mapping files.

::::{note}
This API does not create roles. Rather, it maps users to existing roles. Roles can be created by using the create or update roles API or roles files.
::::


**Role templates**

The most common use for role mappings is to create a mapping from a known value on the user to a fixed role name. For example, all users in the `cn=admin,dc=example,dc=com` LDAP group should be given the superuser role in Elasticsearch. The `roles` field is used for this purpose.

For more complex needs, it is possible to use Mustache templates to dynamically determine the names of the roles that should be granted to the user. The `role_templates` field is used for this purpose.

::::{note}
To use role templates successfully, the relevant scripting feature must be enabled. Otherwise, all attempts to create a role mapping with role templates fail.
::::


All of the user fields that are available in the role mapping rules are also available in the role templates. Thus it is possible to assign a user to a role that reflects their username, their groups, or the name of the realm to which they authenticated.

By default a template is evaluated to produce a single string that is the name of the role which should be assigned to the user. If the format of the template is set to "json" then the template is expected to produce a JSON string or an array of JSON strings for the role names.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-put-role-mapping)

```ts
client.security.putRoleMapping({ name })
```


### Arguments [_arguments_401]

* **Request (object):**

    * **`name` (string)**: The distinct name that identifies the role mapping. The name is used solely as an identifier to facilitate interaction via the API; it does not affect the behavior of the mapping in any way.
    * **`enabled` (Optional, boolean)**: Mappings that have `enabled` set to `false` are ignored when role mapping is performed.
    * **`metadata` (Optional, Record<string, User-defined value>)**: Additional metadata that helps define which roles are assigned to each user. Within the metadata object, keys beginning with `_` are reserved for system usage.
    * **`roles` (Optional, string[])**: A list of role names that are granted to the users that match the role mapping rules. Exactly one of `roles` or `role_templates` must be specified.
    * **`role_templates` (Optional, { format, template }[])**: A list of Mustache templates that will be evaluated to determine the roles names that should granted to the users that match the role mapping rules. Exactly one of `roles` or `role_templates` must be specified.
    * **`rules` (Optional, { any, all, field, except })**: The rules that determine which users should be matched by the mapping. A rule is a logical condition that is expressed by using a JSON DSL.
    * **`run_as` (Optional, string[])**
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.



### put_user [_put_user]

Create or update users.

Add and update users in the native realm. A password is required for adding a new user but is optional when updating an existing user. To change a user’s password without updating any other fields, use the change password API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-put-user)

```ts
client.security.putUser({ username })
```


### Arguments [_arguments_402]

* **Request (object):**

    * **`username` (string)**: An identifier for the user.


::::{note}
Usernames must be at least 1 and no more than 507 characters. They can contain alphanumeric characters (a-z, A-Z, 0-9), spaces, punctuation, and printable symbols in the Basic Latin (ASCII) block. Leading or trailing whitespace is not allowed. ** *`email` (Optional, string | null)**: The email of the user. *** *`full_name` (Optional, string | null)**: The full name of the user. *** *`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary metadata that you want to associate with the user. *** *`password` (Optional, string)**: The user’s password. Passwords must be at least 6 characters long. When adding a user, one of `password` or `password_hash` is required. When updating an existing user, the password is optional, so that other fields on the user (such as their roles) may be updated without modifying the user’s password *** *`password_hash` (Optional, string)**: A hash of the user’s password. This must be produced using the same hashing algorithm as has been configured for password storage. For more details, see the explanation of the `xpack.security.authc.password_hashing.algorithm` setting in the user cache and password hash algorithm documentation. Using this parameter allows the client to pre-hash the password for performance and/or confidentiality reasons. The `password` parameter and the `password_hash` parameter cannot be used in the same request. *** *`roles` (Optional, string[])**: A set of roles the user has. The roles determine the user’s access permissions. To create a user without any roles, specify an empty list (`[]`). *** *`enabled` (Optional, boolean)**: Specifies whether the user is enabled. ** *`refresh` (Optional, Enum(true | false | "wait_for"))**: Valid values are `true`, `false`, and `wait_for`. These values have the same meaning as in the index API, but the default value for this API is true.
::::



### query_api_keys [_query_api_keys]

Find API keys with a query.

Get a paginated list of API keys and their information. You can optionally filter the results with a query.

To use this API, you must have at least the `manage_own_api_key` or the `read_security` cluster privileges. If you have only the `manage_own_api_key` privilege, this API returns only the API keys that you own. If you have the `read_security`, `manage_api_key`, or greater privileges (including `manage_security`), this API returns all API keys regardless of ownership.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-query-api-keys)

```ts
client.security.queryApiKeys({ ... })
```


### Arguments [_arguments_403]

* **Request (object):**

    * **`aggregations` (Optional, Record<string, { aggregations, meta, cardinality, composite, date_range, filter, filters, missing, range, terms, value_count }>)**: Any aggregations to run over the corpus of returned API keys. Aggregations and queries work together. Aggregations are computed only on the API keys that match the query. This supports only a subset of aggregation types, namely: `terms`, `range`, `date_range`, `missing`, `cardinality`, `value_count`, `composite`, `filter`, and `filters`. Additionally, aggregations only run over the same subset of fields that query works with.
    * **`query` (Optional, { bool, exists, ids, match, match_all, prefix, range, simple_query_string, term, terms, wildcard })**: A query to filter which API keys to return. If the query parameter is missing, it is equivalent to a `match_all` query. The query supports a subset of query types, including `match_all`, `bool`, `term`, `terms`, `match`, `ids`, `prefix`, `wildcard`, `exists`, `range`, and `simple_query_string`. You can query the following public information associated with an API key: `id`, `type`, `name`, `creation`, `expiration`, `invalidated`, `invalidation`, `username`, `realm`, and `metadata`.


::::{note}
The queryable string values associated with API keys are internally mapped as keywords. Consequently, if no `analyzer` parameter is specified for a `match` query, then the provided match query string is interpreted as a single keyword value. Such a match query is hence equivalent to a `term` query. ** *`from` (Optional, number)**: The starting document offset. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter. *** *`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**: The sort definition. Other than `id`, all public fields of an API key are eligible for sorting. In addition, sort can also be applied to the `_doc` field to sort by index order. *** *`size` (Optional, number)**: The number of hits to return. It must not be negative. The `size` parameter can be set to `0`, in which case no API key matches are returned, only the aggregation results. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter. *** *`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**: The search after definition. *** *`with_limited_by` (Optional, boolean)**: Return the snapshot of the owner user’s role descriptors associated with the API key. An API key’s actual permission is the intersection of its assigned role descriptors and the owner user’s role descriptors (effectively limited by it). An API key cannot retrieve any API key’s limited-by role descriptors (including itself) unless it has `manage_api_key` or higher privileges. *** *`with_profile_uid` (Optional, boolean)**: Determines whether to also retrieve the profile UID for the API key owner principal. If it exists, the profile UID is returned under the `profile_uid` response field for each API key. ** *`typed_keys` (Optional, boolean)**: Determines whether aggregation names are prefixed by their respective types in the response.
::::



### query_role [_query_role]

Find roles with a query.

Get roles in a paginated manner. The role management APIs are generally the preferred way to manage roles, rather than using file-based role management. The query roles API does not retrieve roles that are defined in roles files, nor built-in ones. You can optionally filter the results with a query. Also, the results can be paginated and sorted.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-query-role)

```ts
client.security.queryRole({ ... })
```


### Arguments [_arguments_404]

* **Request (object):**

    * **`query` (Optional, { bool, exists, ids, match, match_all, prefix, range, simple_query_string, term, terms, wildcard })**: A query to filter which roles to return. If the query parameter is missing, it is equivalent to a `match_all` query. The query supports a subset of query types, including `match_all`, `bool`, `term`, `terms`, `match`, `ids`, `prefix`, `wildcard`, `exists`, `range`, and `simple_query_string`. You can query the following information associated with roles: `name`, `description`, `metadata`, `applications.application`, `applications.privileges`, and `applications.resources`.
    * **`from` (Optional, number)**: The starting document offset. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter.
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**: The sort definition. You can sort on `username`, `roles`, or `enabled`. In addition, sort can also be applied to the `_doc` field to sort by index order.
    * **`size` (Optional, number)**: The number of hits to return. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter.
    * **`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**: The search after definition.



### query_user [_query_user]

Find users with a query.

Get information for users in a paginated manner. You can optionally filter the results with a query.

::::{note}
As opposed to the get user API, built-in users are excluded from the result. This API is only for native users.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-query-user)

```ts
client.security.queryUser({ ... })
```


### Arguments [_arguments_405]

* **Request (object):**

    * **`query` (Optional, { ids, bool, exists, match, match_all, prefix, range, simple_query_string, term, terms, wildcard })**: A query to filter which users to return. If the query parameter is missing, it is equivalent to a `match_all` query. The query supports a subset of query types, including `match_all`, `bool`, `term`, `terms`, `match`, `ids`, `prefix`, `wildcard`, `exists`, `range`, and `simple_query_string`. You can query the following information associated with user: `username`, `roles`, `enabled`, `full_name`, and `email`.
    * **`from` (Optional, number)**: The starting document offset. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter.
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**: The sort definition. Fields eligible for sorting are: `username`, `roles`, `enabled`. In addition, sort can also be applied to the `_doc` field to sort by index order.
    * **`size` (Optional, number)**: The number of hits to return. It must not be negative. By default, you cannot page through more than 10,000 hits using the `from` and `size` parameters. To page through more hits, use the `search_after` parameter.
    * **`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**: The search after definition
    * **`with_profile_uid` (Optional, boolean)**: Determines whether to retrieve the user profile UID, if it exists, for the users.



### saml_authenticate [_saml_authenticate]

Authenticate SAML.

Submit a SAML response message to Elasticsearch for consumption.

::::{note}
This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack.
::::


The SAML message that is submitted can be:

* A response to a SAML authentication request that was previously created using the SAML prepare authentication API.
* An unsolicited SAML message in the case of an IdP-initiated single sign-on (SSO) flow.

In either case, the SAML message needs to be a base64 encoded XML document with a root element of `<Response>`.

After successful validation, Elasticsearch responds with an Elasticsearch internal access token and refresh token that can be subsequently used for authentication. This API endpoint essentially exchanges SAML responses that indicate successful authentication in the IdP for Elasticsearch access and refresh tokens, which can be used for authentication against Elasticsearch.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-saml-authenticate)

```ts
client.security.samlAuthenticate({ content, ids })
```


### Arguments [_arguments_406]

* **Request (object):**

    * **`content` (string)**: The SAML response as it was sent by the user’s browser, usually a Base64 encoded XML document.
    * **`ids` (string | string[])**: A JSON array with all the valid SAML Request Ids that the caller of the API has for the current user.
    * **`realm` (Optional, string)**: The name of the realm that should authenticate the SAML response. Useful in cases where many SAML realms are defined.



### saml_complete_logout [_saml_complete_logout]

Logout of SAML completely.

Verifies the logout response sent from the SAML IdP.

::::{note}
This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack.
::::


The SAML IdP may send a logout response back to the SP after handling the SP-initiated SAML Single Logout. This API verifies the response by ensuring the content is relevant and validating its signature. An empty response is returned if the verification process is successful. The response can be sent by the IdP with either the HTTP-Redirect or the HTTP-Post binding. The caller of this API must prepare the request accordingly so that this API can handle either of them.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-saml-complete-logout)

```ts
client.security.samlCompleteLogout({ realm, ids })
```


### Arguments [_arguments_407]

* **Request (object):**

    * **`realm` (string)**: The name of the SAML realm in Elasticsearch for which the configuration is used to verify the logout response.
    * **`ids` (string | string[])**: A JSON array with all the valid SAML Request Ids that the caller of the API has for the current user.
    * **`query_string` (Optional, string)**: If the SAML IdP sends the logout response with the HTTP-Redirect binding, this field must be set to the query string of the redirect URI.
    * **`content` (Optional, string)**: If the SAML IdP sends the logout response with the HTTP-Post binding, this field must be set to the value of the SAMLResponse form parameter from the logout response.



### saml_invalidate [_saml_invalidate]

Invalidate SAML.

Submit a SAML LogoutRequest message to Elasticsearch for consumption.

::::{note}
This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack.
::::


The logout request comes from the SAML IdP during an IdP initiated Single Logout. The custom web application can use this API to have Elasticsearch process the `LogoutRequest`. After successful validation of the request, Elasticsearch invalidates the access token and refresh token that corresponds to that specific SAML principal and provides a URL that contains a SAML LogoutResponse message. Thus the user can be redirected back to their IdP.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-saml-invalidate)

```ts
client.security.samlInvalidate({ query_string })
```


### Arguments [_arguments_408]

* **Request (object):**

    * **`query_string` (string)**: The query part of the URL that the user was redirected to by the SAML IdP to initiate the Single Logout. This query should include a single parameter named `SAMLRequest` that contains a SAML logout request that is deflated and Base64 encoded. If the SAML IdP has signed the logout request, the URL should include two extra parameters named `SigAlg` and `Signature` that contain the algorithm used for the signature and the signature value itself. In order for Elasticsearch to be able to verify the IdP’s signature, the value of the `query_string` field must be an exact match to the string provided by the browser. The client application must not attempt to parse or process the string in any way.
    * **`acs` (Optional, string)**: The Assertion Consumer Service URL that matches the one of the SAML realm in Elasticsearch that should be used. You must specify either this parameter or the `realm` parameter.
    * **`realm` (Optional, string)**: The name of the SAML realm in Elasticsearch the configuration. You must specify either this parameter or the `acs` parameter.



### saml_logout [_saml_logout]

Logout of SAML.

Submits a request to invalidate an access token and refresh token.

::::{note}
This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack.
::::


This API invalidates the tokens that were generated for a user by the SAML authenticate API. If the SAML realm in Elasticsearch is configured accordingly and the SAML IdP supports this, the Elasticsearch response contains a URL to redirect the user to the IdP that contains a SAML logout request (starting an SP-initiated SAML Single Logout).

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-saml-logout)

```ts
client.security.samlLogout({ token })
```


### Arguments [_arguments_409]

* **Request (object):**

    * **`token` (string)**: The access token that was returned as a response to calling the SAML authenticate API. Alternatively, the most recent token that was received after refreshing the original one by using a `refresh_token`.
    * **`refresh_token` (Optional, string)**: The refresh token that was returned as a response to calling the SAML authenticate API. Alternatively, the most recent refresh token that was received after refreshing the original access token.



### saml_prepare_authentication [_saml_prepare_authentication]

Prepare SAML authentication.

Create a SAML authentication request (`<AuthnRequest>`) as a URL string based on the configuration of the respective SAML realm in Elasticsearch.

::::{note}
This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack.
::::


This API returns a URL pointing to the SAML Identity Provider. You can use the URL to redirect the browser of the user in order to continue the authentication process. The URL includes a single parameter named `SAMLRequest`, which contains a SAML Authentication request that is deflated and Base64 encoded. If the configuration dictates that SAML authentication requests should be signed, the URL has two extra parameters named `SigAlg` and `Signature`. These parameters contain the algorithm used for the signature and the signature value itself. It also returns a random string that uniquely identifies this SAML Authentication request. The caller of this API needs to store this identifier as it needs to be used in a following step of the authentication process.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-saml-prepare-authentication)

```ts
client.security.samlPrepareAuthentication({ ... })
```


### Arguments [_arguments_410]

* **Request (object):**

    * **`acs` (Optional, string)**: The Assertion Consumer Service URL that matches the one of the SAML realms in Elasticsearch. The realm is used to generate the authentication request. You must specify either this parameter or the `realm` parameter.
    * **`realm` (Optional, string)**: The name of the SAML realm in Elasticsearch for which the configuration is used to generate the authentication request. You must specify either this parameter or the `acs` parameter.
    * **`relay_state` (Optional, string)**: A string that will be included in the redirect URL that this API returns as the `RelayState` query parameter. If the Authentication Request is signed, this value is used as part of the signature computation.



### saml_service_provider_metadata [_saml_service_provider_metadata]

Create SAML service provider metadata.

Generate SAML metadata for a SAML 2.0 Service Provider.

The SAML 2.0 specification provides a mechanism for Service Providers to describe their capabilities and configuration using a metadata file. This API generates Service Provider metadata based on the configuration of a SAML realm in Elasticsearch.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-saml-service-provider-metadata)

```ts
client.security.samlServiceProviderMetadata({ realm_name })
```


### Arguments [_arguments_411]

* **Request (object):**

    * **`realm_name` (string)**: The name of the SAML realm in Elasticsearch.



### suggest_user_profiles [_suggest_user_profiles]

Suggest a user profile.

Get suggestions for user profiles that match specified search criteria.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-suggest-user-profiles)

```ts
client.security.suggestUserProfiles({ ... })
```


### Arguments [_arguments_412]

* **Request (object):**

    * **`name` (Optional, string)**: A query string used to match name-related fields in user profile documents. Name-related fields are the user’s `username`, `full_name`, and `email`.
    * **`size` (Optional, number)**: The number of profiles to return.
    * **`data` (Optional, string | string[])**: A list of filters for the `data` field of the profile document. To return all content use `data=*`. To return a subset of content, use `data=<key>` to retrieve content nested under the specified `<key>`. By default, the API returns no `data` content. It is an error to specify `data` as both the query parameter and the request body field.
    * **`hint` (Optional, { uids, labels })**: Extra search criteria to improve relevance of the suggestion result. Profiles matching the spcified hint are ranked higher in the response. Profiles not matching the hint aren’t excluded from the response as long as the profile matches the `name` field query.



### update_api_key [_update_api_key]

Update an API key.

Update attributes of an existing API key. This API supports updates to an API key’s access scope, expiration, and metadata.

To use this API, you must have at least the `manage_own_api_key` cluster privilege. Users can only update API keys that they created or that were granted to them. To update another user’s API key, use the `run_as` feature to submit a request on behalf of another user.

::::{important}
It’s not possible to use an API key as the authentication credential for this API. The owner user’s credentials are required.
::::


Use this API to update API keys created by the create API key or grant API Key APIs. If you need to apply the same update to many API keys, you can use the bulk update API keys API to reduce overhead. It’s not possible to update expired API keys or API keys that have been invalidated by the invalidate API key API.

The access scope of an API key is derived from the `role_descriptors` you specify in the request and a snapshot of the owner user’s permissions at the time of the request. The snapshot of the owner’s permissions is updated automatically on every call.

::::{important}
If you don’t specify `role_descriptors` in the request, a call to this API might still change the API key’s access scope. This change can occur if the owner user’s permissions have changed since the API key was created or last modified.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-update-api-key)

```ts
client.security.updateApiKey({ id })
```


### Arguments [_arguments_413]

* **Request (object):**

    * **`id` (string)**: The ID of the API key to update.
    * **`role_descriptors` (Optional, Record<string, { cluster, indices, remote_indices, remote_cluster, global, applications, metadata, run_as, description, restriction, transient_metadata }>)**: The role descriptors to assign to this API key. The API key’s effective permissions are an intersection of its assigned privileges and the point in time snapshot of permissions of the owner user. You can assign new privileges by specifying them in this parameter. To remove assigned privileges, you can supply an empty `role_descriptors` parameter, that is to say, an empty object `{}`. If an API key has no assigned privileges, it inherits the owner user’s full permissions. The snapshot of the owner’s permissions is always updated, whether you supply the `role_descriptors` parameter or not. The structure of a role descriptor is the same as the request for the create API keys API.
    * **`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary metadata that you want to associate with the API key. It supports a nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage. When specified, this value fully replaces the metadata previously associated with the API key.
    * **`expiration` (Optional, string | -1 | 0)**: The expiration time for the API key. By default, API keys never expire. This property can be omitted to leave the expiration unchanged.



### update_cross_cluster_api_key [_update_cross_cluster_api_key]

Update a cross-cluster API key.

Update the attributes of an existing cross-cluster API key, which is used for API key based remote cluster access.

To use this API, you must have at least the `manage_security` cluster privilege. Users can only update API keys that they created. To update another user’s API key, use the `run_as` feature to submit a request on behalf of another user.

::::{important}
It’s not possible to use an API key as the authentication credential for this API. To update an API key, the owner user’s credentials are required.
::::


It’s not possible to update expired API keys, or API keys that have been invalidated by the invalidate API key API.

This API supports updates to an API key’s access scope, metadata, and expiration. The owner user’s information, such as the `username` and `realm`, is also updated automatically on every call.

::::{note}
This API cannot update REST API keys, which should be updated by either the update API key or bulk update API keys API.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-update-cross-cluster-api-key)

```ts
client.security.updateCrossClusterApiKey({ id, access })
```


### Arguments [_arguments_414]

* **Request (object):**

    * **`id` (string)**: The ID of the cross-cluster API key to update.
    * **`access` ({ replication, search })**: The access to be granted to this API key. The access is composed of permissions for cross cluster search and cross cluster replication. At least one of them must be specified. When specified, the new access assignment fully replaces the previously assigned access.
    * **`expiration` (Optional, string | -1 | 0)**: The expiration time for the API key. By default, API keys never expire. This property can be omitted to leave the value unchanged.
    * **`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary metadata that you want to associate with the API key. It supports nested data structure. Within the metadata object, keys beginning with `_` are reserved for system usage. When specified, this information fully replaces metadata previously associated with the API key.



### update_settings [_update_settings]

Update security index settings.

Update the user-configurable settings for the security internal index (`.security` and associated indices). Only a subset of settings are allowed to be modified. This includes `index.auto_expand_replicas` and `index.number_of_replicas`.

::::{note}
If `index.auto_expand_replicas` is set, `index.number_of_replicas` will be ignored during updates.
::::


If a specific index is not in use on the system and settings are provided for it, the request will be rejected. This API does not yet support configuring the settings for indices before they are in use.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-update-settings)

```ts
client.security.updateSettings({ ... })
```


### Arguments [_arguments_415]

* **Request (object):**

    * **`security` (Optional, { index })**: Settings for the index used for most security configuration, including native realm users and roles configured with the API.
    * **`security-profile` (Optional, { index })**: Settings for the index used to store profile information.
    * **`security-tokens` (Optional, { index })**: Settings for the index used to store tokens.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### update_user_profile_data [_update_user_profile_data]

Update user profile data.

Update specific data for the user profile that is associated with a unique ID.

::::{note}
The user profile feature is designed only for use by Kibana and Elastic’s Observability, Search and Elastic Security solutions. Individual users and external applications should not call this API directly. Elastic reserves the right to change or remove this feature in future releases without prior notice.
::::


To use this API, you must have one of the following privileges:

* The `manage_user_profile` cluster privilege.
* The `update_profile_data` global privilege for the namespaces that are referenced in the request.

This API updates the `labels` and `data` fields of an existing user profile document with JSON objects. New keys and their values are added to the profile document and conflicting keys are replaced by data that’s included in the request.

For both labels and data, content is namespaced by the top-level fields. The `update_profile_data` global privilege grants privileges for updating only the allowed namespaces.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-security-update-user-profile-data)

```ts
client.security.updateUserProfileData({ uid })
```


### Arguments [_arguments_416]

* **Request (object):**

    * **`uid` (string)**: A unique identifier for the user profile.
    * **`labels` (Optional, Record<string, User-defined value>)**: Searchable data that you want to associate with the user profile. This field supports a nested data structure. Within the labels object, top-level keys cannot begin with an underscore (`_`) or contain a period (`.`).
    * **`data` (Optional, Record<string, User-defined value>)**: Non-searchable data that you want to associate with the user profile. This field supports a nested data structure. Within the `data` object, top-level keys cannot begin with an underscore (`_`) or contain a period (`.`). The data object is not searchable, but can be retrieved with the get user profile API.
    * **`if_seq_no` (Optional, number)**: Only perform the operation if the document has this sequence number.
    * **`if_primary_term` (Optional, number)**: Only perform the operation if the document has this primary term.
    * **`refresh` (Optional, Enum(true | false | "wait_for"))**: If *true*, Elasticsearch refreshes the affected shards to make this operation visible to search. If *wait_for*, it waits for a refresh to make this operation visible to search. If *false*, nothing is done with refreshes.



## shutdown [_shutdown]


### delete_node [_delete_node]

Cancel node shutdown preparations. Remove a node from the shutdown list so it can resume normal operations. You must explicitly clear the shutdown request when a node rejoins the cluster or when a node has permanently left the cluster. Shutdown requests are never removed automatically by Elasticsearch.

::::{note}
This feature is designed for indirect use by Elastic Cloud, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


If the operator privileges feature is enabled, you must be an operator to use this API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-shutdown-delete-node)

```ts
client.shutdown.deleteNode({ node_id })
```


### Arguments [_arguments_417]

* **Request (object):**

    * **`node_id` (string)**: The node id of node to be removed from the shutdown state
    * **`master_timeout` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_node [_get_node]

Get the shutdown status.

Get information about nodes that are ready to be shut down, have shut down preparations still in progress, or have stalled. The API returns status information for each part of the shut down process.

::::{note}
This feature is designed for indirect use by Elasticsearch Service, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


If the operator privileges feature is enabled, you must be an operator to use this API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-shutdown-get-node)

```ts
client.shutdown.getNode({ ... })
```


### Arguments [_arguments_418]

* **Request (object):**

    * **`node_id` (Optional, string | string[])**: Which node for which to retrieve the shutdown status
    * **`master_timeout` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### put_node [_put_node]

Prepare a node to be shut down.

::::{note}
This feature is designed for indirect use by Elastic Cloud, Elastic Cloud Enterprise, and Elastic Cloud on Kubernetes. Direct use is not supported.
::::


If you specify a node that is offline, it will be prepared for shut down when it rejoins the cluster.

If the operator privileges feature is enabled, you must be an operator to use this API.

The API migrates ongoing tasks and index shards to other nodes as needed to prepare a node to be restarted or shut down and removed from the cluster. This ensures that Elasticsearch can be stopped safely with minimal disruption to the cluster.

You must specify the type of shutdown: `restart`, `remove`, or `replace`. If a node is already being prepared for shutdown, you can use this API to change the shutdown type.

::::{important}
This API does NOT terminate the Elasticsearch process. Monitor the node shutdown status to determine when it is safe to stop Elasticsearch.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-shutdown-put-node)

```ts
client.shutdown.putNode({ node_id, type, reason })
```


### Arguments [_arguments_419]

* **Request (object):**

    * **`node_id` (string)**: The node identifier. This parameter is not validated against the cluster’s active nodes. This enables you to register a node for shut down while it is offline. No error is thrown if you specify an invalid node ID.
    * **`type` (Enum("restart" | "remove" | "replace"))**: Valid values are restart, remove, or replace. Use restart when you need to temporarily shut down a node to perform an upgrade, make configuration changes, or perform other maintenance. Because the node is expected to rejoin the cluster, data is not migrated off of the node. Use remove when you need to permanently remove a node from the cluster. The node is not marked ready for shutdown until data is migrated off of the node Use replace to do a 1:1 replacement of a node with another node. Certain allocation decisions will be ignored (such as disk watermarks) in the interest of true replacement of the source node with the target node. During a replace-type shutdown, rollover and index creation may result in unassigned shards, and shrink may fail until the replacement is complete.
    * **`reason` (string)**: A human-readable reason that the node is being shut down. This field provides information for other cluster operators; it does not affect the shut down process.
    * **`allocation_delay` (Optional, string)**: Only valid if type is restart. Controls how long Elasticsearch will wait for the node to restart and join the cluster before reassigning its shards to other nodes. This works the same as delaying allocation with the index.unassigned.node_left.delayed_timeout setting. If you specify both a restart allocation delay and an index-level allocation delay, the longer of the two is used.
    * **`target_node_name` (Optional, string)**: Only valid if type is replace. Specifies the name of the node that is replacing the node being shut down. Shards from the shut down node are only allowed to be allocated to the target node, and no other data will be allocated to the target node. During relocation of data certain allocation rules are ignored, such as disk watermarks or user attribute filtering rules.
    * **`master_timeout` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, Enum("nanos" | "micros" | "ms" | "s" | "m" | "h" | "d"))**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## simulate [_simulate_2]


### ingest [_ingest_2]

Simulate data ingestion. Run ingest pipelines against a set of provided documents, optionally with substitute pipeline definitions, to simulate ingesting data into an index.

This API is meant to be used for troubleshooting or pipeline development, as it does not actually index any data into Elasticsearch.

The API runs the default and final pipeline for that index against a set of documents provided in the body of the request. If a pipeline contains a reroute processor, it follows that reroute processor to the new index, running that index’s pipelines as well the same way that a non-simulated ingest would. No data is indexed into Elasticsearch. Instead, the transformed document is returned, along with the list of pipelines that have been run and the name of the index where the document would have been indexed if this were not a simulation. The transformed document is validated against the mappings that would apply to this index, and any validation error is reported in the result.

This API differs from the simulate pipeline API in that you specify a single pipeline for that API, and it runs only that one pipeline. The simulate pipeline API is more useful for developing a single pipeline, while the simulate ingest API is more useful for troubleshooting the interaction of the various pipelines that get applied when ingesting into an index.

By default, the pipeline definitions that are currently in the system are used. However, you can supply substitute pipeline definitions in the body of the request. These will be used in place of the pipeline definitions that are already in the system. This can be used to replace existing pipeline definitions or to create new ones. The pipeline substitutions are used only within this request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-simulate-ingest)

```ts
client.simulate.ingest({ docs })
```


### Arguments [_arguments_420]

* **Request (object):**

    * **`docs` ({ _id, _index, _source }[])**: Sample documents to test in the pipeline.
    * **`index` (Optional, string)**: The index to simulate ingesting into. This value can be overridden by specifying an index on each document. If you specify this parameter in the request path, it is used for any documents that do not explicitly specify an index argument.
    * **`component_template_substitutions` (Optional, Record<string, { template, version, _meta }>)**: A map of component template names to substitute component template definition objects.
    * **`index_template_subtitutions` (Optional, Record<string, { index_patterns, composed_of, template, version, priority, _meta, allow_auto_create, data_stream, deprecated, ignore_missing_component_templates }>)**: A map of index template names to substitute index template definition objects.
    * **`mapping_addition` (Optional, { all_field, date_detection, dynamic, dynamic_date_formats, dynamic_templates, _field_names, index_field, _meta, numeric_detection, properties, _routing, _size, _source, runtime, enabled, subobjects, _data_stream_timestamp })**
    * **`pipeline_substitutions` (Optional, Record<string, { description, on_failure, processors, version, deprecated, _meta }>)**: Pipelines to test. If you don’t specify the `pipeline` request path parameter, this parameter is required. If you specify both this and the request path parameter, the API only uses the request path parameter.
    * **`pipeline` (Optional, string)**: The pipeline to use as the default pipeline. This value can be used to override the default pipeline of the index.



## slm [_slm]


### delete_lifecycle [_delete_lifecycle_2]

Delete a policy. Delete a snapshot lifecycle policy definition. This operation prevents any future snapshots from being taken but does not cancel in-progress snapshots or remove previously-taken snapshots.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-delete-lifecycle)

```ts
client.slm.deleteLifecycle({ policy_id })
```


### Arguments [_arguments_421]

* **Request (object):**

    * **`policy_id` (string)**: The id of the snapshot lifecycle policy to remove
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### execute_lifecycle [_execute_lifecycle]

Run a policy. Immediately create a snapshot according to the snapshot lifecycle policy without waiting for the scheduled time. The snapshot policy is normally applied according to its schedule, but you might want to manually run a policy before performing an upgrade or other maintenance.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-execute-lifecycle)

```ts
client.slm.executeLifecycle({ policy_id })
```


### Arguments [_arguments_422]

* **Request (object):**

    * **`policy_id` (string)**: The id of the snapshot lifecycle policy to be executed
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### execute_retention [_execute_retention]

Run a retention policy. Manually apply the retention policy to force immediate removal of snapshots that are expired according to the snapshot lifecycle policy retention rules. The retention policy is normally applied according to its schedule.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-execute-retention)

```ts
client.slm.executeRetention({ ... })
```


### Arguments [_arguments_423]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_lifecycle [_get_lifecycle_2]

Get policy information. Get snapshot lifecycle policy definitions and information about the latest snapshot attempts.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-get-lifecycle)

```ts
client.slm.getLifecycle({ ... })
```


### Arguments [_arguments_424]

* **Request (object):**

    * **`policy_id` (Optional, string | string[])**: List of snapshot lifecycle policies to retrieve
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_stats [_get_stats]

Get snapshot lifecycle management statistics. Get global and policy-level statistics about actions taken by snapshot lifecycle management.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-get-stats)

```ts
client.slm.getStats({ ... })
```


### Arguments [_arguments_425]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_status [_get_status_3]

Get the snapshot lifecycle management status.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-get-status)

```ts
client.slm.getStatus({ ... })
```


### Arguments [_arguments_426]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### put_lifecycle [_put_lifecycle_2]

Create or update a policy. Create or update a snapshot lifecycle policy. If the policy already exists, this request increments the policy version. Only the latest version of a policy is stored.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-put-lifecycle)

```ts
client.slm.putLifecycle({ policy_id })
```


### Arguments [_arguments_427]

* **Request (object):**

    * **`policy_id` (string)**: The identifier for the snapshot lifecycle policy you want to create or update.
    * **`config` (Optional, { ignore_unavailable, indices, include_global_state, feature_states, metadata, partial })**: Configuration for each snapshot created by the policy.
    * **`name` (Optional, string)**: Name automatically assigned to each snapshot created by the policy. Date math is supported. To prevent conflicting snapshot names, a UUID is automatically appended to each snapshot name.
    * **`repository` (Optional, string)**: Repository used to store snapshots created by this policy. This repository must exist prior to the policy’s creation. You can create a repository using the snapshot repository API.
    * **`retention` (Optional, { expire_after, max_count, min_count })**: Retention rules used to retain and delete snapshots created by the policy.
    * **`schedule` (Optional, string)**: Periodic or absolute schedule at which the policy creates snapshots. SLM applies schedule changes immediately.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### start [_start_2]

Start snapshot lifecycle management. Snapshot lifecycle management (SLM) starts automatically when a cluster is formed. Manually starting SLM is necessary only if it has been stopped using the stop SLM API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-start)

```ts
client.slm.start({ ... })
```


### Arguments [_arguments_428]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### stop [_stop_2]

Stop snapshot lifecycle management. Stop all snapshot lifecycle management (SLM) operations and the SLM plugin. This API is useful when you are performing maintenance on a cluster and need to prevent SLM from performing any actions on your data streams or indices. Stopping SLM does not stop any snapshots that are in progress. You can manually trigger snapshots with the run snapshot lifecycle policy API even if SLM is stopped.

The API returns a response as soon as the request is acknowledged, but the plugin might continue to run until in-progress operations complete and it can be safely stopped. Use the get snapshot lifecycle management status API to see if SLM is running.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-slm-stop)

```ts
client.slm.stop({ ... })
```


### Arguments [_arguments_429]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



## snapshot [_snapshot]


### cleanup_repository [_cleanup_repository]

Clean up the snapshot repository. Trigger the review of the contents of a snapshot repository and delete any stale data not referenced by existing snapshots.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-cleanup-repository)

```ts
client.snapshot.cleanupRepository({ repository })
```


### Arguments [_arguments_430]

* **Request (object):**

    * **`repository` (string)**: The name of the snapshot repository to clean up.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata. If no response is received before the timeout expires, the cluster metadata update still applies but the response will indicate that it was not completely acknowledged. To indicate that the request should never timeout, set it to `-1`.



### clone [_clone_2]

Clone a snapshot. Clone part of all of a snapshot into another snapshot in the same repository.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-clone)

```ts
client.snapshot.clone({ repository, snapshot, target_snapshot, indices })
```


### Arguments [_arguments_431]

* **Request (object):**

    * **`repository` (string)**: The name of the snapshot repository that both source and target snapshot belong to.
    * **`snapshot` (string)**: The source snapshot name.
    * **`target_snapshot` (string)**: The target snapshot name.
    * **`indices` (string)**: A list of indices to include in the snapshot. Multi-target syntax is supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period of time to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### create [_create_3]

Create a snapshot. Take a snapshot of a cluster or of data streams and indices.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-create)

```ts
client.snapshot.create({ repository, snapshot })
```


### Arguments [_arguments_432]

* **Request (object):**

    * **`repository` (string)**: The name of the repository for the snapshot.
    * **`snapshot` (string)**: The name of the snapshot. It supportes date math. It must be unique in the repository.
    * **`expand_wildcards` (Optional, Enum("all" | "open" | "closed" | "hidden" | "none") | Enum("all" | "open" | "closed" | "hidden" | "none")[])**: Determines how wildcard patterns in the `indices` parameter match data streams and indices. It supports a list of values such as `open,hidden`.
    * **`feature_states` (Optional, string[])**: The feature states to include in the snapshot. Each feature state includes one or more system indices containing related data. You can view a list of eligible features using the get features API.


If `include_global_state` is `true`, all current feature states are included by default. If `include_global_state` is `false`, no feature states are included by default.

Note that specifying an empty array will result in the default behavior. To exclude all feature states, regardless of the `include_global_state` value, specify an array with only the value `none` (`["none"]`). ** *`ignore_unavailable` (Optional, boolean)**: If `true`, the request ignores data streams and indices in `indices` that are missing or closed. If `false`, the request returns an error for any data stream or index that is missing or closed. *** *`include_global_state` (Optional, boolean)**: If `true`, the current cluster state is included in the snapshot. The cluster state includes persistent cluster settings, composable index templates, legacy index templates, ingest pipelines, and ILM policies. It also includes data stored in system indices, such as Watches and task records (configurable via `feature_states`). ** *`indices` (Optional, string | string[])**: A list of data streams and indices to include in the snapshot. It supports a multi-target syntax. The default is an empty array (`[]`), which includes all regular data streams and regular indices. To exclude all data streams and indices, use `-*`.

You can’t use this parameter to include or exclude system indices or system data streams from a snapshot. Use `feature_states` instead. ** *`metadata` (Optional, Record<string, User-defined value>)**: Arbitrary metadata to the snapshot, such as a record of who took the snapshot, why it was taken, or any other useful data. It can have any contents but it must be less than 1024 bytes. This information is not automatically generated by Elasticsearch. ** *`partial` (Optional, boolean)**: If `true`, it enables you to restore a partial snapshot of indices with unavailable shards. Only shards that were successfully included in the snapshot will be restored. All missing shards will be recreated as empty.

If `false`, the entire restore operation will fail if one or more indices included in the snapshot do not have all primary shards available. ** *`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. ** *`wait_for_completion` (Optional, boolean)**: If `true`, the request returns a response when the snapshot is complete. If `false`, the request returns a response when the snapshot initializes.


### create_repository [_create_repository]

Create or update a snapshot repository. IMPORTANT: If you are migrating searchable snapshots, the repository name must be identical in the source and destination clusters. To register a snapshot repository, the cluster’s global metadata must be writeable. Ensure there are no cluster blocks (for example, `cluster.blocks.read_only` and `clsuter.blocks.read_only_allow_delete` settings) that prevent write access.

Several options for this API can be specified using a query parameter or a request body parameter. If both parameters are specified, only the query parameter is used.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-create-repository)

```ts
client.snapshot.createRepository({ repository })
```


### Arguments [_arguments_433]

* **Request (object):**

    * **`repository` (string)**: The name of the snapshot repository to register or update.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata. If no response is received before the timeout expires, the cluster metadata update still applies but the response will indicate that it was not completely acknowledged. To indicate that the request should never timeout, set it to `-1`.
    * **`verify` (Optional, boolean)**: If `true`, the request verifies the repository is functional on all master and data nodes in the cluster. If `false`, this verification is skipped. You can also perform this verification with the verify snapshot repository API.



### delete [_delete_9]

Delete snapshots.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-delete)

```ts
client.snapshot.delete({ repository, snapshot })
```


### Arguments [_arguments_434]

* **Request (object):**

    * **`repository` (string)**: The name of the repository to delete a snapshot from.
    * **`snapshot` (string)**: A list of snapshot names to delete. It also accepts wildcards (`*`).
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### delete_repository [_delete_repository]

Delete snapshot repositories. When a repository is unregistered, Elasticsearch removes only the reference to the location where the repository is storing the snapshots. The snapshots themselves are left untouched and in place.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-delete-repository)

```ts
client.snapshot.deleteRepository({ repository })
```


### Arguments [_arguments_435]

* **Request (object):**

    * **`repository` (string | string[])**: The ame of the snapshot repositories to unregister. Wildcard (`*`) patterns are supported.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata. If no response is received before the timeout expires, the cluster metadata update still applies but the response will indicate that it was not completely acknowledged. To indicate that the request should never timeout, set it to `-1`.



### get [_get_9]

Get snapshot information.

::::{note}
The `after` parameter and `next` field enable you to iterate through snapshots with some consistency guarantees regarding concurrent creation or deletion of snapshots. It is guaranteed that any snapshot that exists at the beginning of the iteration and is not concurrently deleted will be seen during the iteration. Snapshots concurrently created may be seen during an iteration.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-get)

```ts
client.snapshot.get({ repository, snapshot })
```


### Arguments [_arguments_436]

* **Request (object):**

    * **`repository` (string)**: A list of snapshot repository names used to limit the request. Wildcard (`*`) expressions are supported.
    * **`snapshot` (string | string[])**: A list of snapshot names to retrieve Wildcards (`*`) are supported.

* To get information about all snapshots in a registered repository, use a wildcard (`*`) or `_all`.
* To get information about any snapshots that are currently running, use `_current`.

    * **`after` (Optional, string)**: An offset identifier to start pagination from as returned by the next field in the response body.
    * **`from_sort_value` (Optional, string)**: The value of the current sort column at which to start retrieval. It can be a string `snapshot-` or a repository name when sorting by snapshot or repository name. It can be a millisecond time value or a number when sorting by `index-` or shard count.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error for any snapshots that are unavailable.
    * **`index_details` (Optional, boolean)**: If `true`, the response includes additional information about each index in the snapshot comprising the number of shards in the index, the total size of the index in bytes, and the maximum number of segments per shard in the index. The default is `false`, meaning that this information is omitted.
    * **`index_names` (Optional, boolean)**: If `true`, the response includes the name of each index in each snapshot.
    * **`include_repository` (Optional, boolean)**: If `true`, the response includes the repository name in each snapshot.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`order` (Optional, Enum("asc" | "desc"))**: The sort order. Valid values are `asc` for ascending and `desc` for descending order. The default behavior is ascending order.
    * **`offset` (Optional, number)**: Numeric offset to start pagination from based on the snapshots matching this request. Using a non-zero value for this parameter is mutually exclusive with using the after parameter. Defaults to 0.
    * **`size` (Optional, number)**: The maximum number of snapshots to return. The default is 0, which means to return all that match the request without limit.
    * **`slm_policy_filter` (Optional, string)**: Filter snapshots by a list of snapshot lifecycle management (SLM) policy names that snapshots belong to.


You can use wildcards (`*`) and combinations of wildcards followed by exclude patterns starting with `-`. For example, the pattern `*,-policy-a-\*` will return all snapshots except for those that were created by an SLM policy with a name starting with `policy-a-`. Note that the wildcard pattern `*` matches all snapshots created by an SLM policy but not those snapshots that were not created by an SLM policy. To include snapshots that were not created by an SLM policy, you can use the special pattern `_none` that will match all snapshots without an SLM policy. ** *`sort` (Optional, Enum("start_time" | "duration" | "name" | "index_count" | "repository" | "shard_count" | "failed_shard_count"))**: The sort order for the result. The default behavior is sorting by snapshot start time stamp. ** *`verbose` (Optional, boolean)**: If `true`, returns additional information about each snapshot such as the version of Elasticsearch which took the snapshot, the start and end times of the snapshot, and the number of shards snapshotted.

::::{note}
The parameters `size`, `order`, `after`, `from_sort_value`, `offset`, `slm_policy_filter`, and `sort` are not supported when you set `verbose=false` and the sort order for requests with `verbose=false` is undefined.
::::



### get_repository [_get_repository]

Get snapshot repository information.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-get-repository)

```ts
client.snapshot.getRepository({ ... })
```


### Arguments [_arguments_437]

* **Request (object):**

    * **`repository` (Optional, string | string[])**: A list of snapshot repository names used to limit the request. Wildcard (`*`) expressions are supported including combining wildcards with exclude patterns starting with `-`.


To get information about all snapshot repositories registered in the cluster, omit this parameter or use `*` or `_all`. ** *`local` (Optional, boolean)**: If `true`, the request gets information from the local node only. If `false`, the request gets information from the master node. ** *`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.


### repository_analyze [_repository_analyze]

Analyze a snapshot repository. Analyze the performance characteristics and any incorrect behaviour found in a repository.

The response exposes implementation details of the analysis which may change from version to version. The response body format is therefore not considered stable and may be different in newer versions.

There are a large number of third-party storage systems available, not all of which are suitable for use as a snapshot repository by Elasticsearch. Some storage systems behave incorrectly, or perform poorly, especially when accessed concurrently by multiple clients as the nodes of an Elasticsearch cluster do. This API performs a collection of read and write operations on your repository which are designed to detect incorrect behaviour and to measure the performance characteristics of your storage system.

The default values for the parameters are deliberately low to reduce the impact of running an analysis inadvertently and to provide a sensible starting point for your investigations. Run your first analysis with the default parameter values to check for simple problems. If successful, run a sequence of increasingly large analyses until you encounter a failure or you reach a `blob_count` of at least `2000`, a `max_blob_size` of at least `2gb`, a `max_total_data_size` of at least `1tb`, and a `register_operation_count` of at least `100`. Always specify a generous timeout, possibly `1h` or longer, to allow time for each analysis to run to completion. Perform the analyses using a multi-node cluster of a similar size to your production cluster so that it can detect any problems that only arise when the repository is accessed by many nodes at once.

If the analysis fails, Elasticsearch detected that your repository behaved unexpectedly. This usually means you are using a third-party storage system with an incorrect or incompatible implementation of the API it claims to support. If so, this storage system is not suitable for use as a snapshot repository. You will need to work with the supplier of your storage system to address the incompatibilities that Elasticsearch detects.

If the analysis is successful, the API returns details of the testing process, optionally including how long each operation took. You can use this information to determine the performance of your storage system. If any operation fails or returns an incorrect result, the API returns an error. If the API returns an error, it may not have removed all the data it wrote to the repository. The error will indicate the location of any leftover data and this path is also recorded in the Elasticsearch logs. You should verify that this location has been cleaned up correctly. If there is still leftover data at the specified location, you should manually remove it.

If the connection from your client to Elasticsearch is closed while the client is waiting for the result of the analysis, the test is cancelled. Some clients are configured to close their connection if no response is received within a certain timeout. An analysis takes a long time to complete so you might need to relax any such client-side timeouts. On cancellation the analysis attempts to clean up the data it was writing, but it may not be able to remove it all. The path to the leftover data is recorded in the Elasticsearch logs. You should verify that this location has been cleaned up correctly. If there is still leftover data at the specified location, you should manually remove it.

If the analysis is successful then it detected no incorrect behaviour, but this does not mean that correct behaviour is guaranteed. The analysis attempts to detect common bugs but it does not offer 100% coverage. Additionally, it does not test the following:

* Your repository must perform durable writes. Once a blob has been written it must remain in place until it is deleted, even after a power loss or similar disaster.
* Your repository must not suffer from silent data corruption. Once a blob has been written, its contents must remain unchanged until it is deliberately modified or deleted.
* Your repository must behave correctly even if connectivity from the cluster is disrupted. Reads and writes may fail in this case, but they must not return incorrect results.

::::{important}
An analysis writes a substantial amount of data to your repository and then reads it back again. This consumes bandwidth on the network between the cluster and the repository, and storage space and I/O bandwidth on the repository itself. You must ensure this load does not affect other users of these systems. Analyses respect the repository settings `max_snapshot_bytes_per_sec` and `max_restore_bytes_per_sec` if available and the cluster setting `indices.recovery.max_bytes_per_sec` which you can use to limit the bandwidth they consume.
::::


::::{note}
This API is intended for exploratory use by humans. You should expect the request parameters and the response format to vary in future versions.
::::


::::{note}
Different versions of Elasticsearch may perform different checks for repository compatibility, with newer versions typically being stricter than older ones. A storage system that passes repository analysis with one version of Elasticsearch may fail with a different version. This indicates it behaves incorrectly in ways that the former version did not detect. You must work with the supplier of your storage system to address the incompatibilities detected by the repository analysis API in any version of Elasticsearch.
::::


::::{note}
This API may not work correctly in a mixed-version cluster.
::::


**Implementation details**

::::{note}
This section of documentation describes how the repository analysis API works in this version of Elasticsearch, but you should expect the implementation to vary between versions. The request parameters and response format depend on details of the implementation so may also be different in newer versions.
::::


The analysis comprises a number of blob-level tasks, as set by the `blob_count` parameter and a number of compare-and-exchange operations on linearizable registers, as set by the `register_operation_count` parameter. These tasks are distributed over the data and master-eligible nodes in the cluster for execution.

For most blob-level tasks, the executing node first writes a blob to the repository and then instructs some of the other nodes in the cluster to attempt to read the data it just wrote. The size of the blob is chosen randomly, according to the `max_blob_size` and `max_total_data_size` parameters. If any of these reads fails then the repository does not implement the necessary read-after-write semantics that Elasticsearch requires.

For some blob-level tasks, the executing node will instruct some of its peers to attempt to read the data before the writing process completes. These reads are permitted to fail, but must not return partial data. If any read returns partial data then the repository does not implement the necessary atomicity semantics that Elasticsearch requires.

For some blob-level tasks, the executing node will overwrite the blob while its peers are reading it. In this case the data read may come from either the original or the overwritten blob, but the read operation must not return partial data or a mix of data from the two blobs. If any of these reads returns partial data or a mix of the two blobs then the repository does not implement the necessary atomicity semantics that Elasticsearch requires for overwrites.

The executing node will use a variety of different methods to write the blob. For instance, where applicable, it will use both single-part and multi-part uploads. Similarly, the reading nodes will use a variety of different methods to read the data back again. For instance they may read the entire blob from start to end or may read only a subset of the data.

For some blob-level tasks, the executing node will cancel the write before it is complete. In this case, it still instructs some of the other nodes in the cluster to attempt to read the blob but all of these reads must fail to find the blob.

Linearizable registers are special blobs that Elasticsearch manipulates using an atomic compare-and-exchange operation. This operation ensures correct and strongly-consistent behavior even when the blob is accessed by multiple nodes at the same time. The detailed implementation of the compare-and-exchange operation on linearizable registers varies by repository type. Repository analysis verifies that that uncontended compare-and-exchange operations on a linearizable register blob always succeed. Repository analysis also verifies that contended operations either succeed or report the contention but do not return incorrect results. If an operation fails due to contention, Elasticsearch retries the operation until it succeeds. Most of the compare-and-exchange operations performed by repository analysis atomically increment a counter which is represented as an 8-byte blob. Some operations also verify the behavior on small blobs with sizes other than 8 bytes.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-repository-analyze)

```ts
client.snapshot.repositoryAnalyze({ repository })
```


### Arguments [_arguments_438]

* **Request (object):**

    * **`repository` (string)**: The name of the repository.
    * **`blob_count` (Optional, number)**: The total number of blobs to write to the repository during the test. For realistic experiments, you should set it to at least `2000`.
    * **`concurrency` (Optional, number)**: The number of operations to run concurrently during the test.
    * **`detailed` (Optional, boolean)**: Indicates whether to return detailed results, including timing information for every operation performed during the analysis. If false, it returns only a summary of the analysis.
    * **`early_read_node_count` (Optional, number)**: The number of nodes on which to perform an early read operation while writing each blob. Early read operations are only rarely performed.
    * **`max_blob_size` (Optional, number | string)**: The maximum size of a blob to be written during the test. For realistic experiments, you should set it to at least `2gb`.
    * **`max_total_data_size` (Optional, number | string)**: An upper limit on the total size of all the blobs written during the test. For realistic experiments, you should set it to at least `1tb`.
    * **`rare_action_probability` (Optional, number)**: The probability of performing a rare action such as an early read, an overwrite, or an aborted write on each blob.
    * **`rarely_abort_writes` (Optional, boolean)**: Indicates whether to rarely cancel writes before they complete.
    * **`read_node_count` (Optional, number)**: The number of nodes on which to read a blob after writing.
    * **`register_operation_count` (Optional, number)**: The minimum number of linearizable register operations to perform in total. For realistic experiments, you should set it to at least `100`.
    * **`seed` (Optional, number)**: The seed for the pseudo-random number generator used to generate the list of operations performed during the test. To repeat the same set of operations in multiple experiments, use the same seed in each experiment. Note that the operations are performed concurrently so might not always happen in the same order on each run.
    * **`timeout` (Optional, string | -1 | 0)**: The period of time to wait for the test to complete. If no response is received before the timeout expires, the test is cancelled and returns an error.



### restore [_restore]

Restore a snapshot. Restore a snapshot of a cluster or data streams and indices.

You can restore a snapshot only to a running cluster with an elected master node. The snapshot repository must be registered and available to the cluster. The snapshot and cluster versions must be compatible.

To restore a snapshot, the cluster’s global metadata must be writable. Ensure there are’t any cluster blocks that prevent writes. The restore operation ignores index blocks.

Before you restore a data stream, ensure the cluster contains a matching index template with data streams enabled. To check, use the index management feature in Kibana or the get index template API:

```
GET _index_template/*?filter_path=index_templates.name,index_templates.index_template.index_patterns,index_templates.index_template.data_stream
```

If no such template exists, you can create one or restore a cluster state that contains one. Without a matching index template, a data stream can’t roll over or create backing indices.

If your snapshot contains data from App Search or Workplace Search, you must restore the Enterprise Search encryption key before you restore the snapshot.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-restore)

```ts
client.snapshot.restore({ repository, snapshot })
```


### Arguments [_arguments_439]

* **Request (object):**

    * **`repository` (string)**: The name of the repository to restore a snapshot from.
    * **`snapshot` (string)**: The name of the snapshot to restore.
    * **`feature_states` (Optional, string[])**: The feature states to restore. If `include_global_state` is `true`, the request restores all feature states in the snapshot by default. If `include_global_state` is `false`, the request restores no feature states by default. Note that specifying an empty array will result in the default behavior. To restore no feature states, regardless of the `include_global_state` value, specify an array containing only the value `none` (`["none"]`).
    * **`ignore_index_settings` (Optional, string[])**: The index settings to not restore from the snapshot. You can’t use this option to ignore `index.number_of_shards`.


For data streams, this option applies only to restored backing indices. New backing indices are configured using the data stream’s matching index template. ** *`ignore_unavailable` (Optional, boolean)**: If `true`, the request ignores any index or data stream in indices that’s missing from the snapshot. If `false`, the request returns an error for any missing index or data stream. *** *`include_aliases` (Optional, boolean)**: If `true`, the request restores aliases for any restored data streams and indices. If `false`, the request doesn’t restore aliases. ** *`include_global_state` (Optional, boolean)**: If `true`, restore the cluster state. The cluster state includes:

* Persistent cluster settings
* Index templates
* Legacy index templates
* Ingest pipelines
* Index lifecycle management (ILM) policies
* Stored scripts
* For snapshots taken after 7.12.0, feature states

If `include_global_state` is `true`, the restore operation merges the legacy index templates in your cluster with the templates contained in the snapshot, replacing any existing ones whose name matches one in the snapshot. It completely removes all persistent settings, non-legacy index templates, ingest pipelines, and ILM lifecycle policies that exist in your cluster and replaces them with the corresponding items from the snapshot.

Use the `feature_states` parameter to configure how feature states are restored.

If `include_global_state` is `true` and a snapshot was created without a global state then the restore request will fail. *** *`index_settings` (Optional, { index, mode, routing_path, soft_deletes, sort, number_of_shards, number_of_replicas, number_of_routing_shards, check_on_startup, codec, routing_partition_size, load_fixed_bitset_filters_eagerly, hidden, auto_expand_replicas, merge, search, refresh_interval, max_result_window, max_inner_result_window, max_rescore_window, max_docvalue_fields_search, max_script_fields, max_ngram_diff, max_shingle_diff, blocks, max_refresh_listeners, analyze, highlight, max_terms_count, max_regex_length, routing, gc_deletes, default_pipeline, final_pipeline, lifecycle, provided_name, creation_date, creation_date_string, uuid, version, verified_before_close, format, max_slices_per_scroll, translog, query_string, priority, top_metrics_max_size, analysis, settings, time_series, queries, similarity, mapping, indexing.slowlog, indexing_pressure, store })**: Index settings to add or change in restored indices, including backing indices. You can’t use this option to change `index.number_of_shards`.

For data streams, this option applies only to restored backing indices. New backing indices are configured using the data stream’s matching index template. *** *`indices` (Optional, string | string[])**: A list of indices and data streams to restore. It supports a multi-target syntax. The default behavior is all regular indices and regular data streams in the snapshot.

You can’t use this parameter to restore system indices or system data streams. Use `feature_states` instead. *** *`partial` (Optional, boolean)**: If `false`, the entire restore operation will fail if one or more indices included in the snapshot do not have all primary shards available.

If true, it allows restoring a partial snapshot of indices with unavailable shards. Only shards that were successfully included in the snapshot will be restored. All missing shards will be recreated as empty. *** *`rename_pattern` (Optional, string)**: A rename pattern to apply to restored data streams and indices. Data streams and indices matching the rename pattern will be renamed according to `rename_replacement`.

The rename pattern is applied as defined by the regular expression that supports referencing the original text, according to the `appendReplacement` logic. ** *`rename_replacement` (Optional, string)**: The rename replacement string that is used with the `rename_pattern`. *** *`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`. ** *`wait_for_completion` (Optional, boolean)**: If `true`, the request returns a response when the restore operation completes. The operation is complete when it finishes all attempts to recover primary shards for restored indices. This applies even if one or more of the recovery attempts fail.

If `false`, the request returns a response when the restore operation initializes.


### status [_status_2]

Get the snapshot status. Get a detailed description of the current state for each shard participating in the snapshot.

Note that this API should be used only to obtain detailed shard-level information for ongoing snapshots. If this detail is not needed or you want to obtain information about one or more existing snapshots, use the get snapshot API.

If you omit the `<snapshot>` request path parameter, the request retrieves information only for currently running snapshots. This usage is preferred. If needed, you can specify `<repository>` and `<snapshot>` to retrieve information for specific snapshots, even if they’re not currently running.

::::{warning}
Using the API to return the status of any snapshots other than currently running snapshots can be expensive. The API requires a read from the repository for each shard in each snapshot. For example, if you have 100 snapshots with 1,000 shards each, an API request that includes all snapshots will require 100,000 reads (100 snapshots x 1,000 shards).
::::


Depending on the latency of your storage, such requests can take an extremely long time to return results. These requests can also tax machine resources and, when using cloud storage, incur high processing costs.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-status)

```ts
client.snapshot.status({ ... })
```


### Arguments [_arguments_440]

* **Request (object):**

    * **`repository` (Optional, string)**: The snapshot repository name used to limit the request. It supports wildcards (`*`) if `<snapshot>` isn’t specified.
    * **`snapshot` (Optional, string | string[])**: A list of snapshots to retrieve status for. The default is currently running snapshots. Wildcards (`*`) are not supported.
    * **`ignore_unavailable` (Optional, boolean)**: If `false`, the request returns an error for any snapshots that are unavailable. If `true`, the request ignores snapshots that are unavailable, such as those that are corrupted or temporarily cannot be returned.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### verify_repository [_verify_repository]

Verify a snapshot repository. Check for common misconfigurations in a snapshot repository.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-verify-repository)

```ts
client.snapshot.verifyRepository({ repository })
```


### Arguments [_arguments_441]

* **Request (object):**

    * **`repository` (string)**: The name of the snapshot repository to verify.
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response from all relevant nodes in the cluster after updating the cluster metadata. If no response is received before the timeout expires, the cluster metadata update still applies but the response will indicate that it was not completely acknowledged. To indicate that the request should never timeout, set it to `-1`.



## sql [_sql]


### clear_cursor [_clear_cursor]

Clear an SQL search cursor.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-sql-clear-cursor)

```ts
client.sql.clearCursor({ cursor })
```


### Arguments [_arguments_442]

* **Request (object):**

    * **`cursor` (string)**: Cursor to clear.



### delete_async [_delete_async]

Delete an async SQL search. Delete an async SQL search or a stored synchronous SQL search. If the search is still running, the API cancels it.

If the Elasticsearch security features are enabled, only the following users can use this API to delete a search:

* Users with the `cancel_task` cluster privilege.
* The user who first submitted the search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-sql-delete-async)

```ts
client.sql.deleteAsync({ id })
```


### Arguments [_arguments_443]

* **Request (object):**

    * **`id` (string)**: The identifier for the search.



### get_async [_get_async]

Get async SQL search results. Get the current status and available results for an async SQL search or stored synchronous SQL search.

If the Elasticsearch security features are enabled, only the user who first submitted the SQL search can retrieve the search using this API.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-sql-get-async)

```ts
client.sql.getAsync({ id })
```


### Arguments [_arguments_444]

* **Request (object):**

    * **`id` (string)**: The identifier for the search.
    * **`delimiter` (Optional, string)**: The separator for CSV results. The API supports this parameter only for CSV responses.
    * **`format` (Optional, string)**: The format for the response. You must specify a format using this parameter or the `Accept` HTTP header. If you specify both, the API uses this parameter.
    * **`keep_alive` (Optional, string | -1 | 0)**: The retention period for the search and its results. It defaults to the `keep_alive` period for the original SQL search.
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: The period to wait for complete results. It defaults to no timeout, meaning the request waits for complete search results.



### get_async_status [_get_async_status]

Get the async SQL search status. Get the current status of an async SQL search or a stored synchronous SQL search.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-sql-get-async-status)

```ts
client.sql.getAsyncStatus({ id })
```


### Arguments [_arguments_445]

* **Request (object):**

    * **`id` (string)**: The identifier for the search.



### query [_query_2]

Get SQL search results. Run an SQL request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-sql-query)

```ts
client.sql.query({ ... })
```


### Arguments [_arguments_446]

* **Request (object):**

    * **`allow_partial_search_results` (Optional, boolean)**: If `true`, the response has partial results when there are shard request timeouts or shard failures. If `false`, the API returns an error with no partial results.
    * **`catalog` (Optional, string)**: The default catalog (cluster) for queries. If unspecified, the queries execute on the data in the local cluster only.
    * **`columnar` (Optional, boolean)**: If `true`, the results are in a columnar fashion: one row represents all the values of a certain column from the current page of results. The API supports this parameter only for CBOR, JSON, SMILE, and YAML responses.
    * **`cursor` (Optional, string)**: The cursor used to retrieve a set of paginated results. If you specify a cursor, the API only uses the `columnar` and `time_zone` request body parameters. It ignores other request body parameters.
    * **`fetch_size` (Optional, number)**: The maximum number of rows (or entries) to return in one response.
    * **`field_multi_value_leniency` (Optional, boolean)**: If `false`, the API returns an exception when encountering multiple values for a field. If `true`, the API is lenient and returns the first value from the array with no guarantee of consistent results.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The Elasticsearch query DSL for additional filtering.
    * **`index_using_frozen` (Optional, boolean)**: If `true`, the search can run on frozen indices.
    * **`keep_alive` (Optional, string | -1 | 0)**: The retention period for an async or saved synchronous search.
    * **`keep_on_completion` (Optional, boolean)**: If `true`, Elasticsearch stores synchronous searches if you also specify the `wait_for_completion_timeout` parameter. If `false`, Elasticsearch only stores async searches that don’t finish before the `wait_for_completion_timeout`.
    * **`page_timeout` (Optional, string | -1 | 0)**: The minimum retention period for the scroll cursor. After this time period, a pagination request might fail because the scroll cursor is no longer available. Subsequent scroll requests prolong the lifetime of the scroll cursor by the duration of `page_timeout` in the scroll request.
    * **`params` (Optional, Record<string, User-defined value>)**: The values for parameters in the query.
    * **`query` (Optional, string)**: The SQL query to run.
    * **`request_timeout` (Optional, string | -1 | 0)**: The timeout before the request fails.
    * **`runtime_mappings` (Optional, Record<string, { fields, fetch_fields, format, input_field, target_field, target_index, script, type }>)**: One or more runtime fields for the search request. These fields take precedence over mapped fields with the same name.
    * **`time_zone` (Optional, string)**: The ISO-8601 time zone ID for the search.
    * **`wait_for_completion_timeout` (Optional, string | -1 | 0)**: The period to wait for complete results. It defaults to no timeout, meaning the request waits for complete search results. If the search doesn’t finish within this period, the search becomes async.


To save a synchronous search, you must specify this parameter and the `keep_on_completion` parameter. *** *`format` (Optional, Enum("csv" | "json" | "tsv" | "txt" | "yaml" | "cbor" | "smile"))**: The format for the response. You can also specify a format using the `Accept` HTTP header. If you specify both this parameter and the `Accept` HTTP header, this parameter takes precedence.


### translate [_translate]

Translate SQL into Elasticsearch queries. Translate an SQL search into a search API request containing Query DSL. It accepts the same request body parameters as the SQL search API, excluding `cursor`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-sql-translate)

```ts
client.sql.translate({ query })
```


### Arguments [_arguments_447]

* **Request (object):**

    * **`query` (string)**: The SQL query to run.
    * **`fetch_size` (Optional, number)**: The maximum number of rows (or entries) to return in one response.
    * **`filter` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: The Elasticsearch query DSL for additional filtering.
    * **`time_zone` (Optional, string)**: The ISO-8601 time zone ID for the search.



## ssl [_ssl]


### certificates [_certificates]

Get SSL certificates.

Get information about the X.509 certificates that are used to encrypt communications in the cluster. The API returns a list that includes certificates from all TLS contexts including:

* Settings for transport and HTTP interfaces
* TLS settings that are used within authentication realms
* TLS settings for remote monitoring exporters

The list includes certificates that are used for configuring trust, such as those configured in the `xpack.security.transport.ssl.truststore` and `xpack.security.transport.ssl.certificate_authorities` settings. It also includes certificates that are used for configuring server identity, such as `xpack.security.http.ssl.keystore` and `xpack.security.http.ssl.certificate settings`.

The list does not include certificates that are sourced from the default SSL context of the Java Runtime Environment (JRE), even if those certificates are in use within Elasticsearch.

::::{note}
When a PKCS#11 token is configured as the truststore of the JRE, the API returns all the certificates that are included in the PKCS#11 token irrespective of whether these are used in the Elasticsearch TLS configuration.
::::


If Elasticsearch is configured to use a keystore or truststore, the API output includes all certificates in that store, even though some of the certificates might not be in active use within the cluster.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-ssl-certificates)

```ts
client.ssl.certificates()
```


## synonyms [_synonyms]


### delete_synonym [_delete_synonym]

Delete a synonym set.

You can only delete a synonyms set that is not in use by any index analyzer.

Synonyms sets can be used in synonym graph token filters and synonym token filters. These synonym filters can be used as part of search analyzers.

Analyzers need to be loaded when an index is restored (such as when a node starts, or the index becomes open). Even if the analyzer is not used on any field mapping, it still needs to be loaded on the index recovery phase.

If any analyzers cannot be loaded, the index becomes unavailable and the cluster status becomes red or yellow as index shards are not available. To prevent that, synonyms sets that are used in analyzers can’t be deleted. A delete request in this case will return a 400 response code.

To remove a synonyms set, you must first remove all indices that contain analyzers using it. You can migrate an index by creating a new index that does not contain the token filter with the synonyms set, and use the reindex API in order to copy over the index data. Once finished, you can delete the index. When the synonyms set is not used in analyzers, you will be able to delete it.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-delete-synonym)

```ts
client.synonyms.deleteSynonym({ id })
```


### Arguments [_arguments_448]

* **Request (object):**

    * **`id` (string)**: The synonyms set identifier to delete.



### delete_synonym_rule [_delete_synonym_rule]

Delete a synonym rule. Delete a synonym rule from a synonym set.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-delete-synonym-rule)

```ts
client.synonyms.deleteSynonymRule({ set_id, rule_id })
```


### Arguments [_arguments_449]

* **Request (object):**

    * **`set_id` (string)**: The ID of the synonym set to update.
    * **`rule_id` (string)**: The ID of the synonym rule to delete.



### get_synonym [_get_synonym]

Get a synonym set.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-get-synonym)

```ts
client.synonyms.getSynonym({ id })
```


### Arguments [_arguments_450]

* **Request (object):**

    * **`id` (string)**: The synonyms set identifier to retrieve.
    * **`from` (Optional, number)**: The starting offset for query rules to retrieve.
    * **`size` (Optional, number)**: The max number of query rules to retrieve.



### get_synonym_rule [_get_synonym_rule]

Get a synonym rule. Get a synonym rule from a synonym set.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-get-synonym-rule)

```ts
client.synonyms.getSynonymRule({ set_id, rule_id })
```


### Arguments [_arguments_451]

* **Request (object):**

    * **`set_id` (string)**: The ID of the synonym set to retrieve the synonym rule from.
    * **`rule_id` (string)**: The ID of the synonym rule to retrieve.



### get_synonyms_sets [_get_synonyms_sets]

Get all synonym sets. Get a summary of all defined synonym sets.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-get-synonym)

```ts
client.synonyms.getSynonymsSets({ ... })
```


### Arguments [_arguments_452]

* **Request (object):**

    * **`from` (Optional, number)**: The starting offset for synonyms sets to retrieve.
    * **`size` (Optional, number)**: The maximum number of synonyms sets to retrieve.



### put_synonym [_put_synonym]

Create or update a synonym set. Synonyms sets are limited to a maximum of 10,000 synonym rules per set. If you need to manage more synonym rules, you can create multiple synonym sets.

When an existing synonyms set is updated, the search analyzers that use the synonyms set are reloaded automatically for all indices. This is equivalent to invoking the reload search analyzers API for all indices that use the synonyms set.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-put-synonym)

```ts
client.synonyms.putSynonym({ id, synonyms_set })
```


### Arguments [_arguments_453]

* **Request (object):**

    * **`id` (string)**: The ID of the synonyms set to be created or updated.
    * **`synonyms_set` ({ id, synonyms } | { id, synonyms }[])**: The synonym rules definitions for the synonyms set.



### put_synonym_rule [_put_synonym_rule]

Create or update a synonym rule. Create or update a synonym rule in a synonym set.

If any of the synonym rules included is invalid, the API returns an error.

When you update a synonym rule, all analyzers using the synonyms set will be reloaded automatically to reflect the new rule.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-synonyms-put-synonym-rule)

```ts
client.synonyms.putSynonymRule({ set_id, rule_id, synonyms })
```


### Arguments [_arguments_454]

* **Request (object):**

    * **`set_id` (string)**: The ID of the synonym set.
    * **`rule_id` (string)**: The ID of the synonym rule to be updated or created.
    * **`synonyms` (string)**: The synonym rule information definition, which must be in Solr format.



## tasks [_tasks_2]


### cancel [_cancel]

Cancel a task.

::::{warning}
The task management API is new and should still be considered a beta feature. The API may change in ways that are not backwards compatible.
::::


A task may continue to run for some time after it has been cancelled because it may not be able to safely stop its current activity straight away. It is also possible that Elasticsearch must complete its work on other tasks before it can process the cancellation. The get task information API will continue to list these cancelled tasks until they complete. The cancelled flag in the response indicates that the cancellation command has been processed and the task will stop as soon as possible.

To troubleshoot why a cancelled task does not complete promptly, use the get task information API with the `?detailed` parameter to identify the other tasks the system is running. You can also use the node hot threads API to obtain detailed information about the work the system is doing instead of completing the cancelled task.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-tasks)

```ts
client.tasks.cancel({ ... })
```


### Arguments [_arguments_455]

* **Request (object):**

    * **`task_id` (Optional, string | number)**: The task identifier.
    * **`actions` (Optional, string | string[])**: A list or wildcard expression of actions that is used to limit the request.
    * **`nodes` (Optional, string[])**: A list of node IDs or names that is used to limit the request.
    * **`parent_task_id` (Optional, string)**: A parent task ID that is used to limit the tasks.
    * **`wait_for_completion` (Optional, boolean)**: If true, the request blocks until all found tasks are complete.



### get [_get_10]

Get task information. Get information about a task currently running in the cluster.

::::{warning}
The task management API is new and should still be considered a beta feature. The API may change in ways that are not backwards compatible.
::::


If the task identifier is not found, a 404 response code indicates that there are no resources that match the request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-tasks)

```ts
client.tasks.get({ task_id })
```


### Arguments [_arguments_456]

* **Request (object):**

    * **`task_id` (string)**: The task identifier.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks until the task has completed.



### list [_list_3]

Get all tasks. Get information about the tasks currently running on one or more nodes in the cluster.

::::{warning}
The task management API is new and should still be considered a beta feature. The API may change in ways that are not backwards compatible.
::::


**Identifying running tasks**

The `X-Opaque-Id header`, when provided on the HTTP request header, is going to be returned as a header in the response as well as in the headers field for in the task information. This enables you to track certain calls or associate certain tasks with the client that started them. For example:

```
curl -i -H "X-Opaque-Id: 123456" "http://localhost:9200/_tasks?group_by=parents"
```

The API returns the following result:

```
HTTP/1.1 200 OK
X-Opaque-Id: 123456
content-type: application/json; charset=UTF-8
content-length: 831

{
  "tasks" : {
    "u5lcZHqcQhu-rUoFaqDphA:45" : {
      "node" : "u5lcZHqcQhu-rUoFaqDphA",
      "id" : 45,
      "type" : "transport",
      "action" : "cluster:monitor/tasks/lists",
      "start_time_in_millis" : 1513823752749,
      "running_time_in_nanos" : 293139,
      "cancellable" : false,
      "headers" : {
        "X-Opaque-Id" : "123456"
      },
      "children" : [
        {
          "node" : "u5lcZHqcQhu-rUoFaqDphA",
          "id" : 46,
          "type" : "direct",
          "action" : "cluster:monitor/tasks/lists[n]",
          "start_time_in_millis" : 1513823752750,
          "running_time_in_nanos" : 92133,
          "cancellable" : false,
          "parent_task_id" : "u5lcZHqcQhu-rUoFaqDphA:45",
          "headers" : {
            "X-Opaque-Id" : "123456"
          }
        }
      ]
    }
  }
 }
```

In this example, `X-Opaque-Id: 123456` is the ID as a part of the response header. The `X-Opaque-Id` in the task `headers` is the ID for the task that was initiated by the REST request. The `X-Opaque-Id` in the children `headers` is the child task of the task that was initiated by the REST request.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-tasks)

```ts
client.tasks.list({ ... })
```


### Arguments [_arguments_457]

* **Request (object):**

    * **`actions` (Optional, string | string[])**: A list or wildcard expression of actions used to limit the request. For example, you can use `cluser:*` to retrieve all cluster-related tasks.
    * **`detailed` (Optional, boolean)**: If `true`, the response includes detailed information about the running tasks. This information is useful to distinguish tasks from each other but is more costly to run.
    * **`group_by` (Optional, Enum("nodes" | "parents" | "none"))**: A key that is used to group tasks in the response. The task lists can be grouped either by nodes or by parent tasks.
    * **`nodes` (Optional, string | string[])**: A list of node IDs or names that is used to limit the returned information.
    * **`parent_task_id` (Optional, string)**: A parent task identifier that is used to limit returned information. To return all tasks, omit this parameter or use a value of `-1`. If the parent task is not found, the API does not return a 404 response code.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for each node to respond. If a node does not respond before its timeout expires, the response does not include its information. However, timed out nodes are included in the `node_failures` property.
    * **`wait_for_completion` (Optional, boolean)**: If `true`, the request blocks until the operation is complete.



## text_structure [_text_structure]


### find_field_structure [_find_field_structure]

Find the structure of a text field. Find the structure of a text field in an Elasticsearch index.

This API provides a starting point for extracting further information from log messages already ingested into Elasticsearch. For example, if you have ingested data into a very simple index that has just `@timestamp` and message fields, you can use this API to see what common structure exists in the message field.

The response from the API contains:

* Sample messages.
* Statistics that reveal the most common values for all fields detected within the text and basic numeric statistics for numeric fields.
* Information about the structure of the text, which is useful when you write ingest configurations to index it or similarly formatted text.
* Appropriate mappings for an Elasticsearch index, which you could use to ingest the text.

All this information can be calculated by the structure finder with no guidance. However, you can optionally override some of the decisions about the text structure by specifying one or more query parameters.

If the structure finder produces unexpected results, specify the `explain` query parameter and an explanation will appear in the response. It helps determine why the returned structure was chosen.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-text_structure)

```ts
client.textStructure.findFieldStructure({ field, index })
```


### Arguments [_arguments_458]

* **Request (object):**

    * **`field` (string)**: The field that should be analyzed.
    * **`index` (string)**: The name of the index that contains the analyzed field.
    * **`column_names` (Optional, string)**: If `format` is set to `delimited`, you can specify the column names in a list. If this parameter is not specified, the structure finder uses the column names from the header row of the text. If the text does not have a header row, columns are named "column1", "column2", "column3", for example.
    * **`delimiter` (Optional, string)**: If you have set `format` to `delimited`, you can specify the character used to delimit the values in each row. Only a single character is supported; the delimiter cannot have multiple characters. By default, the API considers the following possibilities: comma, tab, semi-colon, and pipe (`|`). In this default scenario, all rows must have the same number of fields for the delimited format to be detected. If you specify a delimiter, up to 10% of the rows can have a different number of columns than the first row.
    * **`documents_to_sample` (Optional, number)**: The number of documents to include in the structural analysis. The minimum value is 2.
    * **`ecs_compatibility` (Optional, Enum("disabled" | "v1"))**: The mode of compatibility with ECS compliant Grok patterns. Use this parameter to specify whether to use ECS Grok patterns instead of legacy ones when the structure finder creates a Grok pattern. This setting primarily has an impact when a whole message Grok pattern such as `%{{CATALINALOG}}` matches the input. If the structure finder identifies a common structure but has no idea of the meaning then generic field names such as `path`, `ipaddress`, `field1`, and `field2` are used in the `grok_pattern` output. The intention in that situation is that a user who knows the meanings will rename the fields before using them.
    * **`explain` (Optional, boolean)**: If `true`, the response includes a field named `explanation`, which is an array of strings that indicate how the structure finder produced its result.
    * **`format` (Optional, Enum("delimited" | "ndjson" | "semi_structured_text" | "xml"))**: The high level structure of the text. By default, the API chooses the format. In this default scenario, all rows must have the same number of fields for a delimited format to be detected. If the format is set to delimited and the delimiter is not set, however, the API tolerates up to 5% of rows that have a different number of columns than the first row.
    * **`grok_pattern` (Optional, string)**: If the format is `semi_structured_text`, you can specify a Grok pattern that is used to extract fields from every message in the text. The name of the timestamp field in the Grok pattern must match what is specified in the `timestamp_field` parameter. If that parameter is not specified, the name of the timestamp field in the Grok pattern must match "timestamp". If `grok_pattern` is not specified, the structure finder creates a Grok pattern.
    * **`quote` (Optional, string)**: If the format is `delimited`, you can specify the character used to quote the values in each row if they contain newlines or the delimiter character. Only a single character is supported. If this parameter is not specified, the default value is a double quote (`"`). If your delimited text format does not use quoting, a workaround is to set this argument to a character that does not appear anywhere in the sample.
    * **`should_trim_fields` (Optional, boolean)**: If the format is `delimited`, you can specify whether values between delimiters should have whitespace trimmed from them. If this parameter is not specified and the delimiter is pipe (`|`), the default value is true. Otherwise, the default value is `false`.
    * **`timeout` (Optional, string | -1 | 0)**: The maximum amount of time that the structure analysis can take. If the analysis is still running when the timeout expires, it will be stopped.
    * **`timestamp_field` (Optional, string)**: The name of the field that contains the primary timestamp of each record in the text. In particular, if the text was ingested into an index, this is the field that would be used to populate the `@timestamp` field.


If the format is `semi_structured_text`, this field must match the name of the appropriate extraction in the `grok_pattern`. Therefore, for semi-structured text, it is best not to specify this parameter unless `grok_pattern` is also specified.

For structured text, if you specify this parameter, the field must exist within the text.

If this parameter is not specified, the structure finder makes a decision about which field (if any) is the primary timestamp field. For structured text, it is not compulsory to have a timestamp in the text. *** *`timestamp_format` (Optional, string)**: The Java time format of the timestamp field in the text. Only a subset of Java time format letter groups are supported:

* `a`
* `d`
* `dd`
* `EEE`
* `EEEE`
* `H`
* `HH`
* `h`
* `M`
* `MM`
* `MMM`
* `MMMM`
* `mm`
* `ss`
* `XX`
* `XXX`
* `yy`
* `yyyy`
* `zzz`

Additionally `S` letter groups (fractional seconds) of length one to nine are supported providing they occur after `ss` and are separated from the `ss` by a period (`.`), comma (`,`), or colon (`:`). Spacing and punctuation is also permitted with the exception a question mark (`?`), newline, and carriage return, together with literal text enclosed in single quotes. For example, `MM/dd HH.mm.ss,SSSSSS 'in' yyyy` is a valid override format.

One valuable use case for this parameter is when the format is semi-structured text, there are multiple timestamp formats in the text, and you know which format corresponds to the primary timestamp, but you do not want to specify the full `grok_pattern`. Another is when the timestamp format is one that the structure finder does not consider by default.

If this parameter is not specified, the structure finder chooses the best format from a built-in set.

If the special value `null` is specified, the structure finder will not look for a primary timestamp in the text. When the format is semi-structured text, this will result in the structure finder treating the text as single-line messages.


### find_message_structure [_find_message_structure]

Find the structure of text messages. Find the structure of a list of text messages. The messages must contain data that is suitable to be ingested into Elasticsearch.

This API provides a starting point for ingesting data into Elasticsearch in a format that is suitable for subsequent use with other Elastic Stack functionality. Use this API rather than the find text structure API if your input text has already been split up into separate messages by some other process.

The response from the API contains:

* Sample messages.
* Statistics that reveal the most common values for all fields detected within the text and basic numeric statistics for numeric fields.
* Information about the structure of the text, which is useful when you write ingest configurations to index it or similarly formatted text. Appropriate mappings for an Elasticsearch index, which you could use to ingest the text.

All this information can be calculated by the structure finder with no guidance. However, you can optionally override some of the decisions about the text structure by specifying one or more query parameters.

If the structure finder produces unexpected results, specify the `explain` query parameter and an explanation will appear in the response. It helps determine why the returned structure was chosen.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-text-structure-find-message-structure)

```ts
client.textStructure.findMessageStructure({ messages })
```


### Arguments [_arguments_459]

* **Request (object):**

    * **`messages` (string[])**: The list of messages you want to analyze.
    * **`column_names` (Optional, string)**: If the format is `delimited`, you can specify the column names in a list. If this parameter is not specified, the structure finder uses the column names from the header row of the text. If the text does not have a header role, columns are named "column1", "column2", "column3", for example.
    * **`delimiter` (Optional, string)**: If you the format is `delimited`, you can specify the character used to delimit the values in each row. Only a single character is supported; the delimiter cannot have multiple characters. By default, the API considers the following possibilities: comma, tab, semi-colon, and pipe (`|`). In this default scenario, all rows must have the same number of fields for the delimited format to be detected. If you specify a delimiter, up to 10% of the rows can have a different number of columns than the first row.
    * **`ecs_compatibility` (Optional, Enum("disabled" | "v1"))**: The mode of compatibility with ECS compliant Grok patterns. Use this parameter to specify whether to use ECS Grok patterns instead of legacy ones when the structure finder creates a Grok pattern. This setting primarily has an impact when a whole message Grok pattern such as `%{{CATALINALOG}}` matches the input. If the structure finder identifies a common structure but has no idea of meaning then generic field names such as `path`, `ipaddress`, `field1`, and `field2` are used in the `grok_pattern` output, with the intention that a user who knows the meanings rename these fields before using it.
    * **`explain` (Optional, boolean)**: If this parameter is set to true, the response includes a field named `explanation`, which is an array of strings that indicate how the structure finder produced its result.
    * **`format` (Optional, Enum("delimited" | "ndjson" | "semi_structured_text" | "xml"))**: The high level structure of the text. By default, the API chooses the format. In this default scenario, all rows must have the same number of fields for a delimited format to be detected. If the format is `delimited` and the delimiter is not set, however, the API tolerates up to 5% of rows that have a different number of columns than the first row.
    * **`grok_pattern` (Optional, string)**: If the format is `semi_structured_text`, you can specify a Grok pattern that is used to extract fields from every message in the text. The name of the timestamp field in the Grok pattern must match what is specified in the `timestamp_field` parameter. If that parameter is not specified, the name of the timestamp field in the Grok pattern must match "timestamp". If `grok_pattern` is not specified, the structure finder creates a Grok pattern.
    * **`quote` (Optional, string)**: If the format is `delimited`, you can specify the character used to quote the values in each row if they contain newlines or the delimiter character. Only a single character is supported. If this parameter is not specified, the default value is a double quote (`"`). If your delimited text format does not use quoting, a workaround is to set this argument to a character that does not appear anywhere in the sample.
    * **`should_trim_fields` (Optional, boolean)**: If the format is `delimited`, you can specify whether values between delimiters should have whitespace trimmed from them. If this parameter is not specified and the delimiter is pipe (`|`), the default value is true. Otherwise, the default value is `false`.
    * **`timeout` (Optional, string | -1 | 0)**: The maximum amount of time that the structure analysis can take. If the analysis is still running when the timeout expires, it will be stopped.
    * **`timestamp_field` (Optional, string)**: The name of the field that contains the primary timestamp of each record in the text. In particular, if the text was ingested into an index, this is the field that would be used to populate the `@timestamp` field.


If the format is `semi_structured_text`, this field must match the name of the appropriate extraction in the `grok_pattern`. Therefore, for semi-structured text, it is best not to specify this parameter unless `grok_pattern` is also specified.

For structured text, if you specify this parameter, the field must exist within the text.

If this parameter is not specified, the structure finder makes a decision about which field (if any) is the primary timestamp field. For structured text, it is not compulsory to have a timestamp in the text. *** *`timestamp_format` (Optional, string)**: The Java time format of the timestamp field in the text. Only a subset of Java time format letter groups are supported:

* `a`
* `d`
* `dd`
* `EEE`
* `EEEE`
* `H`
* `HH`
* `h`
* `M`
* `MM`
* `MMM`
* `MMMM`
* `mm`
* `ss`
* `XX`
* `XXX`
* `yy`
* `yyyy`
* `zzz`

Additionally `S` letter groups (fractional seconds) of length one to nine are supported providing they occur after `ss` and are separated from the `ss` by a period (`.`), comma (`,`), or colon (`:`). Spacing and punctuation is also permitted with the exception a question mark (`?`), newline, and carriage return, together with literal text enclosed in single quotes. For example, `MM/dd HH.mm.ss,SSSSSS 'in' yyyy` is a valid override format.

One valuable use case for this parameter is when the format is semi-structured text, there are multiple timestamp formats in the text, and you know which format corresponds to the primary timestamp, but you do not want to specify the full `grok_pattern`. Another is when the timestamp format is one that the structure finder does not consider by default.

If this parameter is not specified, the structure finder chooses the best format from a built-in set.

If the special value `null` is specified, the structure finder will not look for a primary timestamp in the text. When the format is semi-structured text, this will result in the structure finder treating the text as single-line messages.


### find_structure [_find_structure]

Find the structure of a text file. The text file must contain data that is suitable to be ingested into Elasticsearch.

This API provides a starting point for ingesting data into Elasticsearch in a format that is suitable for subsequent use with other Elastic Stack functionality. Unlike other Elasticsearch endpoints, the data that is posted to this endpoint does not need to be UTF-8 encoded and in JSON format. It must, however, be text; binary text formats are not currently supported. The size is limited to the Elasticsearch HTTP receive buffer size, which defaults to 100 Mb.

The response from the API contains:

* A couple of messages from the beginning of the text.
* Statistics that reveal the most common values for all fields detected within the text and basic numeric statistics for numeric fields.
* Information about the structure of the text, which is useful when you write ingest configurations to index it or similarly formatted text.
* Appropriate mappings for an Elasticsearch index, which you could use to ingest the text.

All this information can be calculated by the structure finder with no guidance. However, you can optionally override some of the decisions about the text structure by specifying one or more query parameters.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-text-structure-find-structure)

```ts
client.textStructure.findStructure({ ... })
```


### Arguments [_arguments_460]

* **Request (object):**

    * **`text_files` (Optional, TJsonDocument[])**
    * **`charset` (Optional, string)**: The text’s character set. It must be a character set that is supported by the JVM that Elasticsearch uses. For example, `UTF-8`, `UTF-16LE`, `windows-1252`, or `EUC-JP`. If this parameter is not specified, the structure finder chooses an appropriate character set.
    * **`column_names` (Optional, string)**: If you have set format to `delimited`, you can specify the column names in a list. If this parameter is not specified, the structure finder uses the column names from the header row of the text. If the text does not have a header role, columns are named "column1", "column2", "column3", for example.
    * **`delimiter` (Optional, string)**: If you have set `format` to `delimited`, you can specify the character used to delimit the values in each row. Only a single character is supported; the delimiter cannot have multiple characters. By default, the API considers the following possibilities: comma, tab, semi-colon, and pipe (`|`). In this default scenario, all rows must have the same number of fields for the delimited format to be detected. If you specify a delimiter, up to 10% of the rows can have a different number of columns than the first row.
    * **`ecs_compatibility` (Optional, string)**: The mode of compatibility with ECS compliant Grok patterns. Use this parameter to specify whether to use ECS Grok patterns instead of legacy ones when the structure finder creates a Grok pattern. Valid values are `disabled` and `v1`. This setting primarily has an impact when a whole message Grok pattern such as `%{{CATALINALOG}}` matches the input. If the structure finder identifies a common structure but has no idea of meaning then generic field names such as `path`, `ipaddress`, `field1`, and `field2` are used in the `grok_pattern` output, with the intention that a user who knows the meanings rename these fields before using it.
    * **`explain` (Optional, boolean)**: If this parameter is set to `true`, the response includes a field named explanation, which is an array of strings that indicate how the structure finder produced its result. If the structure finder produces unexpected results for some text, use this query parameter to help you determine why the returned structure was chosen.
    * **`format` (Optional, string)**: The high level structure of the text. Valid values are `ndjson`, `xml`, `delimited`, and `semi_structured_text`. By default, the API chooses the format. In this default scenario, all rows must have the same number of fields for a delimited format to be detected. If the format is set to `delimited` and the delimiter is not set, however, the API tolerates up to 5% of rows that have a different number of columns than the first row.
    * **`grok_pattern` (Optional, string)**: If you have set `format` to `semi_structured_text`, you can specify a Grok pattern that is used to extract fields from every message in the text. The name of the timestamp field in the Grok pattern must match what is specified in the `timestamp_field` parameter. If that parameter is not specified, the name of the timestamp field in the Grok pattern must match "timestamp". If `grok_pattern` is not specified, the structure finder creates a Grok pattern.
    * **`has_header_row` (Optional, boolean)**: If you have set `format` to `delimited`, you can use this parameter to indicate whether the column names are in the first row of the text. If this parameter is not specified, the structure finder guesses based on the similarity of the first row of the text to other rows.
    * **`line_merge_size_limit` (Optional, number)**: The maximum number of characters in a message when lines are merged to form messages while analyzing semi-structured text. If you have extremely long messages you may need to increase this, but be aware that this may lead to very long processing times if the way to group lines into messages is misdetected.
    * **`lines_to_sample` (Optional, number)**: The number of lines to include in the structural analysis, starting from the beginning of the text. The minimum is 2. If the value of this parameter is greater than the number of lines in the text, the analysis proceeds (as long as there are at least two lines in the text) for all of the lines.


::::{note}
The number of lines and the variation of the lines affects the speed of the analysis. For example, if you upload text where the first 1000 lines are all variations on the same message, the analysis will find more commonality than would be seen with a bigger sample. If possible, however, it is more efficient to upload sample text with more variety in the first 1000 lines than to request analysis of 100000 lines to achieve some variety. ** *`quote` (Optional, string)**: If you have set `format` to `delimited`, you can specify the character used to quote the values in each row if they contain newlines or the delimiter character. Only a single character is supported. If this parameter is not specified, the default value is a double quote (`"`). If your delimited text format does not use quoting, a workaround is to set this argument to a character that does not appear anywhere in the sample. *** *`should_trim_fields` (Optional, boolean)**: If you have set `format` to `delimited`, you can specify whether values between delimiters should have whitespace trimmed from them. If this parameter is not specified and the delimiter is pipe (`|`), the default value is `true`. Otherwise, the default value is `false`. *** *`timeout` (Optional, string | -1 | 0)**: The maximum amount of time that the structure analysis can take. If the analysis is still running when the timeout expires then it will be stopped. ** *`timestamp_field` (Optional, string)**: The name of the field that contains the primary timestamp of each record in the text. In particular, if the text were ingested into an index, this is the field that would be used to populate the `@timestamp` field.
::::


If the `format` is `semi_structured_text`, this field must match the name of the appropriate extraction in the `grok_pattern`. Therefore, for semi-structured text, it is best not to specify this parameter unless `grok_pattern` is also specified.

For structured text, if you specify this parameter, the field must exist within the text.

If this parameter is not specified, the structure finder makes a decision about which field (if any) is the primary timestamp field. For structured text, it is not compulsory to have a timestamp in the text. *** *`timestamp_format` (Optional, string)**: The Java time format of the timestamp field in the text.

Only a subset of Java time format letter groups are supported:

* `a`
* `d`
* `dd`
* `EEE`
* `EEEE`
* `H`
* `HH`
* `h`
* `M`
* `MM`
* `MMM`
* `MMMM`
* `mm`
* `ss`
* `XX`
* `XXX`
* `yy`
* `yyyy`
* `zzz`

Additionally `S` letter groups (fractional seconds) of length one to nine are supported providing they occur after `ss` and separated from the `ss` by a `.`, `,` or `:`. Spacing and punctuation is also permitted with the exception of `?`, newline and carriage return, together with literal text enclosed in single quotes. For example, `MM/dd HH.mm.ss,SSSSSS 'in' yyyy` is a valid override format.

One valuable use case for this parameter is when the format is semi-structured text, there are multiple timestamp formats in the text, and you know which format corresponds to the primary timestamp, but you do not want to specify the full `grok_pattern`. Another is when the timestamp format is one that the structure finder does not consider by default.

If this parameter is not specified, the structure finder chooses the best format from a built-in set.

If the special value `null` is specified the structure finder will not look for a primary timestamp in the text. When the format is semi-structured text this will result in the structure finder treating the text as single-line messages.


### test_grok_pattern [_test_grok_pattern]

Test a Grok pattern. Test a Grok pattern on one or more lines of text. The API indicates whether the lines match the pattern together with the offsets and lengths of the matched substrings.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-text-structure-test-grok-pattern)

```ts
client.textStructure.testGrokPattern({ grok_pattern, text })
```


### Arguments [_arguments_461]

* **Request (object):**

    * **`grok_pattern` (string)**: The Grok pattern to run on the text.
    * **`text` (string[])**: The lines of text to run the Grok pattern on.
    * **`ecs_compatibility` (Optional, string)**: The mode of compatibility with ECS compliant Grok patterns. Use this parameter to specify whether to use ECS Grok patterns instead of legacy ones when the structure finder creates a Grok pattern. Valid values are `disabled` and `v1`.



## transform [_transform]


### delete_transform [_delete_transform]

Delete a transform. Deletes a transform.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-delete-transform)

```ts
client.transform.deleteTransform({ transform_id })
```


### Arguments [_arguments_462]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform.
    * **`force` (Optional, boolean)**: If this value is false, the transform must be stopped before it can be deleted. If true, the transform is deleted regardless of its current state.
    * **`delete_dest_index` (Optional, boolean)**: If this value is true, the destination index is deleted together with the transform. If false, the destination index will not be deleted
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### get_node_stats [_get_node_stats]

Retrieves transform usage information for transform nodes.

```ts
client.transform.getNodeStats()
```


### get_transform [_get_transform]

Get transforms. Retrieves configuration information for transforms.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-get-transform)

```ts
client.transform.getTransform({ ... })
```


### Arguments [_arguments_463]

* **Request (object):**

    * **`transform_id` (Optional, string | string[])**: Identifier for the transform. It can be a transform identifier or a wildcard expression. You can get information for all transforms by using `_all`, by specifying `*` as the `<transform_id>`, or by omitting the `<transform_id>`.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no transforms that match.
        2. Contains the _all string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. ** *`from` (Optional, number)**: Skips the specified number of transforms. *** *`size` (Optional, number)**: Specifies the maximum number of transforms to obtain. ** *`exclude_generated` (Optional, boolean)**: Excludes fields that were automatically added when creating the transform. This allows the configuration to be in an acceptable format to be retrieved and then added to another cluster.


### get_transform_stats [_get_transform_stats]

Get transform stats. Retrieves usage information for transforms.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-get-transform-stats)

```ts
client.transform.getTransformStats({ transform_id })
```


### Arguments [_arguments_464]

* **Request (object):**

    * **`transform_id` (string | string[])**: Identifier for the transform. It can be a transform identifier or a wildcard expression. You can get information for all transforms by using `_all`, by specifying `*` as the `<transform_id>`, or by omitting the `<transform_id>`.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request:

        1. Contains wildcard expressions and there are no transforms that match.
        2. Contains the _all string or no identifiers and there are no matches.
        3. Contains wildcard expressions and there are only partial matches.


If this parameter is false, the request returns a 404 status code when there are no matches or only partial matches. ** *`from` (Optional, number)**: Skips the specified number of transforms. *** *`size` (Optional, number)**: Specifies the maximum number of transforms to obtain. ** *`timeout` (Optional, string | -1 | 0)**: Controls the time to wait for the stats


### preview_transform [_preview_transform]

Preview a transform. Generates a preview of the results that you will get when you create a transform with the same configuration.

It returns a maximum of 100 results. The calculations are based on all the current data in the source index. It also generates a list of mappings and settings for the destination index. These values are determined based on the field types of the source index and the transform aggregations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-preview-transform)

```ts
client.transform.previewTransform({ ... })
```


### Arguments [_arguments_465]

* **Request (object):**

    * **`transform_id` (Optional, string)**: Identifier for the transform to preview. If you specify this path parameter, you cannot provide transform configuration details in the request body.
    * **`dest` (Optional, { index, op_type, pipeline, routing, version_type })**: The destination for the transform.
    * **`description` (Optional, string)**: Free text description of the transform.
    * **`frequency` (Optional, string | -1 | 0)**: The interval between checks for changes in the source indices when the transform is running continuously. Also determines the retry interval in the event of transient failures while the transform is searching or indexing. The minimum value is 1s and the maximum is 1h.
    * **`pivot` (Optional, { aggregations, group_by })**: The pivot method transforms the data by aggregating and grouping it. These objects define the group by fields and the aggregation to reduce the data.
    * **`source` (Optional, { index, query, remote, size, slice, sort, _source, runtime_mappings })**: The source of the data for the transform.
    * **`settings` (Optional, { align_checkpoints, dates_as_epoch_millis, deduce_mappings, docs_per_second, max_page_search_size, unattended })**: Defines optional transform settings.
    * **`sync` (Optional, { time })**: Defines the properties transforms require to run continuously.
    * **`retention_policy` (Optional, { time })**: Defines a retention policy for the transform. Data that meets the defined criteria is deleted from the destination index.
    * **`latest` (Optional, { sort, unique_key })**: The latest method transforms the data by finding the latest document for each unique key.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### put_transform [_put_transform]

Create a transform. Creates a transform.

A transform copies data from source indices, transforms it, and persists it into an entity-centric destination index. You can also think of the destination index as a two-dimensional tabular data structure (known as a data frame). The ID for each document in the data frame is generated from a hash of the entity, so there is a unique row per entity.

You must choose either the latest or pivot method for your transform; you cannot use both in a single transform. If you choose to use the pivot method for your transform, the entities are defined by the set of `group_by` fields in the pivot object. If you choose to use the latest method, the entities are defined by the `unique_key` field values in the latest object.

You must have `create_index`, `index`, and `read` privileges on the destination index and `read` and `view_index_metadata` privileges on the source indices. When Elasticsearch security features are enabled, the transform remembers which roles the user that created it had at the time of creation and uses those same roles. If those roles do not have the required privileges on the source and destination indices, the transform fails when it attempts unauthorized operations.

::::{note}
You must use Kibana or this API to create a transform. Do not add a transform directly into any `.transform-internal*` indices using the Elasticsearch index API. If Elasticsearch security features are enabled, do not give users any privileges on `.transform-internal*` indices. If you used transforms prior to 7.5, also do not give users any privileges on `.data-frame-internal*` indices.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-put-transform)

```ts
client.transform.putTransform({ transform_id, dest, source })
```


### Arguments [_arguments_466]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It has a 64 character limit and must start and end with alphanumeric characters.
    * **`dest` ({ index, op_type, pipeline, routing, version_type })**: The destination for the transform.
    * **`source` ({ index, query, remote, size, slice, sort, _source, runtime_mappings })**: The source of the data for the transform.
    * **`description` (Optional, string)**: Free text description of the transform.
    * **`frequency` (Optional, string | -1 | 0)**: The interval between checks for changes in the source indices when the transform is running continuously. Also determines the retry interval in the event of transient failures while the transform is searching or indexing. The minimum value is `1s` and the maximum is `1h`.
    * **`latest` (Optional, { sort, unique_key })**: The latest method transforms the data by finding the latest document for each unique key.
    * **`_meta` (Optional, Record<string, User-defined value>)**: Defines optional transform metadata.
    * **`pivot` (Optional, { aggregations, group_by })**: The pivot method transforms the data by aggregating and grouping it. These objects define the group by fields and the aggregation to reduce the data.
    * **`retention_policy` (Optional, { time })**: Defines a retention policy for the transform. Data that meets the defined criteria is deleted from the destination index.
    * **`settings` (Optional, { align_checkpoints, dates_as_epoch_millis, deduce_mappings, docs_per_second, max_page_search_size, unattended })**: Defines optional transform settings.
    * **`sync` (Optional, { time })**: Defines the properties transforms require to run continuously.
    * **`defer_validation` (Optional, boolean)**: When the transform is created, a series of validations occur to ensure its success. For example, there is a check for the existence of the source indices and a check that the destination index is not part of the source index pattern. You can use this parameter to skip the checks, for example when the source index does not exist until after the transform is created. The validations are always run when you start the transform, however, with the exception of privilege checks.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### reset_transform [_reset_transform]

Reset a transform. Resets a transform. Before you can reset it, you must stop it; alternatively, use the `force` query parameter. If the destination index was created by the transform, it is deleted.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-reset-transform)

```ts
client.transform.resetTransform({ transform_id })
```


### Arguments [_arguments_467]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform. This identifier can contain lowercase alphanumeric characters (a-z and 0-9), hyphens, and underscores. It has a 64 character limit and must start and end with alphanumeric characters.
    * **`force` (Optional, boolean)**: If this value is `true`, the transform is reset regardless of its current state. If it’s `false`, the transform must be stopped before it can be reset.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### schedule_now_transform [_schedule_now_transform]

Schedule a transform to start now. Instantly runs a transform to process data.

If you _schedule_now a transform, it will process the new data instantly, without waiting for the configured frequency interval. After _schedule_now API is called, the transform will be processed again at now + frequency unless _schedule_now API is called again in the meantime.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-schedule-now-transform)

```ts
client.transform.scheduleNowTransform({ transform_id })
```


### Arguments [_arguments_468]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform.
    * **`timeout` (Optional, string | -1 | 0)**: Controls the time to wait for the scheduling to take place



### start_transform [_start_transform]

Start a transform. Starts a transform.

When you start a transform, it creates the destination index if it does not already exist. The `number_of_shards` is set to `1` and the `auto_expand_replicas` is set to `0-1`. If it is a pivot transform, it deduces the mapping definitions for the destination index from the source indices and the transform aggregations. If fields in the destination index are derived from scripts (as in the case of `scripted_metric` or `bucket_script` aggregations), the transform uses dynamic mappings unless an index template exists. If it is a latest transform, it does not deduce mapping definitions; it uses dynamic mappings. To use explicit mappings, create the destination index before you start the transform. Alternatively, you can create an index template, though it does not affect the deduced mappings in a pivot transform.

When the transform starts, a series of validations occur to ensure its success. If you deferred validation when you created the transform, they occur when you start the transform—​with the exception of privilege checks. When Elasticsearch security features are enabled, the transform remembers which roles the user that created it had at the time of creation and uses those same roles. If those roles do not have the required privileges on the source and destination indices, the transform fails when it attempts unauthorized operations.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-start-transform)

```ts
client.transform.startTransform({ transform_id })
```


### Arguments [_arguments_469]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
    * **`from` (Optional, string)**: Restricts the set of transformed entities to those changed after this time. Relative times like now-30d are supported. Only applicable for continuous transforms.



### stop_transform [_stop_transform]

Stop transforms. Stops one or more transforms.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-stop-transform)

```ts
client.transform.stopTransform({ transform_id })
```


### Arguments [_arguments_470]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform. To stop multiple transforms, use a list or a wildcard expression. To stop all transforms, use `_all` or `*` as the identifier.
    * **`allow_no_match` (Optional, boolean)**: Specifies what to do when the request: contains wildcard expressions and there are no transforms that match; contains the `_all` string or no identifiers and there are no matches; contains wildcard expressions and there are only partial matches.


If it is true, the API returns a successful acknowledgement message when there are no matches. When there are only partial matches, the API stops the appropriate transforms.

If it is false, the request returns a 404 status code when there are no matches or only partial matches. ** *`force` (Optional, boolean)**: If it is true, the API forcefully stops the transforms. *** *`timeout` (Optional, string | -1 | 0)**: Period to wait for a response when `wait_for_completion` is `true`. If no response is received before the timeout expires, the request returns a timeout exception. However, the request continues processing and eventually moves the transform to a STOPPED state. *** *`wait_for_checkpoint` (Optional, boolean)**: If it is true, the transform does not completely stop until the current checkpoint is completed. If it is false, the transform stops as soon as possible. ** *`wait_for_completion` (Optional, boolean)**: If it is true, the API blocks until the indexer state completely stops. If it is false, the API returns immediately and the indexer is stopped asynchronously in the background.


### update_transform [_update_transform]

Update a transform. Updates certain properties of a transform.

All updated properties except `description` do not take effect until after the transform starts the next checkpoint, thus there is data consistency in each checkpoint. To use this API, you must have `read` and `view_index_metadata` privileges for the source indices. You must also have `index` and `read` privileges for the destination index. When Elasticsearch security features are enabled, the transform remembers which roles the user who updated it had at the time of update and runs with those privileges.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-update-transform)

```ts
client.transform.updateTransform({ transform_id })
```


### Arguments [_arguments_471]

* **Request (object):**

    * **`transform_id` (string)**: Identifier for the transform.
    * **`dest` (Optional, { index, op_type, pipeline, routing, version_type })**: The destination for the transform.
    * **`description` (Optional, string)**: Free text description of the transform.
    * **`frequency` (Optional, string | -1 | 0)**: The interval between checks for changes in the source indices when the transform is running continuously. Also determines the retry interval in the event of transient failures while the transform is searching or indexing. The minimum value is 1s and the maximum is 1h.
    * **`_meta` (Optional, Record<string, User-defined value>)**: Defines optional transform metadata.
    * **`source` (Optional, { index, query, remote, size, slice, sort, _source, runtime_mappings })**: The source of the data for the transform.
    * **`settings` (Optional, { align_checkpoints, dates_as_epoch_millis, deduce_mappings, docs_per_second, max_page_search_size, unattended })**: Defines optional transform settings.
    * **`sync` (Optional, { time })**: Defines the properties transforms require to run continuously.
    * **`retention_policy` (Optional, { time } | null)**: Defines a retention policy for the transform. Data that meets the defined criteria is deleted from the destination index.
    * **`defer_validation` (Optional, boolean)**: When true, deferrable validations are not run. This behavior may be desired if the source index does not exist until after the transform is created.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



### upgrade_transforms [_upgrade_transforms]

Upgrade all transforms. Transforms are compatible across minor versions and between supported major versions. However, over time, the format of transform configuration information may change. This API identifies transforms that have a legacy configuration format and upgrades them to the latest version. It also cleans up the internal data structures that store the transform state and checkpoints. The upgrade does not affect the source and destination indices. The upgrade also does not affect the roles that transforms use when Elasticsearch security features are enabled; the role used to read source data and write to the destination index remains unchanged.

If a transform upgrade step fails, the upgrade stops and an error is returned about the underlying issue. Resolve the issue then re-run the process again. A summary is returned when the upgrade is finished.

To ensure continuous transforms remain running during a major version upgrade of the cluster – for example, from 7.16 to 8.0 – it is recommended to upgrade transforms before upgrading the cluster. You may want to perform a recent cluster backup prior to the upgrade.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-transform-upgrade-transforms)

```ts
client.transform.upgradeTransforms({ ... })
```


### Arguments [_arguments_472]

* **Request (object):**

    * **`dry_run` (Optional, boolean)**: When true, the request checks for updates but does not run them.
    * **`timeout` (Optional, string | -1 | 0)**: Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## watcher [_watcher]


### ack_watch [_ack_watch]

Acknowledge a watch. Acknowledging a watch enables you to manually throttle the execution of the watch’s actions.

The acknowledgement state of an action is stored in the `status.actions.<id>.ack.state` structure.

::::{important}
If the specified watch is currently being executed, this API will return an error The reason for this behavior is to prevent overwriting the watch status from a watch execution.
::::


Acknowledging an action throttles further executions of that action until its `ack.state` is reset to `awaits_successful_execution`. This happens when the condition of the watch is not met (the condition evaluates to false).

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-ack-watch)

```ts
client.watcher.ackWatch({ watch_id })
```


### Arguments [_arguments_473]

* **Request (object):**

    * **`watch_id` (string)**: The watch identifier.
    * **`action_id` (Optional, string | string[])**: A list of the action identifiers to acknowledge. If you omit this parameter, all of the actions of the watch are acknowledged.



### activate_watch [_activate_watch]

Activate a watch. A watch can be either active or inactive.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-activate-watch)

```ts
client.watcher.activateWatch({ watch_id })
```


### Arguments [_arguments_474]

* **Request (object):**

    * **`watch_id` (string)**: The watch identifier.



### deactivate_watch [_deactivate_watch]

Deactivate a watch. A watch can be either active or inactive.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-deactivate-watch)

```ts
client.watcher.deactivateWatch({ watch_id })
```


### Arguments [_arguments_475]

* **Request (object):**

    * **`watch_id` (string)**: The watch identifier.



### delete_watch [_delete_watch]

Delete a watch. When the watch is removed, the document representing the watch in the `.watches` index is gone and it will never be run again.

Deleting a watch does not delete any watch execution records related to this watch from the watch history.

::::{important}
Deleting a watch must be done by using only this API. Do not delete the watch directly from the `.watches` index using the Elasticsearch delete document API When Elasticsearch security features are enabled, make sure no write privileges are granted to anyone for the `.watches` index.
::::


[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-delete-watch)

```ts
client.watcher.deleteWatch({ id })
```


### Arguments [_arguments_476]

* **Request (object):**

    * **`id` (string)**: The watch identifier.



### execute_watch [_execute_watch]

Run a watch. This API can be used to force execution of the watch outside of its triggering logic or to simulate the watch execution for debugging purposes.

For testing and debugging purposes, you also have fine-grained control on how the watch runs. You can run the watch without running all of its actions or alternatively by simulating them. You can also force execution by ignoring the watch condition and control whether a watch record would be written to the watch history after it runs.

You can use the run watch API to run watches that are not yet registered by specifying the watch definition inline. This serves as great tool for testing and debugging your watches prior to adding them to Watcher.

When Elasticsearch security features are enabled on your cluster, watches are run with the privileges of the user that stored the watches. If your user is allowed to read index `a`, but not index `b`, then the exact same set of rules will apply during execution of a watch.

When using the run watch API, the authorization data of the user that called the API will be used as a base, instead of the information who stored the watch.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-execute-watch)

```ts
client.watcher.executeWatch({ ... })
```


### Arguments [_arguments_477]

* **Request (object):**

    * **`id` (Optional, string)**: The watch identifier.
    * **`action_modes` (Optional, Record<string, Enum("simulate" | "force_simulate" | "execute" | "force_execute" | "skip")>)**: Determines how to handle the watch actions as part of the watch execution.
    * **`alternative_input` (Optional, Record<string, User-defined value>)**: When present, the watch uses this object as a payload instead of executing its own input.
    * **`ignore_condition` (Optional, boolean)**: When set to `true`, the watch execution uses the always condition. This can also be specified as an HTTP parameter.
    * **`record_execution` (Optional, boolean)**: When set to `true`, the watch record representing the watch execution result is persisted to the `.watcher-history` index for the current time. In addition, the status of the watch is updated, possibly throttling subsequent runs. This can also be specified as an HTTP parameter.
    * **`simulated_actions` (Optional, { actions, all, use_all })**
    * **`trigger_data` (Optional, { scheduled_time, triggered_time })**: This structure is parsed as the data of the trigger event that will be used during the watch execution.
    * **`watch` (Optional, { actions, condition, input, metadata, status, throttle_period, throttle_period_in_millis, transform, trigger })**: When present, this watch is used instead of the one specified in the request. This watch is not persisted to the index and `record_execution` cannot be set.
    * **`debug` (Optional, boolean)**: Defines whether the watch runs in debug mode.



### get_settings [_get_settings_4]

Get Watcher index settings. Get settings for the Watcher internal index (`.watches`). Only a subset of settings are shown, for example `index.auto_expand_replicas` and `index.number_of_replicas`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-get-settings)

```ts
client.watcher.getSettings({ ... })
```


### Arguments [_arguments_478]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.



### get_watch [_get_watch]

Get a watch.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-get-watch)

```ts
client.watcher.getWatch({ id })
```


### Arguments [_arguments_479]

* **Request (object):**

    * **`id` (string)**: The watch identifier.



### put_watch [_put_watch]

Create or update a watch. When a watch is registered, a new document that represents the watch is added to the `.watches` index and its trigger is immediately registered with the relevant trigger engine. Typically for the `schedule` trigger, the scheduler is the trigger engine.

::::{important}
You must use Kibana or this API to create a watch. Do not add a watch directly to the `.watches` index by using the Elasticsearch index API. If Elasticsearch security features are enabled, do not give users write privileges on the `.watches` index.
::::


When you add a watch you can also define its initial active state by setting the **active** parameter.

When Elasticsearch security features are enabled, your watch can index or search only on indices for which the user that stored the watch has privileges. If the user is able to read index `a`, but not index `b`, the same will apply when the watch runs.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-put-watch)

```ts
client.watcher.putWatch({ id })
```


### Arguments [_arguments_480]

* **Request (object):**

    * **`id` (string)**: The identifier for the watch.
    * **`actions` (Optional, Record<string, { add_backing_index, remove_backing_index }>)**: The list of actions that will be run if the condition matches.
    * **`condition` (Optional, { always, array_compare, compare, never, script })**: The condition that defines if the actions should be run.
    * **`input` (Optional, { chain, http, search, simple })**: The input that defines the input that loads the data for the watch.
    * **`metadata` (Optional, Record<string, User-defined value>)**: Metadata JSON that will be copied into the history entries.
    * **`throttle_period` (Optional, string | -1 | 0)**: The minimum time between actions being run. The default is 5 seconds. This default can be changed in the config file with the setting `xpack.watcher.throttle.period.default_period`. If both this value and the `throttle_period_in_millis` parameter are specified, Watcher uses the last parameter included in the request.
    * **`throttle_period_in_millis` (Optional, Unit)**: Minimum time in milliseconds between actions being run. Defaults to 5000. If both this value and the throttle_period parameter are specified, Watcher uses the last parameter included in the request.
    * **`transform` (Optional, { chain, script, search })**: The transform that processes the watch payload to prepare it for the watch actions.
    * **`trigger` (Optional, { schedule })**: The trigger that defines when the watch should run.
    * **`active` (Optional, boolean)**: The initial state of the watch. The default value is `true`, which means the watch is active by default.
    * **`if_primary_term` (Optional, number)**: only update the watch if the last operation that has changed the watch has the specified primary term
    * **`if_seq_no` (Optional, number)**: only update the watch if the last operation that has changed the watch has the specified sequence number
    * **`version` (Optional, number)**: Explicit version number for concurrency control



### query_watches [_query_watches]

Query watches. Get all registered watches in a paginated manner and optionally filter watches by a query.

Note that only the `_id` and `metadata.*` fields are queryable or sortable.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-query-watches)

```ts
client.watcher.queryWatches({ ... })
```


### Arguments [_arguments_481]

* **Request (object):**

    * **`from` (Optional, number)**: The offset from the first result to fetch. It must be non-negative.
    * **`size` (Optional, number)**: The number of hits to return. It must be non-negative.
    * **`query` (Optional, { bool, boosting, common, combined_fields, constant_score, dis_max, distance_feature, exists, function_score, fuzzy, geo_bounding_box, geo_distance, geo_polygon, geo_shape, has_child, has_parent, ids, intervals, knn, match, match_all, match_bool_prefix, match_none, match_phrase, match_phrase_prefix, more_like_this, multi_match, nested, parent_id, percolate, pinned, prefix, query_string, range, rank_feature, regexp, rule, script, script_score, semantic, shape, simple_query_string, span_containing, span_field_masking, span_first, span_multi, span_near, span_not, span_or, span_term, span_within, sparse_vector, term, terms, terms_set, text_expansion, weighted_tokens, wildcard, wrapper, type })**: A query that filters the watches to be returned.
    * **`sort` (Optional, string | { _score, _doc, _geo_distance, _script } | string | { _score, _doc, _geo_distance, _script }[])**: One or more fields used to sort the search results.
    * **`search_after` (Optional, number | number | string | boolean | null | User-defined value[])**: Retrieve the next page of hits using a set of sort values from the previous page.



### start [_start_3]

Start the watch service. Start the Watcher service if it is not already running.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-start)

```ts
client.watcher.start({ ... })
```


### Arguments [_arguments_482]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: Period to wait for a connection to the master node.



### stats [_stats_7]

Get Watcher statistics. This API always returns basic metrics. You retrieve more metrics by using the metric parameter.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-stats)

```ts
client.watcher.stats({ ... })
```


### Arguments [_arguments_483]

* **Request (object):**

    * **`metric` (Optional, Enum("_all" | "queued_watches" | "current_watches" | "pending_watches") | Enum("_all" | "queued_watches" | "current_watches" | "pending_watches")[])**: Defines which additional metrics are included in the response.
    * **`emit_stacktraces` (Optional, boolean)**: Defines whether stack traces are generated for each watch that is running.



### stop [_stop_3]

Stop the watch service. Stop the Watcher service if it is running.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-stop)

```ts
client.watcher.stop({ ... })
```


### Arguments [_arguments_484]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for the master node. If the master node is not available before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.



### update_settings [_update_settings_2]

Update Watcher index settings. Update settings for the Watcher internal index (`.watches`). Only a subset of settings can be modified. This includes `index.auto_expand_replicas` and `index.number_of_replicas`.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-watcher-update-settings)

```ts
client.watcher.updateSettings({ ... })
```


### Arguments [_arguments_485]

* **Request (object):**

    * **`index.auto_expand_replicas` (Optional, string)**
    * **`index.number_of_replicas` (Optional, number)**
    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
    * **`timeout` (Optional, string | -1 | 0)**: The period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.



## xpack [_xpack]


### info [_info_5]

Get information. The information provided by the API includes:

* Build information including the build number and timestamp.
* License information about the currently installed license.
* Feature information for the features that are currently enabled and available under the current license.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-info)

```ts
client.xpack.info({ ... })
```


### Arguments [_arguments_486]

* **Request (object):**

    * **`categories` (Optional, Enum("build" | "features" | "license")[])**: A list of the information categories to include in the response. For example, `build,license,features`.
    * **`accept_enterprise` (Optional, boolean)**: If this param is used it must be set to true
    * **`human` (Optional, boolean)**: Defines whether additional human-readable information is included in the response. In particular, it adds descriptions and a tag line.



### usage [_usage_2]

Get usage information. Get information about the features that are currently enabled and available under the current license. The API also provides some usage statistics.

[Endpoint documentation](https://www.elastic.co/docs/api/doc/elasticsearch/group/endpoint-xpack)

```ts
client.xpack.usage({ ... })
```


### Arguments [_arguments_487]

* **Request (object):**

    * **`master_timeout` (Optional, string | -1 | 0)**: The period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. To indicate that the request should never timeout, set it to `-1`.
