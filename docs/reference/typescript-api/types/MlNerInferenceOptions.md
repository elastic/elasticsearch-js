# MlNerInferenceOptions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `tokenization?` | [`MlTokenizationConfigContainer`](MlTokenizationConfigContainer.md) | The tokenization options |
| `results_field?` | `string` | The field that is added to incoming documents to contain the inference prediction. Defaults to predicted_value. |
| `classification_labels?` | `string`[] | The token classification labels. Must be IOB formatted tags |
| `vocabulary?` | [`MlVocabulary`](MlVocabulary.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
