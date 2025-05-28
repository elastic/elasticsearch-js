# `SecurityGrantApiKeyRequest` [interface-SecurityGrantApiKeyRequest]

| Name | Type | Description |
| - | - | - |
| `access_token` | string | The user's access token. If you specify the `access_token` grant type, this parameter is required. It is not valid with other grant types. |
| `api_key` | [SecurityGrantApiKeyGrantApiKey](./SecurityGrantApiKeyGrantApiKey.md) | The API key. |
| `body` | string | ({ [key: string]: any; } & { api_key?: never; grant_type?: never; access_token?: never; username?: never; password?: never; run_as?: never; }) | All values in `body` will be added to the request body. |
| `grant_type` | [SecurityGrantApiKeyApiKeyGrantType](./SecurityGrantApiKeyApiKeyGrantType.md) | The type of grant. Supported grant types are: `access_token`, `password`. |
| `password` | [Password](./Password.md) | The user's password. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types. |
| `querystring` | { [key: string]: any; } & { api_key?: never; grant_type?: never; access_token?: never; username?: never; password?: never; run_as?: never; } | All values in `querystring` will be added to the request querystring. |
| `run_as` | [Username](./Username.md) | The name of the user to be impersonated. |
| `username` | [Username](./Username.md) | The user name that identifies the user. If you specify the `password` grant type, this parameter is required. It is not valid with other grant types. |
