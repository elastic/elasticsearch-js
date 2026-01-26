# MlZeroShotClassificationInferenceUpdateOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `tokenization?` | [`MlNlpTokenizationUpdateOptions`](MlNlpTokenizationUpdateOptions.md) | The tokenization options to update when inferring |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `multi_label?` | `boolean` | Update the configured multi label option. Indicates if more than one true label exists. Defaults to the configured value. |
| `labels` | `string`[] | The labels to predict. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
