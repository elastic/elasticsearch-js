## Interface `MlGetTrainedModelsStatsResponse`

| Name | Type | Description |
| - | - | - |
| `count` | [integer](./integer.md) | The total number of trained model statistics that matched the requested ID patterns. Could be higher than the number of items in the trained_model_stats array as the size of the array is restricted by the supplied size parameter. |
| `trained_model_stats` | [MlTrainedModelStats](./MlTrainedModelStats.md)[] | An array of trained model statistics, which are sorted by the model_id value in ascending order. |
