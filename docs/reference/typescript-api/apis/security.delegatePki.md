# Client.security.delegatePki

Delegate PKI authentication. This API implements the exchange of an X509Certificate chain for an Elasticsearch access token. The certificate chain is validated, according to RFC 5280, by sequentially considering the trust configuration of every installed PKI realm that has `delegation.enabled` set to `true`. A successfully trusted client certificate is also subject to the validation of the subject distinguished name according to thw `username_pattern` of the respective realm. This API is called by smart and trusted proxies, such as Kibana, which terminate the user's TLS session but still want to authenticate the user by using a PKI realm—-as if the user connected directly to Elasticsearch. IMPORTANT: The association between the subject public key in the target certificate and the corresponding private key is not validated. This is part of the TLS authentication process and it is delegated to the proxy that calls this API. The proxy is trusted to have performed the TLS authentication and this API translates that authentication into an Elasticsearch access token.

## Method Signature

```typescript
client.security.delegatePki(this: That, params: T.SecurityDelegatePkiRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecurityDelegatePkiResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecurityDelegatePkiRequest`](../types/SecurityDelegatePkiRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecurityDelegatePkiResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
