## Interface `MlEvaluateDataFrameResponse`

| Name | Type | Description |
| - | - | - |
| `classification` | [MlEvaluateDataFrameDataframeClassificationSummary](./MlEvaluateDataFrameDataframeClassificationSummary.md) | Evaluation results for a classification analysis. It outputs a prediction that identifies to which of the classes each document belongs. |
| `outlier_detection` | [MlEvaluateDataFrameDataframeOutlierDetectionSummary](./MlEvaluateDataFrameDataframeOutlierDetectionSummary.md) | Evaluation results for an outlier detection analysis. It outputs the probability that each document is an outlier. |
| `regression` | [MlEvaluateDataFrameDataframeRegressionSummary](./MlEvaluateDataFrameDataframeRegressionSummary.md) | Evaluation results for a regression analysis which outputs a prediction of values. |
