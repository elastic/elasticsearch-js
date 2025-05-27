## Interface `ConnectorUpdateApiKeyIdRequest`

| Name | Type | Description |
| - | - | - |
| `api_key_id` | string | &nbsp; |
| `api_key_secret_id` | string | &nbsp; |
| `body` | string | ({ [key: string]: any; } & { connector_id?: never; api_key_id?: never; api_key_secret_id?: never; }) | All values in `body` will be added to the request body. |
| `connector_id` | [Id](./Id.md) | The unique identifier of the connector to be updated |
| `querystring` | { [key: string]: any; } & { connector_id?: never; api_key_id?: never; api_key_secret_id?: never; } | All values in `querystring` will be added to the request querystring. |
