# `CatMlJobsJobsRecord` [interface-CatMlJobsJobsRecord]

| Name | Type | Description |
| - | - | - |
| `"buckets.count"` | string | The number of bucket results produced by the job. |
| `"buckets.time.exp_avg_hour"` | string | The exponential moving average of bucket processing times calculated in a one hour time window, in milliseconds. |
| `"buckets.time.exp_avg"` | string | The exponential moving average of all bucket processing times, in milliseconds. |
| `"buckets.time.max"` | string | The maximum of all bucket processing times, in milliseconds. |
| `"buckets.time.min"` | string | The minimum of all bucket processing times, in milliseconds. |
| `"buckets.time.total"` | string | The sum of all bucket processing times, in milliseconds. |
| `"data.buckets"` | string | The total number of buckets processed. |
| `"data.earliest_record"` | string | The timestamp of the earliest chronologically input document. |
| `"data.empty_buckets"` | string | The number of buckets which did not contain any data. If your data contains many empty buckets, consider increasing your `bucket_span` or using functions that are tolerant to gaps in data such as mean, `non_null_sum` or `non_zero_count`. |
| `"data.input_bytes"` | [ByteSize](./ByteSize.md) | The number of bytes of input data posted to the anomaly detection job. |
| `"data.input_fields"` | string | The total number of fields in input documents posted to the anomaly detection job. This count includes fields that are not used in the analysis. However, be aware that if you are using a datafeed, it extracts only the required fields from the documents it retrieves before posting them to the job. |
| `"data.input_records"` | string | The number of input documents posted to the anomaly detection job. |
| `"data.invalid_dates"` | string | The number of input documents with either a missing date field or a date that could not be parsed. |
| `"data.last_empty_bucket"` | string | The timestamp of the last bucket that did not contain any data. |
| `"data.last_sparse_bucket"` | string | The timestamp of the last bucket that was considered sparse. |
| `"data.last"` | string | The timestamp at which data was last analyzed, according to server time. |
| `"data.latest_record"` | string | The timestamp of the latest chronologically input document. |
| `"data.missing_fields"` | string | The number of input documents that are missing a field that the anomaly detection job is configured to analyze. Input documents with missing fields are still processed because it is possible that not all fields are missing. If you are using datafeeds or posting data to the job in JSON format, a high `missing_field_count` is often not an indication of data issues. It is not necessarily a cause for concern. |
| `"data.out_of_order_timestamps"` | string | The number of input documents that have a timestamp chronologically preceding the start of the current anomaly detection bucket offset by the latency window. This information is applicable only when you provide data to the anomaly detection job by using the post data API. These out of order documents are discarded, since jobs require time series data to be in ascending chronological order. |
| `"data.processed_fields"` | string | The total number of fields in all the documents that have been processed by the anomaly detection job. Only fields that are specified in the detector configuration object contribute to this count. The timestamp is not included in this count. |
| `"data.processed_records"` | string | The number of input documents that have been processed by the anomaly detection job. This value includes documents with missing fields, since they are nonetheless analyzed. If you use datafeeds and have aggregations in your search query, the `processed_record_count` is the number of aggregation results processed, not the number of Elasticsearch documents. |
| `"data.sparse_buckets"` | string | The number of buckets that contained few data points compared to the expected number of data points. If your data contains many sparse buckets, consider using a longer `bucket_span`. |
| `"forecasts.memory.avg"` | string | The average memory usage in bytes for forecasts related to the anomaly detection job. |
| `"forecasts.memory.max"` | string | The maximum memory usage in bytes for forecasts related to the anomaly detection job. |
| `"forecasts.memory.min"` | string | The minimum memory usage in bytes for forecasts related to the anomaly detection job. |
| `"forecasts.memory.total"` | string | The total memory usage in bytes for forecasts related to the anomaly detection job. |
| `"forecasts.records.avg"` | string | The average number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `"forecasts.records.max"` | string | The maximum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `"forecasts.records.min"` | string | The minimum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `"forecasts.records.total"` | string | The total number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `"forecasts.time.avg"` | string | The average runtime in milliseconds for forecasts related to the anomaly detection job. |
| `"forecasts.time.max"` | string | The maximum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `"forecasts.time.min"` | string | The minimum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `"forecasts.time.total"` | string | The total runtime in milliseconds for forecasts related to the anomaly detection job. |
| `"forecasts.total"` | string | The number of individual forecasts currently available for the job. A value of one or more indicates that forecasts exist. |
| `"model.bucket_allocation_failures"` | string | The number of buckets for which new entities in incoming data were not processed due to insufficient model memory. This situation is also signified by a `hard_limit: memory_status` property value. |
| `"model.by_fields"` | string | The number of `by` field values that were analyzed by the models. This value is cumulative for all detectors in the job. |
| `"model.bytes_exceeded"` | [ByteSize](./ByteSize.md) | The number of bytes over the high limit for memory usage at the last allocation failure. |
| `"model.bytes"` | [ByteSize](./ByteSize.md) | The number of bytes of memory used by the models. This is the maximum value since the last time the model was persisted. If the job is closed, this value indicates the latest size. |
| `"model.categorization_status"` | [MlCategorizationStatus](./MlCategorizationStatus.md) | The status of categorization for the job. |
| `"model.categorized_doc_count"` | string | The number of documents that have had a field categorized. |
| `"model.dead_category_count"` | string | The number of categories created by categorization that will never be assigned again because another category’s definition makes it a superset of the dead category. Dead categories are a side effect of the way categorization has no prior training. |
| `"model.failed_category_count"` | string | The number of times that categorization wanted to create a new category but couldn’t because the job had hit its `model_memory_limit`. This count does not track which specific categories failed to be created. Therefore you cannot use this value to determine the number of unique categories that were missed. |
| `"model.frequent_category_count"` | string | The number of categories that match more than 1% of categorized documents. |
| `"model.log_time"` | string | The timestamp when the model stats were gathered, according to server time. |
| `"model.memory_limit"` | string | The upper limit for model memory usage, checked on increasing values. |
| `"model.memory_status"` | [MlMemoryStatus](./MlMemoryStatus.md) | The status of the mathematical models. |
| `"model.over_fields"` | string | The number of `over` field values that were analyzed by the models. This value is cumulative for all detectors in the job. |
| `"model.partition_fields"` | string | The number of `partition` field values that were analyzed by the models. This value is cumulative for all detectors in the job. |
| `"model.rare_category_count"` | string | The number of categories that match just one categorized document. |
| `"model.timestamp"` | string | The timestamp of the last record when the model stats were gathered. |
| `"model.total_category_count"` | string | The number of categories created by categorization. |
| `"node.address"` | string | The network address of the assigned node. |
| `"node.ephemeral_id"` | [NodeId](./NodeId.md) | The ephemeral identifier of the assigned node. |
| `"node.id"` | [NodeId](./NodeId.md) | The uniqe identifier of the assigned node. |
| `"node.name"` | string | The name of the assigned node. |
| `ae` | string | For open anomaly detection jobs only, contains messages relating to the selection of a node to run the job. assignment_explanation |
| `assignment_explanation` | string | For open anomaly detection jobs only, contains messages relating to the selection of a node to run the job. |
| `bc` | string | The number of bucket results produced by the job. 'buckets.count' |
| `btea` | string | The exponential moving average of all bucket processing times, in milliseconds. 'buckets.time.exp_avg' |
| `bteah` | string | The exponential moving average of bucket processing times calculated in a one hour time window, in milliseconds. 'buckets.time.exp_avg_hour' |
| `btmax` | string | The maximum of all bucket processing times, in milliseconds. 'buckets.time.max' |
| `btmin` | string | The minimum of all bucket processing times, in milliseconds. 'buckets.time.min' |
| `btt` | string | The sum of all bucket processing times, in milliseconds. 'buckets.time.total' |
| `bucketsCount` | string | The number of bucket results produced by the job. 'buckets.count' |
| `bucketsTimeExpAvg` | string | The exponential moving average of all bucket processing times, in milliseconds. 'buckets.time.exp_avg' |
| `bucketsTimeExpAvgHour` | string | The exponential moving average of bucket processing times calculated in a one hour time window, in milliseconds. 'buckets.time.exp_avg_hour' |
| `bucketsTimeMax` | string | The maximum of all bucket processing times, in milliseconds. 'buckets.time.max' |
| `bucketsTimeMin` | string | The minimum of all bucket processing times, in milliseconds. 'buckets.time.min' |
| `bucketsTimeTotal` | string | The sum of all bucket processing times, in milliseconds. 'buckets.time.total' |
| `dataBuckets` | string | The total number of buckets processed. 'data.buckets' |
| `dataEarliestRecord` | string | The timestamp of the earliest chronologically input document. 'data.earliest_record' |
| `dataEmptyBuckets` | string | The number of buckets which did not contain any data. If your data contains many empty buckets, consider increasing your `bucket_span` or using functions that are tolerant to gaps in data such as mean, `non_null_sum` or `non_zero_count`. 'data.empty_buckets' |
| `dataInputBytes` | [ByteSize](./ByteSize.md) | The number of bytes of input data posted to the anomaly detection job. 'data.input_bytes' |
| `dataInputFields` | string | The total number of fields in input documents posted to the anomaly detection job. This count includes fields that are not used in the analysis. However, be aware that if you are using a datafeed, it extracts only the required fields from the documents it retrieves before posting them to the job. 'data.input_fields' |
| `dataInputRecords` | string | The number of input documents posted to the anomaly detection job. 'data.input_records' |
| `dataInvalidDates` | string | The number of input documents with either a missing date field or a date that could not be parsed. 'data.invalid_dates' |
| `dataLast` | string | The timestamp at which data was last analyzed, according to server time. 'data.last' |
| `dataLastEmptyBucket` | string | The timestamp of the last bucket that did not contain any data. 'data.last_empty_bucket' |
| `dataLastSparseBucket` | string | The timestamp of the last bucket that was considered sparse. 'data.last_sparse_bucket' |
| `dataLatestRecord` | string | The timestamp of the latest chronologically input document. 'data.latest_record' |
| `dataMissingFields` | string | The number of input documents that are missing a field that the anomaly detection job is configured to analyze. Input documents with missing fields are still processed because it is possible that not all fields are missing. If you are using datafeeds or posting data to the job in JSON format, a high `missing_field_count` is often not an indication of data issues. It is not necessarily a cause for concern. 'data.missing_fields' |
| `dataOutOfOrderTimestamps` | string | The number of input documents that have a timestamp chronologically preceding the start of the current anomaly detection bucket offset by the latency window. This information is applicable only when you provide data to the anomaly detection job by using the post data API. These out of order documents are discarded, since jobs require time series data to be in ascending chronological order. 'data.out_of_order_timestamps' |
| `dataProcessedFields` | string | The total number of fields in all the documents that have been processed by the anomaly detection job. Only fields that are specified in the detector configuration object contribute to this count. The timestamp is not included in this count. 'data.processed_fields' |
| `dataProcessedRecords` | string | The number of input documents that have been processed by the anomaly detection job. This value includes documents with missing fields, since they are nonetheless analyzed. If you use datafeeds and have aggregations in your search query, the `processed_record_count` is the number of aggregation results processed, not the number of Elasticsearch documents. 'data.processed_records' |
| `dataSparseBuckets` | string | The number of buckets that contained few data points compared to the expected number of data points. If your data contains many sparse buckets, consider using a longer `bucket_span`. 'data.sparse_buckets' |
| `db` | string | The total number of buckets processed. 'data.buckets' |
| `deb` | string | The number of buckets which did not contain any data. If your data contains many empty buckets, consider increasing your `bucket_span` or using functions that are tolerant to gaps in data such as mean, `non_null_sum` or `non_zero_count`. 'data.empty_buckets' |
| `der` | string | The timestamp of the earliest chronologically input document. 'data.earliest_record' |
| `dib` | [ByteSize](./ByteSize.md) | The number of bytes of input data posted to the anomaly detection job. 'data.input_bytes' |
| `did` | string | The number of input documents with either a missing date field or a date that could not be parsed. 'data.invalid_dates' |
| `dif` | string | The total number of fields in input documents posted to the anomaly detection job. This count includes fields that are not used in the analysis. However, be aware that if you are using a datafeed, it extracts only the required fields from the documents it retrieves before posting them to the job. 'data.input_fields' |
| `dir` | string | The number of input documents posted to the anomaly detection job. 'data.input_records' |
| `dl` | string | The timestamp at which data was last analyzed, according to server time. 'data.last' |
| `dleb` | string | The timestamp of the last bucket that did not contain any data. 'data.last_empty_bucket' |
| `dlr` | string | The timestamp of the latest chronologically input document. 'data.latest_record' |
| `dlsb` | string | The timestamp of the last bucket that was considered sparse. 'data.last_sparse_bucket' |
| `dmf` | string | The number of input documents that are missing a field that the anomaly detection job is configured to analyze. Input documents with missing fields are still processed because it is possible that not all fields are missing. If you are using datafeeds or posting data to the job in JSON format, a high `missing_field_count` is often not an indication of data issues. It is not necessarily a cause for concern. 'data.missing_fields' |
| `doot` | string | The number of input documents that have a timestamp chronologically preceding the start of the current anomaly detection bucket offset by the latency window. This information is applicable only when you provide data to the anomaly detection job by using the post data API. These out of order documents are discarded, since jobs require time series data to be in ascending chronological order. 'data.out_of_order_timestamps' |
| `dpf` | string | The total number of fields in all the documents that have been processed by the anomaly detection job. Only fields that are specified in the detector configuration object contribute to this count. The timestamp is not included in this count. 'data.processed_fields' |
| `dpr` | string | The number of input documents that have been processed by the anomaly detection job. This value includes documents with missing fields, since they are nonetheless analyzed. If you use datafeeds and have aggregations in your search query, the `processed_record_count` is the number of aggregation results processed, not the number of Elasticsearch documents. 'data.processed_records' |
| `dsb` | string | The number of buckets that contained few data points compared to the expected number of data points. If your data contains many sparse buckets, consider using a longer `bucket_span`. 'data.sparse_buckets' |
| `fmavg` | string | The average memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.avg' |
| `fmmax` | string | The maximum memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.max' |
| `fmmin` | string | The minimum memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.min' |
| `fmt` | string | The total memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.total' |
| `forecastsMemoryAvg` | string | The average memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.avg' |
| `forecastsMemoryMax` | string | The maximum memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.max' |
| `forecastsMemoryMin` | string | The minimum memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.min' |
| `forecastsMemoryTotal` | string | The total memory usage in bytes for forecasts related to the anomaly detection job. 'forecasts.memory.total' |
| `forecastsRecordsAvg` | string | The average number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.avg' |
| `forecastsRecordsMax` | string | The maximum number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.max' |
| `forecastsRecordsMin` | string | The minimum number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.min' |
| `forecastsRecordsTotal` | string | The total number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.total' |
| `forecastsTimeAvg` | string | The average runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.avg' |
| `forecastsTimeMax` | string | The maximum runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.max' |
| `forecastsTimeMin` | string | The minimum runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.min' |
| `forecastsTimeTotal` | string | The total runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.total' |
| `forecastsTotal` | string | The number of individual forecasts currently available for the job. A value of one or more indicates that forecasts exist. 'forecasts.total' |
| `fravg` | string | The average number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.avg' |
| `frmax` | string | The maximum number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.max' |
| `frmin` | string | The minimum number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.min' |
| `frt` | string | The total number of `model_forecast` documents written for forecasts related to the anomaly detection job. 'forecasts.records.total' |
| `ft` | string | The number of individual forecasts currently available for the job. A value of one or more indicates that forecasts exist. 'forecasts.total' |
| `ftavg` | string | The average runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.avg' |
| `ftmax` | string | The maximum runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.max' |
| `ftmin` | string | The minimum runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.min' |
| `ftt` | string | The total runtime in milliseconds for forecasts related to the anomaly detection job. 'forecasts.time.total' |
| `id` | [Id](./Id.md) | The anomaly detection job identifier. |
| `mb` | [ByteSize](./ByteSize.md) | The number of bytes of memory used by the models. This is the maximum value since the last time the model was persisted. If the job is closed, this value indicates the latest size. 'model.bytes' |
| `mbaf` | string | The number of buckets for which new entities in incoming data were not processed due to insufficient model memory. This situation is also signified by a `hard_limit: memory_status` property value. 'model.bucket_allocation_failures' |
| `mbe` | [ByteSize](./ByteSize.md) | The number of bytes over the high limit for memory usage at the last allocation failure. 'model.bytes_exceeded' |
| `mbf` | string | The number of `by` field values that were analyzed by the models. This value is cumulative for all detectors in the job. 'model.by_fields' |
| `mcdc` | string | The number of documents that have had a field categorized. 'model.categorized_doc_count' |
| `mcs` | [MlCategorizationStatus](./MlCategorizationStatus.md) | The status of categorization for the job. 'model.categorization_status' |
| `mdcc` | string | The number of categories created by categorization that will never be assigned again because another category’s definition makes it a superset of the dead category. Dead categories are a side effect of the way categorization has no prior training. 'model.dead_category_count' |
| `mfcc` | string | The number of times that categorization wanted to create a new category but couldn’t because the job had hit its `model_memory_limit`. This count does not track which specific categories failed to be created. Therefore you cannot use this value to determine the number of unique categories that were missed. 'model.failed_category_count' |
| `mlt` | string | The timestamp when the model stats were gathered, according to server time. 'model.log_time' |
| `mml` | string | The upper limit for model memory usage, checked on increasing values. 'model.memory_limit' |
| `mms` | [MlMemoryStatus](./MlMemoryStatus.md) | The status of the mathematical models. 'model.memory_status' |
| `modelBucketAllocationFailures` | string | The number of buckets for which new entities in incoming data were not processed due to insufficient model memory. This situation is also signified by a `hard_limit: memory_status` property value. 'model.bucket_allocation_failures' |
| `modelByFields` | string | The number of `by` field values that were analyzed by the models. This value is cumulative for all detectors in the job. 'model.by_fields' |
| `modelBytes` | [ByteSize](./ByteSize.md) | The number of bytes of memory used by the models. This is the maximum value since the last time the model was persisted. If the job is closed, this value indicates the latest size. 'model.bytes' |
| `modelBytesExceeded` | [ByteSize](./ByteSize.md) | The number of bytes over the high limit for memory usage at the last allocation failure. 'model.bytes_exceeded' |
| `modelCategorizationStatus` | [MlCategorizationStatus](./MlCategorizationStatus.md) | The status of categorization for the job. 'model.categorization_status' |
| `modelCategorizedDocCount` | string | The number of documents that have had a field categorized. 'model.categorized_doc_count' |
| `modelDeadCategoryCount` | string | The number of categories created by categorization that will never be assigned again because another category’s definition makes it a superset of the dead category. Dead categories are a side effect of the way categorization has no prior training. 'model.dead_category_count' |
| `modelFailedCategoryCount` | string | The number of times that categorization wanted to create a new category but couldn’t because the job had hit its `model_memory_limit`. This count does not track which specific categories failed to be created. Therefore you cannot use this value to determine the number of unique categories that were missed. 'model.failed_category_count' |
| `modelFrequentCategoryCount` | string | The number of categories that match more than 1% of categorized documents. 'model.frequent_category_count' |
| `modelLogTime` | string | The timestamp when the model stats were gathered, according to server time. 'model.log_time' |
| `modelMemoryLimit` | string | The upper limit for model memory usage, checked on increasing values. 'model.memory_limit' |
| `modelMemoryStatus` | [MlMemoryStatus](./MlMemoryStatus.md) | The status of the mathematical models. 'model.memory_status' |
| `modelOverFields` | string | The number of `over` field values that were analyzed by the models. This value is cumulative for all detectors in the job. 'model.over_fields' |
| `modelPartitionFields` | string | The number of `partition` field values that were analyzed by the models. This value is cumulative for all detectors in the job. 'model.partition_fields' |
| `modelRareCategoryCount` | string | The number of categories that match just one categorized document. 'model.rare_category_count' |
| `modelTimestamp` | string | The timestamp of the last record when the model stats were gathered. 'model.timestamp' |
| `modelTotalCategoryCount` | string | The number of categories created by categorization. 'model.total_category_count' |
| `mof` | string | The number of `over` field values that were analyzed by the models. This value is cumulative for all detectors in the job. 'model.over_fields' |
| `mpf` | string | The number of `partition` field values that were analyzed by the models. This value is cumulative for all detectors in the job. 'model.partition_fields' |
| `mrcc` | string | The number of categories that match just one categorized document. 'model.rare_category_count' |
| `mt` | string | The timestamp of the last record when the model stats were gathered. 'model.timestamp' |
| `mtcc` | string | The number of categories created by categorization. 'model.total_category_count' |
| `na` | string | The network address of the assigned node. 'node.address' |
| `ne` | [NodeId](./NodeId.md) | The ephemeral identifier of the assigned node. 'node.ephemeral_id' |
| `ni` | [NodeId](./NodeId.md) | The uniqe identifier of the assigned node. 'node.id' |
| `nn` | string | The name of the assigned node. 'node.name' |
| `nodeAddress` | string | The network address of the assigned node. 'node.address' |
| `nodeEphemeralId` | [NodeId](./NodeId.md) | The ephemeral identifier of the assigned node. 'node.ephemeral_id' |
| `nodeId` | [NodeId](./NodeId.md) | The uniqe identifier of the assigned node. 'node.id' |
| `nodeName` | string | The name of the assigned node. 'node.name' |
| `opened_time` | string | For open jobs only, the amount of time the job has been opened. |
| `ot` | string | For open jobs only, the amount of time the job has been opened. opened_time |
| `s` | [MlJobState](./MlJobState.md) | The status of the anomaly detection job. state |
| `state` | [MlJobState](./MlJobState.md) | The status of the anomaly detection job. |
