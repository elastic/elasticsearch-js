# Client.security.samlPrepareAuthentication

Prepare SAML authentication. Create a SAML authentication request (`<AuthnRequest>`) as a URL string based on the configuration of the respective SAML realm in Elasticsearch. NOTE: This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack. This API returns a URL pointing to the SAML Identity Provider. You can use the URL to redirect the browser of the user in order to continue the authentication process. The URL includes a single parameter named `SAMLRequest`, which contains a SAML Authentication request that is deflated and Base64 encoded. If the configuration dictates that SAML authentication requests should be signed, the URL has two extra parameters named `SigAlg` and `Signature`. These parameters contain the algorithm used for the signature and the signature value itself. It also returns a random string that uniquely identifies this SAML Authentication request. The caller of this API needs to store this identifier as it needs to be used in a following step of the authentication process.

## Method Signature

```typescript
client.security.samlPrepareAuthentication(this: That, params?: T.SecuritySamlPrepareAuthenticationRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySamlPrepareAuthenticationResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`SecuritySamlPrepareAuthenticationRequest`](../types/SecuritySamlPrepareAuthenticationRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySamlPrepareAuthenticationResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
