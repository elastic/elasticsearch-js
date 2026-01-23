# InferenceJinaAIServiceSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `api_key` | `string` | A valid API key of your JinaAI account.

IMPORTANT: You need to provide the API key only once, during the inference model creation.
The get inference endpoint API does not retrieve your API key. |
| `model_id` | `string` | The name of the model to use for the inference task. |
| `rate_limit?` | [`InferenceRateLimitSetting`](InferenceRateLimitSetting.md) | This setting helps to minimize the number of rate limit errors returned from JinaAI.
By default, the `jinaai` service sets the number of requests allowed per minute to 2000 for all task types. |
| `similarity?` | [`InferenceJinaAISimilarityType`](InferenceJinaAISimilarityType.md) | For a `text_embedding` task, the similarity measure. One of cosine, dot_product, l2_norm.
The default values varies with the embedding type.
For example, a float embedding type uses a `dot_product` similarity measure by default. |
| `dimensions?` | `integer` | For an `embedding` or `text_embedding` task, the number of dimensions the resulting output embeddings should have.
By default, the model's standard output dimension is used.
Refer to the Jina documentation for more information. |
| `element_type?` | [`InferenceJinaAIElementType`](InferenceJinaAIElementType.md) | For an `embedding` or `text_embedding` task, the data type returned by the model.
Use `bit` for binary embeddings, which are encoded as bytes with signed int8 precision.
Use `binary` for binary embeddings, which are encoded as bytes with signed int8 precision (this is a synonym of `bit`).
Use `float` for the default float embeddings. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
