# `SecurityInvalidateTokenResponse` [interface-SecurityInvalidateTokenResponse]

| Name | Type | Description |
| - | - | - |
| `error_count` | [long](./long.md) | The number of errors that were encountered when invalidating the tokens. |
| `error_details` | [ErrorCause](./ErrorCause.md)[] | Details about the errors. This field is not present in the response when `error_count` is `0`. |
| `invalidated_tokens` | [long](./long.md) | The number of the tokens that were invalidated as part of this request. |
| `previously_invalidated_tokens` | [long](./long.md) | The number of tokens that were already invalidated. |
