# CatMlJobsJobsRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | The anomaly detection job identifier. |
| `state?` | [`MlJobState`](MlJobState.md) | The status of the anomaly detection job. |
| `s?` | [`MlJobState`](MlJobState.md) | The status of the anomaly detection job. |
| `opened_time?` | `string` | For open jobs only, the amount of time the job has been opened. |
| `ot?` | `string` | For open jobs only, the amount of time the job has been opened. |
| `assignment_explanation?` | `string` | For open anomaly detection jobs only, contains messages relating to the selection of a node to run the job. |
| `ae?` | `string` | For open anomaly detection jobs only, contains messages relating to the selection of a node to run the job. |
| `'data.processed_records'?` | `string` | The number of input documents that have been processed by the anomaly detection job.
This value includes documents with missing fields, since they are nonetheless analyzed.
If you use datafeeds and have aggregations in your search query, the `processed_record_count` is the number of aggregation results processed, not the number of Elasticsearch documents. |
| `dpr?` | `string` | The number of input documents that have been processed by the anomaly detection job.
This value includes documents with missing fields, since they are nonetheless analyzed.
If you use datafeeds and have aggregations in your search query, the `processed_record_count` is the number of aggregation results processed, not the number of Elasticsearch documents. |
| `dataProcessedRecords?` | `string` | The number of input documents that have been processed by the anomaly detection job.
This value includes documents with missing fields, since they are nonetheless analyzed.
If you use datafeeds and have aggregations in your search query, the `processed_record_count` is the number of aggregation results processed, not the number of Elasticsearch documents. |
| `'data.processed_fields'?` | `string` | The total number of fields in all the documents that have been processed by the anomaly detection job.
Only fields that are specified in the detector configuration object contribute to this count.
The timestamp is not included in this count. |
| `dpf?` | `string` | The total number of fields in all the documents that have been processed by the anomaly detection job.
Only fields that are specified in the detector configuration object contribute to this count.
The timestamp is not included in this count. |
| `dataProcessedFields?` | `string` | The total number of fields in all the documents that have been processed by the anomaly detection job.
Only fields that are specified in the detector configuration object contribute to this count.
The timestamp is not included in this count. |
| `'data.input_bytes'?` | [`ByteSize`](ByteSize.md) | The number of bytes of input data posted to the anomaly detection job. |
| `dib?` | [`ByteSize`](ByteSize.md) | The number of bytes of input data posted to the anomaly detection job. |
| `dataInputBytes?` | [`ByteSize`](ByteSize.md) | The number of bytes of input data posted to the anomaly detection job. |
| `'data.input_records'?` | `string` | The number of input documents posted to the anomaly detection job. |
| `dir?` | `string` | The number of input documents posted to the anomaly detection job. |
| `dataInputRecords?` | `string` | The number of input documents posted to the anomaly detection job. |
| `'data.input_fields'?` | `string` | The total number of fields in input documents posted to the anomaly detection job.
This count includes fields that are not used in the analysis.
However, be aware that if you are using a datafeed, it extracts only the required fields from the documents it retrieves before posting them to the job. |
| `dif?` | `string` | The total number of fields in input documents posted to the anomaly detection job.
This count includes fields that are not used in the analysis.
However, be aware that if you are using a datafeed, it extracts only the required fields from the documents it retrieves before posting them to the job. |
| `dataInputFields?` | `string` | The total number of fields in input documents posted to the anomaly detection job.
This count includes fields that are not used in the analysis.
However, be aware that if you are using a datafeed, it extracts only the required fields from the documents it retrieves before posting them to the job. |
| `'data.invalid_dates'?` | `string` | The number of input documents with either a missing date field or a date that could not be parsed. |
| `did?` | `string` | The number of input documents with either a missing date field or a date that could not be parsed. |
| `dataInvalidDates?` | `string` | The number of input documents with either a missing date field or a date that could not be parsed. |
| `'data.missing_fields'?` | `string` | The number of input documents that are missing a field that the anomaly detection job is configured to analyze.
Input documents with missing fields are still processed because it is possible that not all fields are missing.
If you are using datafeeds or posting data to the job in JSON format, a high `missing_field_count` is often not an indication of data issues.
It is not necessarily a cause for concern. |
| `dmf?` | `string` | The number of input documents that are missing a field that the anomaly detection job is configured to analyze.
Input documents with missing fields are still processed because it is possible that not all fields are missing.
If you are using datafeeds or posting data to the job in JSON format, a high `missing_field_count` is often not an indication of data issues.
It is not necessarily a cause for concern. |
| `dataMissingFields?` | `string` | The number of input documents that are missing a field that the anomaly detection job is configured to analyze.
Input documents with missing fields are still processed because it is possible that not all fields are missing.
If you are using datafeeds or posting data to the job in JSON format, a high `missing_field_count` is often not an indication of data issues.
It is not necessarily a cause for concern. |
| `'data.out_of_order_timestamps'?` | `string` | The number of input documents that have a timestamp chronologically preceding the start of the current anomaly detection bucket offset by the latency window.
This information is applicable only when you provide data to the anomaly detection job by using the post data API.
These out of order documents are discarded, since jobs require time series data to be in ascending chronological order. |
| `doot?` | `string` | The number of input documents that have a timestamp chronologically preceding the start of the current anomaly detection bucket offset by the latency window.
This information is applicable only when you provide data to the anomaly detection job by using the post data API.
These out of order documents are discarded, since jobs require time series data to be in ascending chronological order. |
| `dataOutOfOrderTimestamps?` | `string` | The number of input documents that have a timestamp chronologically preceding the start of the current anomaly detection bucket offset by the latency window.
This information is applicable only when you provide data to the anomaly detection job by using the post data API.
These out of order documents are discarded, since jobs require time series data to be in ascending chronological order. |
| `'data.empty_buckets'?` | `string` | The number of buckets which did not contain any data.
If your data contains many empty buckets, consider increasing your `bucket_span` or using functions that are tolerant to gaps in data such as mean, `non_null_sum` or `non_zero_count`. |
| `deb?` | `string` | The number of buckets which did not contain any data.
If your data contains many empty buckets, consider increasing your `bucket_span` or using functions that are tolerant to gaps in data such as mean, `non_null_sum` or `non_zero_count`. |
| `dataEmptyBuckets?` | `string` | The number of buckets which did not contain any data.
If your data contains many empty buckets, consider increasing your `bucket_span` or using functions that are tolerant to gaps in data such as mean, `non_null_sum` or `non_zero_count`. |
| `'data.sparse_buckets'?` | `string` | The number of buckets that contained few data points compared to the expected number of data points.
If your data contains many sparse buckets, consider using a longer `bucket_span`. |
| `dsb?` | `string` | The number of buckets that contained few data points compared to the expected number of data points.
If your data contains many sparse buckets, consider using a longer `bucket_span`. |
| `dataSparseBuckets?` | `string` | The number of buckets that contained few data points compared to the expected number of data points.
If your data contains many sparse buckets, consider using a longer `bucket_span`. |
| `'data.buckets'?` | `string` | The total number of buckets processed. |
| `db?` | `string` | The total number of buckets processed. |
| `dataBuckets?` | `string` | The total number of buckets processed. |
| `'data.earliest_record'?` | `string` | The timestamp of the earliest chronologically input document. |
| `der?` | `string` | The timestamp of the earliest chronologically input document. |
| `dataEarliestRecord?` | `string` | The timestamp of the earliest chronologically input document. |
| `'data.latest_record'?` | `string` | The timestamp of the latest chronologically input document. |
| `dlr?` | `string` | The timestamp of the latest chronologically input document. |
| `dataLatestRecord?` | `string` | The timestamp of the latest chronologically input document. |
| `'data.last'?` | `string` | The timestamp at which data was last analyzed, according to server time. |
| `dl?` | `string` | The timestamp at which data was last analyzed, according to server time. |
| `dataLast?` | `string` | The timestamp at which data was last analyzed, according to server time. |
| `'data.last_empty_bucket'?` | `string` | The timestamp of the last bucket that did not contain any data. |
| `dleb?` | `string` | The timestamp of the last bucket that did not contain any data. |
| `dataLastEmptyBucket?` | `string` | The timestamp of the last bucket that did not contain any data. |
| `'data.last_sparse_bucket'?` | `string` | The timestamp of the last bucket that was considered sparse. |
| `dlsb?` | `string` | The timestamp of the last bucket that was considered sparse. |
| `dataLastSparseBucket?` | `string` | The timestamp of the last bucket that was considered sparse. |
| `'model.bytes'?` | [`ByteSize`](ByteSize.md) | The number of bytes of memory used by the models.
This is the maximum value since the last time the model was persisted.
If the job is closed, this value indicates the latest size. |
| `mb?` | [`ByteSize`](ByteSize.md) | The number of bytes of memory used by the models.
This is the maximum value since the last time the model was persisted.
If the job is closed, this value indicates the latest size. |
| `modelBytes?` | [`ByteSize`](ByteSize.md) | The number of bytes of memory used by the models.
This is the maximum value since the last time the model was persisted.
If the job is closed, this value indicates the latest size. |
| `'model.memory_status'?` | [`MlMemoryStatus`](MlMemoryStatus.md) | The status of the mathematical models. |
| `mms?` | [`MlMemoryStatus`](MlMemoryStatus.md) | The status of the mathematical models. |
| `modelMemoryStatus?` | [`MlMemoryStatus`](MlMemoryStatus.md) | The status of the mathematical models. |
| `'model.bytes_exceeded'?` | [`ByteSize`](ByteSize.md) | The number of bytes over the high limit for memory usage at the last allocation failure. |
| `mbe?` | [`ByteSize`](ByteSize.md) | The number of bytes over the high limit for memory usage at the last allocation failure. |
| `modelBytesExceeded?` | [`ByteSize`](ByteSize.md) | The number of bytes over the high limit for memory usage at the last allocation failure. |
| `'model.memory_limit'?` | `string` | The upper limit for model memory usage, checked on increasing values. |
| `mml?` | `string` | The upper limit for model memory usage, checked on increasing values. |
| `modelMemoryLimit?` | `string` | The upper limit for model memory usage, checked on increasing values. |
| `'model.by_fields'?` | `string` | The number of `by` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `mbf?` | `string` | The number of `by` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `modelByFields?` | `string` | The number of `by` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `'model.over_fields'?` | `string` | The number of `over` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `mof?` | `string` | The number of `over` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `modelOverFields?` | `string` | The number of `over` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `'model.partition_fields'?` | `string` | The number of `partition` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `mpf?` | `string` | The number of `partition` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `modelPartitionFields?` | `string` | The number of `partition` field values that were analyzed by the models.
This value is cumulative for all detectors in the job. |
| `'model.bucket_allocation_failures'?` | `string` | The number of buckets for which new entities in incoming data were not processed due to insufficient model memory.
This situation is also signified by a `hard_limit: memory_status` property value. |
| `mbaf?` | `string` | The number of buckets for which new entities in incoming data were not processed due to insufficient model memory.
This situation is also signified by a `hard_limit: memory_status` property value. |
| `modelBucketAllocationFailures?` | `string` | The number of buckets for which new entities in incoming data were not processed due to insufficient model memory.
This situation is also signified by a `hard_limit: memory_status` property value. |
| `'model.categorization_status'?` | [`MlCategorizationStatus`](MlCategorizationStatus.md) | The status of categorization for the job. |
| `mcs?` | [`MlCategorizationStatus`](MlCategorizationStatus.md) | The status of categorization for the job. |
| `modelCategorizationStatus?` | [`MlCategorizationStatus`](MlCategorizationStatus.md) | The status of categorization for the job. |
| `'model.categorized_doc_count'?` | `string` | The number of documents that have had a field categorized. |
| `mcdc?` | `string` | The number of documents that have had a field categorized. |
| `modelCategorizedDocCount?` | `string` | The number of documents that have had a field categorized. |
| `'model.total_category_count'?` | `string` | The number of categories created by categorization. |
| `mtcc?` | `string` | The number of categories created by categorization. |
| `modelTotalCategoryCount?` | `string` | The number of categories created by categorization. |
| `'model.frequent_category_count'?` | `string` | The number of categories that match more than 1% of categorized documents. |
| `modelFrequentCategoryCount?` | `string` | The number of categories that match more than 1% of categorized documents. |
| `'model.rare_category_count'?` | `string` | The number of categories that match just one categorized document. |
| `mrcc?` | `string` | The number of categories that match just one categorized document. |
| `modelRareCategoryCount?` | `string` | The number of categories that match just one categorized document. |
| `'model.dead_category_count'?` | `string` | The number of categories created by categorization that will never be assigned again because another category’s definition makes it a superset of the dead category.
Dead categories are a side effect of the way categorization has no prior training. |
| `mdcc?` | `string` | The number of categories created by categorization that will never be assigned again because another category’s definition makes it a superset of the dead category.
Dead categories are a side effect of the way categorization has no prior training. |
| `modelDeadCategoryCount?` | `string` | The number of categories created by categorization that will never be assigned again because another category’s definition makes it a superset of the dead category.
Dead categories are a side effect of the way categorization has no prior training. |
| `'model.failed_category_count'?` | `string` | The number of times that categorization wanted to create a new category but couldn’t because the job had hit its `model_memory_limit`.
This count does not track which specific categories failed to be created.
Therefore you cannot use this value to determine the number of unique categories that were missed. |
| `mfcc?` | `string` | The number of times that categorization wanted to create a new category but couldn’t because the job had hit its `model_memory_limit`.
This count does not track which specific categories failed to be created.
Therefore you cannot use this value to determine the number of unique categories that were missed. |
| `modelFailedCategoryCount?` | `string` | The number of times that categorization wanted to create a new category but couldn’t because the job had hit its `model_memory_limit`.
This count does not track which specific categories failed to be created.
Therefore you cannot use this value to determine the number of unique categories that were missed. |
| `'model.log_time'?` | `string` | The timestamp when the model stats were gathered, according to server time. |
| `mlt?` | `string` | The timestamp when the model stats were gathered, according to server time. |
| `modelLogTime?` | `string` | The timestamp when the model stats were gathered, according to server time. |
| `'model.timestamp'?` | `string` | The timestamp of the last record when the model stats were gathered. |
| `mt?` | `string` | The timestamp of the last record when the model stats were gathered. |
| `modelTimestamp?` | `string` | The timestamp of the last record when the model stats were gathered. |
| `'forecasts.total'?` | `string` | The number of individual forecasts currently available for the job.
A value of one or more indicates that forecasts exist. |
| `ft?` | `string` | The number of individual forecasts currently available for the job.
A value of one or more indicates that forecasts exist. |
| `forecastsTotal?` | `string` | The number of individual forecasts currently available for the job.
A value of one or more indicates that forecasts exist. |
| `'forecasts.memory.min'?` | `string` | The minimum memory usage in bytes for forecasts related to the anomaly detection job. |
| `fmmin?` | `string` | The minimum memory usage in bytes for forecasts related to the anomaly detection job. |
| `forecastsMemoryMin?` | `string` | The minimum memory usage in bytes for forecasts related to the anomaly detection job. |
| `'forecasts.memory.max'?` | `string` | The maximum memory usage in bytes for forecasts related to the anomaly detection job. |
| `fmmax?` | `string` | The maximum memory usage in bytes for forecasts related to the anomaly detection job. |
| `forecastsMemoryMax?` | `string` | The maximum memory usage in bytes for forecasts related to the anomaly detection job. |
| `'forecasts.memory.avg'?` | `string` | The average memory usage in bytes for forecasts related to the anomaly detection job. |
| `fmavg?` | `string` | The average memory usage in bytes for forecasts related to the anomaly detection job. |
| `forecastsMemoryAvg?` | `string` | The average memory usage in bytes for forecasts related to the anomaly detection job. |
| `'forecasts.memory.total'?` | `string` | The total memory usage in bytes for forecasts related to the anomaly detection job. |
| `fmt?` | `string` | The total memory usage in bytes for forecasts related to the anomaly detection job. |
| `forecastsMemoryTotal?` | `string` | The total memory usage in bytes for forecasts related to the anomaly detection job. |
| `'forecasts.records.min'?` | `string` | The minimum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `frmin?` | `string` | The minimum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `forecastsRecordsMin?` | `string` | The minimum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `'forecasts.records.max'?` | `string` | The maximum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `frmax?` | `string` | The maximum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `forecastsRecordsMax?` | `string` | The maximum number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `'forecasts.records.avg'?` | `string` | The average number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `fravg?` | `string` | The average number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `forecastsRecordsAvg?` | `string` | The average number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `'forecasts.records.total'?` | `string` | The total number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `frt?` | `string` | The total number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `forecastsRecordsTotal?` | `string` | The total number of `model_forecast` documents written for forecasts related to the anomaly detection job. |
| `'forecasts.time.min'?` | `string` | The minimum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `ftmin?` | `string` | The minimum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `forecastsTimeMin?` | `string` | The minimum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `'forecasts.time.max'?` | `string` | The maximum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `ftmax?` | `string` | The maximum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `forecastsTimeMax?` | `string` | The maximum runtime in milliseconds for forecasts related to the anomaly detection job. |
| `'forecasts.time.avg'?` | `string` | The average runtime in milliseconds for forecasts related to the anomaly detection job. |
| `ftavg?` | `string` | The average runtime in milliseconds for forecasts related to the anomaly detection job. |
| `forecastsTimeAvg?` | `string` | The average runtime in milliseconds for forecasts related to the anomaly detection job. |
| `'forecasts.time.total'?` | `string` | The total runtime in milliseconds for forecasts related to the anomaly detection job. |
| `ftt?` | `string` | The total runtime in milliseconds for forecasts related to the anomaly detection job. |
| `forecastsTimeTotal?` | `string` | The total runtime in milliseconds for forecasts related to the anomaly detection job. |
| `'node.id'?` | [`NodeId`](NodeId.md) | The uniqe identifier of the assigned node. |
| `ni?` | [`NodeId`](NodeId.md) | The uniqe identifier of the assigned node. |
| `nodeId?` | [`NodeId`](NodeId.md) | The uniqe identifier of the assigned node. |
| `'node.name'?` | `string` | The name of the assigned node. |
| `nn?` | `string` | The name of the assigned node. |
| `nodeName?` | `string` | The name of the assigned node. |
| `'node.ephemeral_id'?` | [`NodeId`](NodeId.md) | The ephemeral identifier of the assigned node. |
| `ne?` | [`NodeId`](NodeId.md) | The ephemeral identifier of the assigned node. |
| `nodeEphemeralId?` | [`NodeId`](NodeId.md) | The ephemeral identifier of the assigned node. |
| `'node.address'?` | `string` | The network address of the assigned node. |
| `na?` | `string` | The network address of the assigned node. |
| `nodeAddress?` | `string` | The network address of the assigned node. |
| `'buckets.count'?` | `string` | The number of bucket results produced by the job. |
| `bc?` | `string` | The number of bucket results produced by the job. |
| `bucketsCount?` | `string` | The number of bucket results produced by the job. |
| `'buckets.time.total'?` | `string` | The sum of all bucket processing times, in milliseconds. |
| `btt?` | `string` | The sum of all bucket processing times, in milliseconds. |
| `bucketsTimeTotal?` | `string` | The sum of all bucket processing times, in milliseconds. |
| `'buckets.time.min'?` | `string` | The minimum of all bucket processing times, in milliseconds. |
| `btmin?` | `string` | The minimum of all bucket processing times, in milliseconds. |
| `bucketsTimeMin?` | `string` | The minimum of all bucket processing times, in milliseconds. |
| `'buckets.time.max'?` | `string` | The maximum of all bucket processing times, in milliseconds. |
| `btmax?` | `string` | The maximum of all bucket processing times, in milliseconds. |
| `bucketsTimeMax?` | `string` | The maximum of all bucket processing times, in milliseconds. |
| `'buckets.time.exp_avg'?` | `string` | The exponential moving average of all bucket processing times, in milliseconds. |
| `btea?` | `string` | The exponential moving average of all bucket processing times, in milliseconds. |
| `bucketsTimeExpAvg?` | `string` | The exponential moving average of all bucket processing times, in milliseconds. |
| `'buckets.time.exp_avg_hour'?` | `string` | The exponential moving average of bucket processing times calculated in a one hour time window, in milliseconds. |
| `bteah?` | `string` | The exponential moving average of bucket processing times calculated in a one hour time window, in milliseconds. |
| `bucketsTimeExpAvgHour?` | `string` | The exponential moving average of bucket processing times calculated in a one hour time window, in milliseconds. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
