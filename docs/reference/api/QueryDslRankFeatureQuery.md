## Interface `QueryDslRankFeatureQuery`

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | `rank_feature` or `rank_features` field used to boost relevance scores. |
| `linear` | [QueryDslRankFeatureFunctionLinear](./QueryDslRankFeatureFunctionLinear.md) | Linear function used to boost relevance scores based on the value of the rank feature `field`. |
| `log` | [QueryDslRankFeatureFunctionLogarithm](./QueryDslRankFeatureFunctionLogarithm.md) | Logarithmic function used to boost relevance scores based on the value of the rank feature `field`. |
| `saturation` | [QueryDslRankFeatureFunctionSaturation](./QueryDslRankFeatureFunctionSaturation.md) | Saturation function used to boost relevance scores based on the value of the rank feature `field`. |
| `sigmoid` | [QueryDslRankFeatureFunctionSigmoid](./QueryDslRankFeatureFunctionSigmoid.md) | Sigmoid function used to boost relevance scores based on the value of the rank feature `field`. |
