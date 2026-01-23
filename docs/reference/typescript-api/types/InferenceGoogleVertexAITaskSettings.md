# InferenceGoogleVertexAITaskSettings

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `auto_truncate?` | `boolean` | For a `text_embedding` task, truncate inputs longer than the maximum token length automatically. |
| `top_n?` | [`integer`](integer.md) | For a `rerank` task, the number of the top N documents that should be returned. |
| `thinking_config?` | [`InferenceThinkingConfig`](InferenceThinkingConfig.md) | For a `completion` or `chat_completion` task, allows configuration of the thinking features for the model.
Refer to the Google documentation for the allowable configurations for each model type. |
| `max_tokens?` | [`integer`](integer.md) | For `completion` and `chat_completion` tasks, specifies the `max_tokens` value for requests sent to the Google Model Garden `anthropic` provider.
If `provider` is not set to `anthropic`, this field is ignored.
If `max_tokens` is specified - it must be a positive integer. If not specified, the default value of 1024 is used.
Anthropic models require `max_tokens` to be set for each request. Please refer to the Anthropic documentation for more information. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
