# SecuritySamlPrepareAuthenticationRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `acs?` | `string` | The Assertion Consumer Service URL that matches the one of the SAML realms in Elasticsearch.
The realm is used to generate the authentication request. You must specify either this parameter or the `realm` parameter. |
| `realm?` | `string` | The name of the SAML realm in Elasticsearch for which the configuration is used to generate the authentication request.
You must specify either this parameter or the `acs` parameter. |
| `relay_state?` | `string` | A string that will be included in the redirect URL that this API returns as the `RelayState` query parameter.
If the Authentication Request is signed, this value is used as part of the signature computation. |
| `body?` | `string | { [key: string]: any } & { acs?: never, realm?: never, relay_state?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { acs?: never, realm?: never, relay_state?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
