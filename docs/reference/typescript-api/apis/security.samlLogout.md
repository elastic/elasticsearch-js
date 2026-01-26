# Client.security.samlLogout

Logout of SAML. Submits a request to invalidate an access token and refresh token. NOTE: This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack. This API invalidates the tokens that were generated for a user by the SAML authenticate API. If the SAML realm in Elasticsearch is configured accordingly and the SAML IdP supports this, the Elasticsearch response contains a URL to redirect the user to the IdP that contains a SAML logout request (starting an SP-initiated SAML Single Logout).

## Method Signature

```typescript
client.security.samlLogout(this: That, params: T.SecuritySamlLogoutRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySamlLogoutResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecuritySamlLogoutRequest`](../types/SecuritySamlLogoutRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySamlLogoutResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
