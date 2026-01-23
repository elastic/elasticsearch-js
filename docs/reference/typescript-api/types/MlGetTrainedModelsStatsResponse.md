# MlGetTrainedModelsStatsResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | `integer` | The total number of trained model statistics that matched the requested ID patterns. Could be higher than the number of items in the trained_model_stats array as the size of the array is restricted by the supplied size parameter. |
| `trained_model_stats` | `MlTrainedModelStats[]` | An array of trained model statistics, which are sorted by the model_id value in ascending order. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
