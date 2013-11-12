# API

## Table Of Contents

 - [Generic Params](#generic-params)
 - [Methods](#methods)
    - [bulk](#bulk)
    - [clearScroll](#clearscroll)
    - [cluster.getSettings](#clustergetsettings)
    - [cluster.health](#clusterhealth)
    - [cluster.nodeHotThreads](#clusternodehotthreads)
    - [cluster.nodeInfo](#clusternodeinfo)
    - [cluster.nodeShutdown](#clusternodeshutdown)
    - [cluster.nodeStats](#clusternodestats)
    - [cluster.putSettings](#clusterputsettings)
    - [cluster.reroute](#clusterreroute)
    - [cluster.state](#clusterstate)
    - [count](#count)
    - [create](#create)
    - [delete](#delete)
    - [deleteByQuery](#deletebyquery)
    - [exists](#exists)
    - [explain](#explain)
    - [get](#get)
    - [getSource](#getsource)
    - [index](#index)
    - [indices.analyze](#indicesanalyze)
    - [indices.clearCache](#indicesclearcache)
    - [indices.close](#indicesclose)
    - [indices.create](#indicescreate)
    - [indices.delete](#indicesdelete)
    - [indices.deleteAlias](#indicesdeletealias)
    - [indices.deleteMapping](#indicesdeletemapping)
    - [indices.deleteTemplate](#indicesdeletetemplate)
    - [indices.deleteWarmer](#indicesdeletewarmer)
    - [indices.exists](#indicesexists)
    - [indices.existsAlias](#indicesexistsalias)
    - [indices.existsType](#indicesexiststype)
    - [indices.flush](#indicesflush)
    - [indices.getAlias](#indicesgetalias)
    - [indices.getAliases](#indicesgetaliases)
    - [indices.getFieldMapping](#indicesgetfieldmapping)
    - [indices.getMapping](#indicesgetmapping)
    - [indices.getSettings](#indicesgetsettings)
    - [indices.getTemplate](#indicesgettemplate)
    - [indices.getWarmer](#indicesgetwarmer)
    - [indices.open](#indicesopen)
    - [indices.optimize](#indicesoptimize)
    - [indices.putAlias](#indicesputalias)
    - [indices.putMapping](#indicesputmapping)
    - [indices.putSettings](#indicesputsettings)
    - [indices.putTemplate](#indicesputtemplate)
    - [indices.putWarmer](#indicesputwarmer)
    - [indices.refresh](#indicesrefresh)
    - [indices.segments](#indicessegments)
    - [indices.snapshotIndex](#indicessnapshotindex)
    - [indices.stats](#indicesstats)
    - [indices.status](#indicesstatus)
    - [indices.updateAliases](#indicesupdatealiases)
    - [indices.validateQuery](#indicesvalidatequery)
    - [info](#info)
    - [mget](#mget)
    - [mlt](#mlt)
    - [msearch](#msearch)
    - [percolate](#percolate)
    - [scroll](#scroll)
    - [search](#search)
    - [suggest](#suggest)
    - [update](#update)

## Generic Params

Several parameters can be passed to any API method, and will control the way that those requests are carried out. These parameters are not listed in each method's param list.

| Name | Type | Description |
| ---- | ---- | ----------- |
| `[timeout=10000]` | Number | The number of milliseconds this request has to complete. It defaults to the timeout specified at the client level, which defaults to 10 seconds. |
| `ignore` | Number or Number[] | Don't treat these HTTP status codes as "errors". Example use cases could be `ignore: 404` or `ignore: [404]` |

## Methods

### bulk()

http://elasticsearch.org/guide/reference/api/bulk/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`consistency` | String | Explicit write consistency setting for the operation|
|`refresh` | Boolean | Refresh the index after performing the operation|
|`[replication=sync]` | String | Explicitely set the replication type|
|`type` | String | Default document type for items which don't provide one|
|`index` | String | Default index for items which don't provide one|


### clearScroll()

http://www.elasticsearch.org/guide/reference/api/search/scroll/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`scrollId` | String or String[] or Boolean | A comma-separated list of scroll IDs to clear|


### cluster.getSettings()

http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/

-- none --


### cluster.health()

http://elasticsearch.org/guide/reference/api/admin-cluster-health/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[level=cluster]` | String | Specify the level of detail for returned information|
|`local` | Boolean | Return local information, do not retrieve the state from master node (default: false)|
|`masterTimeout` | Date or Number | Explicit operation timeout for connection to master node|
|`timeout` | Date or Number | Explicit operation timeout|
|`waitForActiveShards` | Number | Wait until the specified number of shards is active|
|`waitForNodes` | String | Wait until the specified number of nodes is available|
|`waitForRelocatingShards` | Number | Wait until the specified number of relocating shards is finished|
|`waitForStatus` | String | Wait until cluster is in a specific state|
|`index` | String | Limit the information returned to a specific index|


### cluster.nodeHotThreads()

http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-hot-threads/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`interval` | Date or Number | The interval for the second sampling of threads|
|`snapshots` | Number | Number of samples of thread stacktrace (default: 10)|
|`threads` | Number | Specify the number of threads to provide information for (default: 3)|
|`type` | String | The type to sample (default: cpu)|
|`nodeId` | String or String[] or Boolean | A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes|


### cluster.nodeInfo()

http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-info/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`all` | Boolean | Return all available information|
|`clear` | Boolean | Reset the default settings|
|`http` | Boolean | Return information about HTTP|
|`jvm` | Boolean | Return information about the JVM|
|`network` | Boolean | Return information about network|
|`os` | Boolean | Return information about the operating system|
|`plugin` | Boolean | Return information about plugins|
|`process` | Boolean | Return information about the Elasticsearch process|
|`settings` | Boolean | Return information about node settings|
|`threadPool` | Boolean | Return information about the thread pool|
|`timeout` | Date or Number | Explicit operation timeout|
|`transport` | Boolean | Return information about transport|
|`nodeId` | String or String[] or Boolean | A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes|


### cluster.nodeShutdown()

http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-shutdown/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`delay` | Date or Number | Set the delay for the operation (default: 1s)|
|`exit` | Boolean | Exit the JVM as well (default: true)|
|`nodeId` | String or String[] or Boolean | A comma-separated list of node IDs or names to perform the operation on; use `_local` to perform the operation on the node you're connected to, leave empty to perform the operation on all nodes|


### cluster.nodeStats()

http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-stats/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`all` | Boolean | Return all available information|
|`clear` | Boolean | Reset the default level of detail|
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return detailed information for, when returning the `indices` metric family (supports wildcards)|
|`fs` | Boolean | Return information about the filesystem|
|`http` | Boolean | Return information about HTTP|
|`indices` | Boolean | Return information about indices|
|`jvm` | Boolean | Return information about the JVM|
|`network` | Boolean | Return information about network|
|`os` | Boolean | Return information about the operating system|
|`process` | Boolean | Return information about the Elasticsearch process|
|`threadPool` | Boolean | Return information about the thread pool|
|`transport` | Boolean | Return information about transport|
|`metricFamily` | String | Limit the information returned to a certain metric family|
|`metric` | String | Limit the information returned for `indices` family to a specific metric|
|`nodeId` | String or String[] or Boolean | A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes|


### cluster.putSettings()

http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/

-- none --


### cluster.reroute()

http://elasticsearch.org/guide/reference/api/admin-cluster-reroute/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`dryRun` | Boolean | Simulate the operation only and return the resulting state|
|`filterMetadata` | Boolean | Don't return cluster state metadata (default: false)|


### cluster.state()

http://elasticsearch.org/guide/reference/api/admin-cluster-state/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`filterBlocks` | Boolean | Do not return information about blocks|
|`filterIndexTemplates` | Boolean | Do not return information about index templates|
|`filterIndices` | String or String[] or Boolean | Limit returned metadata information to specific indices|
|`filterMetadata` | Boolean | Do not return information about indices metadata|
|`filterNodes` | Boolean | Do not return information about nodes|
|`filterRoutingTable` | Boolean | Do not return information about shard allocation (`routing_table` and `routing_nodes`)|
|`local` | Boolean | Return local information, do not retrieve the state from master node (default: false)|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|


### count()

http://elasticsearch.org/guide/reference/api/count/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`minScore` | Number | Include only documents with a specific `_score` value in the result|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`routing` | String | Specific routing value|
|`source` | String | The URL-encoded query definition (instead of using the request body)|
|`index` | String or String[] or Boolean | A comma-separated list of indices to restrict the results|
|`type` | String or String[] or Boolean | A comma-separated list of types to restrict the results|


### create()

http://elasticsearch.org/guide/reference/api/index_/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`consistency` | String | Explicit write consistency setting for the operation|
|`id` | String | Document ID|
|`parent` | String | ID of the parent document|
|`percolate` | String | Percolator queries to execute while indexing the document|
|`refresh` | Boolean | Refresh the index after performing the operation|
|`[replication=sync]` | String | Specific replication type|
|`routing` | String | Specific routing value|
|`timeout` | Date or Number | Explicit operation timeout|
|`timestamp` | Date or Number | Explicit timestamp for the document|
|`ttl` | Duration | Expiration time for the document|
|`version` | Number | Explicit version number for concurrency control|
|`versionType` | String | Specific version type|
|`index` | String | The name of the index|
|`type` | String | The type of the document|


### delete()

http://elasticsearch.org/guide/reference/api/delete/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`consistency` | String | Specific write consistency setting for the operation|
|`parent` | String | ID of parent document|
|`refresh` | Boolean | Refresh the index after performing the operation|
|`[replication=sync]` | String | Specific replication type|
|`routing` | String | Specific routing value|
|`timeout` | Date or Number | Explicit operation timeout|
|`version` | Number | Explicit version number for concurrency control|
|`versionType` | String | Specific version type|
|`id` | String | The document ID|
|`index` | String | The name of the index|
|`type` | String | The type of the document|


### deleteByQuery()

http://www.elasticsearch.org/guide/reference/api/delete-by-query/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`analyzer` | String | The analyzer to use for the query string|
|`consistency` | String | Specific write consistency setting for the operation|
|`[defaultOperator=OR]` | String | The default operator for query string query (AND or OR)|
|`df` | String | The field to use as default where no field prefix is given in the query string|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`[replication=sync]` | String | Specific replication type|
|`q` | String | Query in the Lucene query string syntax|
|`routing` | String | Specific routing value|
|`source` | String | The URL-encoded query definition (instead of using the request body)|
|`timeout` | Date or Number | Explicit operation timeout|
|`index` | String or String[] or Boolean | A comma-separated list of indices to restrict the operation; use `_all` to perform the operation on all indices|
|`type` | String or String[] or Boolean | A comma-separated list of types to restrict the operation|


### exists()

http://elasticsearch.org/guide/reference/api/get/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`parent` | String | The ID of the parent document|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`realtime` | Boolean | Specify whether to perform the operation in realtime or search mode|
|`refresh` | Boolean | Refresh the shard containing the document before performing the operation|
|`routing` | String | Specific routing value|
|`id` | String | The document ID|
|`index` | String | The name of the index|
|`[type=_all]` | String | The type of the document (use `_all` to fetch the first document matching the ID across all types)|


### explain()

http://elasticsearch.org/guide/reference/api/explain/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`analyzeWildcard` | Boolean | Specify whether wildcards and prefix queries in the query string query should be analyzed (default: false)|
|`analyzer` | String | The analyzer for the query string query|
|`[defaultOperator=OR]` | String | The default operator for query string query (AND or OR)|
|`df` | String | The default field for query string query (default: _all)|
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return in the response|
|`lenient` | Boolean | Specify whether format-based query failures (such as providing text to a numeric field) should be ignored|
|`lowercaseExpandedTerms` | Boolean | Specify whether query terms should be lowercased|
|`parent` | String | The ID of the parent document|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`q` | String | Query in the Lucene query string syntax|
|`routing` | String | Specific routing value|
|`source` | String or String[] or Boolean | True or false to return the _source field or not, or a list of fields to return|
|`sourceExclude` | String or String[] or Boolean | A list of fields to exclude from the returned _source field|
|`sourceInclude` | String or String[] or Boolean | A list of fields to extract and return from the _source field|
|`id` | String | The document ID|
|`index` | String | The name of the index|
|`type` | String | The type of the document|


### get()

http://elasticsearch.org/guide/reference/api/get/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return in the response|
|`parent` | String | The ID of the parent document|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`realtime` | Boolean | Specify whether to perform the operation in realtime or search mode|
|`refresh` | Boolean | Refresh the shard containing the document before performing the operation|
|`routing` | String | Specific routing value|
|`source` | String or String[] or Boolean | True or false to return the _source field or not, or a list of fields to return|
|`sourceExclude` | String or String[] or Boolean | A list of fields to exclude from the returned _source field|
|`sourceInclude` | String or String[] or Boolean | A list of fields to extract and return from the _source field|
|`id` | String | The document ID|
|`index` | String | The name of the index|
|`[type=_all]` | String | The type of the document (use `_all` to fetch the first document matching the ID across all types)|


### getSource()

http://elasticsearch.org/guide/reference/api/get/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`exclude` | String or String[] or Boolean | A list of fields to exclude from the returned _source field|
|`include` | String or String[] or Boolean | A list of fields to extract and return from the _source field|
|`parent` | String | The ID of the parent document|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`realtime` | Boolean | Specify whether to perform the operation in realtime or search mode|
|`refresh` | Boolean | Refresh the shard containing the document before performing the operation|
|`routing` | String | Specific routing value|
|`id` | String | The document ID|
|`index` | String | The name of the index|
|`[type=_all]` | String | The type of the document; use `_all` to fetch the first document matching the ID across all types|


### index()

http://elasticsearch.org/guide/reference/api/index_/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`consistency` | String | Explicit write consistency setting for the operation|
|`[opType=index]` | String | Explicit operation type|
|`parent` | String | ID of the parent document|
|`percolate` | String | Percolator queries to execute while indexing the document|
|`refresh` | Boolean | Refresh the index after performing the operation|
|`[replication=sync]` | String | Specific replication type|
|`routing` | String | Specific routing value|
|`timeout` | Date or Number | Explicit operation timeout|
|`timestamp` | Date or Number | Explicit timestamp for the document|
|`ttl` | Duration | Expiration time for the document|
|`version` | Number | Explicit version number for concurrency control|
|`versionType` | String | Specific version type|
|`id` | String | Document ID|
|`index` | String | The name of the index|
|`type` | String | The type of the document|


### indices.analyze()

http://www.elasticsearch.org/guide/reference/api/admin-indices-analyze/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`analyzer` | String | The name of the analyzer to use|
|`field` | String | Use the analyzer configured for this field (instead of passing the analyzer name)|
|`filters` | String or String[] or Boolean | A comma-separated list of filters to use for the analysis|
|`index` | String | The name of the index to scope the operation|
|`preferLocal` | Boolean | With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)|
|`text` | String | The text on which the analysis should be performed (when request body is not used)|
|`tokenizer` | String | The name of the tokenizer to use for the analysis|
|`[format=detailed]` | String | Format of the output|


### indices.clearCache()

http://www.elasticsearch.org/guide/reference/api/admin-indices-clearcache/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`fieldData` | Boolean | Clear field data|
|`fielddata` | Boolean | Clear field data|
|`fields` | String or String[] or Boolean | A comma-separated list of fields to clear when using the `field_data` parameter (default: all)|
|`filter` | Boolean | Clear filter caches|
|`filterCache` | Boolean | Clear filter caches|
|`filterKeys` | Boolean | A comma-separated list of keys to clear when using the `filter_cache` parameter (default: all)|
|`id` | Boolean | Clear ID caches for parent/child|
|`idCache` | Boolean | Clear ID caches for parent/child|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`index` | String or String[] or Boolean | A comma-separated list of index name to limit the operation|
|`recycler` | Boolean | Clear the recycler cache|


### indices.close()

http://www.elasticsearch.org/guide/reference/api/admin-indices-open-close/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String | The name of the index|


### indices.create()

http://www.elasticsearch.org/guide/reference/api/admin-indices-create-index/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String | The name of the index|


### indices.delete()

http://www.elasticsearch.org/guide/reference/api/admin-indices-delete-index/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of indices to delete; use `_all` or empty string to delete all indices|


### indices.deleteAlias()

http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit timestamp for the document|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String | The name of the index with an alias|
|`name` | String | The name of the alias to be deleted|


### indices.deleteMapping()

http://www.elasticsearch.org/guide/reference/api/admin-indices-delete-mapping/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` for all indices|
|`type` | String | The name of the document type to delete|


### indices.deleteTemplate()

http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`name` | String | The name of the template|


### indices.deleteWarmer()

http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of index names to register warmer for; use `_all` or empty string to perform the operation on all indices|
|`name` | String | The name of the warmer (supports wildcards); leave empty to delete all warmers|
|`type` | String or String[] or Boolean | A comma-separated list of document types to register warmer for; use `_all` or empty string to perform the operation on all types|


### indices.exists()

http://www.elasticsearch.org/guide/reference/api/admin-indices-indices-exists/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`index` | String or String[] or Boolean | A comma-separated list of indices to check|


### indices.existsAlias()

http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`index` | String or String[] or Boolean | A comma-separated list of index names to filter aliases|
|`name` | String or String[] or Boolean | A comma-separated list of alias names to return|


### indices.existsType()

http://www.elasticsearch.org/guide/reference/api/admin-indices-types-exists/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` to check the types across all indices|
|`type` | String or String[] or Boolean | A comma-separated list of document types to check|


### indices.flush()

http://www.elasticsearch.org/guide/reference/api/admin-indices-flush/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`force` | Boolean | TODO: ?|
|`full` | Boolean | TODO: ?|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`refresh` | Boolean | Refresh the index after performing the operation|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string for all indices|


### indices.getAlias()

http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`index` | String or String[] or Boolean | A comma-separated list of index names to filter aliases|
|`name` | String or String[] or Boolean | A comma-separated list of alias names to return|


### indices.getAliases()

http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit operation timeout|
|`index` | String or String[] or Boolean | A comma-separated list of index names to filter aliases|


### indices.getFieldMapping()

http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/indices-get-field-mapping.html

| Name | Type | Description |
| ---- | ---- | ----------- |
|`includeDefaults` | Boolean | Whether the default mapping values should be returned as well|
|`index` | String or String[] or Boolean | A comma-separated list of index names|
|`type` | String or String[] or Boolean | A comma-separated list of document types|
|`field` | String or String[] or Boolean | A comma-separated list of fields|


### indices.getMapping()

http://www.elasticsearch.org/guide/reference/api/admin-indices-get-mapping/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`index` | String or String[] or Boolean | A comma-separated list of index names|
|`type` | String or String[] or Boolean | A comma-separated list of document types|


### indices.getSettings()

http://www.elasticsearch.org/guide/reference/api/admin-indices-get-settings/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|


### indices.getTemplate()

http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`name` | String | The name of the template|


### indices.getWarmer()

http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`index` | String or String[] or Boolean | A comma-separated list of index names to restrict the operation; use `_all` to perform the operation on all indices|
|`name` | String | The name of the warmer (supports wildcards); leave empty to get all warmers|
|`type` | String or String[] or Boolean | A comma-separated list of document types to restrict the operation; leave empty to perform the operation on all types|


### indices.open()

http://www.elasticsearch.org/guide/reference/api/admin-indices-open-close/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String | The name of the index|


### indices.optimize()

http://www.elasticsearch.org/guide/reference/api/admin-indices-optimize/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`flush` | Boolean | Specify whether the index should be flushed after performing the operation (default: true)|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`maxNumSegments` | Number | The number of segments the index should be merged into (default: dynamic)|
|`onlyExpungeDeletes` | Boolean | Specify whether the operation should only expunge deleted documents|
|`operationThreading` | * | TODO: ?|
|`refresh` | Boolean | Specify whether the index should be refreshed after performing the operation (default: true)|
|`waitForMerge` | Boolean | Specify whether the request should block until the merge process is finished (default: true)|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|


### indices.putAlias()

http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Explicit timestamp for the document|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String | The name of the index with an alias|
|`name` | String | The name of the alias to be created or updated|


### indices.putMapping()

http://www.elasticsearch.org/guide/reference/api/admin-indices-put-mapping/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`ignoreConflicts` | Boolean | Specify whether to ignore conflicts while updating the mapping (default: false)|
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` to perform the operation on all indices|
|`type` | String | The name of the document type|


### indices.putSettings()

http://www.elasticsearch.org/guide/reference/api/admin-indices-update-settings/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|


### indices.putTemplate()

http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`order` | Number | The order for this template when merging multiple matching ones (higher numbers are merged later, overriding the lower numbers)|
|`timeout` | Date or Number | Explicit operation timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`name` | String | The name of the template|


### indices.putWarmer()

http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of index names to register the warmer for; use `_all` or empty string to perform the operation on all indices|
|`name` | String | The name of the warmer|
|`type` | String or String[] or Boolean | A comma-separated list of document types to register the warmer for; leave empty to perform the operation on all types|


### indices.refresh()

http://www.elasticsearch.org/guide/reference/api/admin-indices-refresh/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`operationThreading` | * | TODO: ?|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|


### indices.segments()

http://elasticsearch.org/guide/reference/api/admin-indices-segments/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`operationThreading` | * | TODO: ?|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|


### indices.snapshotIndex()

http://www.elasticsearch.org/guide/reference/api/admin-indices-gateway-snapshot/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string for all indices|


### indices.stats()

http://elasticsearch.org/guide/reference/api/admin-indices-stats/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`all` | Boolean | Return all available information|
|`clear` | Boolean | Reset the default level of detail|
|`completion` | Boolean | Return information about completion suggester stats|
|`completionFields` | String or String[] or Boolean | A comma-separated list of fields for `completion` metric (supports wildcards)|
|`docs` | Boolean | Return information about indexed and deleted documents|
|`fielddata` | Boolean | Return information about field data|
|`fielddataFields` | String or String[] or Boolean | A comma-separated list of fields for `fielddata` metric (supports wildcards)|
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return detailed information for, when returning the `search` statistics|
|`filterCache` | Boolean | Return information about filter cache|
|`flush` | Boolean | Return information about flush operations|
|`get` | Boolean | Return information about get operations|
|`groups` | Boolean | A comma-separated list of search groups for `search` statistics|
|`idCache` | Boolean | Return information about ID cache|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`indexing` | Boolean | Return information about indexing operations|
|`merge` | Boolean | Return information about merge operations|
|`refresh` | Boolean | Return information about refresh operations|
|`search` | Boolean | Return information about search operations; use the `groups` parameter to include information for specific search groups|
|`store` | Boolean | Return information about the size of the index|
|`warmer` | Boolean | Return information about warmers|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|
|`indexingTypes` | String or String[] or Boolean | A comma-separated list of document types to include in the `indexing` statistics|
|`metricFamily` | String | Limit the information returned to a specific metric|
|`searchGroups` | String or String[] or Boolean | A comma-separated list of search groups to include in the `search` statistics|


### indices.status()

http://elasticsearch.org/guide/reference/api/admin-indices-status/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`operationThreading` | * | TODO: ?|
|`recovery` | Boolean | Return information about shard recovery|
|`snapshot` | Boolean | TODO: ?|
|`index` | String or String[] or Boolean | A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices|


### indices.updateAliases()

http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`timeout` | Date or Number | Request timeout|
|`masterTimeout` | Date or Number | Specify timeout for connection to master|
|`index` | String or String[] or Boolean | A comma-separated list of index names to filter aliases|


### indices.validateQuery()

http://www.elasticsearch.org/guide/reference/api/validate/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`explain` | Boolean | Return detailed information about the error|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`operationThreading` | * | TODO: ?|
|`source` | String | The URL-encoded query definition (instead of using the request body)|
|`q` | String | Query in the Lucene query string syntax|
|`index` | String or String[] or Boolean | A comma-separated list of index names to restrict the operation; use `_all` or empty string to perform the operation on all indices|
|`type` | String or String[] or Boolean | A comma-separated list of document types to restrict the operation; leave empty to perform the operation on all types|


### info()

http://elasticsearch.org/guide/

-- none --


### mget()

http://elasticsearch.org/guide/reference/api/multi-get/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return in the response|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`realtime` | Boolean | Specify whether to perform the operation in realtime or search mode|
|`refresh` | Boolean | Refresh the shard containing the document before performing the operation|
|`source` | String or String[] or Boolean | True or false to return the _source field or not, or a list of fields to return|
|`sourceExclude` | String or String[] or Boolean | A list of fields to exclude from the returned _source field|
|`sourceInclude` | String or String[] or Boolean | A list of fields to extract and return from the _source field|
|`index` | String | The name of the index|
|`type` | String | The type of the document|


### mlt()

http://elasticsearch.org/guide/reference/api/more-like-this/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`boostTerms` | Number | The boost factor|
|`maxDocFreq` | Number | The word occurrence frequency as count: words with higher occurrence in the corpus will be ignored|
|`maxQueryTerms` | Number | The maximum query terms to be included in the generated query|
|`maxWordLen` | Number | The minimum length of the word: longer words will be ignored|
|`minDocFreq` | Number | The word occurrence frequency as count: words with lower occurrence in the corpus will be ignored|
|`minTermFreq` | Number | The term frequency as percent: terms with lower occurence in the source document will be ignored|
|`minWordLen` | Number | The minimum length of the word: shorter words will be ignored|
|`mltFields` | String or String[] or Boolean | Specific fields to perform the query against|
|`percentTermsToMatch` | Number | How many terms have to match in order to consider the document a match (default: 0.3)|
|`routing` | String | Specific routing value|
|`searchFrom` | Number | The offset from which to return results|
|`searchIndices` | String or String[] or Boolean | A comma-separated list of indices to perform the query against (default: the index containing the document)|
|`searchQueryHint` | String | The search query hint|
|`searchScroll` | String | A scroll search request definition|
|`searchSize` | Number | The number of documents to return (default: 10)|
|`searchSource` | String | A specific search request definition (instead of using the request body)|
|`searchType` | String | Specific search type (eg. `dfs_then_fetch`, `count`, etc)|
|`searchTypes` | String or String[] or Boolean | A comma-separated list of types to perform the query against (default: the same type as the document)|
|`stopWords` | String or String[] or Boolean | A list of stop words to be ignored|
|`id` | String | The document ID|
|`index` | String | The name of the index|
|`type` | String | The type of the document (use `_all` to fetch the first document matching the ID across all types)|


### msearch()

http://www.elasticsearch.org/guide/reference/api/multi-search/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`searchType` | String | Search operation type|
|`index` | String or String[] or Boolean | A comma-separated list of index names to use as default|
|`type` | String or String[] or Boolean | A comma-separated list of document types to use as default|


### percolate()

http://elasticsearch.org/guide/reference/api/percolate/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`preferLocal` | Boolean | With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)|
|`index` | String | The name of the index with a registered percolator query|
|`type` | String | The document type|


### scroll()

http://www.elasticsearch.org/guide/reference/api/search/scroll/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`scroll` | Duration | Specify how long a consistent view of the index should be maintained for scrolled search|
|`scrollId` | String | The scroll ID|


### search()

http://www.elasticsearch.org/guide/reference/api/search/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`analyzer` | String | The analyzer to use for the query string|
|`analyzeWildcard` | Boolean | Specify whether wildcard and prefix queries should be analyzed (default: false)|
|`[defaultOperator=OR]` | String | The default operator for query string query (AND or OR)|
|`df` | String | The field to use as default where no field prefix is given in the query string|
|`explain` | Boolean | Specify whether to return detailed information about score computation as part of a hit|
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return as part of a hit|
|`from` | Number | Starting offset (default: 0)|
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`indicesBoost` | String or String[] or Boolean | Comma-separated list of index boosts|
|`lenient` | Boolean | Specify whether format-based query failures (such as providing text to a numeric field) should be ignored|
|`lowercaseExpandedTerms` | Boolean | Specify whether query terms should be lowercased|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`q` | String | Query in the Lucene query string syntax|
|`routing` | String or String[] or Boolean | A comma-separated list of specific routing values|
|`scroll` | Duration | Specify how long a consistent view of the index should be maintained for scrolled search|
|`searchType` | String | Search operation type|
|`size` | Number | Number of hits to return (default: 10)|
|`sort` | String or String[] or Boolean | A comma-separated list of <field>:<direction> pairs|
|`source` | String or String[] or Boolean | True or false to return the _source field or not, or a list of fields to return|
|`sourceExclude` | String or String[] or Boolean | A list of fields to exclude from the returned _source field|
|`sourceInclude` | String or String[] or Boolean | A list of fields to extract and return from the _source field|
|`stats` | String or String[] or Boolean | Specific 'tag' of the request for logging and statistical purposes|
|`suggestField` | String | Specify which field to use for suggestions|
|`[suggestMode=missing]` | String | Specify suggest mode|
|`suggestSize` | Number | How many suggestions to return in response|
|`suggestText` | Text | The source text for which the suggestions should be returned|
|`timeout` | Date or Number | Explicit operation timeout|
|`version` | Boolean | Specify whether to return document version as part of a hit|
|`[index=_all]` | String or String[] or Boolean | A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices|
|`type` | String or String[] or Boolean | A comma-separated list of document types to search; leave empty to perform the operation on all types|


### suggest()

http://elasticsearch.org/guide/reference/api/search/suggest/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`[ignoreIndices=none]` | String | When performed on multiple indices, allows to ignore `missing` ones|
|`preference` | String | Specify the node or shard the operation should be performed on (default: random)|
|`routing` | String | Specific routing value|
|`source` | String | The URL-encoded request definition (instead of using request body)|
|`index` | String or String[] or Boolean | A comma-separated list of index names to restrict the operation; use `_all` or empty string to perform the operation on all indices|


### update()

http://elasticsearch.org/guide/reference/api/update/

| Name | Type | Description |
| ---- | ---- | ----------- |
|`consistency` | String | Explicit write consistency setting for the operation|
|`fields` | String or String[] or Boolean | A comma-separated list of fields to return in the response|
|`lang` | String | The script language (default: mvel)|
|`parent` | String | ID of the parent document|
|`percolate` | String | Perform percolation during the operation; use specific registered query name, attribute, or wildcard|
|`refresh` | Boolean | Refresh the index after performing the operation|
|`[replication=sync]` | String | Specific replication type|
|`retryOnConflict` | Number | Specify how many times should the operation be retried when a conflict occurs (default: 0)|
|`routing` | String | Specific routing value|
|`script` | * | The URL-encoded script definition (instead of using request body)|
|`timeout` | Date or Number | Explicit operation timeout|
|`timestamp` | Date or Number | Explicit timestamp for the document|
|`ttl` | Duration | Expiration time for the document|
|`version` | Number | Explicit version number for concurrency control|
|`versionType` | String | Specific version type|
|`id` | String | Document ID|
|`index` | String | The name of the index|
|`type` | String | The type of the document|

