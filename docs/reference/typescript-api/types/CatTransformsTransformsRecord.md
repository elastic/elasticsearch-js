# CatTransformsTransformsRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | The transform identifier. |
| `state?` | `string` | The status of the transform.
Returned values include:
`aborting`: The transform is aborting.
`failed: The transform failed. For more information about the failure, check the `reason` field.
`indexing`: The transform is actively processing data and creating new documents.
`started`: The transform is running but not actively indexing data.
`stopped`: The transform is stopped.
`stopping`: The transform is stopping. |
| `s?` | `string` | The status of the transform.
Returned values include:
`aborting`: The transform is aborting.
`failed: The transform failed. For more information about the failure, check the `reason` field.
`indexing`: The transform is actively processing data and creating new documents.
`started`: The transform is running but not actively indexing data.
`stopped`: The transform is stopped.
`stopping`: The transform is stopping. |
| `checkpoint?` | `string` | The sequence number for the checkpoint. |
| `c?` | `string` | The sequence number for the checkpoint. |
| `documents_processed?` | `string` | The number of documents that have been processed from the source index of the transform. |
| `docp?` | `string` | The number of documents that have been processed from the source index of the transform. |
| `documentsProcessed?` | `string` | The number of documents that have been processed from the source index of the transform. |
| `checkpoint_progress?` | `string | null` | The progress of the next checkpoint that is currently in progress. |
| `cp?` | `string | null` | The progress of the next checkpoint that is currently in progress. |
| `checkpointProgress?` | `string | null` | The progress of the next checkpoint that is currently in progress. |
| `last_search_time?` | `string | null` | The timestamp of the last search in the source indices.
This field is shown only if the transform is running. |
| `lst?` | `string | null` | The timestamp of the last search in the source indices.
This field is shown only if the transform is running. |
| `lastSearchTime?` | `string | null` | The timestamp of the last search in the source indices.
This field is shown only if the transform is running. |
| `changes_last_detection_time?` | `string | null` | The timestamp when changes were last detected in the source indices. |
| `cldt?` | `string | null` | The timestamp when changes were last detected in the source indices. |
| `create_time?` | `string` | The time the transform was created. |
| `ct?` | `string` | The time the transform was created. |
| `createTime?` | `string` | The time the transform was created. |
| `version?` | [`VersionString`](VersionString.md) | The version of Elasticsearch that existed on the node when the transform was created. |
| `v?` | [`VersionString`](VersionString.md) | The version of Elasticsearch that existed on the node when the transform was created. |
| `source_index?` | `string` | The source indices for the transform. |
| `si?` | `string` | The source indices for the transform. |
| `sourceIndex?` | `string` | The source indices for the transform. |
| `dest_index?` | `string` | The destination index for the transform. |
| `di?` | `string` | The destination index for the transform. |
| `destIndex?` | `string` | The destination index for the transform. |
| `pipeline?` | `string` | The unique identifier for the ingest pipeline. |
| `p?` | `string` | The unique identifier for the ingest pipeline. |
| `description?` | `string` | The description of the transform. |
| `d?` | `string` | The description of the transform. |
| `transform_type?` | `string` | The type of transform: `batch` or `continuous`. |
| `tt?` | `string` | The type of transform: `batch` or `continuous`. |
| `frequency?` | `string` | The interval between checks for changes in the source indices when the transform is running continuously. |
| `f?` | `string` | The interval between checks for changes in the source indices when the transform is running continuously. |
| `max_page_search_size?` | `string` | The initial page size that is used for the composite aggregation for each checkpoint. |
| `mpsz?` | `string` | The initial page size that is used for the composite aggregation for each checkpoint. |
| `docs_per_second?` | `string` | The number of input documents per second. |
| `dps?` | `string` | The number of input documents per second. |
| `reason?` | `string` | If a transform has a `failed` state, these details describe the reason for failure. |
| `r?` | `string` | If a transform has a `failed` state, these details describe the reason for failure. |
| `search_total?` | `string` | The total number of search operations on the source index for the transform. |
| `st?` | `string` | The total number of search operations on the source index for the transform. |
| `search_failure?` | `string` | The total number of search failures. |
| `sf?` | `string` | The total number of search failures. |
| `search_time?` | `string` | The total amount of search time, in milliseconds. |
| `stime?` | `string` | The total amount of search time, in milliseconds. |
| `index_total?` | `string` | The total number of index operations done by the transform. |
| `it?` | `string` | The total number of index operations done by the transform. |
| `index_failure?` | `string` | The total number of indexing failures. |
| `if?` | `string` | The total number of indexing failures. |
| `index_time?` | `string` | The total time spent indexing documents, in milliseconds. |
| `itime?` | `string` | The total time spent indexing documents, in milliseconds. |
| `documents_indexed?` | `string` | The number of documents that have been indexed into the destination index for the transform. |
| `doci?` | `string` | The number of documents that have been indexed into the destination index for the transform. |
| `delete_time?` | `string` | The total time spent deleting documents, in milliseconds. |
| `dtime?` | `string` | The total time spent deleting documents, in milliseconds. |
| `documents_deleted?` | `string` | The number of documents deleted from the destination index due to the retention policy for the transform. |
| `docd?` | `string` | The number of documents deleted from the destination index due to the retention policy for the transform. |
| `trigger_count?` | `string` | The number of times the transform has been triggered by the scheduler.
For example, the scheduler triggers the transform indexer to check for updates or ingest new data at an interval specified in the `frequency` property. |
| `tc?` | `string` | The number of times the transform has been triggered by the scheduler.
For example, the scheduler triggers the transform indexer to check for updates or ingest new data at an interval specified in the `frequency` property. |
| `pages_processed?` | `string` | The number of search or bulk index operations processed.
Documents are processed in batches instead of individually. |
| `pp?` | `string` | The number of search or bulk index operations processed.
Documents are processed in batches instead of individually. |
| `processing_time?` | `string` | The total time spent processing results, in milliseconds. |
| `pt?` | `string` | The total time spent processing results, in milliseconds. |
| `checkpoint_duration_time_exp_avg?` | `string` | The exponential moving average of the duration of the checkpoint, in milliseconds. |
| `cdtea?` | `string` | The exponential moving average of the duration of the checkpoint, in milliseconds. |
| `checkpointTimeExpAvg?` | `string` | The exponential moving average of the duration of the checkpoint, in milliseconds. |
| `indexed_documents_exp_avg?` | `string` | The exponential moving average of the number of new documents that have been indexed. |
| `idea?` | `string` | The exponential moving average of the number of new documents that have been indexed. |
| `processed_documents_exp_avg?` | `string` | The exponential moving average of the number of documents that have been processed. |
| `pdea?` | `string` | The exponential moving average of the number of documents that have been processed. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
