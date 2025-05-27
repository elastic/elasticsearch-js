## Interface `SecurityOidcPrepareAuthenticationRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { iss?: never; login_hint?: never; nonce?: never; realm?: never; state?: never; }) | All values in `body` will be added to the request body. |
| `iss` | string | In the case of a third party initiated single sign on, this is the issuer identifier for the OP that the RP is to send the authentication request to. It cannot be specified when *realm* is specified. One of *realm* or *iss* is required. |
| `login_hint` | string | In the case of a third party initiated single sign on, it is a string value that is included in the authentication request as the *login_hint* parameter. This parameter is not valid when *realm* is specified. |
| `nonce` | string | The value used to associate a client session with an ID token and to mitigate replay attacks. If the caller of the API does not provide a value, Elasticsearch will generate one with sufficient entropy and return it in the response. |
| `querystring` | { [key: string]: any; } & { iss?: never; login_hint?: never; nonce?: never; realm?: never; state?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm` | string | The name of the OpenID Connect realm in Elasticsearch the configuration of which should be used in order to generate the authentication request. It cannot be specified when *iss* is specified. One of *realm* or *iss* is required. |
| `state` | string | The value used to maintain state between the authentication request and the response, typically used as a Cross-Site Request Forgery mitigation. If the caller of the API does not provide a value, Elasticsearch will generate one with sufficient entropy and return it in the response. |
