# `SecuritySamlServiceProviderMetadataRequest` [interface-SecuritySamlServiceProviderMetadataRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { realm_name?: never; }) | All values in `body` will be added to the request body. |
| `querystring` | { [key: string]: any; } & { realm_name?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm_name` | [Name](./Name.md) | The name of the SAML realm in Elasticsearch. |
