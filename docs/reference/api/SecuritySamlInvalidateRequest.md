## Interface `SecuritySamlInvalidateRequest`

| Name | Type | Description |
| - | - | - |
| `acs` | string | The Assertion Consumer Service URL that matches the one of the SAML realm in Elasticsearch that should be used. You must specify either this parameter or the `realm` parameter. |
| `body` | string | ({ [key: string]: any; } & { acs?: never; query_string?: never; realm?: never; }) | All values in `body` will be added to the request body. |
| `query_string` | string | The query part of the URL that the user was redirected to by the SAML IdP to initiate the Single Logout. This query should include a single parameter named `SAMLRequest` that contains a SAML logout request that is deflated and Base64 encoded. If the SAML IdP has signed the logout request, the URL should include two extra parameters named `SigAlg` and `Signature` that contain the algorithm used for the signature and the signature value itself. In order for Elasticsearch to be able to verify the IdP's signature, the value of the `query_string` field must be an exact match to the string provided by the browser. The client application must not attempt to parse or process the string in any way. |
| `querystring` | { [key: string]: any; } & { acs?: never; query_string?: never; realm?: never; } | All values in `querystring` will be added to the request querystring. |
| `realm` | string | The name of the SAML realm in Elasticsearch the configuration. You must specify either this parameter or the `acs` parameter. |
