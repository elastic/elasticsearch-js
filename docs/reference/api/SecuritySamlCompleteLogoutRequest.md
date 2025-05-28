# `SecuritySamlCompleteLogoutRequest` [interface-SecuritySamlCompleteLogoutRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { realm?: never; ids?: never; query_string?: never; content?: never; }) | All values in `body` will be added to the request body. |
| `content` | string | If the SAML IdP sends the logout response with the HTTP-Post binding, this field must be set to the value of the SAMLResponse form parameter from the logout response. |
| `ids` | [Ids](./Ids.md) | A JSON array with all the valid SAML Request Ids that the caller of the API has for the current user. |
| `query_string` | string | If the SAML IdP sends the logout response with the HTTP-Redirect binding, this field must be set to the query string of the redirect URI. |
| `querystring` | { [key: string]: any; } & { realm?: never; ids?: never; query_string?: never; content?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm` | string | The name of the SAML realm in Elasticsearch for which the configuration is used to verify the logout response. |
