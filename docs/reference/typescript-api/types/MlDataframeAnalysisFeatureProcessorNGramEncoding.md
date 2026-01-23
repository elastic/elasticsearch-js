# MlDataframeAnalysisFeatureProcessorNGramEncoding

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `feature_prefix?` | `string` | The feature name prefix. Defaults to ngram_<start>_<length>. |
| `field` | [`Field`](Field.md) | The name of the text field to encode. |
| `length?` | `integer` | Specifies the length of the n-gram substring. Defaults to 50. Must be greater than 0. |
| `n_grams` | `integer[]` | Specifies which n-grams to gather. It’s an array of integer values where the minimum value is 1, and a maximum value is 5. |
| `start?` | `integer` | Specifies the zero-indexed start of the n-gram substring. Negative values are allowed for encoding n-grams of string suffixes. Defaults to 0. |
| `custom?` | `boolean` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
