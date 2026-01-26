# Client.security.samlInvalidate

Invalidate SAML. Submit a SAML LogoutRequest message to Elasticsearch for consumption. NOTE: This API is intended for use by custom web applications other than Kibana. If you are using Kibana, refer to the documentation for configuring SAML single-sign-on on the Elastic Stack. The logout request comes from the SAML IdP during an IdP initiated Single Logout. The custom web application can use this API to have Elasticsearch process the `LogoutRequest`. After successful validation of the request, Elasticsearch invalidates the access token and refresh token that corresponds to that specific SAML principal and provides a URL that contains a SAML LogoutResponse message. Thus the user can be redirected back to their IdP.

## Method Signature

```typescript
client.security.samlInvalidate(this: That, params: T.SecuritySamlInvalidateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySamlInvalidateResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecuritySamlInvalidateRequest`](../types/SecuritySamlInvalidateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySamlInvalidateResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
