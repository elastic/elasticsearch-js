# `SecuritySamlAuthenticateRequest` [interface-SecuritySamlAuthenticateRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { content?: never; ids?: never; realm?: never; }) | All values in `body` will be added to the request body. |
| `content` | string | The SAML response as it was sent by the user's browser, usually a Base64 encoded XML document. |
| `ids` | [Ids](./Ids.md) | A JSON array with all the valid SAML Request Ids that the caller of the API has for the current user. |
| `querystring` | { [key: string]: any; } & { content?: never; ids?: never; realm?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm` | string | The name of the realm that should authenticate the SAML response. Useful in cases where many SAML realms are defined. |
