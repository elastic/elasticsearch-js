## Interface `MlInferenceResponseResult`

| Name | Type | Description |
| - | - | - |
| `entities` | [MlTrainedModelEntities](./MlTrainedModelEntities.md)[] | If the model is trained for named entity recognition (NER) tasks, the response contains the recognized entities. |
| `feature_importance` | [MlTrainedModelInferenceFeatureImportance](./MlTrainedModelInferenceFeatureImportance.md)[] | The feature importance for the inference results. Relevant only for classification or regression models |
| `is_truncated` | boolean | Indicates whether the input text was truncated to meet the model's maximum sequence length limit. This property is present only when it is true. |
| `predicted_value_sequence` | string | For fill mask tasks, the response contains the input text sequence with the mask token replaced by the predicted value. Additionally |
| `predicted_value` | [MlPredictedValue](./MlPredictedValue.md) | [MlPredictedValue](./MlPredictedValue.md)[] | If the model is trained for a text classification or zero shot classification task, the response is the predicted class. For named entity recognition (NER) tasks, it contains the annotated text output. For fill mask tasks, it contains the top prediction for replacing the mask token. For text embedding tasks, it contains the raw numerical text embedding values. For regression models, its a numerical value For classification models, it may be an integer, double, boolean or string depending on prediction type |
| `prediction_probability` | [double](./double.md) | Specifies a probability for the predicted value. |
| `prediction_score` | [double](./double.md) | Specifies a confidence score for the predicted value. |
| `top_classes` | [MlTopClassEntry](./MlTopClassEntry.md)[] | For fill mask, text classification, and zero shot classification tasks, the response contains a list of top class entries. |
| `warning` | string | If the request failed, the response contains the reason for the failure. |
