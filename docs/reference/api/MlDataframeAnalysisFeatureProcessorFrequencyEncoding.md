# `MlDataframeAnalysisFeatureProcessorFrequencyEncoding` [interface-MlDataframeAnalysisFeatureProcessorFrequencyEncoding]

| Name | Type | Description |
| - | - | - |
| `feature_name` | [Name](./Name.md) | The resulting feature name. |
| `field` | [Field](./Field.md) | &nbsp; |
| `frequency_map` | Record<string, [double](./double.md)> | The resulting frequency map for the field value. If the field value is missing from the frequency_map, the resulting value is 0. |
