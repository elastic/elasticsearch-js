# SecurityInvalidateTokenResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `error_count` | `long` | The number of errors that were encountered when invalidating the tokens. |
| `error_details?` | `ErrorCause[]` | Details about the errors.
This field is not present in the response when `error_count` is `0`. |
| `invalidated_tokens` | `long` | The number of the tokens that were invalidated as part of this request. |
| `previously_invalidated_tokens` | `long` | The number of tokens that were already invalidated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
