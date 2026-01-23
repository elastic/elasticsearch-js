# MlDataframeEvaluationClassificationMetricsAucRoc

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `class_name?` | [`Name`](Name.md) | Name of the only class that is treated as positive during AUC ROC calculation. Other classes are treated as negative ("one-vs-all" strategy). All the evaluated documents must have class_name in the list of their top classes. |
| `include_curve?` | `boolean` | Whether or not the curve should be returned in addition to the score. Default value is false. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
