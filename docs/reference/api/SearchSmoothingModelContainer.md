## Interface `SearchSmoothingModelContainer`

| Name | Type | Description |
| - | - | - |
| `laplace` | [SearchLaplaceSmoothingModel](./SearchLaplaceSmoothingModel.md) | A smoothing model that uses an additive smoothing where a constant (typically `1.0` or smaller) is added to all counts to balance weights. |
| `linear_interpolation` | [SearchLinearInterpolationSmoothingModel](./SearchLinearInterpolationSmoothingModel.md) | A smoothing model that takes the weighted mean of the unigrams, bigrams, and trigrams based on user supplied weights (lambdas). |
| `stupid_backoff` | [SearchStupidBackoffSmoothingModel](./SearchStupidBackoffSmoothingModel.md) | A simple backoff model that backs off to lower order n-gram models if the higher order count is `0` and discounts the lower order n-gram model by a constant factor. |
