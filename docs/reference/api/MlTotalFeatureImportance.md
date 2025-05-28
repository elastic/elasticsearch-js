# `MlTotalFeatureImportance` [interface-MlTotalFeatureImportance]

| Name | Type | Description |
| - | - | - |
| `classes` | [MlTotalFeatureImportanceClass](./MlTotalFeatureImportanceClass.md)[] | If the trained model is a classification model, feature importance statistics are gathered per target class value. |
| `feature_name` | [Name](./Name.md) | The feature for which this importance was calculated. |
| `importance` | [MlTotalFeatureImportanceStatistics](./MlTotalFeatureImportanceStatistics.md)[] | A collection of feature importance statistics related to the training data set for this particular feature. |
