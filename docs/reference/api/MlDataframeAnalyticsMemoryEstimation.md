## Interface `MlDataframeAnalyticsMemoryEstimation`

| Name | Type | Description |
| - | - | - |
| `expected_memory_with_disk` | string | Estimated memory usage under the assumption that overflowing to disk is allowed during data frame analytics. expected_memory_with_disk is usually smaller than expected_memory_without_disk as using disk allows to limit the main memory needed to perform data frame analytics. |
| `expected_memory_without_disk` | string | Estimated memory usage under the assumption that the whole data frame analytics should happen in memory (i.e. without overflowing to disk). |
