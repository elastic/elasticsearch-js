# MlEvaluateDataFrameDataframeClassificationSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `auc_roc?` | [`MlEvaluateDataFrameDataframeEvaluationSummaryAucRoc`](MlEvaluateDataFrameDataframeEvaluationSummaryAucRoc.md) | The AUC ROC (area under the curve of the receiver operating characteristic) score and optionally the curve.
It is calculated for a specific class (provided as "class_name") treated as positive. |
| `accuracy?` | [`MlEvaluateDataFrameDataframeClassificationSummaryAccuracy`](MlEvaluateDataFrameDataframeClassificationSummaryAccuracy.md) | Accuracy of predictions (per-class and overall). |
| `multiclass_confusion_matrix?` | [`MlEvaluateDataFrameDataframeClassificationSummaryMulticlassConfusionMatrix`](MlEvaluateDataFrameDataframeClassificationSummaryMulticlassConfusionMatrix.md) | Multiclass confusion matrix. |
| `precision?` | [`MlEvaluateDataFrameDataframeClassificationSummaryPrecision`](MlEvaluateDataFrameDataframeClassificationSummaryPrecision.md) | Precision of predictions (per-class and average). |
| `recall?` | [`MlEvaluateDataFrameDataframeClassificationSummaryRecall`](MlEvaluateDataFrameDataframeClassificationSummaryRecall.md) | Recall of predictions (per-class and average). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
