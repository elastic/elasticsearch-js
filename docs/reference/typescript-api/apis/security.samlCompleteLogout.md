# Client.security.samlCompleteLogout

Logout of SAML completely. Verifies the logout response sent from the SAML IdP. NOTE: This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack. The SAML IdP may send a logout response back to the SP after handling the SP-initiated SAML Single Logout. This API verifies the response by ensuring the content is relevant and validating its signature. An empty response is returned if the verification process is successful. The response can be sent by the IdP with either the HTTP-Redirect or the HTTP-Post binding. The caller of this API must prepare the request accordingly so that this API can handle either of them.

## Method Signature

```typescript
client.security.samlCompleteLogout(this: That, params: T.SecuritySamlCompleteLogoutRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySamlCompleteLogoutResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecuritySamlCompleteLogoutRequest`](../types/SecuritySamlCompleteLogoutRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySamlCompleteLogoutResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
