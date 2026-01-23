# MlUpdateJobRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `job_id` | [`Id`](Id.md) | Identifier for the job. |
| `allow_lazy_open?` | `boolean` | Advanced configuration option. Specifies whether this job can open when
there is insufficient machine learning node capacity for it to be
immediately assigned to a node. If `false` and a machine learning node
with capacity to run the job cannot immediately be found, the open
anomaly detection jobs API returns an error. However, this is also
subject to the cluster-wide `xpack.ml.max_lazy_ml_nodes` setting. If this
option is set to `true`, the open anomaly detection jobs API does not
return an error and the job waits in the opening state until sufficient
machine learning node capacity is available. |
| `analysis_limits?` | [`MlAnalysisMemoryLimit`](MlAnalysisMemoryLimit.md) | - |
| `background_persist_interval?` | [`Duration`](Duration.md) | Advanced configuration option. The time between each periodic persistence
of the model.
The default value is a randomized value between 3 to 4 hours, which
avoids all jobs persisting at exactly the same time. The smallest allowed
value is 1 hour.
For very large models (several GB), persistence could take 10-20 minutes,
so do not set the value too low.
If the job is open when you make the update, you must stop the datafeed,
close the job, then reopen the job and restart the datafeed for the
changes to take effect. |
| `custom_settings?` | `Record<string, any>` | Advanced configuration option. Contains custom meta data about the job.
For example, it can contain custom URL information as shown in Adding
custom URLs to machine learning results. |
| `categorization_filters?` | `string[]` | - |
| `description?` | `string` | A description of the job. |
| `model_plot_config?` | [`MlModelPlotConfig`](MlModelPlotConfig.md) | - |
| `model_prune_window?` | [`Duration`](Duration.md) | - |
| `daily_model_snapshot_retention_after_days?` | `long` | Advanced configuration option, which affects the automatic removal of old
model snapshots for this job. It specifies a period of time (in days)
after which only the first snapshot per day is retained. This period is
relative to the timestamp of the most recent snapshot for this job. Valid
values range from 0 to `model_snapshot_retention_days`. For jobs created
before version 7.8.0, the default value matches
`model_snapshot_retention_days`. |
| `model_snapshot_retention_days?` | `long` | Advanced configuration option, which affects the automatic removal of old
model snapshots for this job. It specifies the maximum period of time (in
days) that snapshots are retained. This period is relative to the
timestamp of the most recent snapshot for this job. |
| `renormalization_window_days?` | `long` | Advanced configuration option. The period over which adjustments to the
score are applied, as new data is seen. |
| `results_retention_days?` | `long` | Advanced configuration option. The period of time (in days) that results
are retained. Age is calculated relative to the timestamp of the latest
bucket result. If this property has a non-null value, once per day at
00:30 (server time), results that are the specified number of days older
than the latest bucket result are deleted from Elasticsearch. The default
value is null, which means all results are retained. |
| `groups?` | `string[]` | A list of job groups. A job can belong to no groups or many. |
| `detectors?` | `MlDetectorUpdate[]` | An array of detector update objects. |
| `per_partition_categorization?` | [`MlPerPartitionCategorization`](MlPerPartitionCategorization.md) | Settings related to how categorization interacts with partition fields. |
| `body?` | `string | { [key: string]: any } & { job_id?: never, allow_lazy_open?: never, analysis_limits?: never, background_persist_interval?: never, custom_settings?: never, categorization_filters?: never, description?: never, model_plot_config?: never, model_prune_window?: never, daily_model_snapshot_retention_after_days?: never, model_snapshot_retention_days?: never, renormalization_window_days?: never, results_retention_days?: never, groups?: never, detectors?: never, per_partition_categorization?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { job_id?: never, allow_lazy_open?: never, analysis_limits?: never, background_persist_interval?: never, custom_settings?: never, categorization_filters?: never, description?: never, model_plot_config?: never, model_prune_window?: never, daily_model_snapshot_retention_after_days?: never, model_snapshot_retention_days?: never, renormalization_window_days?: never, results_retention_days?: never, groups?: never, detectors?: never, per_partition_categorization?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
