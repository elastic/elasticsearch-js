# `MlZeroShotClassificationInferenceOptions` [interface-MlZeroShotClassificationInferenceOptions]

| Name | Type | Description |
| - | - | - |
| `classification_labels` | string[] | The zero shot classification labels indicating entailment, neutral, and contradiction Must contain exactly and only entailment, neutral, and contradiction |
| `hypothesis_template` | string | Hypothesis template used when tokenizing labels for prediction |
| `labels` | string[] | The labels to predict. |
| `multi_label` | boolean | Indicates if more than one true label exists. |
| `results_field` | string | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `tokenization` | [MlTokenizationConfigContainer](./MlTokenizationConfigContainer.md) | The tokenization options to update when inferring |
