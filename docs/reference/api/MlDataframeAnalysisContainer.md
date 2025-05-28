# `MlDataframeAnalysisContainer` [interface-MlDataframeAnalysisContainer]

| Name | Type | Description |
| - | - | - |
| `classification` | [MlDataframeAnalysisClassification](./MlDataframeAnalysisClassification.md) | The configuration information necessary to perform classification. |
| `outlier_detection` | [MlDataframeAnalysisOutlierDetection](./MlDataframeAnalysisOutlierDetection.md) | The configuration information necessary to perform outlier detection. NOTE: Advanced parameters are for fine-tuning classification analysis. They are set automatically by hyperparameter optimization to give the minimum validation error. It is highly recommended to use the default values unless you fully understand the function of these parameters. |
| `regression` | [MlDataframeAnalysisRegression](./MlDataframeAnalysisRegression.md) | The configuration information necessary to perform regression. NOTE: Advanced parameters are for fine-tuning regression analysis. They are set automatically by hyperparameter optimization to give the minimum validation error. It is highly recommended to use the default values unless you fully understand the function of these parameters. |
