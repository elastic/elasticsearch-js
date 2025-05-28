# `MlDataframeAnalyticsStatsOutlierDetection` [interface-MlDataframeAnalyticsStatsOutlierDetection]

| Name | Type | Description |
| - | - | - |
| `parameters` | [MlOutlierDetectionParameters](./MlOutlierDetectionParameters.md) | The list of job parameters specified by the user or determined by algorithmic heuristics. |
| `timestamp` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The timestamp when the statistics were reported in milliseconds since the epoch. |
| `timing_stats` | [MlTimingStats](./MlTimingStats.md) | An object containing time statistics about the data frame analytics job. |
