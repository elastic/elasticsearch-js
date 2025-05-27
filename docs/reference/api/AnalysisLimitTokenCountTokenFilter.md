## Interface `AnalysisLimitTokenCountTokenFilter`

| Name | Type | Description |
| - | - | - |
| `consume_all_tokens` | boolean | If `true`, the limit filter exhausts the token stream, even if the `max_token_count` has already been reached. Defaults to `false`. |
| `max_token_count` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[integer](./integer.md)> | Maximum number of tokens to keep. Once this limit is reached, any remaining tokens are excluded from the output. Defaults to `1`. |
| `type` | 'limit' | &nbsp; |
