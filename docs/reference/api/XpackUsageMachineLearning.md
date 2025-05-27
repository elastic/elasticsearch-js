## Interface `XpackUsageMachineLearning`

| Name | Type | Description |
| - | - | - |
| `data_frame_analytics_jobs` | [XpackUsageMlDataFrameAnalyticsJobs](./XpackUsageMlDataFrameAnalyticsJobs.md) | &nbsp; |
| `datafeeds` | Record<string, [XpackUsageDatafeed](./XpackUsageDatafeed.md)> | &nbsp; |
| `inference` | [XpackUsageMlInference](./XpackUsageMlInference.md) | &nbsp; |
| `jobs` | Record<string, [XpackUsageJobUsage](./XpackUsageJobUsage.md)> | Job usage statistics. The `_all` entry is always present and gathers statistics for all jobs. |
| `node_count` | [integer](./integer.md) | &nbsp; |
