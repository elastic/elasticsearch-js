## Interface `MlDataframeAnalysisFeatureProcessor`

| Name | Type | Description |
| - | - | - |
| `frequency_encoding` | [MlDataframeAnalysisFeatureProcessorFrequencyEncoding](./MlDataframeAnalysisFeatureProcessorFrequencyEncoding.md) | The configuration information necessary to perform frequency encoding. |
| `multi_encoding` | [MlDataframeAnalysisFeatureProcessorMultiEncoding](./MlDataframeAnalysisFeatureProcessorMultiEncoding.md) | The configuration information necessary to perform multi encoding. It allows multiple processors to be changed together. This way the output of a processor can then be passed to another as an input. |
| `n_gram_encoding` | [MlDataframeAnalysisFeatureProcessorNGramEncoding](./MlDataframeAnalysisFeatureProcessorNGramEncoding.md) | The configuration information necessary to perform n-gram encoding. Features created by this encoder have the following name format: < feature_prefix > . < string position > . For example, if the feature_prefix is f, the feature name for the second unigram in a string is f.11. |
| `one_hot_encoding` | [MlDataframeAnalysisFeatureProcessorOneHotEncoding](./MlDataframeAnalysisFeatureProcessorOneHotEncoding.md) | The configuration information necessary to perform one hot encoding. |
| `target_mean_encoding` | [MlDataframeAnalysisFeatureProcessorTargetMeanEncoding](./MlDataframeAnalysisFeatureProcessorTargetMeanEncoding.md) | The configuration information necessary to perform target mean encoding. |
