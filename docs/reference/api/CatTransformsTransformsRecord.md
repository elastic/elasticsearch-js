## Interface `CatTransformsTransformsRecord`

| Name | Type | Description |
| - | - | - |
| `c` | string | The sequence number for the checkpoint. checkpoint |
| `cdtea` | string | The exponential moving average of the duration of the checkpoint, in milliseconds. checkpoint_duration_time_exp_avg |
| `changes_last_detection_time` | string | null | The timestamp when changes were last detected in the source indices. |
| `checkpoint_duration_time_exp_avg` | string | The exponential moving average of the duration of the checkpoint, in milliseconds. |
| `checkpoint_progress` | string | null | The progress of the next checkpoint that is currently in progress. |
| `checkpoint` | string | The sequence number for the checkpoint. |
| `checkpointProgress` | string | null | The progress of the next checkpoint that is currently in progress. checkpoint_progress |
| `checkpointTimeExpAvg` | string | The exponential moving average of the duration of the checkpoint, in milliseconds. checkpoint_duration_time_exp_avg |
| `cldt` | string | null | The timestamp when changes were last detected in the source indices. changes_last_detection_time |
| `cp` | string | null | The progress of the next checkpoint that is currently in progress. checkpoint_progress |
| `create_time` | string | The time the transform was created. |
| `createTime` | string | The time the transform was created. create_time |
| `ct` | string | The time the transform was created. create_time |
| `d` | string | The description of the transform. description |
| `delete_time` | string | The total time spent deleting documents, in milliseconds. |
| `description` | string | The description of the transform. |
| `dest_index` | string | The destination index for the transform. |
| `destIndex` | string | The destination index for the transform. dest_index |
| `di` | string | The destination index for the transform. dest_index |
| `docd` | string | The number of documents deleted from the destination index due to the retention policy for the transform. documents_deleted |
| `doci` | string | The number of documents that have been indexed into the destination index for the transform. documents_indexed |
| `docp` | string | The number of documents that have been processed from the source index of the transform. documents_processed |
| `docs_per_second` | string | The number of input documents per second. |
| `documents_deleted` | string | The number of documents deleted from the destination index due to the retention policy for the transform. |
| `documents_indexed` | string | The number of documents that have been indexed into the destination index for the transform. |
| `documents_processed` | string | The number of documents that have been processed from the source index of the transform. |
| `documentsProcessed` | string | The number of documents that have been processed from the source index of the transform. documents_processed |
| `dps` | string | The number of input documents per second. docs_per_second |
| `dtime` | string | The total time spent deleting documents, in milliseconds. delete_time |
| `f` | string | The interval between checks for changes in the source indices when the transform is running continuously. frequency |
| `frequency` | string | The interval between checks for changes in the source indices when the transform is running continuously. |
| `id` | [Id](./Id.md) | The transform identifier. |
| `idea` | string | The exponential moving average of the number of new documents that have been indexed. indexed_documents_exp_avg |
| `if` | string | The total number of indexing failures. index_failure |
| `index_failure` | string | The total number of indexing failures. |
| `index_time` | string | The total time spent indexing documents, in milliseconds. |
| `index_total` | string | The total number of index operations done by the transform. |
| `indexed_documents_exp_avg` | string | The exponential moving average of the number of new documents that have been indexed. |
| `it` | string | The total number of index operations done by the transform. index_total |
| `itime` | string | The total time spent indexing documents, in milliseconds. index_time |
| `last_search_time` | string | null | The timestamp of the last search in the source indices. This field is shown only if the transform is running. |
| `lastSearchTime` | string | null | The timestamp of the last search in the source indices. This field is shown only if the transform is running. last_search_time |
| `lst` | string | null | The timestamp of the last search in the source indices. This field is shown only if the transform is running. last_search_time |
| `max_page_search_size` | string | The initial page size that is used for the composite aggregation for each checkpoint. |
| `mpsz` | string | The initial page size that is used for the composite aggregation for each checkpoint. max_page_search_size |
| `p` | string | The unique identifier for the ingest pipeline. pipeline |
| `pages_processed` | string | The number of search or bulk index operations processed. Documents are processed in batches instead of individually. |
| `pdea` | string | The exponential moving average of the number of documents that have been processed. processed_documents_exp_avg |
| `pipeline` | string | The unique identifier for the ingest pipeline. |
| `pp` | string | The number of search or bulk index operations processed. Documents are processed in batches instead of individually. pages_processed |
| `processed_documents_exp_avg` | string | The exponential moving average of the number of documents that have been processed. |
| `processing_time` | string | The total time spent processing results, in milliseconds. |
| `pt` | string | The total time spent processing results, in milliseconds. processing_time |
| `r` | string | If a transform has a `failed` state, these details describe the reason for failure. reason |
| `reason` | string | If a transform has a `failed` state, these details describe the reason for failure. |
| `s` | string | The status of the transform. Returned values include: `aborting`: The transform is aborting. `failed: The transform failed. For more information about the failure, check the `reason ` field. `indexing `: The transform is actively processing data and creating new documents. `started `: The transform is running but not actively indexing data. `stopped `: The transform is stopped. `stopping ` : The transform is stopping. state |
| `search_failure` | string | The total number of search failures. |
| `search_time` | string | The total amount of search time, in milliseconds. |
| `search_total` | string | The total number of search operations on the source index for the transform. |
| `sf` | string | The total number of search failures. search_failure |
| `si` | string | The source indices for the transform. source_index |
| `source_index` | string | The source indices for the transform. |
| `sourceIndex` | string | The source indices for the transform. source_index |
| `st` | string | The total number of search operations on the source index for the transform. search_total |
| `state` | string | The status of the transform. Returned values include: `aborting`: The transform is aborting. `failed: The transform failed. For more information about the failure, check the `reason ` field. `indexing `: The transform is actively processing data and creating new documents. `started `: The transform is running but not actively indexing data. `stopped `: The transform is stopped. `stopping ` : The transform is stopping. |
| `stime` | string | The total amount of search time, in milliseconds. search_time |
| `tc` | string | The number of times the transform has been triggered by the scheduler. For example, the scheduler triggers the transform indexer to check for updates or ingest new data at an interval specified in the `frequency` property. trigger_count |
| `transform_type` | string | The type of transform: `batch` or `continuous`. |
| `trigger_count` | string | The number of times the transform has been triggered by the scheduler. For example, the scheduler triggers the transform indexer to check for updates or ingest new data at an interval specified in the `frequency` property. |
| `tt` | string | The type of transform: `batch` or `continuous`. transform_type |
| `v` | [VersionString](./VersionString.md) | The version of Elasticsearch that existed on the node when the transform was created. version |
| `version` | [VersionString](./VersionString.md) | The version of Elasticsearch that existed on the node when the transform was created. |
