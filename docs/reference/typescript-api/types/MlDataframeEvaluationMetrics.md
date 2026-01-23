# MlDataframeEvaluationMetrics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `auc_roc?` | [`MlDataframeEvaluationClassificationMetricsAucRoc`](MlDataframeEvaluationClassificationMetricsAucRoc.md) | The AUC ROC (area under the curve of the receiver operating characteristic) score and optionally the curve. It is calculated for a specific class (provided as "class_name") treated as positive. |
| `precision?` | `Record<string, any>` | Precision of predictions (per-class and average). |
| `recall?` | `Record<string, any>` | Recall of predictions (per-class and average). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
