# MlJobStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `assignment_explanation?` | `string` | For open anomaly detection jobs only, contains messages relating to the selection of a node to run the job. |
| `data_counts` | [`MlDataCounts`](MlDataCounts.md) | An object that describes the quantity of input to the job and any related error counts.
The `data_count` values are cumulative for the lifetime of a job.
If a model snapshot is reverted or old results are deleted, the job counts are not reset. |
| `forecasts_stats` | [`MlJobForecastStatistics`](MlJobForecastStatistics.md) | An object that provides statistical information about forecasts belonging to this job.
Some statistics are omitted if no forecasts have been made. |
| `job_id` | `string` | Identifier for the anomaly detection job. |
| `model_size_stats` | [`MlModelSizeStats`](MlModelSizeStats.md) | An object that provides information about the size and contents of the model. |
| `node?` | [`MlDiscoveryNodeCompact`](MlDiscoveryNodeCompact.md) | Contains properties for the node that runs the job.
This information is available only for open jobs. |
| `open_time?` | [`DateTime`](DateTime.md) | For open jobs only, the elapsed time for which the job has been open. |
| `state` | [`MlJobState`](MlJobState.md) | The status of the anomaly detection job, which can be one of the following values: `closed`, `closing`, `failed`, `opened`, `opening`. |
| `timing_stats` | [`MlJobTimingStats`](MlJobTimingStats.md) | An object that provides statistical information about timing aspect of this job. |
| `deleting?` | `boolean` | Indicates that the process of deleting the job is in progress but not yet completed. It is only reported when `true`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
