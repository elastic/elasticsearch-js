# SecurityGrantApiKeyRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `refresh?` | [`Refresh`](Refresh.md) | If 'true', Elasticsearch refreshes the affected shards to make this operation
visible to search.
If 'wait_for', it waits for a refresh to make this operation visible to search.
If 'false', nothing is done with refreshes. |
| `api_key` | [`SecurityGrantApiKeyGrantApiKey`](SecurityGrantApiKeyGrantApiKey.md) | The API key. |
| `grant_type` | [`SecurityGrantApiKeyApiKeyGrantType`](SecurityGrantApiKeyApiKeyGrantType.md) | The type of grant. Supported grant types are: `access_token`, `password`. |
| `access_token?` | `string` | The user's access token.
If you specify the `access_token` grant type, this parameter is required.
It is not valid with other grant types. |
| `username?` | [`Username`](Username.md) | The user name that identifies the user.
If you specify the `password` grant type, this parameter is required.
It is not valid with other grant types. |
| `password?` | [`Password`](Password.md) | The user's password.
If you specify the `password` grant type, this parameter is required.
It is not valid with other grant types. |
| `run_as?` | [`Username`](Username.md) | The name of the user to be impersonated. |
| `body?` | `string | { [key: string]: any } & { refresh?: never, api_key?: never, grant_type?: never, access_token?: never, username?: never, password?: never, run_as?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { refresh?: never, api_key?: never, grant_type?: never, access_token?: never, username?: never, password?: never, run_as?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
