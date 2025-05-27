## Interface `MlTrainedModelConfigMetadata`

| Name | Type | Description |
| - | - | - |
| `feature_importance_baseline` | Record<string, string> | An object that contains the baseline for feature importance values. For regression analysis, it is a single value. For classification analysis, there is a value for each class. |
| `hyperparameters` | [MlHyperparameter](./MlHyperparameter.md)[] | List of the available hyperparameters optimized during the fine_parameter_tuning phase as well as specified by the user. |
| `model_aliases` | string[] | &nbsp; |
| `total_feature_importance` | [MlTotalFeatureImportance](./MlTotalFeatureImportance.md)[] | An array of the total feature importance for each feature used from the training data set. This array of objects is returned if data frame analytics trained the model and the request includes total_feature_importance in the include request parameter. |
