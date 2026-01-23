# MlFillMaskInferenceUpdateOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `num_top_classes?` | `integer` | Specifies the number of top class predictions to return. Defaults to 0. |
| `tokenization?` | [`MlNlpTokenizationUpdateOptions`](MlNlpTokenizationUpdateOptions.md) | The tokenization options to update when inferring |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
