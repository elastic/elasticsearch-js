# MlEvaluateDataFrameDataframeOutlierDetectionSummary

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `auc_roc?` | [`MlEvaluateDataFrameDataframeEvaluationSummaryAucRoc`](MlEvaluateDataFrameDataframeEvaluationSummaryAucRoc.md) | The AUC ROC (area under the curve of the receiver operating characteristic) score and optionally the curve. |
| `precision?` | `Record<string, double>` | Set the different thresholds of the outlier score at where the metric is calculated. |
| `recall?` | `Record<string, double>` | Set the different thresholds of the outlier score at where the metric is calculated. |
| `confusion_matrix?` | `Record<string, MlEvaluateDataFrameConfusionMatrixThreshold>` | Set the different thresholds of the outlier score at where the metrics (`tp` - true positive, `fp` - false positive, `tn` - true negative, `fn` - false negative) are calculated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
