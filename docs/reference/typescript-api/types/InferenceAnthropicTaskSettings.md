# InferenceAnthropicTaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `max_tokens` | [`integer`](integer.md) | For a `completion` task, it is the maximum number of tokens to generate before stopping. |
| `temperature?` | [`float`](float.md) | For a `completion` task, it is the amount of randomness injected into the response.
For more details about the supported range, refer to Anthropic documentation. |
| `top_k?` | [`integer`](integer.md) | For a `completion` task, it specifies to only sample from the top K options for each subsequent token.
It is recommended for advanced use cases only.
You usually only need to use `temperature`. |
| `top_p?` | [`float`](float.md) | For a `completion` task, it specifies to use Anthropic's nucleus sampling.
In nucleus sampling, Anthropic computes the cumulative distribution over all the options for each subsequent token in decreasing probability order and cuts it off once it reaches the specified probability.
You should either alter `temperature` or `top_p`, but not both.
It is recommended for advanced use cases only.
You usually only need to use `temperature`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
