# `MlDataframeAnalytics` [interface-MlDataframeAnalytics]

| Name | Type | Description |
| - | - | - |
| `analysis_stats` | [MlDataframeAnalyticsStatsContainer](./MlDataframeAnalyticsStatsContainer.md) | An object containing information about the analysis job. |
| `assignment_explanation` | string | For running jobs only, contains messages relating to the selection of a node to run the job. |
| `data_counts` | [MlDataframeAnalyticsStatsDataCounts](./MlDataframeAnalyticsStatsDataCounts.md) | An object that provides counts for the quantity of documents skipped, used in training, or available for testing. |
| `id` | [Id](./Id.md) | The unique identifier of the data frame analytics job. |
| `memory_usage` | [MlDataframeAnalyticsStatsMemoryUsage](./MlDataframeAnalyticsStatsMemoryUsage.md) | An object describing memory usage of the analytics. It is present only after the job is started and memory usage is reported. |
| `node` | [NodeAttributes](./NodeAttributes.md) | Contains properties for the node that runs the job. This information is available only for running jobs. |
| `progress` | [MlDataframeAnalyticsStatsProgress](./MlDataframeAnalyticsStatsProgress.md)[] | The progress report of the data frame analytics job by phase. |
| `state` | [MlDataframeState](./MlDataframeState.md) | The status of the data frame analytics job, which can be one of the following values: failed, started, starting, stopping, stopped. |
