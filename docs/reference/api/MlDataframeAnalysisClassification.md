# `MlDataframeAnalysisClassification` [interface-MlDataframeAnalysisClassification]

| Name | Type | Description |
| - | - | - |
| `class_assignment_objective` | string | &nbsp; |
| `num_top_classes` | [integer](./integer.md) | Defines the number of categories for which the predicted probabilities are reported. It must be non-negative or -1. If it is -1 or greater than the total number of categories, probabilities are reported for all categories; if you have a large number of categories, there could be a significant effect on the size of your destination index. NOTE: To use the AUC ROC evaluation method, `num_top_classes` must be set to -1 or a value greater than or equal to the total number of categories. |
