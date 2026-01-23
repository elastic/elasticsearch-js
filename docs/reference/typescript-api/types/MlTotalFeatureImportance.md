# MlTotalFeatureImportance

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `feature_name` | [`Name`](Name.md) | The feature for which this importance was calculated. |
| `importance` | `MlTotalFeatureImportanceStatistics[]` | A collection of feature importance statistics related to the training data set for this particular feature. |
| `classes` | `MlTotalFeatureImportanceClass[]` | If the trained model is a classification model, feature importance statistics are gathered per target class value. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
