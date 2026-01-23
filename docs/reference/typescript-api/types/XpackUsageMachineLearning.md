# XpackUsageMachineLearning

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `datafeeds` | `Record<string, XpackUsageDatafeed>` | - |
| `jobs` | `Record<string, XpackUsageJobUsage>` | Job usage statistics. The `_all` entry is always present and gathers statistics for all jobs. |
| `node_count` | `integer` | - |
| `data_frame_analytics_jobs` | [`XpackUsageMlDataFrameAnalyticsJobs`](XpackUsageMlDataFrameAnalyticsJobs.md) | - |
| `inference` | [`XpackUsageMlInference`](XpackUsageMlInference.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
