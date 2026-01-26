# Client.security.samlServiceProviderMetadata

Create SAML service provider metadata. Generate SAML metadata for a SAML 2.0 Service Provider. The SAML 2.0 specification provides a mechanism for Service Providers to describe their capabilities and configuration using a metadata file. This API generates Service Provider metadata based on the configuration of a SAML realm in Elasticsearch.

## Method Signature

```typescript
client.security.samlServiceProviderMetadata(this: That, params: T.SecuritySamlServiceProviderMetadataRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SecuritySamlServiceProviderMetadataResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SecuritySamlServiceProviderMetadataRequest`](../types/SecuritySamlServiceProviderMetadataRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SecuritySamlServiceProviderMetadataResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
