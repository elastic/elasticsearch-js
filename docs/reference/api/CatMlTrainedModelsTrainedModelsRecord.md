## Interface `CatMlTrainedModelsTrainedModelsRecord`

| Name | Type | Description |
| - | - | - |
| `"data_frame.analysis"` | string | The analysis used by the data frame to build the model. |
| `"data_frame.create_time"` | string | The time the data frame analytics job was created. |
| `"data_frame.id"` | string | The identifier for the data frame analytics job that created the model. Only displayed if the job is still available. |
| `"data_frame.source_index"` | string | The source index used to train in the data frame analysis. |
| `"ingest.count"` | string | The total number of documents that are processed by the model. |
| `"ingest.current"` | string | The total number of documents that are currently being handled by the model. |
| `"ingest.failed"` | string | The total number of failed ingest attempts with the model. |
| `"ingest.pipelines"` | string | The number of pipelines that are referencing the model. |
| `"ingest.time"` | string | The total time spent processing documents with thie model. |
| `c` | string | Information about the creator of the model. created_by |
| `create_time` | [DateTime](./DateTime.md) | The time the model was created. |
| `created_by` | string | Information about the creator of the model. |
| `createdBy` | string | Information about the creator of the model. created_by |
| `ct` | [DateTime](./DateTime.md) | The time the model was created. create_time |
| `d` | string | A description of the model. description |
| `dataFrameAnalytics` | string | The identifier for the data frame analytics job that created the model. Only displayed if the job is still available. 'data_frame.id' |
| `dataFrameAnalyticsAnalysis` | string | The analysis used by the data frame to build the model. 'data_frame.analysis' |
| `dataFrameAnalyticsSrcIndex` | string | The source index used to train in the data frame analysis. 'data_frame.source_index' |
| `dataFrameAnalyticsTime` | string | The time the data frame analytics job was created. 'data_frame.create_time' |
| `description` | string | A description of the model. |
| `dfa` | string | The analysis used by the data frame to build the model. 'data_frame.analysis' |
| `dfid` | string | The identifier for the data frame analytics job that created the model. Only displayed if the job is still available. 'data_frame.id' |
| `dfsi` | string | The source index used to train in the data frame analysis. 'data_frame.source_index' |
| `dft` | string | The time the data frame analytics job was created. 'data_frame.create_time' |
| `heap_size` | [ByteSize](./ByteSize.md) | The estimated heap size to keep the model in memory. |
| `hs` | [ByteSize](./ByteSize.md) | The estimated heap size to keep the model in memory. heap_size |
| `ic` | string | The total number of documents that are processed by the model. 'ingest.count' |
| `icurr` | string | The total number of documents that are currently being handled by the model. 'ingest.current' |
| `id` | [Id](./Id.md) | The model identifier. |
| `if` | string | The total number of failed ingest attempts with the model. 'ingest.failed' |
| `ingestCount` | string | The total number of documents that are processed by the model. 'ingest.count' |
| `ingestCurrent` | string | The total number of documents that are currently being handled by the model. 'ingest.current' |
| `ingestFailed` | string | The total number of failed ingest attempts with the model. 'ingest.failed' |
| `ingestPipelines` | string | The number of pipelines that are referencing the model. 'ingest.pipelines' |
| `ingestTime` | string | The total time spent processing documents with thie model. 'ingest.time' |
| `ip` | string | The number of pipelines that are referencing the model. 'ingest.pipelines' |
| `it` | string | The total time spent processing documents with thie model. 'ingest.time' |
| `l` | string | The license level of the model. license |
| `license` | string | The license level of the model. |
| `modelHeapSize` | [ByteSize](./ByteSize.md) | The estimated heap size to keep the model in memory. heap_size |
| `modelOperations` | string | The estimated number of operations to use the model. This number helps to measure the computational complexity of the model. operations |
| `o` | string | The estimated number of operations to use the model. This number helps to measure the computational complexity of the model. operations |
| `operations` | string | The estimated number of operations to use the model. This number helps to measure the computational complexity of the model. |
| `type` | string | &nbsp; |
| `v` | [VersionString](./VersionString.md) | The version of Elasticsearch when the model was created. version |
| `version` | [VersionString](./VersionString.md) | The version of Elasticsearch when the model was created. |
