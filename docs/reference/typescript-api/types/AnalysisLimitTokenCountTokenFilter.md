# AnalysisLimitTokenCountTokenFilter

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'limit'` | - |
| `consume_all_tokens?` | `boolean` | If `true`, the limit filter exhausts the token stream, even if the `max_token_count` has already been reached. Defaults to `false`. |
| `max_token_count?` | `SpecUtilsStringified<integer>` | Maximum number of tokens to keep. Once this limit is reached, any remaining tokens are excluded from the output. Defaults to `1`. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
