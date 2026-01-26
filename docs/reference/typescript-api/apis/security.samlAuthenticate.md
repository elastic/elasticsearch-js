# Client.security.samlAuthenticate

Authenticate SAML. Submit a SAML response message to Elasticsearch for consumption. NOTE: This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack. The SAML message that is submitted can be: * A response to a SAML authentication request that was previously created using the SAML prepare authentication API. * An unsolicited SAML message in the case of an IdP-initiated single sign-on (SSO) flow. In either case, the SAML message needs to be a base64 encoded XML document with a root element of `<Response>`. After successful validation, Elasticsearch responds with an Elasticsearch internal access token and refresh token that can be subsequently used for authentication. This API endpoint essentially exchanges SAML responses that indicate successful authentication in the IdP for Elasticsearch access and refresh tokens, which can be used for authentication against Elasticsearch.

## Method Signature

```typescript
client.security.samlAuthenticate(this: That, params: T.SecuritySamlAuthenticateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySamlAuthenticateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecuritySamlAuthenticateRequest`](../types/SecuritySamlAuthenticateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySamlAuthenticateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
