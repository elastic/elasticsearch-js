# SecuritySamlAuthenticateRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | `string` | The SAML response as it was sent by the user's browser, usually a Base64 encoded XML document. |
| `ids` | [`Ids`](Ids.md) | A JSON array with all the valid SAML Request Ids that the caller of the API has for the current user. |
| `realm?` | `string` | The name of the realm that should authenticate the SAML response. Useful in cases where many SAML realms are defined. |
| `body?` | `string | { [key: string]: any } & { content?: never, ids?: never, realm?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { content?: never, ids?: never, realm?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
