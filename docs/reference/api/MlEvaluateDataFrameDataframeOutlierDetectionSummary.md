## Interface `MlEvaluateDataFrameDataframeOutlierDetectionSummary`

| Name | Type | Description |
| - | - | - |
| `auc_roc` | [MlEvaluateDataFrameDataframeEvaluationSummaryAucRoc](./MlEvaluateDataFrameDataframeEvaluationSummaryAucRoc.md) | The AUC ROC (area under the curve of the receiver operating characteristic) score and optionally the curve. |
| `confusion_matrix` | Record<string, [MlEvaluateDataFrameConfusionMatrixThreshold](./MlEvaluateDataFrameConfusionMatrixThreshold.md)> | Set the different thresholds of the outlier score at where the metrics ( `tp` - true positive, `fp` - false positive, `tn` - true negative, `fn` - false negative) are calculated. |
| `precision` | Record<string, [double](./double.md)> | Set the different thresholds of the outlier score at where the metric is calculated. |
| `recall` | Record<string, [double](./double.md)> | Set the different thresholds of the outlier score at where the metric is calculated. |
