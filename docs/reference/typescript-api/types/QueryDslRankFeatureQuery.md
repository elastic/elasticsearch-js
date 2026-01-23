# QueryDslRankFeatureQuery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `field` | [`Field`](Field.md) | `rank_feature` or `rank_features` field used to boost relevance scores. |
| `saturation?` | [`QueryDslRankFeatureFunctionSaturation`](QueryDslRankFeatureFunctionSaturation.md) | Saturation function used to boost relevance scores based on the value of the rank feature `field`. |
| `log?` | [`QueryDslRankFeatureFunctionLogarithm`](QueryDslRankFeatureFunctionLogarithm.md) | Logarithmic function used to boost relevance scores based on the value of the rank feature `field`. |
| `linear?` | [`QueryDslRankFeatureFunctionLinear`](QueryDslRankFeatureFunctionLinear.md) | Linear function used to boost relevance scores based on the value of the rank feature `field`. |
| `sigmoid?` | [`QueryDslRankFeatureFunctionSigmoid`](QueryDslRankFeatureFunctionSigmoid.md) | Sigmoid function used to boost relevance scores based on the value of the rank feature `field`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
