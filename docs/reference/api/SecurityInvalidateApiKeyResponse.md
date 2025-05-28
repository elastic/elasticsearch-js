# `SecurityInvalidateApiKeyResponse` [interface-SecurityInvalidateApiKeyResponse]

| Name | Type | Description |
| - | - | - |
| `error_count` | [integer](./integer.md) | The number of errors that were encountered when invalidating the API keys. |
| `error_details` | [ErrorCause](./ErrorCause.md)[] | Details about the errors. This field is not present in the response when `error_count` is `0`. |
| `invalidated_api_keys` | string[] | The IDs of the API keys that were invalidated as part of this request. |
| `previously_invalidated_api_keys` | string[] | The IDs of the API keys that were already invalidated. |
