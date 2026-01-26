# MlZeroShotClassificationInferenceOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `tokenization?` | [`MlTokenizationConfigContainer`](MlTokenizationConfigContainer.md) | The tokenization options to update when inferring |
| `hypothesis_template?` | `string` | Hypothesis template used when tokenizing labels for prediction |
| `classification_labels` | `string`[] | The zero shot classification labels indicating entailment, neutral, and contradiction
Must contain exactly and only entailment, neutral, and contradiction |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `multi_label?` | `boolean` | Indicates if more than one true label exists. |
| `labels?` | `string`[] | The labels to predict. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
