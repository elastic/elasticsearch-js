## Interface `InferenceAmazonBedrockTaskSettings`

| Name | Type | Description |
| - | - | - |
| `max_new_tokens` | [integer](./integer.md) | For a `completion` task, it sets the maximum number for the output tokens to be generated. |
| `temperature` | [float](./float.md) | For a `completion` task, it is a number between 0.0 and 1.0 that controls the apparent creativity of the results. At temperature 0.0 the model is most deterministic, at temperature 1.0 most random. It should not be used if `top_p` or `top_k` is specified. |
| `top_k` | [float](./float.md) | For a `completion` task, it limits samples to the top-K most likely words, balancing coherence and variability. It is only available for anthropic, cohere, and mistral providers. It is an alternative to `temperature`; it should not be used if `temperature` is specified. |
| `top_p` | [float](./float.md) | For a `completion` task, it is a number in the range of 0.0 to 1.0, to eliminate low-probability tokens. Top-p uses nucleus sampling to select top tokens whose sum of likelihoods does not exceed a certain value, ensuring both variety and coherence. It is an alternative to `temperature`; it should not be used if `temperature` is specified. |
