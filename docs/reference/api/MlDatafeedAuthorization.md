## Interface `MlDatafeedAuthorization`

| Name | Type | Description |
| - | - | - |
| `api_key` | [MlApiKeyAuthorization](./MlApiKeyAuthorization.md) | If an API key was used for the most recent update to the datafeed, its name and identifier are listed in the response. |
| `roles` | string[] | If a user ID was used for the most recent update to the datafeed, its roles at the time of the update are listed in the response. |
| `service_account` | string | If a service account was used for the most recent update to the datafeed, the account name is listed in the response. |
