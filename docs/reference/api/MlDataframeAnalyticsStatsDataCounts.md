## Interface `MlDataframeAnalyticsStatsDataCounts`

| Name | Type | Description |
| - | - | - |
| `skipped_docs_count` | [integer](./integer.md) | The number of documents that are skipped during the analysis because they contained values that are not supported by the analysis. For example, outlier detection does not support missing fields so it skips documents with missing fields. Likewise, all types of analysis skip documents that contain arrays with more than one element. |
| `test_docs_count` | [integer](./integer.md) | The number of documents that are not used for training the model and can be used for testing. |
| `training_docs_count` | [integer](./integer.md) | The number of documents that are used for training the model. |
